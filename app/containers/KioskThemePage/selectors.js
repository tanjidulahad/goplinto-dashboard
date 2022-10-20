import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectKioskDisplaySettings = state => state.get('kioskSettings') || initialState
const selectGlobal = state => state.get('global')

const makeSelectKioskDisplaySettings = () =>
  createSelector(
    selectKioskDisplaySettings,
    substate => substate,
  )

const makeSelectStoreId = () =>
  createSelector(
    selectGlobal,
    substate => substate.store.store_id,
  )

const makeSelectMerchantId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.merchantId,
  )

const makeSelectGlobalDisplaySettings = () =>
  createSelector(
    selectGlobal,
    substate => substate.displaySettings,
  )

const makeSelectApiStatus = () =>
  createSelector(
    selectGlobal,
    substate => substate.apiStatus,
  )

const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobal,
    substate => substate.subscription_details,
  )

export {
  makeSelectKioskDisplaySettings,
  makeSelectGlobalDisplaySettings,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectApiStatus,
  makeSelectSubscribedModules,
}
