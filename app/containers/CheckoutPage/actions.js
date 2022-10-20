import {
  SET_SUBSCRIPTION_PLAN,
  SET_MERCHANT_DETAILS,
  SET_MERCHANT_ADDRESS_ID,
  SET_STORE_MODULES,
  GET_STORE_MODULES,
  SET_PAGEINDEX,
} from './constants'

export const setSubscriptionPlan = ({ planDetails, storeId }) => ({
  type: SET_SUBSCRIPTION_PLAN,
  planDetails,
  storeId,
})
export const setMerchantDetails = ({ merchantDetails, merchantId, storeId }) => ({
  type: SET_MERCHANT_DETAILS,
  merchantDetails,
  merchantId,
  storeId,
})
export const setMerchantAddressId = merchantAddressId => ({
  type: SET_MERCHANT_ADDRESS_ID,
  merchantAddressId,
})
export const setStoreModules = ({ storeModules }) => ({
  type: SET_STORE_MODULES,
  storeModules,
})
export const getStoreModules = ({ storeId,roleId }) => ({
  type: GET_STORE_MODULES,
  storeId,
  roleId
})
export const setPageIndex = ({ pageIndex }) => ({
  type: SET_PAGEINDEX,
  pageIndex,
})
