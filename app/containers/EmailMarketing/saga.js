import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { checkEmailIDVerified, copyDefaultEmailTemplateAPI, createEmailTemplateAPI, editEmailTemplateAPI, getDefaultEmailTemplatesAPI, getEmailNotificationsAPI, getEmailTemplatesAPI, getTemplateByIdAPI, getVerifiedEmailIDsAPI, removeEmailNotificationAPI, removeEmailTemplateAPI, removeVerifiedEmail, sendEmailNotificationAPI, verifyEmailIDAPI } from 'Endpoints'
import { CHECK_VERIFIED_EMAIL, COPY_DEFAULT_EMAIL_TEMPLATES, CREATE_EMAIL_TEMPLATE, EDIT_EMAIL_TEMPLATE, GET_DEFAULT_EMAIL_TEMPLATES, GET_EMAIL_NOTIFICATIONS, GET_EMAIL_TEMPLATES, GET_TEMPLATE_BY_ID, GET_VERIFIED_EMAILS, REMOVE_EMAIL_NOTIFICATION, REMOVE_EMAIL_TEMPLATE, REMOVE_VERIFIED_EMAIL, SEND_EMAIL_NOTIFICATION, UPLOAD_CSV, VERIFY_EMAIL_ID } from './constants';
import { getEmailNotifications, getEmailTemplates, setDefaultTemplates, setEmailNotification, setEmailTemplate, setFormInput, setResponseErrors, setVerifiedEmails } from './actions';
import { uploadFileToS3 } from 'services/s3';
import { notification } from 'antd';

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
function* getEmailNotificationsSaga({ storeId, status }) {
  try {
    const url = getEmailNotificationsAPI(storeId, status);
    const result=yield call(request, url)
    yield put(setEmailNotification(result.data.batches.reverse()))
  } catch (err) {
    console.log(err)
  }
}
function* sendEmailNotificationSaga({ FormInput, storeId }) {
  try {
    const url = sendEmailNotificationAPI();
    const requestBody = { ...FormInput,storeId:storeId }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    const result = yield call(request, url, params)
    if(result.statusCode===200)
    {
      notification.success({
        message: result.message,
        placement: "bottomRight",
      })
      yield put(getEmailNotifications({storeId,status:''}))
      yield put(setFormInput("templateId", ""))
      yield put(setFormInput("templateData", ""))
      yield put(setFormInput("fileUrl", ""))
      yield put(setFormInput("scheduleTime", ""))
      yield put(setFormInput("verfiedEmailRecordId", ""))

    }
  } catch (err) {
    console.log(err)
  }
}


function* getDefaultTemplatesSaga({ storeId, status }) {
  try {
    const url = getDefaultEmailTemplatesAPI();
    const result=yield call(request, url)
    yield put(setDefaultTemplates(result.data.defaultTemplates))
  } catch (err) {
    console.log(err)
  }
}
function* copyDefaultTemplateSaga({ storeId, defaultTemplateId }) {
  try {
    const url = copyDefaultEmailTemplateAPI();
    const requestBody = {storeId,defaultTemplateId}
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url,params)
    yield put(getEmailTemplates(storeId))
  } catch (err) {
    console.log(err)
  }
}


function* getEmailTemplatesSaga({ storeId }) {
  try {
    const url = getEmailTemplatesAPI(storeId);
    const result=yield call(request, url)
    yield put(setEmailTemplate(result.data.storeTemplates))
      } catch (err) {
    console.log(err)
  }
}
function* getTemplateByIdSaga({ storeId, TemplateId }) {
  try {
    const url = getTemplateByIdAPI(storeId, TemplateId);
    const result=yield call(request, url)
      } catch (err) {
    console.log(err)
  }
}


function* createEmailTemplateSaga({ storeId, templateName, emailBody, emailSubject }) {
  try {
    const url = createEmailTemplateAPI();
    const requestBody = {
      storeId, 
      templateName, 
      emailBody, 
      emailSubject 
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, url,params)
    yield put(getEmailTemplates(storeId))
  } catch (err) {
    console.log(err)
  }
}
function* editEmailTemplateSaga({ templateId, templateName, emailBody, emailSubject, storeId }) {
  try {
    const url = editEmailTemplateAPI();
    const requestBody = { templateId, templateName, emailBody, emailSubject }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url, params)
    if(result.statusCode===200) yield put(getEmailTemplates(storeId))

  } catch (err) {
    console.log(err)
  }
}


function* removeEmailTemplateSaga({ templateId, storeId }) {
  try {

    const url = removeEmailTemplateAPI();
    const requestBody = { templateId, storeId }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result = yield call(request, url, params)
    if(result.statusCode===200)
    {
      yield put(getEmailTemplates(storeId))
    }
  } catch (err) {
    console.log(err)
  }
}

function* getVerifiedEmailsSaga({ storeId }) {
  try {
    const url = getVerifiedEmailIDsAPI(storeId);
    const result=yield call(request, url)
    yield put(setVerifiedEmails(result.data.verifiedEmails))
  } catch (err) {
    console.log(err)
  }
}

function* verifyEmailIDSaga({emailId,storeId }) {
  try {
    yield put(setResponseErrors('checkVerifiedEmail', false))
    const url = verifyEmailIDAPI();
    const requestBody={emailId,storeId}
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url, params)
  } catch (err) {
    console.log({ err })
  }
}
function* CheckVerifiedEmailSaga({ emailID, storeId }) {
  try {
    yield put(setResponseErrors('checkVerifiedEmail', false))
    const url = checkEmailIDVerified();
    const requestBody={
      emailId: emailID,
      storeId: storeId
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url, params)
    if (result.statusCode===200)
    {
      yield put(setResponseErrors('checkVerifiedEmail', false))
      yield call(window.location.reload())
    }
  } catch (err) {
    yield put(setResponseErrors('checkVerifiedEmail',true))
    console.log({ err })
  }
}
function* removeVerifiedEmailSaga({ recordId }) {
  try {
    const url = removeVerifiedEmail();
    const requestBody={
      recordId
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url, params)
    if (result.statusCode === 200) {
      yield call(window.location.reload())
    }
    
  } catch (err) {
    console.log({ err })
  }
}
function* removeEmailNotificationSaga({ batchId }) {
  try {
    const url = removeEmailNotificationAPI();
    const requestBody={batchId}
    const params = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const result=yield call(request, url, params)
    if (result.statusCode === 200) {
      yield call(window.location.reload())
    }
  } catch (err) {
    console.log({ err })
  }
}
  export function* UploadCsvToS3Saga(action) {
  const { name, type } = action.imgFile
  const { storeId } = action
  const requestURL = `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

  try {
    const presignedPostData = yield call(request, requestURL)
    yield call(uploadFileToS3, presignedPostData, action.imgFile)
    const url = `https://dsa0i94r8ef09.cloudfront.net/${presignedPostData.fileKey}`
    yield put(setFormInput("fileUrl",url))
  } catch (err) {
    console.log({ err })
  }
}

export default function* EmailMarketingWatcher() {
  yield takeLatest(GET_EMAIL_NOTIFICATIONS, getEmailNotificationsSaga)
  yield takeLatest(SEND_EMAIL_NOTIFICATION, sendEmailNotificationSaga)
  yield takeLatest(GET_DEFAULT_EMAIL_TEMPLATES, getDefaultTemplatesSaga)
  yield takeLatest(COPY_DEFAULT_EMAIL_TEMPLATES, copyDefaultTemplateSaga)
  yield takeLatest(GET_EMAIL_TEMPLATES, getEmailTemplatesSaga)
  yield takeLatest(GET_TEMPLATE_BY_ID, getTemplateByIdSaga)
  yield takeLatest(CREATE_EMAIL_TEMPLATE, createEmailTemplateSaga)
  yield takeLatest(EDIT_EMAIL_TEMPLATE, editEmailTemplateSaga)
  yield takeLatest(REMOVE_EMAIL_TEMPLATE, removeEmailTemplateSaga)
  yield takeLatest(GET_VERIFIED_EMAILS, getVerifiedEmailsSaga)
  yield takeLatest(VERIFY_EMAIL_ID, verifyEmailIDSaga)
  yield takeLatest(CHECK_VERIFIED_EMAIL, CheckVerifiedEmailSaga)
  yield takeLatest(REMOVE_VERIFIED_EMAIL, removeVerifiedEmailSaga)
  yield takeLatest(UPLOAD_CSV, UploadCsvToS3Saga)
  yield takeLatest(REMOVE_EMAIL_NOTIFICATION, removeEmailNotificationSaga)
}