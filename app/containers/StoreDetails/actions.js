import {
  SET_STORE_NAME,
  SET_STORE_TYPE,
  SET_STORE_DESC,
  GET_STORE_DETAILS,
  SET_STORE_DETAILS,
  SET_LOADING,
} from './constants'

export const setStoreName = ({ storeName }) => ({
  type: SET_STORE_NAME,
  storeName,
})
export const setStoreType = ({ storeType }) => ({
  type: SET_STORE_TYPE,
  storeType,
})

export const setStoreDesc = ({ storeDesc }) => ({
  type: SET_STORE_DESC,
  storeDesc,
})

export const getStoreDetails = ({ storeId }) => ({
  type: GET_STORE_DETAILS,
  storeId,
})

export const setStoreDetails = ({ storeId, merchantId, storeName, storeDesc, storeType }) => ({
  type: SET_STORE_DETAILS,
  storeId,
  merchantId,
  storeName,
  storeDesc,
  storeType,
})

export const setLoading = ({ boolean }) => ({
  type: SET_LOADING,
  boolean,
})
