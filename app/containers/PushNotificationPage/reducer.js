import produce from 'immer'
import {
  SET_PAGE_INDEX,
  SET_NOTIFICATIONS,
  SET_TOTAL_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  RESET_NOTIFICATIONS,
  SET_LOADING,
} from './constants'

// The initial state of the App
export const initialState = {
  pageIndex: 1,
  totalPages: 0,
  total: 0,
  pageCnt: [0],
  notifications: [],
  loading: true,
  fetched: false,
}

/* eslint-disable default-case, no-param-reassign */
const pushNotificationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOADING:
        draft.loading = action.val
        break
      case SET_PAGE_INDEX:
        draft.pageIndex = action.pageNum
        break
      case SET_NOTIFICATIONS:
        draft.pageCnt[draft.pageIndex] = action.notifications.length
        draft.notifications = action.notifications
        draft.fetched = true
        break
      case SET_TOTAL_NOTIFICATIONS:
        draft.totalPages = parseInt(Math.ceil(action.count / 10))
        let count = action.count
        draft.total = count
        const tmp = [...draft.pageCnt]
        while (count >= 10) {
          tmp.push(10)
          count -= 10
        }
        if (count) tmp.push(count)
        draft.pageCnt = tmp
        break
      case DELETE_NOTIFICATION:
        if (draft.pageCnt[draft.pageIndex] === 1) draft.pageIndex = 1
        else {
          const ID = action.id
          draft.total = draft.total - 1
          draft.pageCnt[draft.pageIndex] = draft.pageCnt[draft.pageIndex] - 1
          const tmp = [...draft.notifications].filter(notification => notification.entry_id !== ID)
          draft.notifications = tmp
        }
        break
      case RESET_NOTIFICATIONS:
        draft.pageIndex = 1
        draft.total = 0
        draft.pageCnt = [0]
        draft.notifications = []
        draft.loading = true
        draft.fetched = false
        break
      default:
    }
  })

export default pushNotificationReducer
