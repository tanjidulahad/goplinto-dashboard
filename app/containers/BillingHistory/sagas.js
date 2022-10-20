import { takeLatest, call, put, delay } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_BILLS, GET_CREDITS_HISTORY, SET_CANCEL_AUTO, SET_CREDITS_HISTORY } from './constants'
import { getBillingHistoryItems, setBillingHistoryItems, setCancelAuto, setCreditHistoryItems, setUpdateCancelError } from './actions'
const { DASHBOARD_SERVICE_BASE_URL } = process.env
function* getBillingHistorySaga(action) {
  try {
    const { storeId } = action
    const url = `${DASHBOARD_SERVICE_BASE_URL}subscriptions/get-subscription-details&storeId=${storeId}`
    const response = yield call(request, url)
    yield put(setBillingHistoryItems(response))
  } catch (err) {
    console.log({ err })
  }
}
function* getCreditHistorySaga(action) {
  try {
    const { storeId,merchantId } = action
    const url = `${DASHBOARD_SERVICE_BASE_URL}dashboard/get-wallet-transactions&merchantId=${merchantId}&storeId=${storeId}&pageNum=1`
    const response = yield call(request, url)
    yield put(setCreditHistoryItems(response))
  } catch (err) {
    console.log({ err })
  }
}
function* cancelAutoRenewalSaga(action) {
  try {
    yield put(setUpdateCancelError(false))
    const { storeId, subscriptionId } = action
    const url = `${DASHBOARD_SERVICE_BASE_URL}subscriptions/cancel-subscription&storeId=${storeId}&subscriptionId=${subscriptionId}`
    const response = yield call(request, url)
    yield put(getBillingHistoryItems(storeId))

  } catch (err) {
    yield put(setUpdateCancelError(true))
    yield delay(1000)
    yield put(setUpdateCancelError(false))
    console.log({ err })
  }
}
export default function* billingHistoryWatcher() {
  yield takeLatest(GET_BILLS, getBillingHistorySaga)
  yield takeLatest(GET_CREDITS_HISTORY, getCreditHistorySaga)
  yield takeLatest(SET_CANCEL_AUTO, cancelAutoRenewalSaga)
}
