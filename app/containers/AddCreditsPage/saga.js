import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { SET_CREDIT_NUMBERS } from './constants'
import { setCreditPricing, getCreditNumbers } from './actions'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* setCreditNumbersSaga({storeId,merchantId }) {
    try {
        const url = `${BASE_URL}marketing/get-merchant-wallet-details&merchantId=${merchantId}&storeId=${storeId}`

        const creditNumbersDetails = yield call(request, url)
        
        yield put(getCreditNumbers({creditNumbersDetails}))

        const url2 = `${BASE_URL}marketing/get-credits-pricing`
        const creditPricingDetails = yield call(request, url2)
        yield put(setCreditPricing({ creditPricing: creditPricingDetails }))

    } catch (e) {
        console.log({ error: e })
    }
}

export default function* creditDetailsWatcher() {
    yield takeLatest(SET_CREDIT_NUMBERS, setCreditNumbersSaga)
}