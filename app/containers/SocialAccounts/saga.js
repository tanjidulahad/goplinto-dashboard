import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'

import { setSocialAccounts } from './actions'
import { FETCH_SOCIAL_ACCOUNTS, SET_SOCIAL_ACCOUNTS_IN_DB } from './constants'
import { getSocialAccounts } from './actions'
import { getSocialAccountsAPI, setSocialAccountsAPI } from 'Endpoints'

function* getSocialAccountsSaga({ storeId }) {
  try {
    const url = getSocialAccountsAPI(storeId)
    const socialAccounts = yield call(request, url)
    yield put(setSocialAccounts(socialAccounts))
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateSocialAccountsSaga({ social, storeId, merchantId }) {

  try {
    const storeParams = {
      method: 'POST',
      body: JSON.stringify(social),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const result = yield call(
      request,
      setSocialAccountsAPI(storeId,merchantId),
      storeParams,
    )
    if (result) {
      yield put(getSocialAccounts(storeId))
    }
  } catch (e) {
    console.log({ error: e })
  }
}

export default function* storeSocialAccountsWatcher() {
  yield takeLatest(FETCH_SOCIAL_ACCOUNTS, getSocialAccountsSaga)
  yield takeLatest(SET_SOCIAL_ACCOUNTS_IN_DB, updateSocialAccountsSaga)
}
