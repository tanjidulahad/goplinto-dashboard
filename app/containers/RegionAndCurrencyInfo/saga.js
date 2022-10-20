import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_STORE_REGION_DETAILS, SET_STORE_REGION_DETAILS, GET_ALL_COUNTRY_DETAILS } from './constants'
import { setStoreCountry,setStoreCurrency,setStoreTimezone,setLoading,setAllCountryDetails, setStoreCurrencySymbol} from './actions'
import { getNewCountryDetailsAPI, getStoreDetailsAPI, updateRegionSettingsAPI } from 'Endpoints'

function* getStoreRegionDetailsSaga({ storeId }) {
    try {
        const url = getStoreDetailsAPI(storeId)
        const storeRegionDetails = yield call(request, url)
        const { country: storeCountry, currency_code: storeCurrencyCode, region_timezone: storeTimezone, currency_symbol } = storeRegionDetails
        yield put(setStoreCountry({ storeCountry }))
        yield put(setStoreCurrency({ storeCurrencyCode }))
        yield put(setStoreTimezone({ storeTimezone }))
        yield put(setStoreCurrencySymbol({ currency_symbol }))
    } catch (e) {
        console.log({ error: e })
    }
}

function* setStoreRegionDetailsSaga({ storeId, storeCountry, storeCurrencyCode, storeTimezone }) {
    try {
        yield put(setLoading({ boolean: true }))
        const url = updateRegionSettingsAPI(storeId, storeCountry, storeCurrencyCode, storeTimezone)
        yield call(request, url)
        yield put(setLoading({ boolean: false }))
    } catch (e) {
        yield put(setLoading(false))
        console.log({ error: e })
    }
}

function* getAllCountryDetailsSage() {
    try {
        const url = getNewCountryDetailsAPI();
        const allCountryDetails=yield call(request, url)
        yield put(setAllCountryDetails({ allCountryDetails}))
    } catch (e) {
        yield put(setLoading(false))
        console.log({ error: e })
    }
}

export default function* storRegioneDetailsWatcher() {
    yield takeLatest(GET_STORE_REGION_DETAILS, getStoreRegionDetailsSaga)
    yield takeLatest(SET_STORE_REGION_DETAILS, setStoreRegionDetailsSaga)
    yield takeLatest(GET_ALL_COUNTRY_DETAILS, getAllCountryDetailsSage)
}