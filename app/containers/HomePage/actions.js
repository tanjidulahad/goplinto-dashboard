/*
 * Home Actions
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
import { CHANGE_USERNAME, UPDATE_STORE, CREATE_STORE, GET_STORE, SET_STORE, GET_STORE_GROUP_DETAILS } from './constants'

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  }
}

export function updateStore(storeData, storeId, merchantId) {
  return {
    type: UPDATE_STORE,
    storeData,
    merchantId,
    storeId,
  }
}

export function createStore(storeName, storeType, storeDesc, merchantId, clientId) {
  return {
    type: CREATE_STORE,
    storeName,
    storeType,
    storeDesc,
    merchantId,
    clientId,
  }
}

export const getStoreData = (storeId) => ({ 
    type: GET_STORE,
    storeId,
  }
  )
export const getStoreGroupDetails = groupId => ({
  type: GET_STORE_GROUP_DETAILS,
  groupId,
})

export function setStore(storeId) {
  return {
    type: SET_STORE,
    storeId,
  }
}
