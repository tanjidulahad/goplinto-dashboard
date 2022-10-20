import { UPDATE_SOCIAL_ACCOUNTS, FETCH_SOCIAL_ACCOUNTS, SET_SOCIAL_ACCOUNTS_IN_DB } from './constants'

export const getSocialAccounts = storeId => ({ type: FETCH_SOCIAL_ACCOUNTS, storeId })

export const setSocialAccounts = (social) => ({
    type: UPDATE_SOCIAL_ACCOUNTS,
    social
  })

export const setSocialAccountsInDb = (social, storeId, merchantId) => ({
    type: SET_SOCIAL_ACCOUNTS_IN_DB,
    social,
    storeId,
    merchantId
  }
  )