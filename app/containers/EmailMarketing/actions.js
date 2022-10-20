import { CHECK_VERIFIED_EMAIL, COPY_DEFAULT_EMAIL_TEMPLATES, CREATE_EMAIL_TEMPLATE, EDIT_EMAIL_TEMPLATE, GET_DEFAULT_EMAIL_TEMPLATES, GET_EMAIL_NOTIFICATIONS, GET_EMAIL_TEMPLATES, GET_TEMPLATE_BY_ID, GET_VERIFIED_EMAILS, REMOVE_EMAIL_NOTIFICATION, REMOVE_EMAIL_TEMPLATE, REMOVE_VERIFIED_EMAIL, SCHEDULE_TIME, SEND_EMAIL_NOTIFICATION, SET_CREATE_NEW, SET_DEFAULT_EMAIL_TEMPLATES, SET_EMAIL_NOTIFICATION, SET_EMAIL_TEMPLATE, SET_ERRORS, SET_FORMINPUT, SET_PAGE_INDEX, SET_SCHEDULE_TIME, SET_VERIFIED_EMAILS, UPLOAD_CSV, VERIFY_EMAIL_ID } from './constants'

export const setPageIndex = ({value}) => ({
  type: SET_PAGE_INDEX, 
  value 
})
export const getEmailNotifications = ({storeId,status}) => ({
  type: GET_EMAIL_NOTIFICATIONS, 
  storeId,
  status, 
})
export const setEmailNotification = (value) => ({
  type: SET_EMAIL_NOTIFICATION, 
  value, 
})
export const sendEmailNotification = (FormInput, storeId) => ({
  type: SEND_EMAIL_NOTIFICATION, 
  FormInput, storeId
})

export const removeEmailNotifications = (batchId) => ({
  type: REMOVE_EMAIL_NOTIFICATION, 
  batchId 
})

export const getDefaultTemplates = (storeId) => ({
  type: GET_DEFAULT_EMAIL_TEMPLATES, 
  storeId 
})
export const setDefaultTemplates = (value) => ({
  type: SET_DEFAULT_EMAIL_TEMPLATES, 
  value, 
})

//COPY TO CUSTOM TEMPLATES DATA
export const copyDefaultTemplate = (storeId,defaultTemplateId) => ({
  type: COPY_DEFAULT_EMAIL_TEMPLATES, 
  storeId,
  defaultTemplateId, 
})
export const getEmailTemplates = (storeId) => ({
  type: GET_EMAIL_TEMPLATES, 
  storeId 
})
export const getTemplatesById = (storeId,TemplateId) => ({
  type: GET_TEMPLATE_BY_ID, 
  storeId,
  TemplateId, 
})

export const setEmailTemplate = (value) => ({
  type: SET_EMAIL_TEMPLATE, 
  value 
})
export const removeEmailTemplate = (templateId,storeId) => ({
  type: REMOVE_EMAIL_TEMPLATE, 
  templateId, 
  storeId,
})
export const createEmailTemplate = (storeId,templateName,emailBody,emailSubject) => ({
  type: CREATE_EMAIL_TEMPLATE, 
  storeId, 
  templateName, 
  emailBody, 
  emailSubject 
})
export const editEmailTemplate = (templateId, templateName, emailBody, emailSubject, storeId) => ({
  type: EDIT_EMAIL_TEMPLATE, 
  templateId, templateName, emailBody, emailSubject, storeId
})

export const getVerifiedEmails = (storeId) => ({
  type: GET_VERIFIED_EMAILS, 
  storeId 
})
export const setVerifiedEmails = (value) => ({
  type: SET_VERIFIED_EMAILS, 
  value 
})
export const verifyEmailID = (emailId,storeId) => ({
  type: VERIFY_EMAIL_ID, 
  emailId,
  storeId, 
})

export const checkEmailIDVerified = (emailID, storeId) => ({
  type: CHECK_VERIFIED_EMAIL, 
  emailID, storeId 
})

export const removeEmailIDVerified = (recordId) => ({
  type: REMOVE_VERIFIED_EMAIL, 
  recordId 
})

export const UploadCsvToS3 = (imgFile, storeId) => ({
  type: UPLOAD_CSV,
  imgFile,
  storeId,
})
export const setScheduledTime = (value) => ({
  type: SET_SCHEDULE_TIME, 
  value 
})
export const setFormInput = (property,value) => ({
  type: SET_FORMINPUT, 
  property,value, 
})
export const setCreateNew = (value) => ({
  type: SET_CREATE_NEW, 
  value, 
})
export const setResponseErrors = (property,value) => ({
  type: SET_ERRORS,
  property, 
  value, 
})