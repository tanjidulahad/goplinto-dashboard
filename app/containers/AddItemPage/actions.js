import {
  LOAD_ITEM_IMG,
  SUBMIT_ITEM,
  SUBMIT_VARIANT_COMBINATIONS,
  UPLOAD_ITEM_IMG,
  UPLOAD_ITEM_IMG1,
  LOAD_ITEM_IMG1,
  UPLOAD_ITEM_IMG2,
  LOAD_ITEM_IMG2,
  UPLOAD_ITEM_IMG3,
  UPLOAD_ITEM_IMG4,
  UPLOAD_ITEM_IMG5,
  LOAD_ITEM_IMG3,
  LOAD_ITEM_IMG4,
  LOAD_ITEM_IMG5,
  RESET_ITEM_IMG,
  RESET_ITEM_IMG1,
  RESET_ITEM_IMG2,
  RESET_ITEM_IMG3,
  RESET_ITEM_IMG4,
  RESET_ITEM_IMG5,
  DELETE_ITEM,
  SHOW_UPGRADE_NOTIFICATION,
  SET_CATEGORY,
} from './constants'

export const showUpgradeNotification = (boolean, message) => ({
  type: SHOW_UPGRADE_NOTIFICATION,
  boolean,
  message,
})
export const submitItem = (itemData, storeId, merchantId, edit, itemId) => ({
  type: SUBMIT_ITEM,
  storeId,
  merchantId,
  itemData,
  edit,
  itemId,
})
export const submitVariantCombinations = (combinationData, itemId, storeId, merchantId) => ({
  type: SUBMIT_VARIANT_COMBINATIONS,
  combinationData,
  itemId,
  storeId, 
  merchantId
})

export const uploadItemImage = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG,
  imgFile,
  storeId,
})

export const uploadItemImage1 = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG1,
  imgFile,
  storeId,
})

export const uploadItemImage2 = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG2,
  imgFile,
  storeId,
})

export const uploadItemImage3 = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG3,
  imgFile,
  storeId,
})
export const uploadItemImage4 = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG4,
  imgFile,
  storeId,
})
export const uploadItemImage5 = (imgFile, storeId) => ({
  type: UPLOAD_ITEM_IMG5,
  imgFile,
  storeId,
})

export const deleteItem = (storeId, itemId, merchantId) => ({
  type: DELETE_ITEM,
  storeId,
  itemId,
  merchantId,
})

export const loadItemImage = key => ({
  type: LOAD_ITEM_IMG,
  key,
})

export const loadItemImage1 = key => ({
  type: LOAD_ITEM_IMG1,
  key,
})

export const loadItemImage2 = key => ({
  type: LOAD_ITEM_IMG2,
  key,
})

export const loadItemImage3 = key => ({
  type: LOAD_ITEM_IMG3,
  key,
})
export const loadItemImage4 = key => ({
  type: LOAD_ITEM_IMG4,
  key,
})
export const loadItemImage5 = key => ({
  type: LOAD_ITEM_IMG5,
  key,
})

export const resetItemImage = value => ({
  type: RESET_ITEM_IMG,
  value,
})

export const resetItemImage1 = value => ({
  type: RESET_ITEM_IMG1,
  value,
})

export const resetItemImage2 = value => ({
  type: RESET_ITEM_IMG2,
  value,
})

export const resetItemImage3 = value => ({
  type: RESET_ITEM_IMG3,
  value,
})
export const resetItemImage4 = value => ({
  type: RESET_ITEM_IMG4,
  value,
})
export const resetItemImage5 = value => ({
  type: RESET_ITEM_IMG5,
  value,
})
export const setSelectedCategory = value => ({
  type: SET_CATEGORY,
  value,
})