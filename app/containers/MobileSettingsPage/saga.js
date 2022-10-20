import { takeLatest, call, put, delay } from 'redux-saga/effects'
import request from 'utils/request'
import { setIOSTrayIcon, setSplashScreenLogo, setAndroidTrayIcon, setError, setFlag } from './actions'
import { GET_MOBILE_APP_SETTINGS, SUBMIT_MOBILE_APP_SETTINGS } from './constants'
const { DASHBOARD_SERVICE_BASE_URL } = process.env
function* getMobileAppSettingsSaga(action) {
  yield put(setError({ boolean: false }))
  yield put(setFlag({ value: false }))
  const { storeId } = action
  try {
    const url = `${DASHBOARD_SERVICE_BASE_URL}stores/get-mobile-app-display-settings&storeId=${storeId}`
    const response = yield call(request, url)
    const { splash_screen_logo, android_tray_icon, ios_tray_icon } = response
    yield put(setSplashScreenLogo({ value: splash_screen_logo }))
    yield put(setAndroidTrayIcon({ value: android_tray_icon }))
    yield put(setIOSTrayIcon({ value: ios_tray_icon }))
  } catch (err) {
    console.log({ err })
  }
}
function* submitMobileAppSettingsSaga(action) {
  yield put(setError({ boolean: false }))
  yield put(setFlag({ value: false }))
  const { storeId, merchantId, splashScreenLogo, androidTrayIcon, iosTrayIcon } = action
  try {
    const url = `${DASHBOARD_SERVICE_BASE_URL}stores/set-mobile-app-display-settings&storeId=${storeId}&merchantId=${merchantId}`
    const body = {
      splashScreenLogoUrl: splashScreenLogo,
      iosTrayIcon,
      androidTrayIcon,
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, url, params)
    yield put(setFlag({ value: true }))
    yield delay(500)
    yield put(setFlag({ value: false }))
  } catch (err) {
    yield put(setError({ boolean: true }))
    console.log({ err })
  }
}

export default function* MobileSettingsPageWatcher() {
  yield takeLatest(GET_MOBILE_APP_SETTINGS, getMobileAppSettingsSaga)
  yield takeLatest(SUBMIT_MOBILE_APP_SETTINGS, submitMobileAppSettingsSaga)
}
