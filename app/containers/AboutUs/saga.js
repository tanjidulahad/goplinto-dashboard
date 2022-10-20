import { call, put, takeLatest } from 'redux-saga/effects'
import { GET_ABOUT_US, GET_ABOUT_US_STATUS, SEND_ABOUT_US, SET_ABOUT_US, SET_ABOUT_US_STATUS } from './constants'
import { getAboutUsAPI, setAboutUsAPI, uploadImageAPI, WidgetStatusAPI } from 'Endpoints'
import request from 'utils/request'
import { setAboutUs, setAboutUsContact, setAboutUsDescription, setAboutUsEmail, setAboutUsStatus } from './actions'
import { uploadFileToS3 } from 'services/s3'

function* getAboutUs({ storeId }) {
    try {
        const AboutUs = yield call(request, getAboutUsAPI(storeId))
        yield put(setAboutUs(AboutUs.data))
        yield put(setAboutUsContact(AboutUs.data.contact_phone))
        yield put(setAboutUsEmail(AboutUs.data.contact_email))
        yield put(setAboutUsDescription(AboutUs.data.description))
    } catch (e) {
        console.log({ error: e })
    }
}
function* getAboutUsWidgetStatus({ storeId }) {
    try {
        const AboutUsStatus = yield call(request, WidgetStatusAPI(storeId,4))
        yield put(setAboutUsStatus(AboutUsStatus.widget_status))
    } catch (e) {
        console.log({ error: e })
    }
}
function* sendAboutUsFunction({ storeId, merchantId, description, bannerImgUrl, contactEmail, contactPhone, imgFile, SavedUrl}) {
    try {
        let ImgUrl;
        if(imgFile)
        {    
            const { name, type } = imgFile
            const requestURL = uploadImageAPI(name,type,storeId)
            const presignedPostData = yield call(request, requestURL)
            yield call(uploadFileToS3, presignedPostData, imgFile)    
            ImgUrl = `https://dsa0i94r8ef09.cloudfront.net/${presignedPostData.fileKey}`
            ImgUrl=ImgUrl.replace(" ", "%20")
        }
        const body = {
            storeId,
            merchantId,
            description,
            bannerImgUrl: imgFile?ImgUrl: SavedUrl||"",
            contactEmail,
            contactPhone,
        }

        const params = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        const SetData = yield call(request, setAboutUsAPI(), params)
        yield put(setAboutUs(SetData.data))
    } catch (e) {
        console.log({ error: e })
    }
}

export default function* getAboutUsWatcher() {
    yield takeLatest(GET_ABOUT_US, getAboutUs)
    yield takeLatest(SEND_ABOUT_US, sendAboutUsFunction)
    yield takeLatest(GET_ABOUT_US_STATUS, getAboutUsWidgetStatus)
}
