import { SET_BANK_FOR_STORE } from 'containers/App/constants'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_BANK_INFO, SUBMIT_BANK_INFO } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* submitBankInformationFlow(action) {
  const { merchantId, storeId, bankName, accountName: acctName, accountNumber: acctNo, ifscCode: ifsc, branch } = action
  try {
    const reqBody = {
      bankName,
      acctName,
      acctNo,
      ifsc,
      branch,
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, `${BASE_URL}stores/set-bank-details&storeId=${storeId}&merchantId=${merchantId}`, params)
  } catch (e) {
    /* handle error */
    console.log({ error: e })
  }
}

function* getBankInformationFlow(action) {
  const { storeId, merchantId } = action
  try {
    const bank = yield call(request, `${BASE_URL}stores/get-bank-details&storeId=${storeId}&merchantId=${merchantId}`)
    if (bank.length === 0) {
      yield put({ type: SET_BANK_FOR_STORE, bank: {} })
    } else yield put({ type: SET_BANK_FOR_STORE, bank: bank.slice(-1)[0] })
  } catch (e) {
    /* handle error */
    console.log({ error: e })
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homePageSaga() {
  yield takeLatest(SUBMIT_BANK_INFO, submitBankInformationFlow)
  yield takeLatest(GET_BANK_INFO, getBankInformationFlow)
}
