import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'

import { updateContactInfo } from 'containers/App/actions'
import { GET_CONTACT_INFO, SET_CONTACT_INFO} from './constants'
import {
  setAddress,
  setCity,
  setCountry,
  setEmail,
  setHasPhysicalAddress,
  setPhone,
  setPincode,
  setState,
  setUseSameNumber,
  setWhatsappNumber,
  setAllCountryDetails,
  setPhoneCode,
  setWhatsappNumberCode,
  setPhoneISDFlag,
  setWhatsappISDFlag
} from './actions'
import { getNewCountryDetailsAPI, getStoreDetailsAPI, setContactInfoAPI } from 'Endpoints'

function* getContactInfoSaga({ storeId }) {
  try {
    const url = getStoreDetailsAPI(storeId)
    const storeDetails = yield call(request, url)
    const {
      primary_email: email,
      primary_phone: phone,
      address,
      city,
      state,
      pincode,
      country,
      is_address_available: isAddressAvailable,
      whatsapp_number: whatsappNumber,
      isd_code_phone_number,
      isd_code_whatsapp_number,
      country_flag_phone_num,
      country_flag_whatsapp_num,
    } = storeDetails
    yield put(setEmail({ email }))
    yield put(setPhoneCode({ phoneCode: isd_code_phone_number&&isd_code_phone_number.toString() }))
    yield put(setWhatsappNumberCode({ whatsappNumberCode: isd_code_whatsapp_number&&isd_code_whatsapp_number.toString() }))
    yield put(setPhone({ phone: phone.toString() }))
    if (isAddressAvailable === 'Y') yield put(setHasPhysicalAddress({ boolean: true }))
    else yield put(setHasPhysicalAddress({ boolean: false }))
    yield put(setAddress({ address }))
    yield put(setCity({ city }))
    yield put(setState({ state }))
    yield put(setPincode({ pincode }))
    yield put(setCountry({ country }))
    if (whatsappNumber) yield put(setWhatsappNumber({ whatsappNumber: whatsappNumber&&whatsappNumber.toString() }))
    if (whatsappNumber === phone) yield put(setUseSameNumber({ boolean: true }))
    else yield put(setUseSameNumber({ boolean: false }))
    const url2 = getNewCountryDetailsAPI()
    const allCountryDetails = yield call(request, url2)
    
    yield put(setPhoneISDFlag(country_flag_phone_num ))
    yield put(setWhatsappISDFlag(country_flag_whatsapp_num))
    yield put(setAllCountryDetails({ allCountryDetails }))
  } catch (e) {
    console.log({ error: e })
  }
}

function* setContactInfoSaga({
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
  whatsappNumberCode,
}) {
  try {
    const body = {
      phone,
      email,
      isAddressAvailable: hasPhysicalAddress ? 'Y' : 'N',
      address: hasPhysicalAddress ? address : '',
      state: hasPhysicalAddress ? state : '',
      city: hasPhysicalAddress ? city : '',
      pincode: hasPhysicalAddress ? pincode : '',
      country: hasPhysicalAddress ? country : '',
      whatsappNumber: whatsappNumber ?whatsappNumber : '',
      isdCodeWhatsappNumber: whatsappNumberCode,
      isdCodePhoneNumber: phoneCode
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const url = setContactInfoAPI(storeId,merchantId)
    yield call(request, url, params)
    yield put(updateContactInfo(phone, email))
  } catch (e) {
    console.log({ error: e })
  }
}
export default function* contactInfoWatcher() {
  yield takeLatest(GET_CONTACT_INFO, getContactInfoSaga)
  yield takeLatest(SET_CONTACT_INFO, setContactInfoSaga)
}
