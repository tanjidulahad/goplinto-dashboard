import { INITIALIZE, START_SET_IMAGE_LINK, SET_IMAGE_LINK } from './constants'

export const initialize = (businessCards, qrCards) => ({
  type: INITIALIZE,
  businessCards,
  qrCards,
})

export const startSetImageLink = (imgFile, idx, kind, storeId) => ({
  type: START_SET_IMAGE_LINK,
  imgFile,
  idx,
  kind,
  storeId,
})

export const setImageLink = (idx, kind, key) => ({
  type: SET_IMAGE_LINK,
  idx,
  kind,
  key,
})
