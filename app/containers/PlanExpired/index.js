import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import MediaQuery from 'react-responsive'

import { useInjectSaga } from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'

import { Dropdown, Menu } from 'antd'

import { DownOutlined } from '@ant-design/icons'

import { makeSelectStore, makeSelectMerchantId, makeSelectStoreId, makeSelectUser } from './selectors'

import homePageSaga from 'containers/HomePage/saga'

import { getStoreData } from 'containers/HomePage/actions'

import { LOGOUT } from 'containers/Auth/constants'

import userAvatar from '../../images/icons/user.png'
import makeStoreUrl from 'utils/makeStoreUrl'

const planExpiredPage = ({ store, storeId, userProfile, logoutHandler, getStoreData }) => {
  const menu = (
    <Menu>
      <Menu.Item>
        <span className="px-4" type="button" onClick={logoutHandler}>
          <div className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
            Logout
          </div>
        </span>
      </Menu.Item>
    </Menu>
  )
  useInjectSaga({ key: 'home', saga: homePageSaga })

  const history = useHistory()

  useEffect(() => {
    if (storeId) {
      getStoreData(storeId)
    }
  }, [storeId])

  let DP = userAvatar
  let fullName = 'Hi, User!'
  if (userProfile.profileImg) {
    DP = userProfile.profileImg
  }

  if (userProfile.full_name) {
    fullName = userProfile.full_name
  }
  return (
    <>
      <div>
        <div className="sticky bg-white">
          <div className="flex justify-between px-2 md:px-4 pt-4 text-xl font-semibold border-b">
            <p className="text-heavy">{store.store_name}</p>
            <div className="float-right">
              <Dropdown
                trigger={['click']}
                overlay={menu}
                className="flex justify-between mt-2 gap-2 focus:outline-none"
                placement="bottomCenter"
                arrow
              >
                <button className="text-sm gap-2">
                  <img
                    className="mobile-bottomNav-icon rounded-full h-24 w-24 flex items-center justify-center"
                    src={DP}
                    style={{ height: '24px', width: '24px' }}
                    alt="Avatar"
                  />
                  <MediaQuery minDeviceWidth={1099}>
                    <span className="focus:outline-none hover:text-secondary">
                      &nbsp; {`${fullName}`} &nbsp;{' '}
                      <DownOutlined style={{ position: 'absolute', top: '32px', fontSize: '0.7em' }} />
                    </span>
                  </MediaQuery>
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className="plan-expired-container">
        <div className="text-center bg-white p-4 md:p-10 rounded-lg">
          <div className="flex flex-col items-center">
            <img className="w-24 mb-4" src={store.logo_img_url} />
            <p className="font-semibold text-lg">You can't access the store because your free trial ended.!</p>
            <p className="text-sm">
              Your trial for {makeStoreUrl(store.store_name, storeId).slice(8)} has expired. To continue using Goplinto,
              you need a premium plan.
            </p>
          </div>
          <br />
          <button
            type="button"
            className="px-6 py-2 font-semibold rounded-md bg-secondary text-white focus:outline-none mt-4"
            onClick={() => history.push('/app/general/payment-plan')}
          >
            Select a Plan
          </button>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  userProfile: makeSelectUser(),
})
const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch({ type: LOGOUT }),
  getStoreData: storeId => {
    dispatch(getStoreData(storeId))
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(planExpiredPage)
