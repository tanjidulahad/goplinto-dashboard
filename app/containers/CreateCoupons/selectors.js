import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCreateNotificationState = state => state.get('createCoupons') || initialState
const selectGlobalState = state => state.get('global')

export const makeSelectNotificationData = () =>
  createSelector(
    selectCreateNotificationState,
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
export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )

export const makeSelectCategories = () =>
  createSelector(
    selectCreateNotificationState,
    substate => substate.categories,
  )

export const makeSelectProducts = () =>
  createSelector(
    selectCreateNotificationState,
    substate => substate.products,
  )

export const makeSelectCount = () =>
  createSelector(
    selectCreateNotificationState,
    substate => substate.count,
  )

export const makeSelectLoading = () =>
  createSelector(
    selectCreateNotificationState,
    substate => substate.loading,
  )
