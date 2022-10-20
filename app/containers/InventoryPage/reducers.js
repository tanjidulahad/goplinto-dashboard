import produce from 'immer'
import capitalize from 'utils/capitalize'
import {
  SET_ITEMS,
  SET_CATEGORIES,
  SET_SUBCATEGORIES,
  SUBMIT_ITEM,
  CHANGE_ITEM_STATUS,
  CHANGE_NEW_CATEGORY_NAME,
  LOAD_NEW_CATEGORY_IMAGE,
  RESET_NEW_CATEGORY_IMAGE,
  RESET_NEW_CATEGORY,
  LOAD_EDIT_CATEGORY_IMAGE,
  RESET_EDIT_CATEGORY_IMAGE,
  SET_PAGE_COUNT,
  UPDATE_ITEMS,
  SET_ITEMS_LOADING,
  SET_CURRENT_ITEM_COUNT,
  UPDATE_ITEM_SPECIFICATIONS,
  UPDATE_ITEM_VARIANTS,
  UPDATE_ITEM_VARIANT_COMBINATIONS,
  NEW_ITEM_CREATED,
  SHOW_UPGRADE_POPUP,
  SET_SELECTED_CATEGORY_ID,
} from './constants'

const initialState = {
  items: [],
  currentItemData: {
    initialProdSpecs: [],
    initialAddInfo: [],
  },
  itemVariantGroups: [],
  itemVariantCombinations: [],
  categories: [],
  subCategories: [],
  itemSubmitted: false,
  submittedItemId: null,
  newCategory: {
    newCategoryImgUrl: '',
    newCategoryName: '',
  },
  editCategoryImageUrl: '',
  totalPages: 0,
  loadingItems: false,
  currentItemCount: 0,
  showUpgradePopUp: false,
  selectedCategoryId:0,
}

const inventoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ITEMS:
        draft.items = action.items
        break
      case SET_CATEGORIES:
        draft.categories = action.categories.map(e => ({ ...e, category_name: capitalize(e.category_name) }))
        break
      case SET_SUBCATEGORIES:
        draft.subCategories = action.subCategories.map(e => ({
          ...e,
          sub_category_name: capitalize(e.sub_category_name),
        }))
        break
      case SUBMIT_ITEM:
        draft.itemSubmitted = action.status
        break
      case NEW_ITEM_CREATED:
        draft.submittedItemId = action.newItemId
        break
      case CHANGE_ITEM_STATUS:
        const items = draft.items.map(item => {
          if (item.item_id !== action.itemId) {
            return item
          } else {
            item.item_status = action.value ? 'AVAILABLE' : 'UNAVAILABLE'
            return item
          }
        })
        draft.items = items
        break
      case CHANGE_NEW_CATEGORY_NAME:
        const newCategoryObject = {
          newCategoryImgUrl: draft.newCategory.newCategoryImgUrl,
          newCategoryName: action.text,
        }
        draft.newCategory = newCategoryObject
        break

      case LOAD_NEW_CATEGORY_IMAGE:
        draft.newCategory.newCategoryImgUrl = `http://dsa0i94r8ef09.cloudfront.net/${action.key
          }`
        break

      case RESET_NEW_CATEGORY_IMAGE:
        draft.newCategory.newCategoryImgUrl = ''
        break

      case RESET_NEW_CATEGORY:
        draft.newCategory = {
          newCategoryImgUrl: '',
          newCategoryName: '',
        }
        break

      case LOAD_EDIT_CATEGORY_IMAGE:
        draft.editCategoryImageUrl = `http://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case RESET_EDIT_CATEGORY_IMAGE:
        draft.editCategoryImageUrl = ''
        break

      case SET_PAGE_COUNT:
        draft.pageCount = action.pageCount
        break

      case UPDATE_ITEM_SPECIFICATIONS:
        draft.currentItemData = {
          initialProdSpecs: [...action.prodSpec],
          initialAddInfo: [...action.addInfo],
        }
        break
      case UPDATE_ITEM_VARIANTS:
        draft.itemVariantGroups = action.variantGroups
        break
      case UPDATE_ITEM_VARIANT_COMBINATIONS:
        draft.itemVariantCombinations = action.variantCombinations
        break

      case UPDATE_ITEMS:
        const nextItemList = [...draft.items, ...action.items]
        draft.items = Array.from(new Set(nextItemList))
        break

      case SET_ITEMS_LOADING:
        draft.loadingItems = action.boolean
        break

      case SET_CURRENT_ITEM_COUNT:
        draft.currentItemCount = action.count
        break
      case SHOW_UPGRADE_POPUP:
        draft.showUpgradePopUp = action.boolean
        break
      case SET_SELECTED_CATEGORY_ID:
        draft.selectedCategoryId = action.value
        break
      default:
    }
  })

export default inventoryPageReducer
