import { setErrorMessage } from 'containers/StoreSeo/actions'
import produce from 'immer'
import { act } from 'react-testing-library'
import {
  SET_AUTH_DETAILS,
  SET_AUTH_STATUS,
  SET_LOGIN_STATUS,
  SET_ERROR,
  SET_OTP_ERROR,
  LOGOUT,
  SET_CLIENT_DETAILS,
  SET_ERROR_MESSAGE,
  SHOW_FEATURES_CAROUSEL,
  SET_COUNTRY_DETAILS,
  SHOW_SCREEN,
  SET_MERCHANT_ID,
  SET_AUTH_MODE,
  SET_VERIFICATION_TYPE,
  SET_LOADING,
} from './constants'

export const initialState = {
  name: '',
  phone: '',
  merchant_id: '',
  primary_store_name: '',
  is_phone_verified: '',
  error: false,
  errorMessage: '',
  isLoggingIn: false,
  isLoggedIn: false,
  otpVerifyError: false,
  clientDetails: {},
  full_name: '',
  showFeaturesCarousel: false,
  allCountryDetails:[],
  showScreen:"Login",
  authMode:"Login",
  verificationType:"PHONE",
  loading:false,
}

const AuthReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_AUTH_DETAILS:
        if (action.response.error) {
          draft.error = true
          draft.errorMessage = action.response.message
        } else {
          draft.phone = action.payload.merchant_number

          if (action.response.is_phone_verified) {
            draft.is_phone_verified = action.response.is_phone_verified
            if (action.response.merchantDetails.is_phone_verified === 'Y') {
              if (action.payload.authType === 'SignUp') {
                draft.error = true
                draft.errorMessage = action.response.message
              } else {
                draft.error = false
                draft.errorMessage = ''
              }
            } else if (action.payload.authType === 'Login') {
              draft.error = true
              draft.errorMessage = action.response.message
            } else {
              draft.error = false
              draft.errorMessage = ''
            }
          } else {
            draft.is_phone_verified = ''
            if (action.payload.authType === 'Login') {
              draft.error = false
              draft.errorMessage = ''
            } else {
              draft.error = false
              draft.errorMessage = ''
            }
          }

          draft.primary_store_name = action.response.primary_store_name

          draft.merchant_id = action.response.merchant_id

          if (action.response.full_name) draft.full_name = action.response.full_name
          else if (action.payload.authType === 'SignUp') draft.full_name = action.payload.merchant_name
          else draft.full_name = ''
        }

        break
      case SET_AUTH_STATUS:
        draft.isLoggingIn = action.val
        break
      case SET_LOGIN_STATUS:
        draft.isLoggedIn = action.val
        break
      case SET_ERROR:
        draft.error = action.val
        break
      case SET_ERROR_MESSAGE:
        draft.errorMessage = action.val
        break
      case SET_OTP_ERROR:
        draft.otpVerifyError = action.val
        break
      case SET_LOGIN_STATUS:
        draft.isLoggedIn = action.val
        break
      case SET_CLIENT_DETAILS:
        draft.clientDetails = action.clientDetails
        break
      case LOGOUT:
        draft.showFeaturesCarousel = false
        draft.name = ''
        draft.phone = ''
        draft.merchant_id = ''
        draft.primary_store_name = ''
        draft.is_phone_verified = ''
        draft.error = false
        draft.errorMessage = ''
        draft.isLoggingIn = false
        draft.isLoggedIn = false
        draft.otpVerifyError = false
        draft.clientDetails = {}
        draft.full_name = ''
        break
      case SHOW_FEATURES_CAROUSEL:
        draft.showFeaturesCarousel = action.val
        break
      case SET_COUNTRY_DETAILS:
        draft.allCountryDetails = action.value
        break      
      case SHOW_SCREEN:
        draft.showScreen = action.value
        break      
      case SET_MERCHANT_ID:
        draft.merchant_id = action.value
        break      
      case SET_AUTH_MODE:
        draft.authMode = action.value
        break      
      case SET_VERIFICATION_TYPE:
        draft.verificationType = action.value
        break      
      case SET_LOADING:
        draft.loading = action.boolean
        break
      default:
        break
    }
  })

export default AuthReducer
