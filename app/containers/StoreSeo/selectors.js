import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectSeoDetails = state => state.get('seoDetails') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectSeoDetails = () =>
  createSelector(
    selectSeoDetails,
    substate => substate,
  )

export const makeSelectStoreName = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store.store_name,
  )
export const makeSelectStoreDesc = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store.store_desc,
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

export const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobalState,
    substate => substate.subscription_details,
  )
export const makeSelectStoreDomainUrl = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store.store_domain_url,
  )