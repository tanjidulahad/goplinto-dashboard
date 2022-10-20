import { GET_PAST_ORDERS, SEND_REPORT, SET_DELIVERED_ORDERS, SET_CANCELLED_ORDERS, SET_LOADING, SET_HAS_MORE } from './constants'

export const getPastOrders = (storeId, status, startDateEpoch, endDateEpoch) => ({
  type: GET_PAST_ORDERS,
  storeId,
  status,
  startDateEpoch,
  endDateEpoch,
})

export const setDeliveredOrders = orders => ({
  type: SET_DELIVERED_ORDERS,
  orders,
})
export const setCancelledOrders = orders => ({
  type: SET_CANCELLED_ORDERS,
  orders,
})

export const sendReport = (storeId, status, startDateEpoch, endDateEpoch) => ({
  type: SEND_REPORT,
  storeId,
  status,
  startDateEpoch,
  endDateEpoch,
})
export const setLoading = boolean => ({
  type: SET_LOADING,
  boolean,
})
export const hasMore = boolean => ({
  type: SET_HAS_MORE,
  boolean
})
