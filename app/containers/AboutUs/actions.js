import { GET_ABOUT_US, GET_ABOUT_US_STATUS, SEND_ABOUT_US, SET_ABOUT_US, SET_ABOUT_US_CONTACT, SET_ABOUT_US_DESCRIPTION, SET_ABOUT_US_EMAIL, SET_ABOUT_US_STATUS } from "./constants"

export const getAboutUs = (storeId) => ({
    type: GET_ABOUT_US,
    storeId
})
export const sendAboutUs = (storeId, merchantId, contactEmail, contactPhone, description, imgFile, SavedUrl) => ({
    type: SEND_ABOUT_US,
    storeId,
    merchantId,
    contactEmail, 
    contactPhone: parseInt(contactPhone),
    description,
    imgFile,
    SavedUrl
})
export const setAboutUs = value => ({
    type: SET_ABOUT_US,
    value
})
export const setAboutUsEmail = value => ({
    type: SET_ABOUT_US_EMAIL,
    value
})
export const setAboutUsContact = value => ({
    type: SET_ABOUT_US_CONTACT,
    value
})
export const setAboutUsDescription = value => ({
    type: SET_ABOUT_US_DESCRIPTION,
    value
})
export const getAboutUsStatus = storeId => ({
    type: GET_ABOUT_US_STATUS,
    storeId
})
export const setAboutUsStatus = value => ({
    type: SET_ABOUT_US_STATUS,
    value
})
