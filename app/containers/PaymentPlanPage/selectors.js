import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectSubscriptionPlans = state => state.get('subscriptionPlans') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectSubscriptionPlans = () =>
  createSelector(
    selectSubscriptionPlans,
    substate => substate.subscriptionPlans,
  )
export const makeSelectCurrentSubscriptionPlan = () =>
  createSelector(
    selectSubscriptionPlans,
    substate => substate.currentSubscriptionPlan,
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
export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )
