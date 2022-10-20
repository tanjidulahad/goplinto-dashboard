import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectStoreTax = state => state.get('storeTax') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStoreTax = () =>
  createSelector(
    selectStoreTax,
    substate => substate,
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
