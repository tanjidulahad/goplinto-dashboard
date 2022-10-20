import { setSelectedCategory } from 'containers/AddItemPage/actions'
import { takeLatest, call, put, all } from 'redux-saga/effects'
import request from 'utils/request'
import {
  setCategories,
  setItems,
  setSubCategories,
  getCategories,
  getSubCategories,
  getItems,
  changeItemStatus,
  setPageCount,
  updateItems,
  setItemsLoading,
  setCurrentItemsCount,
  updateItemSpecifications,
  updateItemVariants,
  updateItemVariantCombinations,
  getItemVariants,
  getItemVariantCombinations,
  getInventoryStatus,
  showUpgradePopUp
} from './actions'

import {
  GET_CATEGORIES,
  GET_ITEMS,
  GET_ITEMS_BY_CATEGORY,
  GET_SUBCATEGORIES,
  TOGGLE_ITEM,
  GET_ITEMS_BY_SUBCATEGORY,
  CREATE_CATEGORY,
  CREATE_SUBCATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  DELETE_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  GET_PAGE_COUNT,
  GET_PAGINATED_ITEMS,
  GET_CURRENT_ITEM_COUNT,
  SET_CURRENT_ITEM_COUNT,
  GET_ITEM_SPECIFICATIONS,
  GET_ITEM_VARIANTS,
  GET_ITEM_VARIANT_COMBINATIONS,
  SUBMIT_VARIANT,
  REMOVE_VARIANT,
  REMOVE_VARIANT_VALUE,
  GET_INVENTORY_STATUS
} from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* getInventoryStatusFlow({ storeId }) {
  try {
    const status = yield call(request, `${BASE_URL}dashboard/get-store-onboarding-status&storeId=${storeId}`)
    if (status.inventory.status === "THRESHOLD_EXCEEDED") {
      yield put(showUpgradePopUp(true))
    }
  } catch (e) {
    console.log(e)
  }
}
function* getPaginationPageCount(action) {
  const { storeId } = action
  try {
    const pages = yield call(request, `${BASE_URL}catalog/get-page-count&storeId=${storeId}`)
    yield put(setPageCount(pages))
  } catch (e) {
    console.log({ e })
  }
}

function* getItemsPaginated(action) {
  const { storeId, categoryId, subCategoryId, pageNum } = action
  yield put(setItemsLoading(true))
  if (pageNum === 1) {
    yield put(setItems([]))
  }
  try {
    const items = yield call(
      request,
      `${BASE_URL}catalog/get-items&storeId=${storeId}&pageNum=${pageNum}&categoryId=${categoryId === 0 ? '' : categoryId
      }&subCategoryId=${subCategoryId === 0 ? '' : subCategoryId}`,
    )
    yield put(updateItems(items))
    yield put(setItemsLoading(false))
  } catch (e) {
    console.log({ e })
    yield put(setItemsLoading(false))
  }
}

function* getItemsFlow(action) {
  try {
    const { storeId } = action
    const items = yield call(request, `${BASE_URL}catalog/get-items&storeId=${storeId}`)
    yield put(setItems(items))
  } catch (e) {
    console.error(e)
  }
}

function* getCategoriesFlow(action) {
  const { storeId } = action
  try {
    const categories = yield call(request, `${BASE_URL}catalog/get-categories&storeId=${storeId}`, {})
    yield put(setCategories(categories))
  } catch (e) {
    console.error(e)
  }
}

function* getItemsByCategoryFlow(action) {
  const { storeId, categoryId } = action
  try {
    let items
    if (categoryId === 0) items = yield call(request, `${BASE_URL}catalog/get-items&storeId=${storeId}`)
    else items = yield call(request, `${BASE_URL}catalog/get-items&storeId=${storeId}&categoryId=${categoryId}`)
    yield put(setItems(items))
  } catch (e) {
    console.error(e)
  }
}

function* getItemsBySubCategoryFlow(action) {
  const { storeId, categoryId, subCategoryId } = action
  try {
    let items
    if (categoryId === 0) items = yield call(request, `${BASE_URL}catalog/get-items&storeId=${storeId}`, {})
    else if (subCategoryId === 0)
      items = yield call(request, `${BASE_URL}catalog/get-items&storeId=${storeId}&categoryId=${categoryId}`, {})
    else
      items = yield call(
        request,
        `${BASE_URL}catalog/get-items&storeId=${storeId}&categoryId=${categoryId}&subCategoryId=${subCategoryId}`,
      )
    yield put(setItems(items))
  } catch (e) {
    console.error(e)
  }
}

function* getSubCategoriesFlow(action) {
  const { storeId } = action
  try {
    const subCategories = yield call(request, `${BASE_URL}catalog/get-sub-categories&storeId=${storeId}`, {})
    yield put(setSubCategories(subCategories))
  } catch (error) {
    console.error({ error })
  }
}

function* toggleItemAvailability(action) {
  const { itemId, isAvailable } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/set-item-availability&itemId=${itemId}&isAvailable=${isAvailable ? 'Y' : 'N'}`,
      {},
    )
    yield put(changeItemStatus(itemId, isAvailable))
  } catch (e) {
    console.error(e)
  }
}

function* submitNewCategoryFlow(action) {
  const { storeId, merchantId, categoryName, imgUrl } = action
  try {
    const createdCategoryID=yield call(
      request,
      `${BASE_URL}catalog/add-category&storeId=${storeId}&userId=${merchantId}&name=${encodeURIComponent(
        categoryName,
      )}&imgUrl=${imgUrl}`,
      {},
    )
    yield put(setSelectedCategory({ label: categoryName, value: createdCategoryID }));
    yield put(getCategories(storeId))
  } catch (e) {
    console.error(e)
  }
}
function* submitVariantFlow(action) {
  try {
    const { variantDetails, storeId, itemId, variantGroupId } = action
    const params = {
      method: 'POST',
      body: JSON.stringify(variantDetails),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    if (!variantGroupId)
      yield call(request, `${BASE_URL}item-variants/set-variant-attributes&itemId=${itemId}&storeId=${storeId}`, params)
    else
      yield call(
        request,
        `${BASE_URL}item-variants/set-variant-attributes&itemId=${itemId}&storeId=${storeId}&variantGroupId=${variantGroupId}`,
        params,
      )
    yield put(getItemVariants(itemId))
    yield put(getItemVariantCombinations(itemId))
  } catch (e) {
    console.error(e)
  }
}

function* removeVariantFlow(action) {
  const { itemId, variantGroupId } = action
  try {
    yield call(
      request,
      `${BASE_URL}item-variants/delete-variant-group&itemId=${itemId}&variantGroupId=${variantGroupId}`,
    )
    yield put(getItemVariants(itemId))
    yield put(getItemVariantCombinations(itemId))
  } catch (error) {
    console.error({ error })
  }
}
function* removeVariantValueFlow(action) {
  const { itemId, variantValueId } = action
  try {
    yield call(
      request,
      `${BASE_URL}item-variants/delete-variant-value&itemId=${itemId}&variantValueId=${variantValueId}`,
    )
  } catch (error) {
    console.error({ error })
  }
}
function* submitNewSubCategoryFlow(action) {
  const { storeId, merchantId, categoryId, subCategoryName } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/add-sub-category&storeId=${storeId}&name=${encodeURIComponent(
        subCategoryName,
      )}&userId=${merchantId}&categoryId=${categoryId}`,
    )
    yield put(getSubCategories(storeId))
  } catch (error) {
    console.error({ error })
  }
}

function* deleteCategory(action) {
  const { storeId, categoryId, merchantId } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/delete-category&storeId=${storeId}&categoryId=${categoryId}&userId=${merchantId}`,
    )
    yield put(getCategories(storeId))
    yield put(getItems(storeId))
  } catch (e) {
    console.log({ e })
  }
}

function* editCategory(action) {
  const { storeId, merchantId, categoryId, categoryName, imgUrl } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/update-category&storeId=${storeId}&categoryId=${categoryId}&categoryName=${encodeURIComponent(
        categoryName,
      )}&userId=${merchantId}&imgUrl=${imgUrl || null}`,
    )
    yield put(getCategories(storeId))
    yield put(getSubCategories(storeId))
  } catch (e) {
    console.log({ e })
  }
}

function* deleteSubCategory(action) {
  const { storeId, merchantId, subCategoryId } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/delete-sub-category&storeId=${storeId}&subCategoryId=${subCategoryId}&userId=${merchantId}`,
    )
    yield put(getSubCategories(storeId))
  } catch (error) {
    console.log({ error })
  }
}

function* editSubCategory(action) {
  const { storeId, merchantId, subCategoryName, subCategoryId } = action
  try {
    yield call(
      request,
      `${BASE_URL}catalog/update-sub-category&storeId=${storeId}&subCategoryId=${subCategoryId}&name=${encodeURIComponent(
        subCategoryName,
      )}&userId=${merchantId}`,
    )
    yield put(getSubCategories(storeId))
    yield put(getCategories(storeId))
  } catch (e) {
    console.log({ e })
  }
}

function* getCurrentItemsCount(action) {
  const { storeId, category, subcategory } = action
  try {
    const count = yield call(
      request,
      `${BASE_URL}catalog/get-item-count&storeId=${storeId}&categoryId=${category ? category : ''}&subCategoryId=${subcategory ? subcategory : ''
      }`,
    )
    yield put(setCurrentItemsCount(count))
  } catch (e) {
    console.log({ e })
  }
}

function* getItemSpecifications({ item_id }) {
  try {
    const { prodSpec, addInfo } = yield all({
      prodSpec: yield call(request, `${BASE_URL}catalog/get-product-specifications&itemId=${item_id}`),
      addInfo: yield call(request, `${BASE_URL}catalog/get-product-additional-info&itemId=${item_id}`),
    })
    yield put(updateItemSpecifications(prodSpec, addInfo))
  } catch (e) {
    console.log({ e })
  }
}
function* getItemVariantsFlow({ item_id }) {
  try {
    const variantGroups = yield call(
      request,
      `${BASE_URL}item-variants/get-variant-groups-by-item-id&itemId=${item_id}`,
    )
    yield put(updateItemVariants(variantGroups))
  } catch (e) {
    console.log({ e })
  }
}
function* getItemVariantCombinationsFlow({ item_id }) {
  try {
    const variantCombinations = yield call(
      request,
      `${BASE_URL}item-variants/get-variant-items-by-item-id&itemId=${item_id}`,
    )
    yield put(updateItemVariantCombinations(variantCombinations))
  } catch (e) {
    console.log({ e })
  }
}

// Our watcher (saga).  It will watch for many things.
export default function* inventoryWatcher() {
  yield takeLatest(GET_ITEMS, getItemsFlow)
  yield takeLatest(GET_CATEGORIES, getCategoriesFlow)
  yield takeLatest(GET_ITEMS_BY_CATEGORY, getItemsByCategoryFlow)
  yield takeLatest(GET_ITEMS_BY_SUBCATEGORY, getItemsBySubCategoryFlow)
  yield takeLatest(GET_SUBCATEGORIES, getSubCategoriesFlow)
  yield takeLatest(TOGGLE_ITEM, toggleItemAvailability)
  yield takeLatest(CREATE_CATEGORY, submitNewCategoryFlow)
  yield takeLatest(SUBMIT_VARIANT, submitVariantFlow)
  yield takeLatest(REMOVE_VARIANT, removeVariantFlow)
  yield takeLatest(REMOVE_VARIANT_VALUE, removeVariantValueFlow)
  yield takeLatest(CREATE_SUBCATEGORY, submitNewSubCategoryFlow)
  yield takeLatest(DELETE_CATEGORY, deleteCategory)
  yield takeLatest(EDIT_CATEGORY, editCategory)
  yield takeLatest(DELETE_SUBCATEGORY, deleteSubCategory)
  yield takeLatest(EDIT_SUBCATEGORY, editSubCategory)
  yield takeLatest(GET_PAGE_COUNT, getPaginationPageCount)
  yield takeLatest(GET_PAGINATED_ITEMS, getItemsPaginated)
  yield takeLatest(GET_CURRENT_ITEM_COUNT, getCurrentItemsCount)
  yield takeLatest(GET_ITEM_SPECIFICATIONS, getItemSpecifications)
  yield takeLatest(GET_ITEM_VARIANTS, getItemVariantsFlow)
  yield takeLatest(GET_ITEM_VARIANT_COMBINATIONS, getItemVariantCombinationsFlow)
  yield takeLatest(GET_INVENTORY_STATUS, getInventoryStatusFlow)
}
