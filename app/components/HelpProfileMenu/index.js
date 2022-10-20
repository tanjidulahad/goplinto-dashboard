import React from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { LOGOUT } from 'containers/Auth/constants'
import { useMediaQuery } from 'react-responsive'
const HelpProfileMenu = ({ logoutHandler }) => {
  const history = useHistory()
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  return (
    <>
      <Desktop>
        <Menu style={{ boxShadow: '0px 4px 12px #00000029' }}>
          <Menu.Item>
            <span type="button" onClick={logoutHandler}>
              <p className="font-normal" style={{ color: 'rgba(36,36,36,0.7)' }}>
                Logout
              </p>
            </span>
          </Menu.Item>
        </Menu>
      </Desktop>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch({ type: LOGOUT }),
})

export default connect(
  null,
  mapDispatchToProps,
)(HelpProfileMenu)
