import { GET_CURRENT_SUBSCRIPTION_PLAN, SET_CURRENT_SUBSCRIPTION_PLAN, SET_PLAN } from './constants'

export const getCurrentSubcriptionPlan = ({ storeId }) => ({
  type: GET_CURRENT_SUBSCRIPTION_PLAN,
  storeId,
})
export const setCurrentSubscriptionPlan = ({ subscriptionPlan }) => ({
  type: SET_CURRENT_SUBSCRIPTION_PLAN,
  subscriptionPlan,
})
export const setPaymentPlan = ({ merchantDetails, merchantId, storeId }) => ({
  type: SET_PLAN,
  merchantDetails,
  merchantId,
  storeId,
})
