import produce from 'immer'
import { SET_ONBOARDING_STATUS, SET_STORE_STATS, SET_STORE_MODULE_STATS } from './constants'

// The initial state of the App
export const initialState = {
  storeStats: null,
  onboardingStatus: null,
  storeModuleStatuses: null,
}

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ONBOARDING_STATUS:
        draft.onboardingStatus = action.onboardingStatus
        break
      case SET_STORE_STATS:
        draft.storeStats = action.storeStats
        break
      case SET_STORE_MODULE_STATS:
        draft.storeModuleStatuses = action.storeModuleStats
        break
      default:
    }
  })

export default dashboardReducer
