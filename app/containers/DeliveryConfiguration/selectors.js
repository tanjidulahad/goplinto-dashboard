import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDeliveryPickupState = state => state.get('deliveryPickupReducer') || initialState
const selectGlobalState = state => state.get('global')

const makeSelectDeliveryState = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.delivery,
  )

const makeSelectPickUpState = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.pickup,
  )

const makeSelectStoreAddress = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.storeAddress,
  )

const makeSelectIsUpdatingDeliveryCharge = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.isUpdatingDeliveryCharge,
  )

const makeSelectIsUpdatingAddressState = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.isUpdatingPickupPoint,
  )

const makeSelectPickUpPointError = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.pickUpPointError,
  )

const makeSelectGlobalUser = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user,
  )

const makeSelectDeliveryServiceAvailability = () =>
  createSelector(
    selectGlobalState,
    substate => substate.storeSettings.delivery_service_availability,
  )

const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobalState,
    substate => substate.subscription_details,
  )

const makeSelectDeliveryChargeError = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.deliveryChargeError,
  )

export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )
export const makeSelectIsDelivery = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.IsDelivery,
  )
export const makeSelectIsPickup = () =>
  createSelector(
    selectDeliveryPickupState,
    substate => substate.IsPickup,
  )
export {
  makeSelectDeliveryServiceAvailability,
  makeSelectDeliveryState,
  makeSelectIsUpdatingDeliveryCharge,
  makeSelectDeliveryChargeError,
  makeSelectPickUpState,
  makeSelectStoreAddress,
  makeSelectIsUpdatingAddressState,
  makeSelectPickUpPointError,
  makeSelectGlobalUser,
  makeSelectSubscribedModules,
}
