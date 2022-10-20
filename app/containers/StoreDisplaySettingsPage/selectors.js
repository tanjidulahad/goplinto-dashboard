import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDisplaySettings = state => state.get('storeDisplaySettings') || initialState
const selectGlobal = state => state.get('global')

const makeSelectDisplaySettings = () =>
  createSelector(
    selectDisplaySettings,
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

const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobal,
    substate => substate.subscription_details,
  )
const makeSelectRoleId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.role_id,
  )
const makeSelectSecondaryColor = () =>
  createSelector(
    selectDisplaySettings,
    substate => substate.SecondaryColor,
  )
const makeSelectTertiaryColor = () =>
  createSelector(
    selectDisplaySettings,
    substate => substate.TertiaryColor,
  )
const makeSelectFavIcon = () =>
  createSelector(
    selectDisplaySettings,
    substate => substate.FavIcon,
  )
export {
  makeSelectMerchantId,
  makeSelectDisplaySettings,
  makeSelectStoreId,
  makeSelectGlobalDisplaySettings,
  makeSelectSubscribedModules,
  makeSelectRoleId,
  makeSelectSecondaryColor,
  makeSelectTertiaryColor,
  makeSelectFavIcon
}
