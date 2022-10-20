import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from 'containers/Auth/reducer'

const selectAddOnsReducer = state => state.get('addOnsReducer') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

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

export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )

export const makeSelectGetStatusBestSeller = () =>
  createSelector(
    selectAddOnsReducer,
    substate => substate.showProductBestSeller,
  )

export const makeSelectGetStatusNewArrival = () =>
  createSelector(
    selectAddOnsReducer,
    substate => substate.showProductNewArrival,
  )

export const makeSelectAddOns = () =>
  createSelector(
    selectAddOnsReducer,
    substate => substate.Widgets,
  )
