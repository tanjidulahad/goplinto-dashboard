import { call, takeLatest, put } from 'redux-saga/effects'
import request from 'utils/request'
import { setOnboardProgress } from 'containers/App/actions'
import { TOGGLE_STORE, UPDATE_BOARD_PROGRESS } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* toggleStoreFlow({ storeId, isOpen }) {
  try {
    yield call(request, `${BASE_URL}stores/set-open-close&storeId=${storeId}&isOpen=${isOpen ? 'Y' : 'N'}`, {})
  } catch (error) {
    /* handle error */
    console.error({ error })
  }
}

function* setStoreOnBoardProgressFlow({ progress, storeId, merchantId }) {
  try {
    yield call(
      request,
      `${BASE_URL}stores/set-store-onboard-status&merchantId=${merchantId}&storeId=${storeId}&onboardStatus=${progress}`,
      {},
    )
    yield put(setOnboardProgress(progress))
  } catch (error) {
    /* handle error */
    console.error({ error })
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* storeInfoSaga() {
  yield takeLatest(TOGGLE_STORE, toggleStoreFlow)
  yield takeLatest(UPDATE_BOARD_PROGRESS, setStoreOnBoardProgressFlow)
}
