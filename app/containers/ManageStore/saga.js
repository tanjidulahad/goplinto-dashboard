import { call, put, takeLatest, all } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_STORES_BY_GROUP } from './constants'
import { setStores } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getStoresByGroupId({ groupId }) {
  try {
    const url = `${BASE_URL}store-group/get-stores-by-group-id&groupId=${groupId}`
    const stores = yield call(request, url)
    yield put(setStores(stores))
  } catch (e) {
    console.log({ error: e })
  }
}

export default function* planCheckoutWatcher() {
  yield takeLatest(GET_STORES_BY_GROUP, getStoresByGroupId)
}
