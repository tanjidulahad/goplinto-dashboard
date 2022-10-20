/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'

import { SET_STORE } from 'containers/HomePage/constants'
import { DISPLAY_STORE_SETTINGS } from 'containers/StoreSettingsPage/constants'
import { SET_STORE_TYPE } from 'containers/StoreDetails/constants'
import {
  SET_USER,
  UNSET_USER,
  SET_STORE_FOR_MERCHANT,
  SET_BANK_FOR_STORE,
  SET_NEW_USER_FOR_PHONE_LOGIN,
  SET_EXISTING_USER_FOR_PHONE_LOGIN,
  SET_PAGE_SUBMISSION_STATUS,
  SET_DISPLAY_SETTINGS,
  ON_PAGE_LOAD,
  SET_STORE_TYPES,
  SET_SUBSCRIBED_MODULES,
  UPDATE_STORE_LOGO,
  UPDATE_CONTACT_INFO,
  UPDATE_STORE_DETAILS,
  SET_ONBOARD_PROGRESS_IN_APP,
  SET_STORE_GROUP_DETAILS,
  SET_STORE_SUBSCRIBED_MODULES,
} from './constants'

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  authToken: null,
  user: {},
  store: {},
  displaySettings: {},
  storeSettings: {},
  bank: {},
  pageStatus: false,
  apiStatus: true,
  storeTypes: [],
  subscription_details: {
    fetched: false,
    modules: new Array(20).fill(false),
    sub_modules: new Array(29).fill(false),
  },
  storeSubscribedModules:[],
  storeGroupDetails: {},
}

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_USER:
        draft.user = action.user
        draft.authToken = action.user.authToken
        break

      case UNSET_USER:
        draft.user = {}
        draft.authToken = null
        break

      case SET_STORE_FOR_MERCHANT:
        draft.store = action.store
        break

      case SET_STORE_GROUP_DETAILS:
        draft.storeGroupDetails = action.storeGroupDetails
        break

      case UPDATE_STORE_LOGO:
        draft.store.logo_img_url = action.store_logo
        break

      case UPDATE_CONTACT_INFO:
        draft.store.primary_phone = action.phone
        draft.store.primary_email = action.email
        break

      case UPDATE_STORE_DETAILS:
        draft.store.store_name = action.storeName
        break

      case SET_BANK_FOR_STORE:
        draft.bank = action.bank
        break

      case SET_NEW_USER_FOR_PHONE_LOGIN:
        draft.user = { merchantId: action.merchantId }
        break

      case SET_EXISTING_USER_FOR_PHONE_LOGIN:
        draft.user = action.merchant
        break

      case SET_STORE:
        draft.user.storeId = action.storeId
        break

      case SET_ONBOARD_PROGRESS_IN_APP:
        draft.store = { ...draft.store, onboard_status: action.value }
        break

      case DISPLAY_STORE_SETTINGS:
        draft.storeSettings = action.storeSettings
        break

      case SET_PAGE_SUBMISSION_STATUS:
        draft.pageStatus = action.value
        break

      case ON_PAGE_LOAD:
        draft.apiStatus = action.value
        break

      case SET_DISPLAY_SETTINGS:
        draft.displaySettings = action.settings
        break

      case SET_STORE_TYPES:
        draft.storeTypes = action.storeTypes
        break

      case SET_STORE_SUBSCRIBED_MODULES:
        draft.storeSubscribedModules = action.data
        break

      case SET_SUBSCRIBED_MODULES:
        const data = action.data&&action.data.subscribed_modules
        const newModules = [...draft.subscription_details.modules]
        const newSubModules = [...draft.subscription_details.sub_modules]
        const subscribed_modules = data&&Object.keys(data)
        subscribed_modules&&subscribed_modules.forEach(module_id => {
          newModules[+module_id] = true
          const moduleData = data[`${module_id}`]
          if (moduleData['submodules']) {
            const subscribed_sub_modules = Object.keys(moduleData['submodules'])
            subscribed_sub_modules.forEach(sub_module_id => {
              newSubModules[+sub_module_id] = true
            })
          }
        })
        draft.subscription_details = {
          fetched: true,
          modules: [...newModules],
          sub_modules: [...newSubModules],
        }
        break
    }
  })

export default appReducer
