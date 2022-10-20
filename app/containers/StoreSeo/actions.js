import { SET_SEO_TITLE, SET_SEO_DESC, SET_SEO_TAGS, GET_SEO_DETAILS, SET_SEO_DETAILS, SET_LOADING, SET_ERROR_MESSAGE } from './constants'

export const setSeoTitle = ({ seoTitle }) => ({
  type: SET_SEO_TITLE,
  seoTitle,
})
export const setSeoDesc = ({ seoDesc }) => ({
  type: SET_SEO_DESC,
  seoDesc,
})

export const setSeoTags = ({ seoTags }) => ({
  type: SET_SEO_TAGS,
  seoTags,
})

export const getSeoDetails = ({ storeId }) => ({
  type: GET_SEO_DETAILS,
  storeId,
})

export const setSeoDetails = ({ storeId, merchantId, seoTitle, seoDesc, seoTags }) => ({
  type: SET_SEO_DETAILS,
  storeId,
  merchantId,
  seoTitle,
  seoDesc,
  seoTags,
})

export const setLoading = ({ boolean }) => ({
  type: SET_LOADING,
  boolean,
})

export const setErrorMessage = ({ boolean }) => ({
  type: SET_ERROR_MESSAGE,
  boolean,
})
