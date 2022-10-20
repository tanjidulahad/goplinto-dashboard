import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setAllItems, setLoading, setPaginationProduct, setWidgetStatusForBS } from './action'
import { GET_ALL_ITEMS, DELETE_ITEM, ADD_ITEM_BEST_SELLER, GET_ALL_PRODUCTS, GET_WIDGET_STATUS } from './constants'
const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
const BASE_BEST_SELLER_URL = process.env.MARKETING_API_BASE_URL

function* getItemsSaga({ storeId }) {
  try {
    const url = `${BASE_BEST_SELLER_URL}widgets/get-best-sellers?storeId=${storeId}`
    const items = yield call(request, url)
    yield put(setAllItems(items))
  } catch (err) {
    console.log({ error: e })
  }
}

function* addItemsToBestSeller(action) {
  const { storeId, itemIds } = action
  const body = { itemIds: itemIds }
  try {
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const url = `${BASE_BEST_SELLER_URL}widgets/add-item-to-bestsellers?storeId=${storeId}`
    yield call(request, url, params)
    const url2 = `${BASE_BEST_SELLER_URL}widgets/get-best-sellers?storeId=${storeId}`
    const items = yield call(request, url2)
    yield put(setAllItems(items))
    
  } catch (e) {
    console.log({ error: e })
  }
}

function* deleteItem({ itemId, storeId }) {
  try {
    const url = `${BASE_BEST_SELLER_URL}widgets/remove-best-seller-item?itemId=${itemId}&storeId=${storeId}`
    yield call(request, url)
    const url2 = `${BASE_BEST_SELLER_URL}widgets/get-best-sellers?storeId=${storeId}`
    const items = yield call(request, url2)
    yield put(setAllItems(items))
  } catch (err) {
    console.log(err)
  }
}

export function* getItemsPaginated({ storeId }) {
  yield put(setLoading(true))
  try {
    const url = `${BASE_URL}catalog/get-items&storeId=${storeId}&pageNum=1&categoryId=&subCategoryId=`
    const items = yield call(request, url)
    yield put(setPaginationProduct(items))
    yield put(setLoading(false))
  } catch (err) {
    console.log(err)
  }
}

function* getWidgetStatus({ storeId }) {
  try {
    const url = `${BASE_BEST_SELLER_URL}widgets/get-widget-details-for-store?storeId=${storeId}&widgetId=1`
    const widgetStatus = yield call(request, url)
    if (widgetStatus.widget_status == 'ACTIVE') {
      yield put(setWidgetStatusForBS(true))
    } else if (widgetStatus.widget_status == 'INACTIVE') {
      yield put(setWidgetStatusForBS(false))
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(GET_ALL_ITEMS, getItemsSaga)
  yield takeLatest(DELETE_ITEM, deleteItem)
  yield takeLatest(ADD_ITEM_BEST_SELLER, addItemsToBestSeller)
  yield takeLatest(GET_ALL_PRODUCTS, getItemsPaginated)
  yield takeLatest(GET_WIDGET_STATUS, getWidgetStatus)
}
