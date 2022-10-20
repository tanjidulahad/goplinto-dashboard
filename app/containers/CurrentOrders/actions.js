import {
  GET_CURRENT_ORDERS,
  SET_CURRENT_ORDERS,
  SET_LOADING,
  UPDATE_ORDER_DETAILS,
  UPDATE_CURRENT_ORDERS,
  SET_OUT_FOR_DELIVERY_ORDERS,
  SET_PREPARING_ORDERS,
  SET_NEW_ORDERS,
  UPDATE_OUT_FOR_DELIVERY_ORDERS,
  UPDATE_PREPARING_ORDERS,
  UPDATE_NEW_ORDERS,
  GET_MORE_CURRENT_ORDERS,
  HAS_MORE,
  SET_SHOW_LOADER_CARD,
} from './constants'
export const hasMore = boolean => ({
  type: HAS_MORE,
  boolean
})
export const getCurrentOrders = (storeId, status, pageNumber) => ({
  type: GET_CURRENT_ORDERS,
  storeId,
  status,
  pageNumber
})
export const getMoreCurrentOrders = (storeId, status, pageNumber) => ({
  type: GET_MORE_CURRENT_ORDERS,
  storeId,
  status,
  pageNumber
})

export const setNewOrders = orders => ({
  type: SET_NEW_ORDERS,
  orders,
})
export const setPreparingOrders = orders => ({
  type: SET_PREPARING_ORDERS,
  orders,
})
export const setOutForDeliveryOrders = orders => ({
  type: SET_OUT_FOR_DELIVERY_ORDERS,
  orders,
})
export const updateNewOrders = orders => ({
  type: UPDATE_NEW_ORDERS,
  orders,
})
export const updatePreparingOrders = orders => ({
  type: UPDATE_PREPARING_ORDERS,
  orders,
})
export const updateOutForDeliveryOrders = orders => ({
  type: UPDATE_OUT_FOR_DELIVERY_ORDERS,
  orders,
})

export const updateOrderDetails = (orderId, status, storeId, currentPageStatus, pageNumber) => ({
  type: UPDATE_ORDER_DETAILS,
  orderId,
  status,
  storeId,
  currentPageStatus,
  pageNumber
})
export const updateCurrentOrders = orders => ({
  type: UPDATE_CURRENT_ORDERS,
  orders
})
export const setLoading = boolean => ({
  type: SET_LOADING,
  boolean,
})
export const setShowLoaderCard = boolean => ({
  type: SET_SHOW_LOADER_CARD,
  boolean,
})

