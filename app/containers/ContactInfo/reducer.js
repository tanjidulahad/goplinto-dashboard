import produce from 'immer'
import {
  SET_ADDRESS,
  SET_CITY,
  SET_COUNTRY,
  SET_EMAIL,
  SET_PHONE,
  SET_PHYSICAL,
  SET_PINCODE,
  SET_SAME_WHATSAPP_NUMBER,
  SET_STATE,
  SET_USE_SAME_NUMBER,
  SET_WHATSAPP_NUMBER,
  SET_PHONE_CODE,
  SET_WHATSAPP_NUMBER_CODE,
  SET_ALL_COUNTRY_DETAILS,
  SET_PHONE_ISD_FLAG,
  SET_WHATSAPP_ISD_FLAG
} from './constants'

// The initial state of the App
export const initialState = {
  email: '',
  phone: '',
  phoneCode: '',
  whatsappNumber: '',
  whatsappNumberCode: '',
  hasPhysicalAddress: false,
  address: '',
  state: '',
  city: '',
  pincode: '',
  country: '',
  useSameNumber: false,
  allCountryDetails:[],
  phoneIsdFlag:[],
  whatsappIsdFlag:[],
}

/* eslint-disable default-case, no-param-reassign */
const contactInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_EMAIL:
        draft.email = action.email
        break
      case SET_PHONE:
        draft.phone = action.phone
        break
      case SET_PHONE_CODE:
        draft.phoneCode = action.phoneCode
        break
      case SET_PHYSICAL:
        draft.hasPhysicalAddress = action.boolean
        break
      case SET_ADDRESS:
        draft.address = action.address
        break
      case SET_CITY:
        draft.city = action.city
        break
      case SET_STATE:
        draft.state = action.state
        break
      case SET_PINCODE:
        draft.pincode = action.pincode
        break
      case SET_COUNTRY:
        draft.country = action.country
        break
      case SET_WHATSAPP_NUMBER:
        draft.whatsappNumber = action.whatsappNumber
        break             
      case SET_WHATSAPP_NUMBER_CODE:
        draft.whatsappNumberCode = action.whatsappNumberCode
        break
      case SET_USE_SAME_NUMBER:
        draft.useSameNumber = action.boolean
        break
      case SET_ALL_COUNTRY_DETAILS:
        draft.allCountryDetails = action.allCountryDetails
        break 
      case SET_PHONE_ISD_FLAG:
        draft.phoneIsdFlag = action.flagIcon
        break 
      case SET_WHATSAPP_ISD_FLAG:
        draft.whatsappIsdFlag = action.flagIcon
        break
      default:
    }
  })

export default contactInfoReducer
