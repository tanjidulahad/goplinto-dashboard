import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setNotifications, setTotalNotifications, deleteNotification, setLoading } from './actions'
import { DELETE_NOTIFICATION_IN_DB, GET_NOTIFICATIONS, GET_TOTAL_NOTIFICATIONS } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getNotifications({ storeId, pageNum }) {
  try {
    const url = `${BASE_URL}marketing/get-notifications&storeId=${storeId}&pageNum=${pageNum}`
    const data = yield call(request, url)
    yield put(setNotifications(data))
  } catch (err) {
    yield put(setLoading(false))
  }
}

function* deleteNotificationInDB({ storeId, id }) {
  try {
    /* Put delete API req. URL here */
    // const url;
    // yield call(request, url)
    // yield put(deleteNotification(id))
  } catch (err) {
    console.log(err)
  }
}

function* getTotalNotifications({ storeId }) {
  try {
    const url = `${BASE_URL}marketing/get-notification-count&storeId=${storeId}`
    const cnt = yield call(request, url)
    yield put(setTotalNotifications(cnt))
  } catch (err) {
    console.log(err)
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(GET_NOTIFICATIONS, getNotifications)
  yield takeLatest(GET_TOTAL_NOTIFICATIONS, getTotalNotifications)
  yield takeLatest(DELETE_NOTIFICATION_IN_DB, deleteNotificationInDB)
}
