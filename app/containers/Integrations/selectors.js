import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectGlobalState = state => state.get('global') || initialGlobalState
const selectIntegrations = state => state.get('integrationsReducer') || initialState

export const makeSelectStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.storeId,
  )
export const makePageState = () =>
  createSelector(
    selectIntegrations,
    substate => substate,
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
