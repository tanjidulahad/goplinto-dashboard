import produce from 'immer'
import {
  LOAD_ITEM_IMG,
  LOAD_ITEM_IMG1,
  LOAD_ITEM_IMG2,
  LOAD_ITEM_IMG3,
  LOAD_ITEM_IMG4,
  LOAD_ITEM_IMG5,
  RESET_ITEM_IMG,
  RESET_ITEM_IMG1,
  RESET_ITEM_IMG2,
  RESET_ITEM_IMG3,
  RESET_ITEM_IMG4,
  RESET_ITEM_IMG5,
  SET_CATEGORY,
  SHOW_UPGRADE_NOTIFICATION,
} from './constants'

const initialState = {
  itemImageUrl: '',
  itemImageUrl1: '',
  itemImageUrl2: '',
  itemImageUrl3: '',
  itemImageUrl4: '',
  itemImageUrl5: '',
  chosenCategory: {},
  chosenSubCategory: {},
  showUpgradeNotification: false,
  notificationMessage: '',
  SelectedCategory: { value: null, label: 'Choose Category' }
}

const addItemReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ITEM_IMG:
        draft.itemImageUrl = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case LOAD_ITEM_IMG1:
        draft.itemImageUrl1 = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case LOAD_ITEM_IMG2:
        draft.itemImageUrl2 = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case LOAD_ITEM_IMG3:
        draft.itemImageUrl3 = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case LOAD_ITEM_IMG4:
        draft.itemImageUrl4 = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case LOAD_ITEM_IMG5:
        draft.itemImageUrl5 = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case RESET_ITEM_IMG:
        draft.itemImageUrl = ''
        break

      case RESET_ITEM_IMG1:
        draft.itemImageUrl1 = ''
        break

      case RESET_ITEM_IMG2:
        draft.itemImageUrl2 = ''
        break

      case RESET_ITEM_IMG3:
        draft.itemImageUrl3 = ''
        break
      case RESET_ITEM_IMG4:
        draft.itemImageUrl4 = ''
        break

      case RESET_ITEM_IMG5:
        draft.itemImageUrl5 = ''
        break
      case SHOW_UPGRADE_NOTIFICATION:
        draft.showUpgradeNotification = action.boolean
        draft.notificationMessage = action.message
        break 
      case SET_CATEGORY:
        draft.SelectedCategory = action.value
        break

      default:
    }
  })

export default addItemReducer
