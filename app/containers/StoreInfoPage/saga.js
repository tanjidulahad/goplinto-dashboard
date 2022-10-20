import { call, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { TOGGLE_STORE } from './constants'
const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* toggleStoreFlow({ storeId, isOpen }) {
  try {
    yield call(request, `${BASE_URL}stores/set-open-close&storeId=${storeId}&isOpen=${isOpen ? 'Y' : 'N'}`, {})
  } catch (error) {
    /* handle error */
    console.error({ error })
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* storeInfoSaga() {
  yield takeLatest(TOGGLE_STORE, toggleStoreFlow)
}
