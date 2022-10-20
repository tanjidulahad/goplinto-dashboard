import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'

import {
  LOAD_INITIAL_DELIVERY_PICKUP_DATA,
  TOGGLE_DELIVERY_PICKUP_FLAGS,
  UPDATE_PICKUP_ADDRESS,
  UPDATE_DELIVERY_RATES,
  GET_STORE_ADDRESS,
} from './constants'
import {
  setInitialDataLoadError,
  setPickupPointError,
  startPickupAddressUpdate,
  setDeliveryChargeError,
  setDeliveryPickupData,
  toggleFlag,
  setPickupAddress,
  setDeliveryRates,
  setStoreAddress,
} from './actions'

const { DASHBOARD_SERVICE_BASE_URL } = process.env

export function* loadInitialData({ kind, storeId, merchantId }) {
  try {
    yield put(setInitialDataLoadError(kind, false))
    let requestURL
    if (kind === 'Delivery') {
      requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/get-delivery-configuration&storeId=${storeId}&merchantId=${merchantId}`
    } else {
      requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/get-store-pickup-point&storeId=${storeId}`
    }
    const response = yield call(request, requestURL)
    yield put(setDeliveryPickupData(kind, response))
  } catch (err) {
    yield put(setInitialDataLoadError(kind, true))
  }
}

export function* toggleFlags({ storeId, merchantId, flagType, flagValue }) {
  try {
    let requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/set-pickup-delivery-flags&storeId=${storeId}&merchantId=${merchantId}&flagType=${flagType}&flagValue=${flagValue}`
    yield call(request, requestURL)
    yield put(toggleFlag(flagType, flagValue))
  } catch (err) {
    console.log(`${flagType} Toggle Error!!`)
  }
}

export function* getStoreAddress({ storeId }) {
  try {
    let requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/get-store-details&storeId=${storeId}`
    const res = yield call(request, requestURL)
    yield put(setStoreAddress(res))
  } catch (err) {
    console.log('Error in fetching store address')
  }
}

export function* updateAddress({ storeId, merchantId, pickup_point_id, updatedAddress }) {
  try {
    yield put(startPickupAddressUpdate(true))
    yield put(setPickupPointError(false))
    let requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/set-store-pickup-point&storeId=${storeId}&merchantId=${merchantId}`
    if (pickup_point_id !== '') requestURL += `&pickupPointId=${pickup_point_id}`
    const params = yield {
      method: 'POST',
      body: JSON.stringify(updatedAddress),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    pickup_point_id = yield call(request, requestURL, params)
    const newAddress = { ...updatedAddress, pickup_point_id }
    yield put(setPickupAddress(newAddress))
  } catch (err) {
    yield put(setPickupPointError(true))
  }
}

export function* updateDeliveryRates({ storeId, merchantId, deliveryFee }) {
  try {
    let requestURL = `${DASHBOARD_SERVICE_BASE_URL}stores/set-delivery-charge-config&storeId=${storeId}&merchantId=${merchantId}&deliveryFee=${deliveryFee}`
    yield call(request, requestURL)
    yield put(setDeliveryRates(deliveryFee, storeId))
  } catch (err) {
    yield put(setDeliveryChargeError(true))
  }
}

export default function* deliveryPickupSagaWatcher() {
  yield takeEvery(LOAD_INITIAL_DELIVERY_PICKUP_DATA, loadInitialData)
  yield takeLatest(TOGGLE_DELIVERY_PICKUP_FLAGS, toggleFlags)
  yield takeLatest(GET_STORE_ADDRESS, getStoreAddress)
  yield takeLatest(UPDATE_PICKUP_ADDRESS, updateAddress)
  yield takeLatest(UPDATE_DELIVERY_RATES, updateDeliveryRates)
}
