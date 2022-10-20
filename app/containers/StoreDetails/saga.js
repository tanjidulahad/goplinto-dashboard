import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'

import { setPageSubmissionStatus, updateStoreDetails } from 'containers/App/actions'
import { GET_STORE_DETAILS, SET_STORE_DETAILS } from './constants'
import { getStoreDetails, setLoading, setStoreDesc, setStoreName, setStoreType } from './actions'
import capitalize from 'utils/capitalize'
import { getStoreDetailsAPI, setStoreDetailsAPI } from 'Endpoints'

function* getStoreDetailsSaga({ storeId }) {
  try {
    const url = getStoreDetailsAPI(storeId)
    const storeDetails = yield call(request, url)
    const { store_desc: storeDesc, store_name: storeName, store_type: storeType } = storeDetails
    yield put(setStoreName({ storeName }))
    yield put(setStoreDesc({ storeDesc }))
    if (storeType) {
      const usableStoreType = { value: storeType, label: capitalize(storeType) }
      yield put(setStoreType({ storeType: usableStoreType }))
    } else {
      yield put(setStoreType({ storeType: { label: 'Choose Store Type', value: 'NULL' } }))
    }
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateStoreDetailsSaga({ storeId, merchantId, storeName, storeDesc, storeType }) {
  try {
    yield put(setLoading({ boolean: true }))
    const url = setStoreDetailsAPI(storeId, merchantId, storeName, storeDesc, storeType)
    yield call(request, url)
    yield put(updateStoreDetails(storeName))
    yield put(setLoading({ boolean: false }))
  } catch (e) {
    yield put(setLoading(false))
    console.log({ error: e })
  }
}

export default function* storeDetailsWatcher() {
  yield takeLatest(GET_STORE_DETAILS, getStoreDetailsSaga)
  yield takeLatest(SET_STORE_DETAILS, updateStoreDetailsSaga)
}
