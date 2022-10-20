import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setAllWidgets} from './actions'
import {
  LIST_ALL_WIDGETS,
  SET_WIDGET_STATUS,
} from './constants'
const MARKETING_API_BASE_URL = process.env.MARKETING_API_BASE_URL
function* listAllWidgets() {
  try {
    const url = `${MARKETING_API_BASE_URL}widgets/get-goplinto-widgets`
    const widgets = yield call(request, url)
    yield put(setAllWidgets(widgets))
  } catch (err) {
    console.log({ error: e })
  }
}

function* setWidgetStatus({ storeId, widgetId, widgetStatus, merchantId }) {
  try {
    const url = `${MARKETING_API_BASE_URL}widgets/set-widget-status?storeId=${storeId}&widgetId=${widgetId}&merchantId=${merchantId}&widgetStatus=${widgetStatus}`
    yield call(request, url)
  } catch (err) {
    console.log(err)
  }
}

export default function* paymentPlanWatcher() {
  yield takeLatest(LIST_ALL_WIDGETS, listAllWidgets)
  yield takeLatest(SET_WIDGET_STATUS, setWidgetStatus)
}
