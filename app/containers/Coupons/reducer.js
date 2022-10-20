import produce from 'immer'
import {
  SET_PAGE_INDEX,
  SET_LOADING,
  APPEND_COUPON,
  SET_COUPONS,
  SET_TOTAL_COUPONS,
  RESET_COUPONS,
  SET_PAGE_INDEX_COUPONS,
  DELETE_COUPONS,
  SET_ALL_COUPON_TYPES,
  SET_LOADING_COUPONS,
} from './constants'

// The initial state of the App
export const initialState = {
  pageIndex: 1,
  totalPages: 1,
  total: 0,
  pageCnt: [0],
  loading: true,
  fetched: false,
  fetchedType: false,
  couponType: [],
  coupons: [],
}

/* eslint-disable default-case, no-param-reassign */
const pushCouponReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOADING:
        draft.loading = action.val
        break
      case SET_PAGE_INDEX:
        draft.pageIndex = action.pageNum
        break

      case SET_LOADING_COUPONS:
        draft.loading = action.val
        break

      case SET_PAGE_INDEX_COUPONS:
        draft.pageIndex = action.pageNum
        break

      case SET_COUPONS:
        draft.pageCnt[draft.pageIndex] = action.coupons.length
        draft.coupons = action.coupons
        draft.fetched = true
        break

      case SET_ALL_COUPON_TYPES:
        draft.couponType = action.couponType
        draft.fetchedType = true
        break

      case SET_TOTAL_COUPONS:
        draft.totalPages = parseInt(Math.ceil(action.count / 10))
        let count = action.count
        draft.total = count
        const temp = [...draft.pageCnt]
        while (count >= 10) {
          temp.push(10)
          count -= 10
        }
        if (count) temp.push(count)
        draft.pageCnt = temp
        break

      case DELETE_COUPONS:
        if (draft.pageCnt[draft.pageIndex] === 1) draft.pageIndex = 1
        else {
          const ID = action.couponId
          draft.total = draft.total - 1
          draft.pageCnt[draft.pageIndex] = draft.pageCnt[draft.pageIndex] - 1
          draft.totalPages = parseInt(Math.ceil(action.pageCnt / 10))
          const tmp = [...draft.coupons].filter(coupons => coupons.entry_id !== ID)
          draft.coupons = tmp
        }
        break

      case RESET_COUPONS:
        draft.pageIndex = 1
        draft.total = 0
        draft.pageCnt = [0]
        draft.coupons = []
        draft.loading = true
        draft.fetched = false
        break

      default:
    }
  })

export default pushCouponReducer
