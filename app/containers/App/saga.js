import { call, takeLatest, put } from 'redux-saga/effects'
import request from 'utils/request'
import { onPageLoad, setStoreSubscribedModules, setStoreTypes, setSubscribedModules } from 'containers/App/actions'
import { uploadFileToS3 } from 'services/s3'
import { UPLOAD_EDIT_CATEGORY_IMAGE, UPLOAD_NEW_CATEGORY_IMAGE } from 'containers/InventoryPage/constants'
import { UPLOAD_LOGO_IMG, UPLOAD_COVER_IMG } from 'containers/KioskThemePage/constants'
import { setLogo, setCoverPic } from 'containers/KioskThemePage/actions'
import { loadEditCategoryImage, loadNewCategoryImage } from 'containers/InventoryPage/actions'
import { UPLOAD_BANNER } from 'containers/BannerImage/constants'
import { setBannerInDb } from 'containers/BannerImage/actions'
import { START_SET_IMAGE_LINK } from 'containers/Branding/constants'
import { setImageLink } from 'containers/Branding/actions'
import { START_UPLOAD_IMAGE } from 'containers/CreateNotificationPage/constants'
import { setUploadedImage } from 'containers/CreateNotificationPage/actions'
import capitalize from 'utils/capitalize'
import { GET_STORE_TYPES, GET_SUBSCRIBED_MODULES } from './constants'
import {
  UPLOAD_ANDROID_TRAY_ICON,
  UPLOAD_IOS_TRAY_ICON,
  UPLOAD_SPLASH_SCREEN_LOGO,
} from 'containers/MobileSettingsPage/constants'
import { loadAndroidTrayIcon, loadSplashScreenLogo, loadIOSTrayIcon } from 'containers/MobileSettingsPage/actions'
import { setStoreModules } from 'containers/StoreInfoPage/actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* uploadImage(uploadSuccess, action) {
  yield put(onPageLoad(true))
  const { name, type } = action.imgFile
  const { storeId, bannerIdx } = action
  const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

  try {
    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    if (bannerIdx === 0 || bannerIdx) {
      const { merchantId, bannerLink } = action
      const url = `https://dsa0i94r8ef09.cloudfront.net/${presignedPostData.fileKey}`
      yield put(uploadSuccess(bannerIdx, url, storeId, merchantId, bannerLink))
    } else {
      if (action.type === START_SET_IMAGE_LINK) {
        yield put(setImageLink(action.idx, action.kind, presignedPostData.fileKey))
      } else {
        yield put(uploadSuccess(presignedPostData.fileKey))
      }
    }
  } catch (err) {
    yield put(onPageLoad(false))
    console.log({ err })
  }
}

function* getStoreTypesSaga() {
  try {
    const url = `${BASE_URL}stores/get-store-types`
    const storeTypesRaw = yield call(request, url)
    const storeTypes = storeTypesRaw.map(type => ({ label: capitalize(type.store_type), value: type.store_type }))
    yield put(setStoreTypes(storeTypes))
  } catch (e) {
    console.log({ error: e })
  }
}

export function* getSubscriptionDetails({ storeId, roleId }) {
  try {
    const url = roleId
      ? `${BASE_URL}subscriptions/get-store-modules&storeId=${storeId}&roleId=${roleId}`
      : `${BASE_URL}subscriptions/get-store-modules&storeId=${storeId}`
    const data = yield call(request, url)
    yield put(setStoreModules(data.subscribed_modules))
    yield put(setStoreSubscribedModules(data.subscribed_modules))
    yield put(setSubscribedModules(data))
  } catch (e) { }
}

export default function* itemWatcher() {
  yield takeLatest(UPLOAD_NEW_CATEGORY_IMAGE, uploadImage, loadNewCategoryImage)
  yield takeLatest(UPLOAD_EDIT_CATEGORY_IMAGE, uploadImage, loadEditCategoryImage)
  yield takeLatest(UPLOAD_LOGO_IMG, uploadImage, setLogo)
  yield takeLatest(UPLOAD_COVER_IMG, uploadImage, setCoverPic)
  yield takeLatest(START_UPLOAD_IMAGE, uploadImage, setUploadedImage)
  yield takeLatest(UPLOAD_BANNER, uploadImage, setBannerInDb)
  yield takeLatest(GET_STORE_TYPES, getStoreTypesSaga)
  yield takeLatest(UPLOAD_SPLASH_SCREEN_LOGO, uploadImage, loadSplashScreenLogo)
  yield takeLatest(UPLOAD_ANDROID_TRAY_ICON, uploadImage, loadAndroidTrayIcon)
  yield takeLatest(UPLOAD_IOS_TRAY_ICON, uploadImage, loadIOSTrayIcon)
  yield takeLatest(GET_SUBSCRIBED_MODULES, getSubscriptionDetails)
  yield takeLatest(START_SET_IMAGE_LINK, uploadImage, setImageLink)
}
