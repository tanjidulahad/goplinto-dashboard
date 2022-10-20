import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import initialState from "./reducer"

const selectGlobal = state => state.get('global') || initialGlobalState
const selectStoreInfoState = state => state.get('storeInfo') || initialState

const makeSelectStoreModules = () =>
  createSelector(
    selectStoreInfoState,
    substate => substate.storeModules
  )
const makeSelectStoreId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.storeId,
  )

const makeSelectMerchantId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.merchantId,
  )
const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    substate => substate.user,
  )

const makeSelectStore = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )

const makeSelectBank = () =>
  createSelector(
    selectGlobal,
    substate => substate.bank,
  )

const makeSelectStoreSettings = () =>
  createSelector(
    selectGlobal,
    substate => substate.storeSettings,
  )

const makeSelectDisplaySettings = () =>
  createSelector(
    selectGlobal,
    substate => substate.displaySettings,
  )

const makeSelectStoreInfoStates = () =>
  createSelector(
    selectGlobal,
    substate => substate.storeInfoLoad,
  )

const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobal,
    substate => substate.subscription_details,
  )

export {
  makeSelectStoreId,
  makeSelectMerchantId,
  makeSelectUser,
  makeSelectStore,
  makeSelectBank,
  makeSelectStoreSettings,
  makeSelectDisplaySettings,
  makeSelectStoreInfoStates,
  makeSelectSubscribedModules,
  makeSelectStoreModules
}
