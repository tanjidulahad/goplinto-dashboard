import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectNewArrivalReducer = state => state.get('newArrivalsReducer') || initialState
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

export const makeSelectNewArrivalItems = () =>
  createSelector(
    selectNewArrivalReducer,
    substate => substate.Items,
  )

export const makeSelectProducts = () =>
  createSelector(
    selectNewArrivalReducer,
    substate => substate.Products,
  )
