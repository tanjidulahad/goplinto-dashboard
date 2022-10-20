import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'

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
export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )
export const makeSelectUser = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user,
  )
