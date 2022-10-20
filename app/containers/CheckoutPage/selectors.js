import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectCheckoutpage = state => state.get('checkoutPage') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectMerchantAddressId = () =>
  createSelector(
    selectCheckoutpage,
    substate => substate.merchantAddressId,
  )
export const makeSelectStoreModules = () =>
  createSelector(
    selectCheckoutpage,
    substate => substate.storeModules,
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
export const makeSelectMerchantDetails = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user,
  )
  export const makeSelectPageIndex = () =>
  createSelector(
    selectCheckoutpage,
    substate => substate.pageIndex,
  )
