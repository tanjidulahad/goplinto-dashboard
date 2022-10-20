import {
  GET_CATEGORIES,
  GET_ITEMS,
  GET_ITEMS_BY_CATEGORY,
  GET_ITEMS_BY_SUBCATEGORY,
  SET_CATEGORIES,
  SET_ITEMS,
  GET_SUBCATEGORIES,
  SET_SUBCATEGORIES,
  TOGGLE_ITEM,
  SUBMIT_ITEM,
  CREATE_CATEGORY,
  CREATE_SUBCATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  CHANGE_ITEM_STATUS,
  CHANGE_NEW_CATEGORY_NAME,
  UPLOAD_NEW_CATEGORY_IMAGE,
  LOAD_NEW_CATEGORY_IMAGE,
  RESET_NEW_CATEGORY_IMAGE,
  RESET_NEW_CATEGORY,
  LOAD_EDIT_CATEGORY_IMAGE,
  RESET_EDIT_CATEGORY_IMAGE,
  UPLOAD_EDIT_CATEGORY_IMAGE,
  GET_PAGINATED_ITEMS,
  GET_PAGE_COUNT,
  SET_PAGE_COUNT,
  UPDATE_ITEMS,
  SET_ITEMS_LOADING,
  GET_CURRENT_ITEM_COUNT,
  SET_CURRENT_ITEM_COUNT,
  GET_ITEM_SPECIFICATIONS,
  GET_ITEM_VARIANTS,
  GET_ITEM_VARIANT_COMBINATIONS,
  UPDATE_ITEM_SPECIFICATIONS,
  UPDATE_ITEM_VARIANTS,
  UPDATE_ITEM_VARIANT_COMBINATIONS,
  SUBMIT_VARIANT,
  REMOVE_VARIANT,
  REMOVE_VARIANT_VALUE,
  NEW_ITEM_CREATED,
  GET_INVENTORY_STATUS,
  SHOW_UPGRADE_POPUP,
  SET_SELECTED_CATEGORY_ID,
} from './constants'

export const showUpgradePopUp = boolean => ({
  type: SHOW_UPGRADE_POPUP,
  boolean
})
export const getInventoryStatus = storeId => ({
  type: GET_INVENTORY_STATUS,
  storeId
})
export const getItems = storeId => ({
  type: GET_ITEMS,
  storeId,
})

export const setItems = items => ({
  type: SET_ITEMS,
  items,
})

export const getCategories = storeId => ({
  type: GET_CATEGORIES,
  storeId,
})

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
})

export const getItemsByCategory = (storeId, categoryId) => ({
  type: GET_ITEMS_BY_CATEGORY,
  storeId,
  categoryId,
})

export const getItemsBySubCategory = (storeId, categoryId, subCategoryId) => ({
  type: GET_ITEMS_BY_SUBCATEGORY,
  storeId,
  categoryId,
  subCategoryId,
})

export const getSubCategories = storeId => ({
  type: GET_SUBCATEGORIES,
  storeId,
})

export const setSubCategories = subCategories => ({
  type: SET_SUBCATEGORIES,
  subCategories,
})

export const toggleItem = (itemId, isAvailable) => ({
  type: TOGGLE_ITEM,
  itemId,
  isAvailable,
})

export const submitItemStatus = status => ({
  type: SUBMIT_ITEM,
  status,
})

export const submitNewCategory = (storeId, merchantId, categoryName, imgUrl) => ({
  type: CREATE_CATEGORY,
  storeId,
  merchantId,
  categoryName,
  imgUrl,
})
export const submitNewVariant = (variantDetails, storeId, itemId, variantGroupId) => ({
  type: SUBMIT_VARIANT,
  variantDetails,
  storeId,
  itemId,
  variantGroupId,
})
export const removeVariant = (itemId, variantGroupId) => ({
  type: REMOVE_VARIANT,
  itemId,
  variantGroupId,
})
export const removeVariantValue = (itemId, variantValueId) => ({
  type: REMOVE_VARIANT_VALUE,
  itemId,
  variantValueId,
})

export const submitNewSubCategory = (storeId, merchantId, categoryId, subCategoryName) => ({
  type: CREATE_SUBCATEGORY,
  storeId,
  merchantId,
  subCategoryName,
  categoryId,
})

export const deleteCategory = (storeId, categoryId, merchantId) => ({
  type: DELETE_CATEGORY,
  storeId,
  merchantId,
  categoryId,
})

export const editCategory = (storeId, merchantId, categoryId, categoryName, imgUrl) => ({
  type: EDIT_CATEGORY,
  storeId,
  merchantId,
  categoryId,
  imgUrl,
  categoryName,
})

export const deleteSubCategory = (storeId, merchantId, subCategoryId) => ({
  type: DELETE_SUBCATEGORY,
  storeId,
  merchantId,
  subCategoryId,
})

export const editSubCategory = (storeId, merchantId, subCategoryId, subCategoryName) => ({
  type: EDIT_SUBCATEGORY,
  storeId,
  merchantId,
  subCategoryId,
  subCategoryName,
})

export const changeItemStatus = (itemId, value) => ({
  type: CHANGE_ITEM_STATUS,
  itemId,
  value,
})

export const uploadCategoryImage = (imgFile, storeId) => ({
  type: UPLOAD_NEW_CATEGORY_IMAGE,
  imgFile,
  storeId,
})

export const changeNewCategoryName = text => ({
  type: CHANGE_NEW_CATEGORY_NAME,
  text,
})

export const loadNewCategoryImage = key => ({
  type: LOAD_NEW_CATEGORY_IMAGE,
  key,
})

export const resetNewCategoryImage = () => ({ type: RESET_NEW_CATEGORY_IMAGE })

export const resetNewCategory = () => ({
  type: RESET_NEW_CATEGORY,
})

export const uploadEditCategoryImage = (imgFile, storeId) => ({
  type: UPLOAD_EDIT_CATEGORY_IMAGE,
  imgFile,
  storeId,
})
export const loadEditCategoryImage = key => ({
  type: LOAD_EDIT_CATEGORY_IMAGE,
  key,
})

export const resetEditCategoryImage = () => ({ type: RESET_EDIT_CATEGORY_IMAGE })

export const getPaginatedItems = (storeId, categoryId, subCategoryId, pageNum) => ({
  type: GET_PAGINATED_ITEMS,
  storeId,
  categoryId,
  subCategoryId,
  pageNum,
})

export const getPageCount = storeId => ({
  type: GET_PAGE_COUNT,
  storeId,
})

export const setPageCount = pageCount => ({
  type: SET_PAGE_COUNT,
  pageCount,
})

export const getItemSpecifications = item_id => ({
  type: GET_ITEM_SPECIFICATIONS,
  item_id,
})
export const getItemVariants = item_id => ({
  type: GET_ITEM_VARIANTS,
  item_id,
})
export const getItemVariantCombinations = item_id => ({
  type: GET_ITEM_VARIANT_COMBINATIONS,
  item_id,
})

export const updateItemSpecifications = (prodSpec, addInfo) => ({
  type: UPDATE_ITEM_SPECIFICATIONS,
  prodSpec,
  addInfo,
})
export const updateItemVariants = variantGroups => ({
  type: UPDATE_ITEM_VARIANTS,
  variantGroups,
})
export const updateItemVariantCombinations = variantCombinations => ({
  type: UPDATE_ITEM_VARIANT_COMBINATIONS,
  variantCombinations,
})
export const resetSubmittedItemId = itemId => ({
  type: NEW_ITEM_CREATED,
  itemId,
})

export const updateItems = items => ({
  type: UPDATE_ITEMS,
  items,
})

export const setItemsLoading = boolean => ({
  type: SET_ITEMS_LOADING,
  boolean,
})

export const getCurrentItemsCount = (category, subcategory, storeId) => ({
  type: GET_CURRENT_ITEM_COUNT,
  category,
  subcategory,
  storeId,
})

export const setCurrentItemsCount = count => ({
  type: SET_CURRENT_ITEM_COUNT,
  count,
})
export const setSelectedCategoryId = value => ({
  type: SET_SELECTED_CATEGORY_ID,
  value
})
