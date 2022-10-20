import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { onPageLoad, setDisplaySettings, setPageSubmissionStatus, updateStoreLogo } from 'containers/App/actions'
import request from 'utils/request'
import { uploadFileToS3 } from 'services/s3'
import {
  GET_DISPLAY_SETTINGS,
  UPLOAD_LOGO_IMG,
  UPLOAD_COVER_PIC,
  SUBMIT_DISPLAY_SETTINGS,
  UPLOAD_FAV_ICON,
} from './constants'
import {
  getDisplaySettings,
  loadCoverPic,
  loadFavIcon,
  loadLogo,
} from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getDisplaySettingsFlow({ storeId }) {
  try {
    const displaySettings = yield call(request, `${BASE_URL}stores/get-store-display-settings&storeId=${storeId}`, {})
    yield put(setDisplaySettings(displaySettings))
  } catch (e) {}
}

export function* uploadToS3(uploadSuccess, action) {
  yield put(onPageLoad(true))
  const { name, type } = action.imgFile
  const { storeId } = action
  const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

  try {
    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    yield put(uploadSuccess(presignedPostData.fileKey))
  } catch (err) {
    yield put(onPageLoad(false))
    console.log({ err })
  }
}

export function* saveDisplaySettingsToDB(action) {
  const { displayData, storeId, merchantId } = action
  yield put(onPageLoad(true))
  try {
    const { primaryColor, secondaryColor, tertiaryColor, layout: itemsLayout, logoImgUrl, coverImageUrl: bannerImgUrl, favIconImg } = displayData
    const reqBodyData = {
      groupId: '1',
      primaryColor,
      secondaryColor,
      tertiaryColor,
      favIconImg,
      itemsLayout,
      logoImgUrl,
      bannerImgUrl,
      isMultiCourse: 'N',
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(reqBodyData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, `${BASE_URL}stores/set-display-settings&storeId=${storeId}&merchantId=${merchantId}`, params)
    yield put(updateStoreLogo(logoImgUrl))
    yield put(getDisplaySettings(storeId))
    yield put(setPageSubmissionStatus(true))
  } catch (e) {
    yield put(onPageLoad(false))
    console.log({ e })
  }
}



export default function* storeSettingsWatcher() {
  yield takeLatest(UPLOAD_LOGO_IMG, uploadToS3, loadLogo)
  yield takeLatest(UPLOAD_FAV_ICON, uploadToS3, loadFavIcon)
  yield takeLatest(UPLOAD_COVER_PIC, uploadToS3, loadCoverPic)
  yield takeEvery(GET_DISPLAY_SETTINGS, getDisplaySettingsFlow)
  yield takeLatest(SUBMIT_DISPLAY_SETTINGS, saveDisplaySettingsToDB)
}
