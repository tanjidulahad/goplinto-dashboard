import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import forceClearCache from 'utils/forceClearCache'
import { setClientUser, getSubscribedModules } from 'containers/App/actions'
import {
  AUTHENTICATE_MERCHANT,
  VERIFY_OTP,
  SOCIAL_LOGIN,
  GET_CLIENT_DETAILS,
  SET_LOGIN_DETAILS_ON_DB,
  GET_COUNTRY_DETAILS,
  FORGOT_PASSWORD,
  CREATE_PASSWORD,
} from './constants'
import {
  setAuthDetails,
  setAuthStatus,
  setError,
  setErrorMessage,
  setOtpError,
  setLoginStatus,
  setClientDetails,
  setLoginDetails,
  setCountryDetails,
  setShowScreen,
  setMerchantId,
  setLoading,
  setAuthMode,
} from './actions'
import { notification } from 'antd'
import { getNewCountryDetailsAPI } from 'Endpoints'

const { DASHBOARD_SERVICE_BASE_URL } = process.env
const { MARKETING_API_BASE_URL } = process.env

export function* authenticate({ payload }) {
  let requestURL,requestBody;
  if (payload.authType === 'SignUp') {
    requestURL = `${MARKETING_API_BASE_URL}merchant/register`  
  } else {
    requestURL = `${MARKETING_API_BASE_URL}merchant/login` 
  }
  try {
    requestBody = {
      password: payload.password1,
      confirmPassword: payload.password2,
      fullName: payload.merchant_name,
      verificationType: payload.verificationType,
      emailId: payload.email,
      phone: payload.merchant_number,
      isdCode: payload.isdCode,
      deviceId:payload.deviceId
    }

    const params = yield {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield put(setLoading(true))
    const response = yield call(request, requestURL,params)

  if(response.statusCode===400)
    {
      yield put(setError(true))
      yield put(setErrorMessage(response.message))
      yield put(setLoading(false))
    }
  else  if (payload.authType !== 'verifyOtp'&&response) {
      yield put(setError(false))
      yield put(setErrorMessage(''))
      
      const user = {
        authToken: null,
        email: response.merchantDetails.email_id,
        firstName: response.merchantDetails.full_name,
        lastName: response.merchantDetails.full_name,
        profileImg: response.merchantDetails.profile_pic,
        merchantId: response.merchantDetails.merchant_id,
        storeId: response.merchantDetails.store_id,
        primary_store_id: response.merchantDetails.store_id,
        onboard_status: response.merchantDetails.onboard_status,
        full_name: response.merchantDetails.full_name,
        role_id: response.merchantDetails.role_id,
        role_name: response.merchantDetails.role_name,
        group_id: response.merchantDetails.group_id,
      }
      yield put(setAuthDetails(payload,user))
      yield put(setClientUser(user))
      yield put(getSubscribedModules(user.storeId))
      yield put(setLoginDetails(response.merchantDetails.merchant_id, user, 'phoneLogin'))
      yield put(setMerchantId(response.merchantDetails.merchant_id))
      yield put(setLoading(false))
    if (payload.authType === 'SignUp' || response.merchantDetails.is_account_verified==='N')
      {
        if (response.merchantDetails.is_account_verified === 'N')
        {
          yield put(setAuthMode("VerifyAccount"))
        }
        yield put(setShowScreen('verifyOtp'))
      }
      else{
      yield put(setAuthStatus(true))
      yield put(setLoginStatus(true))
      forceClearCache()      
    }
    }
  } catch (err) {
    console.log(err)
    yield put(setError(true))
    yield put(setErrorMessage('Something went wrong! Please try again later!'))
  }
}

export function* ForgotPasswordSaga({payload}) {
  let requestURL, requestBody;

  requestURL = `${MARKETING_API_BASE_URL}merchant/forget-password`
  requestBody = {
      verificationType: payload.verificationType,
      phone: payload.merchant_number,
      emailId: payload.email,
      isdCode: payload.isdCode,
    }

  try {
    const params = yield {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const response = yield call(request, requestURL, params)
    if (response.statusCode === 400) {
      yield put(setError(true))
      yield put(setErrorMessage(response.message))
    }
    if (response.statusCode === 200) {
      yield put(setError(false))
      yield put(setErrorMessage(''))
      yield put(setAuthStatus(true))
      yield put(setMerchantId(response.merchantId))
      yield put(setShowScreen("verifyOtp"))
    }
  } catch (err) {
    console.log(err)
    yield put(setError(true))
    yield put(setErrorMessage('Something went wrong! Please try again later!'))
  }
}

export function* verifyOTP({ merchant_id, otp, user, authMode, isForgotPass, verificationType }) {
  yield put(setOtpError(false))
  const requestURL = isForgotPass ? `${MARKETING_API_BASE_URL}merchant/verify-otp`
                      :
                      authMode==="SignUp"||authMode==="VerifyAccount"?
      `${MARKETING_API_BASE_URL}merchant/verify-account`
                      :
              `${DASHBOARD_SERVICE_BASE_URL}merchant/verify-phone&merchantId=${merchant_id}&otp=${otp}`

  try {
    const requestBody={      
      merchantId: merchant_id,
      otpCode: otp, 
      verificationType:verificationType
    }
    const params = yield {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const response = isForgotPass || authMode === "VerifyAccount" ? yield call(request, requestURL, params): yield call(request, requestURL, {})

    if (response.statusCode === 200) {
      const user = {
        authToken: null,
        email: response.merchantDetails.email_id,
        firstName: response.merchantDetails.full_name,
        lastName: response.merchantDetails.full_name,
        profileImg: response.merchantDetails.profile_pic,
        merchantId: response.merchantDetails.merchant_id,
        storeId: response.merchantDetails.primary_store_id,
        primary_store_id: response.merchantDetails.primary_store_id,
        onboard_status: response.merchantDetails.onboard_status,
        full_name: response.merchantDetails.full_name,
        role_id: response.merchantDetails.role_id,
        role_name: response.merchantDetails.role_name,
        group_id: response.merchantDetails.group_id,
      }
   
        if (authMode === "SignUp" )
        {
          notification.success({
            message: verificationType === "PHONE" ?"Phone number":"Email" +" verified successfully.Please login to create your store",
            placement: "bottomRight",
          })
          yield put(setShowScreen("Login"))
          forceClearCache()
        }
      else if (authMode === "VerifyAccount"){
        notification.success({
          message: "Account verified successfully.",
          placement: "bottomRight",
        })
        yield put(setAuthStatus(true))
        yield put(setLoginStatus(true))
        forceClearCache()
        }
        else
        {
          yield put(getSubscribedModules(user.storeId))
      yield put(setLoginDetails(merchant_id, user, 'phoneLogin'))
          yield put(setShowScreen("createPassword"))
          yield put(setClientUser(user))
        
      }
    } else yield put(setOtpError(true))
  } catch (err) {
    yield put(setOtpError(true))
    console.log(err);
  }
}

export function* getClientDetailsSaga({ clientId }) {
  try {
    const url = `${DASHBOARD_SERVICE_BASE_URL}merchant/get-partner-client-details&partner=${clientId}`
    const clientDetails = yield call(request, url)
    yield put(setClientDetails({ clientDetails }))
  } catch (e) {
    console.log({ error: e })
  }
}
export function* createPasswordSaga({password,confirmPassword,merchantId}) {
  try {
    const url = `${MARKETING_API_BASE_URL}merchant/reset-password`
    const requestBody = {
      password,
      confirmPassword,
      merchantId:merchantId      
    }
    const params = yield {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const response = yield call(request, url,params)
    if(response.statusCode===200)
    {
      yield put(setError(false))
      yield put(setErrorMessage(""))
      forceClearCache()
      yield put(setShowScreen("Login"))
    }
    else{
      yield put(setError(true))
      yield put(setErrorMessage(response.message))
    }
  } catch (e) {
    console.log({ error: e })
  }
}

export function* socialAuth(action) {
  try {
    const { provider, socialData } = action
    let user = {}
    if (provider === 'Google') {
      const { accessToken: authToken } = socialData
      const { email, givenName: firstName, familyName: lastName, imageUrl: profileImg } = socialData.profileObj
      const full_name = `${firstName} ${lastName}`
      const result = yield call(
        request,
        `${DASHBOARD_SERVICE_BASE_URL}merchant/login-register&authToken=${authToken}&authOrigin=${provider}&email=${email}`,
        {},
      )
      const {
        merchant_id: merchantId,
        primary_store_id: storeId,
        onboard_status,
        primary_store_id,
        role_id,
        role_name,
      } = result
      user = {
        authToken,
        email,
        firstName,
        lastName,
        full_name,
        profileImg,
        merchantId,
        storeId,
        primary_store_id,
        onboard_status,
        role_id,
        role_name,
      }
    } else if (provider === 'Facebook') {
      const { accessToken: authToken, email, name, picture } = socialData
      const firstName = name
        ? name
          .split(' ')
          .slice(0, -1)
          .join(' ')
        : ''
      const lastName = name
        ? name
          .split(' ')
          .slice(-1)
          .join(' ')
        : ''
      const full_name = `${firstName} ${lastName}`
      const profileImg = picture ? picture.data.url : null
      const {
        merchant_id: merchantId,
        primary_store_id: storeId,
        onboard_status,
        primary_store_id,
        role_id,
        role_name,
      } = yield call(
        request,
        `${DASHBOARD_SERVICE_BASE_URL}merchant/login-register&authToken=${authToken}&authOrigin=${provider}&email=${email}`,
        {},
      )
      user = {
        authToken,
        email,
        firstName,
        lastName,
        full_name,
        profileImg,
        merchantId,
        storeId,
        primary_store_id,
        onboard_status,
        role_id,
        role_name,
      }
    }
    if (user.authToken) {
      yield put(setClientUser(user))
      yield put(getSubscribedModules(user.storeId, user.role_id))
      yield put(setLoginStatus(true))
      forceClearCache()
      yield put(setLoginDetails(user.merchantId, user, provider))
    }
  } catch (e) {
    console.error(e)
  }
}

export function* setLoginDetailsOnDB({ merchantId, user, loginType }) {
  try {
    if (localStorage.getItem('fcmToken')) {
      const reqUrl = `${DASHBOARD_SERVICE_BASE_URL}merchant/update-login-details&merchantId=${merchantId}`
      const postData = {
        birthday: null,
        fullName: user.full_name,
        email: user.email,
        gender: null,
        profilePic: user.profileImg,
        city: null,
        state: null,
        country: null,
        deviceId: localStorage.getItem('fcmToken'),
        device_id_source: 'FCM',
        social_auth_origin: null,
        social_auth_token: null,
      }
      if (loginType !== 'phoneLogin') {
        postData.social_auth_origin = loginType
        postData.social_auth_token = user.authToken
      }
      const params = yield {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }

      yield call(request, reqUrl, params)
    }
  } catch (error) {}
}
export function* getAllCountryDetailsSaga() {
  try { 
    const url = getNewCountryDetailsAPI();
    const allCountryDetails = yield call(request, url)
    yield put(setCountryDetails(allCountryDetails))
    }
   catch (error) { }
}

export default function* authSagaWatcher() {
  yield takeLatest(AUTHENTICATE_MERCHANT, authenticate)
  yield takeLatest(VERIFY_OTP, verifyOTP)
  yield takeLatest(SOCIAL_LOGIN, socialAuth)
  yield takeLatest(GET_CLIENT_DETAILS, getClientDetailsSaga)
  yield takeLatest(SET_LOGIN_DETAILS_ON_DB, setLoginDetailsOnDB)
  yield takeLatest(GET_COUNTRY_DETAILS, getAllCountryDetailsSaga)
  yield takeLatest(FORGOT_PASSWORD, ForgotPasswordSaga)
  yield takeLatest(CREATE_PASSWORD, createPasswordSaga)
}
