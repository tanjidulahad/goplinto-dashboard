import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { getTaxes, setTaxes } from './actions'
import { GET_TAXES, UPDATE_TAX } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getTaxesSaga({ storeId }) {
  try {
    const url = `${BASE_URL}stores/get-item-tax-config&storeId=${storeId}`
    const taxes = yield call(request, url)
    yield put(setTaxes({ taxes }))
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateTaxSaga({ storeId, taxCode, taxRate, taxDesc, edit }) {
  const createUrl = `${BASE_URL}stores/add-item-tax-config&storeId=${storeId}&itemTaxCode=${taxCode}&taxRate=${taxRate}${
    !taxDesc ? `&taxDesc=null` : `&taxDesc=${encodeURIComponent(taxDesc)}`
  }`
  const updateUrl = `${BASE_URL}stores/update-item-tax-config&storeId=${storeId}&itemTaxCode=${taxCode}&taxRate=${taxRate}${
    !taxDesc ? `&taxDesc=null` : `&taxDesc=${encodeURIComponent(taxDesc)}`
  }`
  if (edit) {
    yield call(request, createUrl)
  } else {
    yield call(request, updateUrl)
  }
  yield put(getTaxes({ storeId }))
}

export default function* storeTaxWatcher() {
  yield takeLatest(GET_TAXES, getTaxesSaga)
  yield takeLatest(UPDATE_TAX, updateTaxSaga)
}
