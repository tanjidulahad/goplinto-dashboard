import { setShowWidgetNewArrival } from 'containers/AddOns/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setAllItems, setLoading, setPaginationProduct } from './action'
import { GET_ALL_ITEMS, DELETE_ITEM, ADD_ITEM_NEW_ARRIVALS, GET_ALL_PRODUCTS, GET_NEW_ARRIVAL_STATUS } from './constants'
const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
const BASE_NEW_ARRIVAL_URL = process.env.MARKETING_API_BASE_URL
function* getItemsSaga({ storeId }) {
  try {
    const url = `${BASE_NEW_ARRIVAL_URL}widgets/get-new-arrivals?storeId=${storeId}`
    const items = yield call(request, url)
    yield put(setAllItems(items))
  } catch (err) {
    console.log({ error: e })
  }
}

function* addItemsToNewArrivals(action) {
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
    const url = `${BASE_NEW_ARRIVAL_URL}widgets/add-item-to-new-arrivals?storeId=${storeId}`
    const res = yield call(request, url, params)
    if(res){
      const url = `${BASE_NEW_ARRIVAL_URL}widgets/get-new-arrivals?storeId=${storeId}`
      const items = yield call(request, url)
      yield put(setAllItems(items))
    }
  } catch (e) {
    console.log({ error: e })
  }
}

function* deleteItem({ itemId, storeId }) {
  try {
    const url = `${BASE_NEW_ARRIVAL_URL}widgets/remove-new-arrival-item?itemId=${itemId}&storeId=${storeId}`
    const res = yield call(request, url)
    if(res){
      const url = `${BASE_NEW_ARRIVAL_URL}widgets/get-new-arrivals?storeId=${storeId}`
      const items = yield call(request, url)
      yield put(setAllItems(items))
    }
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
function* getWidgetStatusForNewArrivals({ storeId }) {
  try {
    const url = `${BASE_NEW_ARRIVAL_URL}widgets/get-widget-details-for-store?storeId=${storeId}&widgetId=2`
    const widgetStatus = yield call(request, url)
    if (widgetStatus.widget_status == 'ACTIVE') {
      yield put(setShowWidgetNewArrival(true))
    } else if (widgetStatus.widget_status == 'INACTIVE') {
      yield put(setShowWidgetNewArrival(false))
    }
  } catch (err) {
    console.log({ error: err })
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(GET_ALL_ITEMS, getItemsSaga)
  yield takeLatest(DELETE_ITEM, deleteItem)
  yield takeLatest(ADD_ITEM_NEW_ARRIVALS, addItemsToNewArrivals)
  yield takeLatest(GET_ALL_PRODUCTS, getItemsPaginated)
  yield takeLatest(GET_NEW_ARRIVAL_STATUS, getWidgetStatusForNewArrivals)
}
