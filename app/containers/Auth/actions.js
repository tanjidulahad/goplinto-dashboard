import {
  AUTHENTICATE_MERCHANT,
  SET_AUTH_DETAILS,
  SET_AUTH_STATUS,
  SET_LOGIN_STATUS,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  VERIFY_OTP,
  SET_OTP_ERROR,
  SOCIAL_LOGIN,
  GET_CLIENT_DETAILS,
  SET_CLIENT_DETAILS,
  SET_LOGIN_DETAILS_ON_DB,
  SHOW_FEATURES_CAROUSEL,
  GET_COUNTRY_DETAILS,
  SET_COUNTRY_DETAILS,
  FORGOT_PASSWORD,
  SHOW_SCREEN,
  SET_MERCHANT_ID,
  CREATE_PASSWORD,
  SET_VERIFICATION_TYPE,
  SET_AUTH_MODE,
  SET_LOADING,
} from './constants'

export const authenticate = (authType, merchant_name, merchant_number, isdCode, password1, password2, verificationType, user, merchant_id, email, deviceId) => ({
  type: AUTHENTICATE_MERCHANT,
  payload: { authType, merchant_name, merchant_number, isdCode, password1, password2, verificationType, user, merchant_id, email, deviceId },
})

export const socialLogin = (provider, socialData) => ({
  type: SOCIAL_LOGIN,
  provider,
  socialData,
})

export const setAuthDetails = (payload, response) => ({
  type: SET_AUTH_DETAILS,
  payload,
  response,
})

export const setAuthStatus = val => ({
  type: SET_AUTH_STATUS,
  val,
})

export const setLoginStatus = val => ({
  type: SET_LOGIN_STATUS,
  val,
})

export const setError = val => ({
  type: SET_ERROR,
  val,
})

export const setErrorMessage = val => ({
  type: SET_ERROR_MESSAGE,
  val,
})

export const setOtpError = val => ({
  type: SET_OTP_ERROR,
  val,
})

export const verifyOTP = (merchant_id, otp, user, authMode, isForgotPass, verificationType) => ({
  type: VERIFY_OTP,
  merchant_id,
  otp,
  user,
  authMode,
  isForgotPass,
  verificationType
})

export const getClientdetails = ({ clientId }) => ({
  type: GET_CLIENT_DETAILS,
  clientId,
})

export const setClientDetails = ({ clientDetails }) => ({
  type: SET_CLIENT_DETAILS,
  clientDetails,
})

export const setLoginDetails = (merchantId, user, loginType) => ({
  type: SET_LOGIN_DETAILS_ON_DB,
  merchantId,
  user,
  loginType,
})

export const setShowFeaturesCarousel = val => ({
  type: SHOW_FEATURES_CAROUSEL,
  val,
})

export const getCountryDetails = () => ({
  type: GET_COUNTRY_DETAILS
})

export const setCountryDetails = (value) => ({
  type: SET_COUNTRY_DETAILS,
  value,
})
export const forgotPassword = (authType, merchant_name, merchant_number, isdCode, password1, password2, verificationType, user, merchant_id, email) => ({
  type: FORGOT_PASSWORD,
  payload: { authType, merchant_name, merchant_number, isdCode, password1, password2, verificationType, user, merchant_id, email },
})

export const setShowScreen = (value) => ({
  type: SHOW_SCREEN,
  value,
})
export const setMerchantId = (value) => ({
  type: SET_MERCHANT_ID,
  value,
})
export const createPassword = (password,confirmPassword,merchantId) => ({
  type: CREATE_PASSWORD,
  password, 
  confirmPassword, 
  merchantId,
})

export const setAuthMode = (value) => ({
  type: SET_AUTH_MODE,
  value,
})

export const setVerificationType = (value) => ({
  type: SET_VERIFICATION_TYPE,
  value,
})
export const setLoading = (boolean) => ({
  type: SET_LOADING,
  boolean,
})