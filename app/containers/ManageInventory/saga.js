import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setInventoryItems } from './actions'
import { GET_INVENTORY_ITEMS, UPDATE_INVENTORY_ITEMS } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

function* updateInventoryItemsSaga({storeId,merchantId,arr}) {
    try {
        const url = `${BASE_URL}catalog-inventory/set-catalog-inventory&storeId=${storeId}&merchantId=${merchantId}`
 
        const body=arr;

        const params = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        yield call(request, url, params)
    } catch (e) {
        console.log({ error: e })
    }
}
function * getInventoryItemsSaga({storeId})
{
    try{
        const url = `${BASE_URL}catalog-inventory/get-inventory-details&storeId=${storeId}&pageNum=1`;
        const result = yield call(request, url)
        yield put(setInventoryItems(result))
    }
    catch(e){
        console.log(e);
    }
}
export default function* manageInventoryWatcher() {
    yield takeLatest(UPDATE_INVENTORY_ITEMS, updateInventoryItemsSaga)
    yield takeLatest(GET_INVENTORY_ITEMS, getInventoryItemsSaga)
}