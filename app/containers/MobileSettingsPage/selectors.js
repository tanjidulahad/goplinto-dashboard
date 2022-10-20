import { createSelector } from 'reselect'
import { initialState } from './reducers'
const selectMobileSettings = state => state.get('mobileAppSettings') || initialState
const selectGlobal = state => state.get('global')

export const makeSelectMobileSettings = () =>
  createSelector(
    selectMobileSettings,
    substate => substate,
  )

export const makeSelectStoreId = () =>
  createSelector(
    selectGlobal,
    substate => substate.store.store_id,
  )

export const makeSelectMerchantId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.merchantId,
  )

export const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobal,
    substate => substate.subscription_details,
  )
