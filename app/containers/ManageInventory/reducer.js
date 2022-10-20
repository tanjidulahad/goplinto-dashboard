import produce from "immer";
import {  SET_INVENTORY_ITEMS, SET_ITEM_VARIANTS, TRACK_TOGGLE_INVENTORY } from "./constants"

export const initialState = {
  inventoryItems: [],
  toggleTrackInventory: false
}

const manageInventoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_INVENTORY_ITEMS:
        draft.inventoryItems = action.val
        break
      case TRACK_TOGGLE_INVENTORY:
        draft.toggleTrackInventory = action.val
        break
    }
  })

export default manageInventoryReducer