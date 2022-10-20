import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import {
  setCod,
  setConvenience,
  setConvenienceLoading,
  setInitialLoading,
  setOnline,
  showConvenienceStatus,
  getPaymentSettings,
  setConvenienceAmount
} from './actions'
import { APPLY_CONVENIENCE_CHARGE, GET_PAYMENT_CONFIG, SET_PAYMENT_MODE } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* setPaymentSaga({ storeId, merchantId, boolean, paymentType }) {
  try {
    const url = `${BASE_URL}stores/set-payment-configuration&storeId=${storeId}&merchantId=${merchantId}&paymentMode=${paymentType}&flagStatus=${boolean ? 'Y' : 'N'
      }`
    yield call(request, url)
    if (paymentType === 'COD') yield put(setCod({ boolean }))
    else yield put(setOnline({ boolean }))
  } catch (e) {
    console.log({ error: e })
  }
}

function* getPaymentConfigSaga({ storeId }) {
  try {
    const url = `${BASE_URL}stores/get-payment-configuration&storeId=${storeId}`
    const paymentDetails = yield call(request, url)
    const {
      is_cod_accepted: cod,
      is_payment_accepted: online,
      is_checkout_enabled: isCheckoutEnabled,
      convenienceChargeDetails,
      is_convenience_fee_charged: convenience,
    } = paymentDetails
    if (isCheckoutEnabled === 'Y') {
      yield put(setInitialLoading({ boolean: false }))
    } else yield put(setInitialLoading({ boolean: true }))
    if (convenienceChargeDetails.length && convenience) {
      yield put(setConvenience({ boolean: convenience === 'Y' ? true : false }))
      yield put(setConvenienceAmount(convenienceChargeDetails[0].convenience_charge))
    } else {
      yield put(setConvenience({ boolean: false }))
    }
    yield put(setCod({ boolean: cod === 'Y' ? true : false }))
    yield put(setOnline({ boolean: online === 'Y' ? true : false }))
  } catch (e) {
    console.log({ error: e })
  }
}

function* applyConvenienceChargeSaga({ storeId, flagStatus, convenienceFee }) {
  try {
    const url = `${BASE_URL}stores/set-convenience-charge-config&storeId=${storeId}&flagStatus=${flagStatus}&convenienceFee=${convenienceFee}`
    yield call(request, url)
    yield put(getPaymentSettings({ storeId }))

  } catch (e) {
    yield put(setConvenienceLoading({ boolean: false }))
    yield put(showConvenienceStatus({ boolean: false }))

    console.log({ error: e })
  }
}
export default function* paymentConfigWatcher() {
  yield takeLatest(SET_PAYMENT_MODE, setPaymentSaga)
  yield takeLatest(GET_PAYMENT_CONFIG, getPaymentConfigSaga)
  yield takeLatest(APPLY_CONVENIENCE_CHARGE, applyConvenienceChargeSaga)
}
