import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import { GET_CURRENT_ORDERS, UPDATE_ORDER_DETAILS, GET_MORE_CURRENT_ORDERS } from './constants'
import request from 'utils/request'
import {
  getCurrentOrders,
  setLoading,
  setOutForDeliveryOrders,
  setPreparingOrders,
  setNewOrders,
  hasMore,
  getMoreCurrentOrders,
  setShowLoaderCard,
} from './actions'

import enums from 'utils/orderStatusEnums'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getCurrentOrdersFlow({ storeId, status, pageNumber }) {
  if (status === 'ALL')
    try {
      yield put(setShowLoaderCard(true))
      const neworders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=NEW_ORDERS&pageNum=${pageNumber}`,
        {},
      )
      yield put(setNewOrders(neworders))
      const preorders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=PREPARING_ORDERS&pageNum=${pageNumber}`,
        {},
      )
      yield put(setPreparingOrders(preorders))
      yield put(setShowLoaderCard(false))
      const orders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=OUT_FOR_DELIVERY&pageNum=${pageNumber}`,
        {},
      )
      yield put(setOutForDeliveryOrders(orders))
    } catch (e) {
      console.log({ e })
    }
}
function* getMoreCurrentOrdersFlow({ storeId, status, pageNumber }) {
  if (status === 'NEW_ORDERS') {
    yield put(setLoading(true))
    try {
      const orders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=${status}&pageNum=${pageNumber}`,
        {},
      )
      if (orders.length >= 1) {
        yield put(hasMore(true))
        yield put(setNewOrders(orders))
      } else {
        yield put(hasMore(false))
      }
      yield put(setLoading(false))
    } catch (e) {
      yield put(setLoading(false))
      console.log({ e })
    }
  }
  if (status === 'PREPARING_ORDERS') {
    yield put(setLoading(true))
    try {
      const orders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=${status}&pageNum=${pageNumber}`,
        {},
      )
      if (orders.length >= 1) {
        yield put(hasMore(true))
        yield put(setPreparingOrders(orders))
      } else {
        yield put(hasMore(false))
      }
      yield put(setLoading(false))
    } catch (e) {
      yield put(setLoading(false))
      console.log({ e })
    }
  }
  if (status === 'OUT_FOR_DELIVERY') {
    yield put(setLoading(true))
    try {
      const orders = yield call(
        request,
        `${BASE_URL}manage-orders/get-current-orders-by-store-id&storeId=${storeId}&orderStatusGroup=${status}&pageNum=${pageNumber}`,
        {},
      )
      if (orders.length >= 1) {
        yield put(hasMore(true))
        yield put(setOutForDeliveryOrders(orders))
      } else {
        yield put(hasMore(false))
      }
      yield put(setLoading(false))
    } catch (e) {
      yield put(setLoading(false))
      console.log({ e })
    }
  }
}

function* updateOrderDetails({ orderId, status, storeId, currentPageStatus, pageNumber }) {
  try {
    yield put(setLoading(true))
    yield call(request, `${BASE_URL}manage-orders/update-order-status&orderId=${orderId}&orderStatus=${status}`)
    yield delay(2000)
    yield put(setLoading(false))
    if (currentPageStatus === 'ALL') {
      yield put(getCurrentOrders(storeId, currentPageStatus, pageNumber))
    } else {
      yield put(getMoreCurrentOrders(storeId, currentPageStatus, pageNumber))
    }
  } catch (e) {
    console.log({ e })
    yield put(setLoading(false))
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* currentOrdersSaga() {
  yield takeLatest(GET_CURRENT_ORDERS, getCurrentOrdersFlow)
  yield takeLatest(GET_MORE_CURRENT_ORDERS, getMoreCurrentOrdersFlow)
  yield takeEvery(UPDATE_ORDER_DETAILS, updateOrderDetails)
}
