import React from 'react'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import MediaQuery from 'react-responsive'
import { connect } from 'react-redux'
import HelpProfileMenu from '../HelpProfileMenu'

import userAvatar from '../../images/icons/user.png'

const HelpTopNav = ({ logoutHandler, userProfile }) => {
  const help_profile_menu = <HelpProfileMenu logoutHandler={logoutHandler} />
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
      <MediaQuery minDeviceWidth={1099}>
        <div style={{ paddingLeft: '30px' }} className="float-center">
          <Dropdown
            trigger={['click']}
            overlay={help_profile_menu}
            className="flex justify-between mt-2 gap-2 focus:outline-none"
            placement="bottomCenter"
            arrow
          >
            <button className="text-sm gap-2">
              <div style={{ paddingBottom: '5px' }}>
                <img
                  className="mobile-bottomNav-icon rounded-full h-24 w-24 flex items-center justify-center"
                  src={DP}
                  style={{ height: '24px', width: '24px', paddingRight: '5px' }}
                  alt="Avatar"
                />
              </div>

              <span style={{ fontWeight: '600' }} className="focus:outline-none hover:text-secondary">
                {`${fullName}`}
              </span>
            </button>
          </Dropdown>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1099}>
        <div className="float-left" style={{ paddingLeft: '20px' }}>
          <Dropdown
            trigger={['click']}
            overlay={help_profile_menu}
            className="flex justify-between mt-2 gap-2 focus:outline-none"
            placement="bottomCenter"
            arrow
          >
            <div>
              <button className="text-sm gap-1">
                {' '}
                <img
                  className="mobile-bottomNav-icon rounded-full h-24 w-24 flex items-center justify-center"
                  src={DP}
                  style={{ height: 24, width: 24, marginLeft: '50px', paddingBottom: '10px' }}
                  alt="Avatar"
                />{' '}
                <span
                  style={{ paddingLeft: '10px', fontWeight: '450' }}
                  className="font-semibold focus:outline-none hover:text-secondary"
                >
                  {`${fullName}`}{' '}
                </span>
              </button>
            </div>
          </Dropdown>
        </div>
      </MediaQuery>
    </>
  )
}

const mapStateToProps = state => ({
  userProfile: state.get('global').user,
})

export default connect(
  mapStateToProps,
  null,
)(HelpTopNav)
