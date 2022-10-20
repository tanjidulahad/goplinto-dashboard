import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectPaymentConfig = state => state.get('paymentConfig') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectPaymentConfig = () =>
  createSelector(
    selectPaymentConfig,
    substate => substate,
  )

export const makeSelectAvailableStoreTypes = () =>
  createSelector(
    selectGlobalState,
    substate => substate.storeTypes,
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
