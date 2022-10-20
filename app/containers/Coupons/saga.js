import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setCoupons, setLoadingCoupon, createCoupons, setAllCouponTypes, setTotalCoupons } from './actions'
import {
  CREATE_COUPONS,
  GET_COUPONS,
  GET_ALL_COUPON_TYPES,
  DELETE_COUPONS,
  SET_COUPONS_STATUS,
  UPDATE_COUPONS,
  GET_TOTAL_COUPONS,
} from './constants'

const BASE_URL_COUPON = process.env.MARKETING_API_BASE_URL

function* getCouponsSaga({ storeId, pageNum }) {
  try {
    const url = `${BASE_URL_COUPON}marketing/get-all-coupons?storeId=${storeId}&page=${pageNum}`
    const data = yield call(request, url)
    yield put(setCoupons(data))
  } catch (err) {
    yield put(setLoadingCoupon(false))
  }
}

function* getAllCouponTypesSaga() {
  try {
    const url = `${BASE_URL_COUPON}marketing/get-all-coupon-types`
    const data = yield call(request, url)
    yield put(setAllCouponTypes(data))
  } catch (err) {
    console.log(err)
  }
}
function* createCouponsSaga({ storeId, couponData,pageNum }) {
  try {
    let store_id = storeId.storeId
    const params = {
      method: 'POST',
      body: JSON.stringify({ ...couponData }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL_COUPON}marketing/set-coupon?storeId=${store_id}`
    yield call(request, url, params)
    const data = yield call(request, `${BASE_URL_COUPON}marketing/get-all-coupons?storeId=${store_id}&page=${pageNum}`)
    yield put(setCoupons(data))
  } catch (e) {
    console.log({ error: e })
  }
}

function* updateCouponsSaga({ storeId, couponId, couponData }) {
  try {
    let store_id = storeId.storeId
    const params = {
      method: 'POST',
      body: JSON.stringify({ ...couponData }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = `${BASE_URL_COUPON}marketing/set-coupon?storeId=${store_id}&couponId=${couponId}`
    yield call(request, url, params)
  } catch (e) {
    console.log({ error: e })
  }
}

function* deleteCouponsSaga({ couponId, storeId, pageNum}) {
  try {
    const url = `${BASE_URL_COUPON}marketing/remove-coupon?couponId=${couponId}`
    yield call(request, url)
    const data = yield call(request, `${BASE_URL_COUPON}marketing/get-all-coupons?storeId=${storeId}&page=${pageNum}`)
    yield put(setCoupons(data))
  } catch (err) {
    console.log(err)
  }
}

function* changeCouponsStatusSaga({ couponId, couponStatus }) {
  try {
    const url = `${BASE_URL_COUPON}marketing/set-coupon-status?couponId=${couponId}&status=${couponStatus}`
    yield call(request, url)
  } catch (err) {
    console.log(err)
  }
}
function* getTotalCouponsInDB({ storeId }) {
  try {
    const url = `${BASE_URL_COUPON}marketing/get-coupon-count?storeId=${storeId}`
    const cnt = yield call(request, url)
    yield put(setTotalCoupons(cnt.count))
  } catch (err) {
    console.log(err)
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(GET_COUPONS, getCouponsSaga)
  yield takeLatest(DELETE_COUPONS, deleteCouponsSaga)
  yield takeLatest(GET_ALL_COUPON_TYPES, getAllCouponTypesSaga)
  yield takeLatest(CREATE_COUPONS, createCouponsSaga)
  yield takeLatest(SET_COUPONS_STATUS, changeCouponsStatusSaga)
  yield takeLatest(UPDATE_COUPONS, updateCouponsSaga)
  yield takeLatest(GET_TOTAL_COUPONS, getTotalCouponsInDB)
}
