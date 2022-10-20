import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setCurrentSubscriptionPlan } from './actions'
import { GET_CURRENT_SUBSCRIPTION_PLAN, SET_PLAN } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getCurrentSubcriptionPlanSaga({ storeId }) {
  try {
    const url = `${BASE_URL}subscriptions/get-subscription-details&storeId=${storeId}`
    const subscriptionPlan = yield call(request, url)
    yield put(setCurrentSubscriptionPlan({ subscriptionPlan }))
  } catch (e) {
    console.log({ error: e })
  }
}
function* setPlanSaga({ merchantDetails, merchantId, storeId }) {
  try {
    const body = {
      name: merchantDetails.fullName,
      plan: merchantDetails.plan,
      phone: merchantDetails.phone,
      email: merchantDetails.email,
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL}dashboard/notify-payment&storeId=${storeId}&merchantId=${merchantId}`
    yield call(request, url, params)
  } catch (e) {
    console.log({ error: e })
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(GET_CURRENT_SUBSCRIPTION_PLAN, getCurrentSubcriptionPlanSaga)
  yield takeLatest(SET_PLAN, setPlanSaga)
}
