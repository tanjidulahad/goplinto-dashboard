import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectPushNotifications = state => state.get('couponsReducer') || initialState
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

export const makeSelectNotifications = () =>
  createSelector(
    selectPushNotifications,
    substate => substate,
  )

export const makeSelectCoupons = () =>
  createSelector(
    selectPushNotifications,
    substate => substate.coupons,
  )

export const makeSelectCouponTypes = () =>
  createSelector(
    selectPushNotifications,
    substate => substate.couponType,
  )
