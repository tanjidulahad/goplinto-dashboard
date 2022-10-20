import { GET_STORES_BY_GROUP, SET_STORES } from './constants'

export const setStores = stores => ({
  type: SET_STORES,
  stores,
})

export const getStoresByGroupId = groupId => ({
  type: GET_STORES_BY_GROUP,
  groupId,
})
