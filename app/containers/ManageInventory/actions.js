import { GET_INVENTORY_ITEMS, SET_INVENTORY_ITEMS, SET_ITEM_VARIANTS, TRACK_TOGGLE_INVENTORY, UPDATE_INVENTORY_ITEMS } from "./constants";

export const updateInventoryItems = (storeId,merchantId,arr) => ({
    type: UPDATE_INVENTORY_ITEMS,
    storeId, 
    merchantId,
    arr
})

export const getInventoryItems = storeId => ({
    type: GET_INVENTORY_ITEMS,
    storeId
})

export const setInventoryItems = val => ({
    type: SET_INVENTORY_ITEMS,
    val
})

export const setTrackToggleInventory = val => ({
    type: TRACK_TOGGLE_INVENTORY,
    val,
})