import produce from 'immer'
import { SET_ABOUT_US, SET_ABOUT_US_CONTACT, SET_ABOUT_US_DESCRIPTION, SET_ABOUT_US_EMAIL, SET_ABOUT_US_STATUS } from './constants'

export const initialState = {
    AboutUsDetails:"",
    isAboutUs:false,
    Email:"",
    Contact:"",
    Description:"",
    status:"",
}

const addCreditReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_ABOUT_US:
                draft.AboutUsDetails = action.value
                break;   
            case SET_ABOUT_US_EMAIL:
                draft.Email = action.value
                break;   
            case SET_ABOUT_US_CONTACT:
                draft.Contact = action.value
                break;
            case SET_ABOUT_US_DESCRIPTION:
                draft.Description = action.value
                break;
            case SET_ABOUT_US_STATUS:
                draft.status = action.value
                break;

            default:
        }
    })

export default addCreditReducer
