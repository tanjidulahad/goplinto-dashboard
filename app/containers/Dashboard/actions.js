import {
  GET_ONBOARDING_STATUS,
  SET_ONBOARDING_STATUS,
  GET_STORE_STATS,
  SET_STORE_STATS,
  GET_STORE_MODULE_STATS,
  SET_STORE_MODULE_STATS,
} from './constants'

export const getOnboardingStatus = storeId => ({
  type: GET_ONBOARDING_STATUS,
  storeId,
})
export const setOnboardingStatus = onboardingStatus => ({
  type: SET_ONBOARDING_STATUS,
  onboardingStatus,
})
export const getStoreStats = (level, id, startDate, endDate) => ({
  type: GET_STORE_STATS,
  level,
  id,
  startDate,
  endDate,
})
export const setStoreStats = storeStats => ({
  type: SET_STORE_STATS,
  storeStats,
})
export const getStoreModuleStats = storeId => ({
  type: GET_STORE_MODULE_STATS,
  storeId,
})
export const setStoreModuleStats = storeModuleStats => ({
  type: SET_STORE_MODULE_STATS,
  storeModuleStats,
})
