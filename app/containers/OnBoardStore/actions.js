import { TOGGLE_STORE, TOGGLE_STORE_PREFERENCE, UPDATE_PAGE_INDEX, UPDATE_BOARD_PROGRESS } from './constants'

export const toggleStore = (storeId, isOpen) => ({ type: TOGGLE_STORE, storeId, isOpen })

export const setPageIndex = pageIndex => {
  return { type: UPDATE_PAGE_INDEX, pageIndex }
}

export const setOnBoardProgress = (progress, storeId, merchantId) => ({
  type: UPDATE_BOARD_PROGRESS,
  progress,
  storeId,
  merchantId,
})
