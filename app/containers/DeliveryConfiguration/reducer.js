import produce from 'immer'
import {
  SET_INITIAL_DATA,
  SET_INITIAL_DATA_LOAD_ERROR,
  SET_PICKUP_POINT_ERROR,
  TOGGLE_FLAG,
  SET_PICKUP_ADDRESS,
  START_UPDATING_PICKUP_ADDRESS,
  SET_DELIVERY_RATES,
  SET_DELIVERY_CHARGE_ERROR,
  SET_STORE_ADDRESS,
  SET_IS_UPDATING_DELIVERY_CHARGE,
  SET_DELIVERY,
  SET_PICKUP
} from './constants'

export const initialState = {
  delivery: {},
  pickup: {},
  initialDataLoadErrors: { Delivery: false, Pickup: false },
  isUpdatingPickupPoint: false,
  isUpdatingDeliveryCharge: false,
  pickUpPointError: false,
  deliveryChargeError: false,
  storeAddress: {
    store_name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  },
  IsDelivery:false,
  IsPickup:false,
}

const DeliveryPickupReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_INITIAL_DATA:
        if (action.kind === 'Delivery') {
          draft.delivery = { ...action.data }
          if (draft.delivery.delivery_details)
            draft.delivery.delivery_details.delivery_charge = parseFloat(
              draft.delivery.delivery_details.delivery_charge,
            )
        } else draft.pickup = { ...action.data }
        break
      case TOGGLE_FLAG:
        if (action.flagType === 'DELIVERY') draft.delivery.is_delivery_available = action.flagValue
        else draft.pickup.is_pickup_available = action.flagValue
        break
      case SET_INITIAL_DATA_LOAD_ERROR:
        draft.initialDataLoadErrors[`${action.kind}`] = action.val
        break
      case START_UPDATING_PICKUP_ADDRESS:
        draft.isUpdatingPickupPoint = action.val
        break
      case SET_PICKUP_POINT_ERROR:
        draft.pickUpPointError = action.val
        break
      case SET_PICKUP_ADDRESS:
        draft.pickup.pickupPoints.length > 0
          ? (draft.pickup.pickupPoints[0] = { ...action.newAddress })
          : draft.pickup.pickupPoints.push({ ...action.newAddress })
        break
      case SET_DELIVERY_RATES:
        if (action.deliveryFee === 0) {
          draft.delivery.is_delivery_fee_charged = 'N'
        } else {
          draft.isUpdatingDeliveryCharge = true
          draft.delivery.is_delivery_fee_charged = 'Y'
          draft.delivery.delivery_details = { store_id: action.storeId, delivery_charge: action.deliveryFee }
        }
        break
      case SET_DELIVERY_CHARGE_ERROR:
        draft.deliveryChargeError = action.val
        break
      case SET_IS_UPDATING_DELIVERY_CHARGE:
        draft.isUpdatingDeliveryCharge = action.val
        break
      case SET_STORE_ADDRESS:
        draft.storeAddress = {
          store_name: action.data.store_name ? action.data.store_name : '',
          address: action.data.address ? action.data.address : '',
          city: action.data.city ? action.data.city : '',
          state: action.data.state ? action.data.state : '',
          country: action.data.country ? action.data.country : '',
          pincode: action.data.pincode ? action.data.pincode : '',
        }
        break
      case SET_DELIVERY:
        draft.IsDelivery = action.val
        break
      case SET_PICKUP:
        draft.IsPickup = action.val
        break
      default:
        break
    }
  })

export default DeliveryPickupReducer
