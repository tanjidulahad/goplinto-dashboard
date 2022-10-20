/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  SET_USER,
  UNSET_USER,
  SET_STORE_FOR_MERCHANT,
  SET_BANK_FOR_STORE,
  SET_NEW_USER_FOR_PHONE_LOGIN,
  SET_EXISTING_USER_FOR_PHONE_LOGIN,
  SET_PAGE_SUBMISSION_STATUS,
  ON_PAGE_LOAD,
  SET_DISPLAY_SETTINGS,
  SET_STORE_TYPES,
  GET_STORE_TYPES,
  GET_SUBSCRIBED_MODULES,
  SET_SUBSCRIBED_MODULES,
  UPDATE_STORE_LOGO,
  UPDATE_CONTACT_INFO,
  UPDATE_STORE_DETAILS,
  SET_ONBOARD_PROGRESS_IN_APP,
  SET_STORE_GROUP_DETAILS,
  SET_STORE_SUBSCRIBED_MODULES,
} from './constants'

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  }
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  }
}

export function setClientUser(user) {
  return {
    type: SET_USER,
    user,
  }
}

export function unsetClientUser() {
  return {
    type: UNSET_USER,
  }
}

export function setStoreForMerchant(store) {
  return {
    type: SET_STORE_FOR_MERCHANT,
    store,
  }
}
export const setStoreGroupDetails = ({ storeGroupDetails }) => ({
  type: SET_STORE_GROUP_DETAILS,
  storeGroupDetails,
})
export function setOnboardProgress(value) {
  return {
    type: SET_ONBOARD_PROGRESS_IN_APP,
    value,
  }
}

export function updateStoreLogo(store_logo) {
  return {
    type: UPDATE_STORE_LOGO,
    store_logo,
  }
}

export function updateContactInfo(phone, email) {
  return {
    type: UPDATE_CONTACT_INFO,
    phone,
    email,
  }
}

export function updateStoreDetails(storeName) {
  return {
    type: UPDATE_STORE_DETAILS,
    storeName,
  }
}

export function setBankForStore(bank) {
  return {
    type: SET_BANK_FOR_STORE,
    bank,
  }
}

export function setUserForPhoneLogin(merchantId) {
  return {
    type: SET_NEW_USER_FOR_PHONE_LOGIN,
    merchantId,
  }
}

export function setExistingUserForPhoneLogin(merchant) {
  return {
    type: SET_EXISTING_USER_FOR_PHONE_LOGIN,
    merchant,
  }
}

export const setPageSubmissionStatus = value => ({
  type: SET_PAGE_SUBMISSION_STATUS,
  value,
})

export const onPageLoad = value => ({
  type: ON_PAGE_LOAD,
  value,
})

export const setDisplaySettings = settings => ({
  type: SET_DISPLAY_SETTINGS,
  settings,
})

export const setStoreTypes = storeTypes => ({
  type: SET_STORE_TYPES,
  storeTypes,
})

export const getStoreTypes = () => ({
  type: GET_STORE_TYPES,
})

export const getSubscribedModules = (storeId, roleId) => ({
  type: GET_SUBSCRIBED_MODULES,
  storeId,
  roleId,
})

export const setSubscribedModules = data => ({
  type: SET_SUBSCRIBED_MODULES,
  data,
})
export const setStoreSubscribedModules = data => ({
  type: SET_STORE_SUBSCRIBED_MODULES,
  data,
})
