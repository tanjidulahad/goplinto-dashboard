import { call, put, takeLatest, delay } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_INTEGRATIONS, SET_INTEGRATION_STATUS, SET_STORE_INTEGRATION } from './constants'
import { getIntegrations, setIntegrations, setError, setFlag } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getIntegrationsSaga({ storeId }) {
  yield put(setError({ boolean: false }))
  yield put(setFlag({ value: false }))
  try {
    const url = `${BASE_URL}stores/get-all-store-widget-integrations&storeId=${storeId}`
    const response = yield call(request, url)
    yield put(setIntegrations(response))
  } catch (e) {
    console.log({ error: e })
  }
}
function* setIntegrationStatusSaga({ storeId, domain, status }) {
  yield put(setError({ boolean: false }))
  yield put(setFlag({ value: false }))
  try {
    const url = `${BASE_URL}stores/set-widget-integration-status&storeId=${storeId}&domain=${domain}&status=${status}`
    yield call(request, url)
    yield put(getIntegrations(storeId))
  } catch (e) {
    yield put(setError({ value: true }))
    yield delay(500)
    yield put(setError({ value: false }))
    console.log({ error: e })
  }
}
function* setStoreIntegrationSaga({ storeId, merchantId, domain, integrationData }) {
  yield put(setError({ boolean: false }))
  yield put(setFlag({ value: false }))
  try {
    const url = `${BASE_URL}stores/set-store-widget-integration&storeId=${storeId}&merchantId=${merchantId}&domain=${domain}`
    const params = {
      method: 'POST',
      body: JSON.stringify(integrationData),
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
export default function* storeDetailsWatcher() {
  yield takeLatest(GET_INTEGRATIONS, getIntegrationsSaga)
  yield takeLatest(SET_INTEGRATION_STATUS, setIntegrationStatusSaga)
  yield takeLatest(SET_STORE_INTEGRATION, setStoreIntegrationSaga)
}
