import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setAllMemberDetails, setInviteError, setInviteErrorMsg } from './actions'
import { GET_MEMBER_DETAILS, SET_MEMBER_DETAILS } from './constants'
const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

export function* getMemberDetailsSaga({ storeId}) {
    try {
        const url = `${BASE_URL}merchant/get-all-users-by-store-id&storeId=${storeId}`
        const result=yield call(request,url)
        yield put(setAllMemberDetails(result))
    } catch (err) {
        console.log(err);
    }
}
export function* setMemberDetailsSaga({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType, userId, edit, resending }) {
    try {

        const url = !userId?`${BASE_URL}merchant/set-user-details&storeId=${storeId}&merchantId=${merchantId}`:
            `${BASE_URL}merchant/set-user-details&storeId=${storeId}&merchantId=${merchantId}&userId=${userId}`

        var requestBody="";

        if (InviteType === "number") {
             requestBody = {
                name: MemberName,
                phone: parseInt(InviteData),
                role_id: MemberRole.roleId,
                role_name: MemberRole.roleName
            }
        }
        else {
            requestBody = {
                name: MemberName,
                email_id: InviteData,
                role_id: MemberRole.roleId,
                role_name: MemberRole.roleName,
                isd_code:null,
                phone: null,
            }
        }


        const params = yield {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        const result = yield call(request, url, params)
        if (result.error) 
        {
            yield put(setInviteError(true))
            yield put(setInviteErrorMsg(result.message))
        }
        else if (resending!==true)
        {
        yield put(setInviteError(false))
        }
    } catch (err) {
      yield put(setInviteError(true))
      yield put(setInviteErrorMsg("Something went wrong!!"))
    }
}

export default function* kioskSagaWatcher() {
    yield takeLatest(GET_MEMBER_DETAILS, getMemberDetailsSaga),
    yield takeLatest(SET_MEMBER_DETAILS, setMemberDetailsSaga)
}