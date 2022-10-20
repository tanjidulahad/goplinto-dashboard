/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS'
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS'
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR'

export const SET_USER = 'app/SET_USER'
export const UNSET_USER = 'app/UNSET_USER'

export const SET_STORE_FOR_MERCHANT = 'app/SET_STORE_FOR_MERCHANT'
export const SET_STORE_GROUP_DETAILS = 'app/general/SET_STORE_GROUP_DETAILS'
export const UPDATE_STORE_LOGO = 'app/UPDATE_STORE_LOGO'
export const UPDATE_STORE_DETAILS = 'app/UPDATE_STORE_DETAILS'
export const UPDATE_CONTACT_INFO = 'app/UPDATE_CONTACT_INFO'
export const SET_BANK_FOR_STORE = 'app/SET_BANK_FOR_STORE'

export const SET_NEW_USER_FOR_PHONE_LOGIN = 'app/SET_NEW_USER_FOR_PHONE_LOGIN'
export const SET_EXISTING_USER_FOR_PHONE_LOGIN = 'app/SET_EXISTING_USER_FOR_PHONE_LOGIN'

export const SET_PAGE_SUBMISSION_STATUS = 'app/SET_PAGE_SUBMISSION_STATUS'
export const ON_PAGE_LOAD = 'app/ON_PAGE_LOAD'
export const SET_DISPLAY_SETTINGS = 'app/SET_DISPLAY_SETTINGS'

export const GET_SUBSCRIBED_MODULES = 'app/GET_SUBSCRIBED_MODULES'
export const SET_SUBSCRIBED_MODULES = 'app/SET_SUBSCRIBED_MODULES'

// General Settings
export const SET_ONBOARD_PROGRESS_IN_APP = 'app/SET_ONBOARD_PROGRESS_IN_APP'
export const GET_STORE_TYPES = 'app/GET_STORE_TYPES'
export const SET_STORE_TYPES = 'app/SET_STORE_TYPES'

export const SET_STORE_SUBSCRIBED_MODULES = 'app/SET_STORE_SUBSCRIBED_MODULES'