import { GET_BILLS, SET_BILLS, SET_CANCEL_AUTO, SET_UPDATE_CANCEL_ERROR,GET_CREDITS_HISTORY,SET_CREDITS_HISTORY } from './constants'
export const getBillingHistoryItems = storeId => {
  return {
    type: GET_BILLS,
    storeId,
  }
}
export const setBillingHistoryItems = items => {
  return {
    type: SET_BILLS,
    items,
  }
}

export const getCreditHistoryItems = (storeId,merchantId) => {
  return {
    type: GET_CREDITS_HISTORY,
    storeId,
    merchantId
  }
}
export const setCreditHistoryItems = items => {
  return {
    type: SET_CREDITS_HISTORY,
    items,
  }
}
export const setCancelAuto = (storeId, subscriptionId) => {
  return {
    type: SET_CANCEL_AUTO,
    storeId,
    subscriptionId,
  }
}

export const setUpdateCancelError = bool => {
  return {
    type: SET_UPDATE_CANCEL_ERROR,
    bool
  }
}