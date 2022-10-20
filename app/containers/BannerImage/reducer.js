import produce from 'immer'
import { SET_BANNER, SET_BANNERS, SET_BANNER_STATUS } from './constants'

export const initialState = {
  banners: [{ id: null, imgUrl: '' }, { id: null, imgUrl: '' }, { id: null, imgUrl: '' }, { id: null, imgUrl: '' }],
  loadingBanner: [false, false, false, false],
}

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BANNERS:
        draft.banners = action.banners
        break

      case SET_BANNER:
        draft.banners[action.bannerIdx] = { id: action.bannerId, imgUrl: action.url }
        break

      case SET_BANNER_STATUS:
        draft.loadingBanner[action.bannerIdx] = action.boolean
        break

      default:
    }
  })

export default homeReducer