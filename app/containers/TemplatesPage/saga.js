import { setStoreForMerchant } from 'containers/App/actions'
import { getStoreDetailsAPI, getStoreTemplatesAPI, setStoreTemplatesAPI } from 'Endpoints'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setTemplatesArray } from './actions'
import { GET_STORE_TEMPLATES, SET_STORE_TEMPLATES } from './constants'

function* getStoreTemplatesSaga({ storeId,planId }) {
  try {
    const url = getStoreTemplatesAPI(storeId,1)
    const templates = yield call(request, url)
    yield put(setTemplatesArray({templates}))
  } catch (e) {
    console.log({ error: e })
  }
}
function* setStoreTemplatesSaga({ storeId,template }) {
  try {
    const url = setStoreTemplatesAPI(storeId)
    const requesBody={       
      templateId: template.template_id ,
      primaryColor: template.defaultAttributes.primary_color, // Optional
      secondaryColor: template.defaultAttributes.secondary_color, // Optional
      navbarColor: template.defaultAttributes.navbar_color,// Optional
      itemLayout: template.defaultAttributes.items_layout// Optional    
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(requesBody),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    yield call(request, url,params)
    const url2 = getStoreDetailsAPI(storeId)
    const store=yield call(request, url2)
    yield put(setStoreForMerchant(store))

  } catch (e) {
    console.log({ error: e })
  }
}

export default function* templatesPageWatcher() {
  yield takeLatest(GET_STORE_TEMPLATES, getStoreTemplatesSaga)
  yield takeLatest(SET_STORE_TEMPLATES, setStoreTemplatesSaga)
}