import React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { LOGOUT } from 'containers/Auth/constants'
import userRoles from 'utils/userRoles'
import globalEnums from 'utils/globalEnums'
import Config_Submodules from 'utils/configSettingsSubmodules'
const ProfileMenu = ({ logoutHandler, subscriptionPlan, user, storeSubscribedModules }) => {
  const history = useHistory()

  const configEnums = storeSubscribedModules && storeSubscribedModules[globalEnums.GOPLINTO_CONFIG_SETTINGS];
  return (
    <>
      <Menu style={{ boxShadow: '0px 4px 12px #00000029' }}>
        {(user.storeId)&& <Menu.Item>
          <span
            type="button"
            onClick={() => {
              history.push({
                pathname: '/app/my-profile',
                state: {},
              })
            }}
          >
            <p className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
              My Profile
            </p>
          </span>
        </Menu.Item>}
        {(subscriptionPlan!=="ENTERPRISE" && (user.storeId))&&  <Menu.Item>
          <span
            type="button"
            onClick={() => {
              history.push({
                pathname: '/app/general/payment-plan',
                state: {},
              })
            }}
          >
            <p className="font-normal text-secondary">Upgrade Plan</p>
          </span>
        </Menu.Item>}
        {configEnums && configEnums.submodules[Config_Submodules.BILLING]&& <Menu.Item>
          <NavLink to="/app/billing">
            <span type="button">
              <p className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
                Billing History
              </p>
            </span>
          </NavLink>
        </Menu.Item>}
        {configEnums && configEnums.submodules[Config_Submodules.INVITE_MEMBERS] &&   <Menu.Item>
          <NavLink to="/app/manage-members">
            <span type="button">
              <p className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
                Invite Staff Members
              </p>
            </span>
          </NavLink>
        </Menu.Item>}
        <Menu.Item>
          <NavLink to="/helpcenter">
            <span type="button">
              <p
                className="font-normal"
                style={{ borderTop:user.storeId&& '1px solid #2424243F', width: '165%', color: 'rgba(36,36,36,0.7)' }}
              >
                Help & FAQ
              </p>
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <span type="button" onClick={logoutHandler} style={{ borderTop: '1px solid #2424243F', width: '100%' }}>
            <p className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
              Logout
            </p>
          </span>
        </Menu.Item>
      </Menu>
    </>
  )
}
/*  */
function mapStateToProps(state) {
  return {
    storeSubscribedModules: state.get('global').storeSubscribedModules,
  }
}

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch({ type: LOGOUT }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileMenu)
