import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectStoreDetails = state => state.get('storeDetails') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStoreDetails = () =>
  createSelector(
    selectStoreDetails,
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
