import { SET_STORE_MODULES, TOGGLE_STORE } from './constants'

export const toggleStore = (storeId, isOpen) => ({ type: TOGGLE_STORE, storeId, isOpen })
export const setStoreModules = (storeModules) => ({ type: SET_STORE_MODULES, storeModules })
