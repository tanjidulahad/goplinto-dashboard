import {
  LOAD_INITIAL_DELIVERY_PICKUP_DATA,
  SET_INITIAL_DATA,
  SET_INITIAL_DATA_LOAD_ERROR,
  SET_PICKUP_POINT_ERROR,
  TOGGLE_DELIVERY_PICKUP_FLAGS,
  UPDATE_PICKUP_ADDRESS,
  START_UPDATING_PICKUP_ADDRESS,
  UPDATE_DELIVERY_RATES,
  SET_DELIVERY_CHARGE_ERROR,
  TOGGLE_FLAG,
  SET_PICKUP_ADDRESS,
  SET_DELIVERY_RATES,
  GET_STORE_ADDRESS,
  SET_STORE_ADDRESS,
  SET_IS_UPDATING_DELIVERY_CHARGE,
  SET_DELIVERY,
  SET_PICKUP
} from './constants'

export const loadDeliveryPickupData = (kind, storeId, merchantId) => ({
  type: LOAD_INITIAL_DELIVERY_PICKUP_DATA,
  kind,
  storeId,
  merchantId,
})

export const setDeliveryPickupData = (kind, data) => ({
  type: SET_INITIAL_DATA,
  kind,
  data,
})

export const setInitialDataLoadError = (kind, val) => ({
  type: SET_INITIAL_DATA_LOAD_ERROR,
  kind,
  val,
})

export const toggleFlags = (storeId, merchantId, flagType, flagValue) => ({
  type: TOGGLE_DELIVERY_PICKUP_FLAGS,
  storeId,
  merchantId,
  flagType,
  flagValue,
})

export const toggleFlag = (flagType, flagValue) => ({
  type: TOGGLE_FLAG,
  flagType,
  flagValue,
})

export const startPickupAddressUpdate = val => ({
  type: START_UPDATING_PICKUP_ADDRESS,
  val,
})

export const setIsUpdatingDeliveryCharge = val => ({
  type: SET_IS_UPDATING_DELIVERY_CHARGE,
  val,
})

export const getStoreAddress = storeId => ({
  type: GET_STORE_ADDRESS,
  storeId,
})

export const setStoreAddress = data => ({
  type: SET_STORE_ADDRESS,
  data,
})

export const updatePickupAddress = (storeId, merchantId, pickup_point_id, updatedAddress) => ({
  type: UPDATE_PICKUP_ADDRESS,
  storeId,
  merchantId,
  pickup_point_id,
  updatedAddress,
})

export const setPickupAddress = newAddress => ({
  type: SET_PICKUP_ADDRESS,
  newAddress,
})

export const updateDeliveryRates = (storeId, merchantId, deliveryFee) => ({
  type: UPDATE_DELIVERY_RATES,
  storeId,
  merchantId,
  deliveryFee,
})

export const setDeliveryRates = (deliveryFee, storeId) => ({
  type: SET_DELIVERY_RATES,
  deliveryFee,
  storeId,
})

export const setDeliveryChargeError = val => ({
  type: SET_DELIVERY_CHARGE_ERROR,
  val,
})

export const setPickupPointError = val => ({
  type: SET_PICKUP_POINT_ERROR,
  val,
})
export const setDelivery = val => ({
  type: SET_DELIVERY,
  val,
})

export const setPickup= val => ({
  type: SET_PICKUP,
  val,
})
