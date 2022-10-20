import { onPageLoad } from 'containers/App/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { getAllBanners, setAllBanners, setBanner, setBannerStatus } from './actions'
import { DELETE_BANNER, GET_ALL_BANNERS,  SET_BANNER_IN_DB } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL


export function* getBanners({ storeId }) {
  try {
    yield put(onPageLoad(true))
    for (let i = 0; i < 4; i++) {
      yield put(setBannerStatus(i, true))
    }
    const banners = yield call(request, `${BASE_URL}stores/get-banners&storeId=${storeId}`)
    const usableBanners = [
      { id: null, imgUrl: '' },
      { id: null, imgUrl: '' },
      { id: null, imgUrl: '' },
      { id: null, imgUrl: '' },
    ]
    const { length } = banners
    for (let i = 0; i < Math.min(length, 4); i++) {
      usableBanners[i].imgUrl = banners[i].banner_img_url
      usableBanners[i].id = banners[i].banner_img_id
    }
    yield put(setAllBanners(usableBanners))
    for (let i = 0; i < 4; i++) {
      yield put(setBannerStatus(i, false))
    }
  } catch (err) {
    for (let i = 0; i < 4; i++) {
      yield put(setBannerStatus(i, false))
    }
    yield put(onPageLoad(false))
    console.log(err)
    /* handle error */
  }
}

export function* setBannerInDbFlow({ bannerIdx, url, merchantId, storeId, bannerLink }) {
  try {
    yield put(onPageLoad(true))
    yield put(setBannerStatus(bannerIdx, true))

    const reqBodyData = {
      imgUrl: url,
      section: 'HOME',
      startTime: '0',
      endTime: '0',
      target: bannerLink,
    }

    const params = {
      method: 'POST',
      body: JSON.stringify(reqBodyData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const bannerImgId = yield call(
      request,
      `${BASE_URL}stores/add-banner-img&storeId=${storeId}&merchantId=${merchantId}`,
      params,
    )
    yield put(setBanner(bannerIdx, url, bannerImgId))
    yield put(setBannerStatus(bannerIdx, false))
  } catch (e) {
    yield put(onPageLoad(false))
    yield put(setBannerStatus(bannerIdx, false))
    console.log(e)
  }
}

export function* deleteBannerFlow({ storeId, bannerIdx, bannerId }) {
  try {
    yield put(onPageLoad(true))
    yield put(setBannerStatus(bannerIdx, true))
    yield call(request, `${BASE_URL}stores/delete-banner-img&storeId=${storeId}&bannerImgId=${bannerId}`, {})
    yield put(getAllBanners(storeId))
    yield put(setBannerStatus(bannerIdx, false))
  } catch (err) {
    yield put(onPageLoad(false))
    console.log({ err })
  }
}

export default function* BannerPageSaga() {
  yield takeLatest(GET_ALL_BANNERS, getBanners)
  yield takeLatest(SET_BANNER_IN_DB, setBannerInDbFlow)
  yield takeLatest(DELETE_BANNER, deleteBannerFlow)
}