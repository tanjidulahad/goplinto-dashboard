import { DISPLAY_STORE_SETTINGS, GET_STORE_SETTINGS, SET_STORE_SETTINGS } from './constants'

export const setStoreSettings = (storeId, merchantId, storeSettings) => ({
  type: SET_STORE_SETTINGS,
  storeId,
  merchantId,
  storeSettings,
})

export const getStoreSettings = storeId => ({
  type: GET_STORE_SETTINGS,
  storeId,
})

export const displayStoreSettings = storeSettings => ({
  type: DISPLAY_STORE_SETTINGS,
  storeSettings,
})
