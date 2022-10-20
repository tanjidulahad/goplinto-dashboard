import de from 'react-intl/locale-data/de'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { SET_SUBSCRIPTION_PLAN, SET_MERCHANT_DETAILS, GET_STORE_MODULES } from './constants'
import { setMerchantAddressId, setStoreModules } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* setSubscriptionPlanSaga({ planDetails, storeId }) {
  try {
    let body
    body =
      planDetails.planName === 'BASIC'
        ? {
            externalPaymentId: null,
            externalSubscriptionId: null,
            externalPlanId: null,
            razorpaySignature: null,
            amount: planDetails.amount,
            subscriptionPlan: planDetails.planName,
            subscriptionPlanId: planDetails.planId,
            subscriptionPeriod: planDetails.subscriptionPeriod,
            externalSubscriptionPaymentDetails: {},
          }
        : {
            externalPaymentId: planDetails.externalPaymentId,
            externalSubscriptionId: planDetails.externalSubscriptionId,
            externalPlanId: planDetails.externalPlanId,
            razorpaySignature: planDetails.razorpaySignature,
            amount: planDetails.amount,
            subscriptionPlan: planDetails.subscriptionPlan,
            subscriptionPlanId: planDetails.subscriptionPlanId,
            subscriptionPeriod: planDetails.subscriptionPeriod,
            merchantAddressId: planDetails.merchantAddressId,
            externalSubscriptionPaymentDetails: {},
          }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL}subscriptions/set-store-subscription-plan&storeId=${storeId}`
    yield call(request, url, params)

    if (planDetails.planName === 'BASIC')
      var storeModuleUrl = `${BASE_URL}dashboard/generate-store-module-status-records&storeId=${storeId}`
    else
      var storeModuleUrl = `${BASE_URL}dashboard/upgrade-store-module-status-by-plan&storeId=${storeId}&planName=${
        planDetails.subscriptionPlan
      }`
    yield call(request, storeModuleUrl)
  } catch (e) {
    console.log({ error: e })
  }
}
function* setMerchantDetailsSaga({ merchantDetails, merchantId, storeId }) {
  try {
    const body = {
      merchantAddressDetails: {
        full_name: merchantDetails.fullName,
        phone: merchantDetails.phone,
        address: merchantDetails.address,
        city: merchantDetails.city,
        state: merchantDetails.state,
        country: merchantDetails.country,
        zip_code: merchantDetails.zipCode,
        address_tag: null,
        is_default: 'N',
        company_name: null,
        legal_tax_id: null,
      },
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL}merchant/set-merchant-address&merchantId=${merchantId}&storeId=${storeId}`

    const merchantAddressId = yield call(request, url, params)
    yield put(setMerchantAddressId(merchantAddressId))
  } catch (e) {
    console.log({ error: e })
  }
}
function* getStoreModulesSaga({ storeId,roleId }) {
  try {
    const url = roleId?
      `${BASE_URL}subscriptions/get-store-modules&storeId=${storeId}&roleId=${roleId}`    
      :`${BASE_URL}subscriptions/get-store-modules&storeId=${storeId}`
    const storeModules = yield call(request, url)
    yield put(setStoreModules({ storeModules }))
  } catch (e) {
    console.log({ error: e })
  }
}
export default function* planCheckoutWatcher() {
  yield takeLatest(GET_STORE_MODULES, getStoreModulesSaga)
  yield takeLatest(SET_SUBSCRIPTION_PLAN, setSubscriptionPlanSaga)
  yield takeLatest(SET_MERCHANT_DETAILS, setMerchantDetailsSaga)
}
