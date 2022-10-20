import {
  APPLY_CONVENIENCE_CHARGE,
  GET_PAYMENT_CONFIG,
  SET_COD,
  SET_CONVENIENCE,
  SET_CONVENIENCE_AMOUNT,
  SET_CONVENIENCE_LOADING,
  SET_INITIAL_LOADING,
  SET_ONLINE,
  SET_PAYMENT_MODE,
  SHOW_CONVENIENCE_MESSAGE,
} from './constants'

export const getPaymentSettings = ({ storeId }) => ({
  type: GET_PAYMENT_CONFIG,
  storeId,
})

export const setCod = ({ boolean }) => ({
  type: SET_COD,
  boolean,
})

export const setOnline = ({ boolean }) => ({
  type: SET_ONLINE,
  boolean,
})

export const setConvenience = ({ boolean }) => ({
  type: SET_CONVENIENCE,
  boolean,
})
export const setConvenienceAmount = (value) => ({
  type: SET_CONVENIENCE_AMOUNT,
  value,
})


export const setPaymentMode = ({ storeId, merchantId, paymentType, boolean }) => ({
  type: SET_PAYMENT_MODE,
  storeId,
  merchantId,
  paymentType,
  boolean,
})

export const setInitialLoading = ({ boolean }) => ({
  type: SET_INITIAL_LOADING,
  boolean,
})

export const applyConvenienceCharge = ({ storeId, flagStatus, convenienceFee }) => ({
  type: APPLY_CONVENIENCE_CHARGE,
  storeId,
  flagStatus,
  convenienceFee,
})

export const setConvenienceLoading = ({ boolean }) => ({
  type: SET_CONVENIENCE_LOADING,
  boolean,
})

export const showConvenienceStatus = ({ boolean }) => ({
  type: SHOW_CONVENIENCE_MESSAGE,
  boolean,
})
