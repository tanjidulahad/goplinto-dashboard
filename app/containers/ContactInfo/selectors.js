import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectContactInfo = state => state.get('contactInfo') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectContactInfo = () =>
  createSelector(
    selectContactInfo,
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
