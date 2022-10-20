import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setCategories, setPaginationProduct, setLoading, setPaginationCount, resetProducts } from './actions'
import { CREATE_NOTIFICATION, GET_CATEGORIES, GET_PAGINATION_PRODUCT, GET_PAGINATION_COUNT } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
export function* getPaginationPageCount(action) {
  const { storeId } = action
  try {
    yield put(resetProducts([]))
    const pages = yield call(request, `${BASE_URL}catalog/get-page-count&storeId=${storeId}`)
    yield put(setPaginationCount(pages))
  } catch (e) {
    console.log({ e })
  }
}

export function* getItemsPaginated(action) {
  const { storeId, pageNum } = action
  yield put(setLoading(true))
  try {
    const items = yield call(
      request,
      `${BASE_URL}catalog/get-items&storeId=${storeId}&pageNum=${pageNum}&categoryId=&subCategoryId=`,
    )
    yield put(setPaginationProduct(items))
    yield put(setLoading(false))
  } catch (e) {
    console.log({ e })
  }
}

export function* getCategoriesFlow(action) {
  const { storeId } = action
  try {
    const categories = yield call(request, `${BASE_URL}catalog/get-categories&storeId=${storeId}`, {})
    yield put(setCategories(categories))
  } catch (e) {
    console.error(e)
  }
}

export default function* createNotificationWatcher() {
  yield takeLatest(GET_CATEGORIES, getCategoriesFlow),
    yield takeLatest(GET_PAGINATION_PRODUCT, getItemsPaginated),
    yield takeLatest(GET_PAGINATION_COUNT, getPaginationPageCount)
}
