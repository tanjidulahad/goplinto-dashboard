import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { displayStoreSettings, getStoreSettings as getStoreSettingsAction } from './actions'

import { SET_STORE_SETTINGS, GET_STORE_SETTINGS } from './constants'

import { setPageSubmissionStatus } from 'containers/App/actions'
import { getStoreSettingsAPI, setStoreSettingsAPI } from 'Endpoints'

function* setStoreSettings({ storeId, merchantId, storeSettings }) {
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(storeSettings),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request,setStoreSettingsAPI(storeId,merchantId), params)
    yield put(getStoreSettingsAction(storeId))
    yield put(setPageSubmissionStatus(true))
  } catch (error) {
    console.error({ error })
  }
}

function* getStoreSettings({ storeId }) {
  try {
    const settings = yield call(request,getStoreSettingsAPI(storeId), {})
    yield put(displayStoreSettings(settings))
  } catch (error) {
    console.error({ error })
  }
}
export default function* storeSettingsWatcher() {
  yield takeLatest(SET_STORE_SETTINGS, setStoreSettings)
  yield takeLatest(GET_STORE_SETTINGS, getStoreSettings)
}
