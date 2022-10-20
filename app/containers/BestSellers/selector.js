import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectBestSellerReducer = state => state.get('bestSellerReducer') || initialState
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

export const makeSelectBestSellerItems = () =>
  createSelector(
    selectBestSellerReducer,
    substate => substate.Items,
  )

export const makeSelectProducts = () =>
  createSelector(
    selectBestSellerReducer,
    substate => substate.Products,
  )

export const makeSelectStatusBS = () =>
  createSelector(
    selectBestSellerReducer,
    substate => substate.showBestSeller,
  )
