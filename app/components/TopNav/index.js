import React from 'react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import ProfileMenu from '../ProfileMenu'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'

import PaymentPlanPageSaga from 'containers/PaymentPlanPage/saga'
import paymentPlanReducer from 'containers/PaymentPlanPage/reducer'

import userAvatar from '../../images/icons/user.png'

const TopNav = ({ logoutHandler, userProfile, subscribedPlan }) => {
  
  useInjectReducer({ key: 'subscriptionPlans', reducer: paymentPlanReducer })
  useInjectSaga({ key: 'subscriptionPlans', saga: PaymentPlanPageSaga })
  const subscriptionPlan = (subscribedPlan && subscribedPlan[subscribedPlan.length - 1] && subscribedPlan[subscribedPlan.length - 1].subscription_plan)
  const profile_menu = <ProfileMenu logoutHandler={logoutHandler} subscriptionPlan={subscriptionPlan} user={userProfile} />
  let DP = userAvatar
  let firstName = 'Hi,'
  let lastName = 'User!'
  let fullName = "Hi, User!"
  if (userProfile.profileImg) {
    DP = userProfile.profileImg
  }

  if (userProfile.full_name) {
    fullName = userProfile.full_name
  }
  return (
    <>
      <MediaQuery minDeviceWidth={1099}>
        <div className="float-right">
          <Dropdown
            trigger={['click']}
            overlay={profile_menu}
            className="flex justify-between mt-2 gap-2 focus:outline-none"
            placement="bottomCenter"
            arrow
          >
            <button className="text-sm gap-2">
              {' '}
              <img
                className="mobile-bottomNav-icon rounded-full h-24 w-24 flex items-center justify-center"
                src={DP}
                style={{ height: '24px', width: '24px' }}
                alt="Avatar"
              />{' '}
              <span className="focus:outline-none hover:text-secondary relative">

                &nbsp; {`${fullName}`} &nbsp;{' '}
                <DownOutlined style={{ position: 'absolute', top: '8px', fontSize: '0.7em' }} />
              </span>
            </button>
          </Dropdown>
        </div>
      </MediaQuery>
    </>
  )
}

const mapStateToProps = state => ({
  userProfile: state.get('global').user,
  subscribedPlan: state.get('subscriptionPlans') && state.get('subscriptionPlans').currentSubscriptionPlan,
})

export default connect(
  mapStateToProps,
  null,
)(TopNav)
