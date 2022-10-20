import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setCreateNotificationError, createNotificationStatus } from './actions'
import { CREATE_NOTIFICATION } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* createNotification({ storeId, merchantId, data }) {
  try {
    yield put(createNotificationStatus('IN_PROGRESS'))
    yield put(setCreateNotificationError(false))
    const params = {
      method: 'POST',
      body: JSON.stringify({ ...data, duration: {} }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL}marketing/save-notification&storeId=${storeId}&merchantId=${merchantId}`
    yield call(request, url, params)
    yield put(createNotificationStatus('DONE'))
  } catch (error) {
    yield put(setCreateNotificationError(true))
  }
}

export default function* createNotificationWatcher() {
  yield takeLatest(CREATE_NOTIFICATION, createNotification)
}
