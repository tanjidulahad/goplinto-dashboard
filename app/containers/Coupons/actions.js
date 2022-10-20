import {
  SET_PAGE_INDEX,
  SET_LOADING,
  APPEND_COUPON,
  GET_COUPONS,
  SET_COUPONS,
  GET_TOTAL_COUPONS,
  SET_TOTAL_COUPONS,
  RESET_COUPONS,
  SET_PAGE_INDEX_COUPONS,
  DELETE_COUPONS,
  DELETE_COUPONS_IN_DB,
  SET_LOADING_COUPONS,
  GET_ALL_COUPON_TYPES,
  DEACTIVATE_COUPONS,
  CREATE_COUPONS,
  UPDATE_COUPONS,
  SET_COUPONS_STATUS,
  SET_ALL_COUPON_TYPES,
} from './constants'

export const setLoading = val => ({
  type: SET_LOADING,
  val,
})

export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS,
})

export const deleteNotificationInDB = (storeId, id) => ({
  type: DELETE_NOTIFICATION_IN_DB,
  storeId,
  id,
})

export const setPageIndex = pageNum => ({
  type: SET_PAGE_INDEX,
  pageNum,
})

//Coupons

export const appendCoupon = couponObj => ({
  type: APPEND_COUPON,
  couponObj,
})

export const setLoadingCoupon = val => ({
  type: SET_LOADING_COUPONS,
  val,
})

export const resetCoupons = () => ({
  type: RESET_COUPONS,
})

export const deleteCouponInDB = (storeId, id) => ({
  type: DELETE_COUPONS_IN_DB,
  storeId,
  id,
})

export const deleteCoupon = (couponId, storeId, pageNum) => ({
  type: DELETE_COUPONS,
  couponId,
  storeId, 
  pageNum
})

export const getTotalCoupons = storeId => ({
  type: GET_TOTAL_COUPONS,
  storeId,
})

export const setTotalCoupons = count => ({
  type: SET_TOTAL_COUPONS,
  count,
})

export const setPageIndexCoupon = pageNum => ({
  type: SET_PAGE_INDEX_COUPONS,
  pageNum,
})

export const getCoupons = (storeId, pageNum) => ({
  type: GET_COUPONS,
  storeId,
  pageNum,
})

export const setCoupons = coupons => ({
  type: SET_COUPONS,
  coupons,
})

export const getAllCouponTypes = () => ({
  type: GET_ALL_COUPON_TYPES,
})

export const setAllCouponTypes = couponType => ({
  type: SET_ALL_COUPON_TYPES,
  couponType,
})

export const createCoupons = (storeId, couponData,pageNum) => ({
  type: CREATE_COUPONS,
  storeId,
  couponData,
  pageNum
})

export const updateCoupons = (storeId, couponId, couponData) => ({
  type: UPDATE_COUPONS,
  storeId,
  couponId,
  couponData,
})

export const setCouponStatus = (couponId, couponStatus) => ({
  type: SET_COUPONS_STATUS,
  couponId,
  couponStatus,
})
