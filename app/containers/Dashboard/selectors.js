import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectDashboardPage = state => state.get('dashboardPage') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectOnboardingStatus = () =>
  createSelector(
    selectDashboardPage,
    substate => substate.onboardingStatus,
  )
export const makeSelectStoreModuleStatuses = () =>
  createSelector(
    selectDashboardPage,
    substate => substate.storeModuleStatuses,
  )
export const makeSelectStoreStats = () =>
  createSelector(
    selectDashboardPage,
    substate => substate.storeStats,
  )
export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )
export const makeSelectStoreGroupDetils = () =>
  createSelector(
    selectGlobalState,
    substate => substate.storeGroupDetails,
  )
export const makeSelectStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.storeId,
  )
export const makeSelectMerchantId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.merchantId,
  )
export const makeSelectUser = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user,
  )
