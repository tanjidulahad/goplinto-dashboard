import { call, takeLatest, takeEvery, put } from 'redux-saga/effects'
import request from 'utils/request'
import { SUBMIT_ITEM as SUBMISSION_STATUS, NEW_ITEM_CREATED } from 'containers/InventoryPage/constants'
import { onPageLoad } from 'containers/App/actions'
import { uploadFileToS3 } from 'services/s3'
import {
  loadItemImage,
  loadItemImage1,
  loadItemImage2,
  loadItemImage3,
  loadItemImage4,
  loadItemImage5,
  showUpgradeNotification,
} from './actions'
import {
  SUBMIT_ITEM,
  SUBMIT_VARIANT_COMBINATIONS,
  UPLOAD_ITEM_IMG,
  DELETE_ITEM,
  UPLOAD_ITEM_IMG1,
  UPLOAD_ITEM_IMG2,
  UPLOAD_ITEM_IMG3,
  UPLOAD_ITEM_IMG4,
  UPLOAD_ITEM_IMG5,
} from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* submitItemFlow(action) {
  yield put(showUpgradeNotification(false, ''))
  try {
    yield put(onPageLoad(true))
    const { itemData: itemDetails, merchantId, storeId, edit, itemId } = action
    const params = {
      method: 'POST',
      body: JSON.stringify(itemDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    if (!itemId) {
      const newItemId = yield call(
        request,
        `${BASE_URL}catalog/add-item&storeId=${storeId}&merchantId=${merchantId}`,
        params,
      )
      if (newItemId.error) {
        yield put(showUpgradeNotification(true, newItemId.message))
        return
      }
      yield put({ type: NEW_ITEM_CREATED, newItemId })
    } else
      yield call(
        request,
        `${BASE_URL}catalog/update-item&storeId=${storeId}&merchantId=${merchantId}&itemId=${itemId}`,
        params,
      )
    yield put({ type: SUBMISSION_STATUS, status: true })
  } catch (e) {
    yield put(onPageLoad(false))
    console.error(e)
  }
}
export function* submitVariantCombinationsFlow(action) {
  try {
    const { combinationData, itemId,storeId, merchantId } = action
    const params = {
      method: 'POST',
      body: JSON.stringify(combinationData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, `${BASE_URL}item-variants/update-variant-items&itemId=${itemId}&storeId=${storeId}&merchantId=${merchantId}`, params)
  } catch (e) {
    console.error(e)
  }
}

function* deleteItemFlow(action) {
  try {
    yield put(onPageLoad(true))
    const { storeId, merchantId, itemId } = action
    yield call(request, `${BASE_URL}catalog/delete-item&storeId=${storeId}&itemId=${itemId}&userId=${merchantId}`)
    yield put({ type: SUBMISSION_STATUS, status: true })
  } catch (e) {
    yield put(onPageLoad(false))
    console.error(e)
  }
}

export function* uploadPrimaryToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage(presignedPostData.fileKey))
  } catch (err) { }
}

export function* uploadItemImage1ToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`
    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage1(presignedPostData.fileKey))
  } catch (err) { }
}

export function* uploadItemImage2ToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage2(presignedPostData.fileKey))
  } catch (err) { }
}

export function* uploadItemImage3ToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage3(presignedPostData.fileKey))
  } catch (err) { }
}
export function* uploadItemImage4ToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

    const presignedPostData = yield call(request, requestURL)

    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage4(presignedPostData.fileKey))
  } catch (err) {
    console.log(err)
  }
}
export function* uploadItemImage5ToS3(action) {
  yield put(onPageLoad(true))
  try {
    const { name, type } = action.imgFile
    const { storeId } = action
    const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(loadItemImage5(presignedPostData.fileKey))
  } catch (err) {
    console.log(err)
  }
}

export default function* itemWatcher() {
  yield takeLatest(SUBMIT_ITEM, submitItemFlow)
  yield takeLatest(SUBMIT_VARIANT_COMBINATIONS, submitVariantCombinationsFlow)
  yield takeLatest(UPLOAD_ITEM_IMG, uploadPrimaryToS3)
  yield takeLatest(UPLOAD_ITEM_IMG1, uploadItemImage1ToS3)
  yield takeLatest(UPLOAD_ITEM_IMG2, uploadItemImage2ToS3)
  yield takeLatest(UPLOAD_ITEM_IMG3, uploadItemImage3ToS3)
  yield takeLatest(UPLOAD_ITEM_IMG4, uploadItemImage4ToS3)
  yield takeLatest(UPLOAD_ITEM_IMG5, uploadItemImage5ToS3)
  yield takeEvery(DELETE_ITEM, deleteItemFlow)
}
