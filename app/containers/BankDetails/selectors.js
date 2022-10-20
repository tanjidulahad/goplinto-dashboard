import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectBankInfo = state => state.get('bankInfo') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectBankInfo = () =>
  createSelector(
    selectBankInfo,
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
