import produce from 'immer'
import {
  SET_UPLOADED_IMAGE,
  SET_IMAGE,
  CREATE_NOTIFICATION_STATUS,
  CREATE_NOTIFICATION_ERROR,
  RESET_DATA,
} from './constants'

// The initial state of the App
export const initialState = {
  creating: '',
  creationError: false,
  uploadedImage: '',
}

/* eslint-disable default-case, no-param-reassign */
const CreateNotificationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_UPLOADED_IMAGE:
        draft.uploadedImage = action.key ? `https://dsa0i94r8ef09.cloudfront.net/${action.key}` : ''
        break
      case SET_IMAGE:
        draft.uploadedImage = action.imageUrl
        break
      case CREATE_NOTIFICATION_STATUS:
        draft.isCreating = action.val
        break
      case CREATE_NOTIFICATION_ERROR:
        draft.isCreationError = action.val
        break
      case RESET_DATA:
        draft.isCreating = ''
        draft.isCreationError = false
        draft.uploadedImage = ''
      default:
        break
    }
  })

export default CreateNotificationReducer
