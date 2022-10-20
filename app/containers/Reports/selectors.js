import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectReportsPage = state => state.get('reportsPage') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStoreStats = () =>
  createSelector(
    selectReportsPage,
    substate => substate.storeStats,
  )

export const makeSelectCustomerBase = () =>
  createSelector(
    selectReportsPage,
    substate => substate,
  )

export const makeSelectStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.storeId,
  )
export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
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

export const makeSelectMerchantEmail = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store.primary_email,
  )
export const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobalState,
    substate => substate.subscription_details,
  )

export const makeSelectLoading = () =>
  createSelector(
    selectReportsPage,
    substate => substate.loading,
  )

export const makeSelectReportAnalytics = () =>
  createSelector(
    selectReportsPage,
    substate => substate.reports,
  )

export const makeSelectTopProducts = () =>
  createSelector(
    selectReportsPage,
    substate => substate.top_products,
  )
export const makeSelectTimePeriod = () =>
  createSelector(
    selectReportsPage,
    substate => substate.timePeriod,
  )
export const makeSelectLevelDetails = () =>
  createSelector(
    selectReportsPage,
    substate => substate.levelDetails,
  )
export const makeSelectStoreGroupDetils = () =>
  createSelector(
    selectGlobalState,
    substate => substate.storeGroupDetails,
  )
export const makeSelectReportPopupMsg = () =>
  createSelector(
    selectReportsPage,
    substate => substate.reportPopupMsg,
  )
