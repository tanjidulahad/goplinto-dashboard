import {
  SET_ADDRESS,
  SET_CITY,
  SET_COUNTRY,
  SET_EMAIL,
  SET_PHONE,
  SET_PHYSICAL,
  SET_PINCODE,
  SET_STATE,
  GET_CONTACT_INFO,
  SET_CONTACT_INFO,
  SET_WHATSAPP_NUMBER,
  SET_USE_SAME_NUMBER,
  SET_PHONE_CODE,
  SET_WHATSAPP_NUMBER_CODE,
  SET_ALL_COUNTRY_DETAILS,
  SET_PHONE_ISD_FLAG,
  SET_WHATSAPP_ISD_FLAG,
} from './constants'

export const setEmail = ({ email }) => ({
  type: SET_EMAIL,
  email,
})
export const setPhone = ({ phone }) => ({
  type: SET_PHONE,
  phone,
})
export const setPhoneCode = ({ phoneCode }) => ({
  type: SET_PHONE_CODE,
  phoneCode,
})

export const setHasPhysicalAddress = ({ boolean }) => ({
  type: SET_PHYSICAL,
  boolean,
})

export const setAddress = ({ address }) => ({
  type: SET_ADDRESS,
  address,
})

export const setCity = ({ city }) => ({
  type: SET_CITY,
  city,
})

export const setState = ({ state }) => ({
  type: SET_STATE,
  state,
})

export const setPincode = ({ pincode }) => ({
  type: SET_PINCODE,
  pincode,
})

export const setCountry = ({ country }) => ({
  type: SET_COUNTRY,
  country,
})

export const getContactInfo = ({ storeId }) => ({
  type: GET_CONTACT_INFO,
  storeId,
})

export const setWhatsappNumber = ({ whatsappNumber }) => ({
  type: SET_WHATSAPP_NUMBER,
  whatsappNumber,
})
export const setWhatsappNumberCode = ({ whatsappNumberCode }) => ({
  type: SET_WHATSAPP_NUMBER_CODE,
  whatsappNumberCode,
})
export const setAllCountryDetails = ({ allCountryDetails}) => ({
  type: SET_ALL_COUNTRY_DETAILS,
  allCountryDetails,
})

export const setUseSameNumber = ({ boolean }) => ({
  type: SET_USE_SAME_NUMBER,
  boolean,
})
export const setPhoneISDFlag = (flagIcon) => ({
  type: SET_PHONE_ISD_FLAG,
  flagIcon,
})
export const setWhatsappISDFlag = (flagIcon) => ({
  type: SET_WHATSAPP_ISD_FLAG,
  flagIcon,
})

export const setContactInfo = ({
  storeId,
  merchantId,
  email,
  phone,
  address,
  city,
  pincode,
  state,
  country,
  hasPhysicalAddress,
  whatsappNumber,
  phoneCode,
  whatsappNumberCode
}) => ({
  type: SET_CONTACT_INFO,
  storeId,
  merchantId,
  email,
  hasPhysicalAddress,
  phone,
  address,
  city,
  pincode,
  state,
  country,
  whatsappNumber,
  phoneCode,
  whatsappNumberCode
})
