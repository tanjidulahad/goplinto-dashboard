import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { GET_ONBOARDING_STATUS, GET_STORE_STATS, GET_STORE_MODULE_STATS } from './constants'
import { setOnboardingStatus, setStoreStats, setStoreModuleStats } from './actions'
import { getOnBoardingStatusAPI, getModulesStatusAPI, getStoreStatusAPI } from "../../Endpoints"

function* getOnboardingStatusSaga({ storeId }) {
  try {
    const url = getOnBoardingStatusAPI(storeId);
    const onboardingStatus = yield call(request, url)
    yield put(setOnboardingStatus(onboardingStatus))
  } catch (e) {
    console.log({ error: e })
  }
}
function* getStoreStatsSaga({ level, id, startDate, endDate }) {
  try {
    const url=getStoreStatusAPI(level, id, startDate, endDate);
    const storeStats = yield call(request, url)
    yield put(setStoreStats(storeStats))
  } catch (e) {
    console.log({ error: e })
  }
}
function* getStoreModuleStatsSaga({ storeId }) {
  try {
    const url = getModulesStatusAPI(storeId)
    const storeModuleStats = yield call(request, url)
    yield put(setStoreModuleStats(storeModuleStats))
  } catch (e) {
    console.log({ error: e })
  }
}
export default function* planCheckoutWatcher() {
  yield takeLatest(GET_ONBOARDING_STATUS, getOnboardingStatusSaga)
  yield takeLatest(GET_STORE_STATS, getStoreStatsSaga)
  yield takeLatest(GET_STORE_MODULE_STATS, getStoreModuleStatsSaga)
}
