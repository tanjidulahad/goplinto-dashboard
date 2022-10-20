import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setPastOrders, setDeliveredOrders, setCancelledOrders, hasMore } from './actions'
import { setError, setErrorMessage } from '../Reports/actions'
import { GET_PAST_ORDERS, SEND_REPORT } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getPastOrdersFlow({ storeId, status, startDateEpoch, endDateEpoch, pageNumber }) {
    try {
        if (storeId.status === 'ALL') {
            const deliveredOrders = yield call(
                request,
                `${BASE_URL}manage-orders/get-past-orders-by-store-id&storeId=${storeId.storeId}&orderStatusGroup=COMPLETED&startTime=${storeId.startDateEpoch}&endTime=${storeId.endDateEpoch}&pageNum=1`,
                {},
            )
            yield put(setDeliveredOrders(deliveredOrders))
            const cancelledOrders = yield call(
                request,
                `${BASE_URL}manage-orders/get-past-orders-by-store-id&storeId=${storeId.storeId}&orderStatusGroup=CANCELLED&startTime=${storeId.startDateEpoch}&endTime=${storeId.endDateEpoch}&pageNum=1`,
                {},
            )
            yield put(setCancelledOrders(cancelledOrders))
        } else {
            if (storeId.status === "DELIVERED") {
                const deliveredOrders = yield call(
                    request,
                    `${BASE_URL}manage-orders/get-past-orders-by-store-id&storeId=${storeId.storeId}&orderStatusGroup=COMPLETED&startTime=${storeId.startDateEpoch}&endTime=${storeId.endDateEpoch}&pageNum=${storeId.pageNumber}`,
                    {},
                )
                deliveredOrders.length >= 1 ? yield put(hasMore(true))
                    : yield put(hasMore(false))
                yield put(setDeliveredOrders(deliveredOrders))
            }
            if (storeId.status === "CANCELLED") {
                const cancelledOrders = yield call(
                    request,
                    `${BASE_URL}manage-orders/get-past-orders-by-store-id&storeId=${storeId.storeId}&orderStatusGroup=CANCELLED&startTime=${storeId.startDateEpoch}&endTime=${storeId.endDateEpoch}&pageNum=${storeId.pageNumber}`,
                    {},
                )
                cancelledOrders.length >= 1 ? yield put(hasMore(true))
                    : yield put(hasMore(false))
                yield put(setCancelledOrders(cancelledOrders))
            }

        }
    } catch (e) {
        console.error(e)
    }
}

function* sendReport(action) {
    try {
        const params = {
            method: 'POST',

            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        const url = `${BASE_URL}reports/generate-past-orders-report&storeId=${action.storeId}&startTime=${action.startDateEpoch
            }&endTime=${action.endDateEpoch}`

        const result = yield call(request, url, params)

        if (result.error) {
            yield put(setError({ boolean: true }))
            yield put(setErrorMessage(result.message))
        }

        else if (result) {
            yield put(setError({ boolean: false }))
            yield put(setErrorMessage(""))
        } else if (!result) {
            yield put(setError({ boolean: true }))
            yield put(setErrorMessage("*Something went wrong! Please try again later!"))
        }
    } catch (e) {
        console.error(e)
        yield put(setError({ boolean: true }))
        yield put(setErrorMessage("*Something went wrong! Please try again later!"))
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* pastOrdersWatcher() {
    yield takeLatest(GET_PAST_ORDERS, getPastOrdersFlow)
    yield takeLatest(SEND_REPORT, sendReport)
}
