import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  UPLOAD_LOGO_IMG,
  UPLOAD_COVER_PIC,
  SAVE_CUSTOM_CONFIG,
  SAVE_DISPLAY_SETTINGS,
  SAVE_BANNER_TO_DB,
} from 'containers/CustomizePage/constants'
import { loadLogo, loadCoverPic } from 'containers/CustomizePage/actions'

import request from 'utils/request'
import { buildConfigData } from 'utils/helpers'
import { uploadFileToS3 } from '../../services/s3'
import { makeSelectCustomizePage } from './selectors'
import { onPageLoad, setPageSubmissionStatus } from 'containers/App/actions'

const { DASHBOARD_SERVICE_BASE_URL } = process.env

export function* uploadToS3(uploadSuccess, action) {
  yield put(onPageLoad(true))
  const { name, type } = action.imgFile
  const { storeId } = action
  const requestURL = `${DASHBOARD_SERVICE_BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

  try {
    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(uploadSuccess(presignedPostData.fileKey))
  } catch (err) {
    yield put(onPageLoad(false))
    console.log({ err })
  }
}

export function* saveConfigToS3() {
  const pageConfigObj = yield select(makeSelectCustomizePage())
  const reqBodyData = yield call(buildConfigData, pageConfigObj)
  const requestURL = `${DASHBOARD_SERVICE_BASE_URL}customize/save-to-env`
  const params = {
    method: 'POST',
    body: JSON.stringify(reqBodyData),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  yield call(request, requestURL, params)
}

export function* saveDisplaySettingsToDB(action) {
  const { customizedData, storeId, merchantId } = action
  yield put(onPageLoad(true))
  try {
    if (Object.keys(customizedData).length) {
      const reqBodyData = {
        groupId: '1',
        primaryColor: customizedData.theme.primary_color.substring(1),
        secondaryColor: '040802',
        itemsLayout: customizedData.layout === 'grid' ? 'GRID' : 'LIST',
        isMultiCourse: 'Y',
      }
      const params = {
        method: 'POST',
        body: JSON.stringify(reqBodyData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      yield call(
        request,
        `${DASHBOARD_SERVICE_BASE_URL}stores/set-display-settings&storeId=${storeId}&merchantId=${merchantId}`,
        params,
      )
      yield put(setPageSubmissionStatus(true))
    }
  } catch (e) {
    yield put(onPageLoad(false))
    console.log({ e })
  }
}

export function* addBannerFlow(action) {
  const { url, merchantId, storeId } = action
  try {
    const reqBodyData = {
      imgUrl: url,
      section: 'HOME',
      startTime: '12345',
      endTime: '12345',
      target: 'placeholder',
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(reqBodyData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(
      request,
      `${DASHBOARD_SERVICE_BASE_URL}stores/add-banner-img&storeId=${storeId}&merchantId=${merchantId}`,
      params,
    )
  } catch (e) {
    /* handle error */
    console.error(e)
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* customizePageSaga() {
  yield takeLatest(UPLOAD_LOGO_IMG, uploadToS3, loadLogo)
  yield takeLatest(UPLOAD_COVER_PIC, uploadToS3, loadCoverPic)
  yield takeLatest(SAVE_CUSTOM_CONFIG, saveConfigToS3)
  yield takeLatest(SAVE_DISPLAY_SETTINGS, saveDisplaySettingsToDB)
  yield takeLatest(SAVE_BANNER_TO_DB, addBannerFlow)
}
