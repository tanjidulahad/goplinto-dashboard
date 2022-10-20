import { call, put, takeLatest, all } from 'redux-saga/effects'
import request from 'utils/request'
import {
  UPDATE_CUSTOMER_BASE_TYPE,
  SET_ERROR,
  SET_LOADING_REPORT,
  GET_REPORT_ANALYTICS,
  GET_GROUP_REPORT_ANALYTICS,
  GET_TOP_PRODUCTS,
  GET_GROUP_TOP_PRODUCTS,
  SEND_REPORTS,
  SEND_ITEM_REPORTS,
} from './constants'
import { GET_STORE_STATS } from '../Dashboard/constants'
import {
  setCustomerBase,
  setError,
  setErrorMessage,
  setLoading,
  getAnalytics,
  setReportAnalytics,
  setTopProducts,
  setReportPopupMsg
} from './actions'
import { setStoreStats } from '../Dashboard/actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
const REPORT_BASE_URL = process.env.REACT_APP_REPORT_BASE_URL

function* getStoreStatsSaga({ level, id, startDate, endDate }) {
  try {
    yield put(setLoading({ boolean: true }))
    if (!startDate || !endDate) var url = `${BASE_URL}dashboard/get-store-stats&${level}=${id}`
    else var url = `${BASE_URL}dashboard/get-store-stats&${level}=${id}&startDate=${startDate}&endDate=${endDate}`
    const storeStats = yield call(request, url)
    yield put(setStoreStats(storeStats))
  } catch (e) {
    console.log({ error: e })
    yield put(setLoading({ boolean: false }))
  }
}

function* getReportAnalyticsSaga({ storeId, period, startDate, endDate }) {
  try {
    yield put(setLoading({ boolean: true }))
    let url = `${REPORT_BASE_URL}order-reports/get-order-reports-by-time-range?storeId=${storeId}&period=${period}`

    const result = yield call(request, url)

    if (result.error) {
      yield put(setError({ boolean: true }))
      yield put(setErrorMessage(result.message))
    } else yield put(setReportAnalytics(result))
  } catch (e) {
    console.log({ error: e })
    yield put(setLoading({ boolean: false }))
  }
}
function* getGroupReportAnalyticsSaga({ groupId, timePeriodString, startDate, endDate }) {
  try {
    yield put(setLoading({ boolean: true }))
    let url = `${REPORT_BASE_URL}order-reports/get-group-order-reports-by-time-range?groupId=${groupId}&period=${timePeriodString}`

    const result = yield call(request, url)

    if (result.error) {
      yield put(setError({ boolean: true }))
      yield put(setErrorMessage(result.message))
    } else yield put(setReportAnalytics(result))
  } catch (e) {
    console.log({ error: e })
    yield put(setLoading({ boolean: false }))
  }
}

function* getTopProductsSaga({ storeId, period }) {
  try {
    let url = `${REPORT_BASE_URL}item-reports/get-top-products-by-time-range?storeId=${storeId}&period=${period}`

    const result = yield call(request, url)
    if (result.error) {
      yield put(setError({ boolean: true }))
      yield put(setErrorMessage(result.message))
    } else
      yield put(setTopProducts((typeof result == 'object' && result.hasOwnProperty('items') && result.items) || []))
  } catch (e) {
    console.log({ error: e })
  }
}
function* getGroupTopProductsSaga({ groupId, timePeriodString, startDate, endDate }) {
  try {
    let url = `${REPORT_BASE_URL}item-reports/get-group-top-products-by-time-range?groupId=${groupId}&period=${timePeriodString}`

    const result = yield call(request, url)
    if (result.error) {
      yield put(setError({ boolean: true }))
      yield put(setErrorMessage(result.message))
    } else
      yield put(setTopProducts((typeof result == 'object' && result.hasOwnProperty('items') && result.items) || []))
  } catch (e) {
    console.log({ error: e })
  }
}

function* sendEmailSaga(action) {
  try {
    const params = {
      method: 'POST',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL}reports/generate-customer-base-report&storeId=${action.storeId}&customerBase=${
      action.customerBase
    }`
    const result = yield call(request, url, params)
    if (result.error) {
      yield put(setError({ boolean: true }))
      yield put(setErrorMessage(result.message))
    } else if (result) {
      yield put(setError({ boolean: false }))
      yield put(setErrorMessage(''))
    } else if (!result) {
      yield put(setError({ boolean: true }))

      yield put(setErrorMessage('*Something went wrong! Please try again later!'))
    }
  } catch (e) {
    yield put(setError({ boolean: true }))
    yield put(setErrorMessage('*Something went wrong! Please try again later!'))
  }
}
function* sendReportSaga({ period, storeId, merchantId}) {
  try {
    let url = `${BASE_URL}reports/generate-order-sales-report&period=${period}&storeId=${storeId}&merchantId=${merchantId}`
    const result = yield call(request, url)
    if(result===true)
   {
      yield put(setReportPopupMsg({msg:"Report sent to the mail"}))
    }
   else
    { 
      yield put(setReportPopupMsg({msg:result.message}))
    }

  }
   catch (e) {
    console.log({ error: e })
  }
}
function* sendItemReportSaga({ period, storeId, merchantId}) {
  try {
    let url = `${BASE_URL}reports/generate-item-sales-report&period=${period}&storeId=${storeId}&merchantId=${merchantId}`
    const result = yield call(request, url)
    if(result===true)
   {
      yield put(setReportPopupMsg({msg:"Report sent to the mail"}))
    }
   else
    { 
      yield put(setReportPopupMsg({msg:result.message}))
    }
  }
   catch (e) {
    console.log({ error: e })
  }
}
export default function* planCheckoutWatcher() {
  yield takeLatest(GET_STORE_STATS, getStoreStatsSaga)
  yield takeLatest(UPDATE_CUSTOMER_BASE_TYPE, sendEmailSaga),
    yield takeLatest(GET_REPORT_ANALYTICS, getReportAnalyticsSaga),
    yield takeLatest(GET_GROUP_REPORT_ANALYTICS, getGroupReportAnalyticsSaga),
    yield takeLatest(GET_TOP_PRODUCTS, getTopProductsSaga)
  yield takeLatest(GET_GROUP_TOP_PRODUCTS, getGroupTopProductsSaga)
  yield takeLatest(SEND_REPORTS, sendReportSaga)
  yield takeLatest(SEND_ITEM_REPORTS, sendItemReportSaga)

}
