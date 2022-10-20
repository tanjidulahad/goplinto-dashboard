import { call, delay, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { INIT_DISPLAY_SETTINGS, UPDATE_KIOSK_THEME } from './constants'
import { loadSettings, setError, setFlag } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* initializeSettings(action) {
  try {
    const res = yield call(request, `${BASE_URL}stores/get-kiosk-display-settings&storeId=${action.storeId}`)
    if (res) yield put(loadSettings(res))
  } catch (err) {
    console.log('There was an error in fetching kiosk theme details. Please try again...')
  }
}

export function* updateKioskThemeInDB(action) {
  try {
    yield put(setError(false))
    yield put(setFlag(false))
    const params = yield {
      method: 'POST',
      body: JSON.stringify(action.themeData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(
      request,
      `${BASE_URL}stores/set-kiosk-display-settings&storeId=${action.storeId}&merchantId=${action.merchantId}`,
      params,
    )
    yield put(setFlag(true))
    yield delay(100)
    yield put(setFlag(false))
  } catch (err) {
    yield put(setFlag(false))
    yield put(setError(true))
  }
}

export default function* kioskSagaWatcher() {
  yield takeLatest(INIT_DISPLAY_SETTINGS, initializeSettings)
  yield takeLatest(UPDATE_KIOSK_THEME, updateKioskThemeInDB)
}
