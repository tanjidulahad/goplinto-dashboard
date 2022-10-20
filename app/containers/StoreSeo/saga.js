import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'

import { setPageSubmissionStatus } from 'containers/App/actions'
import { GET_SEO_DETAILS, SET_SEO_DETAILS } from './constants'
import { getSeoDetails, setLoading, setErrorMessage, setSeoDesc, setSeoTitle, setSeoTags } from './actions'
import capitalize from 'utils/capitalize'
import { getStoreSeoAPI, setStoreSeoAPI } from 'Endpoints'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getSeoDetailsSaga({ storeId }) {
  try {
    const url = getStoreSeoAPI(storeId)

    const seoDetails = yield call(request, url)

    if (seoDetails) {
      const { seo_desc: seoDesc, seo_title: seoTitle, seo_tags: seoTags } = seoDetails
      if(seoDesc)
      {
      yield put(setSeoDesc({ seoDesc }))
      }
      if(seoTitle)
      {
      yield put(setSeoTitle({ seoTitle }))
      }
      yield put(setSeoTags({ seoTags }))
    }
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateSeoDetailsSaga({ storeId, merchantId, seoTitle, seoDesc, seoTags }) {
  try {
    const body = {
      seoTitle: seoTitle,
      seoDesc: seoDesc,
      seoTags: seoTags

    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    yield put(setLoading({ boolean: true }))
    yield put(setErrorMessage({ boolean: false }))
    const url = setStoreSeoAPI(storeId,merchantId)
    yield call(request, url, params)
    yield put(setLoading({ boolean: false }))
    yield put(setErrorMessage({ boolean: false }))
  } catch (e) {
    yield put(setLoading({ boolean: false }))
    yield put(setErrorMessage({ boolean: true }))
    console.log({ error: e })
  }
}

export default function* seoDetailsWatcher() {
  yield takeLatest(GET_SEO_DETAILS, getSeoDetailsSaga)
  yield takeLatest(SET_SEO_DETAILS, updateSeoDetailsSaga)
}
