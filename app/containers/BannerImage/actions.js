import { DELETE_BANNER, GET_ALL_BANNERS, SET_BANNER, SET_BANNERS, SET_BANNER_IN_DB, SET_BANNER_STATUS, UPLOAD_BANNER } from './constants'

export const getAllBanners = storeId => ({
  type: GET_ALL_BANNERS,
  storeId,
})

export const setAllBanners = banners => ({
  type: SET_BANNERS,
  banners,
})

export const setBannerStatus = (bannerIdx, boolean) => ({
  type: SET_BANNER_STATUS,
  bannerIdx,
  boolean,
})

export const setBannerInDb = (bannerIdx, url, storeId, merchantId, bannerLink) => ({
  type: SET_BANNER_IN_DB,
  bannerIdx,
  url,
  storeId,
  merchantId,
  bannerLink,
})

export const uploadBanner = (imgFile, storeId, merchantId, bannerIdx, bannerLink) => ({
  type: UPLOAD_BANNER,
  imgFile,
  storeId,
  merchantId,
  bannerIdx,
  bannerLink,
})

export const setBanner = (bannerIdx, url, bannerId) => ({
  type: SET_BANNER,
  bannerIdx,
  url,
  bannerId,
})

export const deleteBanner = (bannerIdx, storeId, bannerId) => ({
  type: DELETE_BANNER,
  bannerIdx,
  storeId,
  bannerId,
})