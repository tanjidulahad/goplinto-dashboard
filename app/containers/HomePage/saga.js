import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setStoreForMerchant, setStoreGroupDetails } from 'containers/App/actions'
import { setSubscriptionPlan } from 'containers/CheckoutPage/actions'
import { setOnBoardProgress } from 'containers/OnBoardStore/actions'
import { GET_STORE, UPDATE_STORE, CREATE_STORE, GET_STORE_GROUP_DETAILS } from './constants'

import { getStoreData, setStore } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* updateStoreFlow(action) {
  const { storeData: storeDetails, merchantId, storeId } = action
  try {
    const storeParams = {
      method: 'POST',
      body: JSON.stringify(storeDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    yield call(request, `${BASE_URL}stores/set-store-details&storeId=${storeId}&merchantId=${merchantId}`, storeParams)
  } catch (e) {
    console.error(e)
  }
}

function* createStoreFlow(action) {
  const { merchantId, storeName, storeType, storeDesc, clientId } = action
  const url = clientId
    ? `${BASE_URL}stores/create-store&merchantId=${merchantId}&storeName=${storeName}&storeDesc=${storeDesc}&storeType=${storeType}&partner=${clientId}`
    : `${BASE_URL}stores/create-store&merchantId=${merchantId}&storeName=${storeName}&storeDesc=${storeDesc}&storeType=${storeType}`
  try {
    const storeId = yield call(request, url, {})
    const planDetails = {
      planName: 'BASIC',
      planId: '1',
      subscriptionPeriod: 'MONTHLY',
      amount: '0.00',
    }
    yield put(setOnBoardProgress('IN_PROGRESS_2', storeId, merchantId))
    yield put(setStore(storeId))
    yield put(getStoreData(storeId))
    yield put(setSubscriptionPlan({ planDetails, storeId }))
  } catch (e) {
    console.error(e)
  }
}

function* getStoreFlow(action) {
  const { storeId } = action
  try {
    const store = yield call(request, `${BASE_URL}stores/get-store-details&storeId=${storeId}`)
    yield put(setStoreForMerchant(store))
  } catch (e) {
    console.error(e)
  }
}
function* getStoreGroupDetailsSaga({ groupId }) {
  try {
    const url = `${BASE_URL}store-group/get-store-group-details&groupId=${groupId}`
    const storeGroupDetails = yield call(request, url)
    yield put(setStoreGroupDetails({ storeGroupDetails }))
  } catch (e) {
    console.log({ error: e })
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* homePageSaga() {
  yield takeLatest(GET_STORE_GROUP_DETAILS, getStoreGroupDetailsSaga)
  yield takeLatest(UPDATE_STORE, updateStoreFlow)
  yield takeLatest(CREATE_STORE, createStoreFlow)
  yield takeLatest(GET_STORE, getStoreFlow)
}
