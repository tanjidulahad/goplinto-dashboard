import { getBankDetailsAPI, setBankDetailsAPI } from 'Endpoints'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setBankName, setAccountNo, setAccountName, setBranch, setIfscCode } from './actions'
import { GET_BANK_DETAILS, SET_BANK_DETAILS } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getBankDetailsSaga({ storeId, merchantId }) {
  try {
    const url = getBankDetailsAPI(storeId,merchantId)
    const bankInfo = yield call(request, url)
    const latestBankDetails = bankInfo[bankInfo.length - 1]
    const {
      account_no: accountNo,
      account_name: accountName,
      bank_name: bankName,
      branch,
      IFSC: ifscCode,
    } = latestBankDetails
    yield put(setBankName({ bankName }))
    yield put(setAccountNo({ accountNo }))
    yield put(setAccountName({ accountName }))
    yield put(setBranch({ branch }))
    yield put(setIfscCode({ ifscCode }))
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateBankDetailsSaga({ storeId, merchantId, bankName, accountName, accountNo, ifscCode, branch }) {
  try {
    const body = {
      bankName,
      acctNo: accountNo,
      acctName: accountName,
      ifsc: ifscCode,
      branch,
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const url = setBankDetailsAPI(storeId, merchantId)

    yield call(request, url, params)
  } catch (e) {
    console.log({ error: e })
  }
}

export default function* bankInfoWatcher() {
  yield takeLatest(GET_BANK_DETAILS, getBankDetailsSaga)
  yield takeLatest(SET_BANK_DETAILS, updateBankDetailsSaga)
}
