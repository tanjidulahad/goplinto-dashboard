import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import HelpTopNav from 'components/HelpTopNav'
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu'
import { LOGOUT } from 'containers/Auth/constants'
import storeLogo from '../../images/PlintohelpLogo2.png'
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '25px',
    height: '15px',
    right: '18px',
    top: '20px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
}
const HelpTopBar = ({ logoutHandler, user, setShowHelpContentPage }) => {
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const [showSideMenu, setShowSideMenu] = useState(false)

  const toggleMenu = () => {
    setShowSideMenu(prev => !prev)
  }

  return (
    <>
      <Desktop>
        <div className="sticky bg-white border-b-2 flex justify-between px-10 p-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowHelpContentPage(false)
            }}
          >
            <img style={{ marginLeft: '40px' }} className="py-4" src={storeLogo} />
          </div>
          <div className="flex justify-between">
            <a
              style={{ color: 'black', fontSize: '16px', marginTop: '30px' }}
              href="https://youtube.com/playlist?list=PLc8DW6Kg4VqbOzm3uQ_5JhKn-AnfgYru7"
              target="_blank"
              rel="noopener"
            >
              <span className="font-semibold mr-10 hover:text-secondary">Video Tutorials</span>
            </a>
            <NavLink
              style={{ fontSize: '16px', marginRight: '40px', marginLeft: '40px', marginTop: '30px' }}
              className="font-semibold text-black hover:text-secondary"
              to="/helpcenter/contactus"
            >
              <span>Contact Us</span>
            </NavLink>
            <NavLink
              style={{ fontSize: '16px', marginRight: '40px', marginLeft: '40px', marginTop: '30px' }}
              className="font-semibold text-black hover:text-secondary"
              to="/app"
            >
              <span>View Dashboard</span>
            </NavLink>
            {Object.keys(user).length === 0 ? (
              <NavLink to="/auth">
                <button
                  style={{ color: 'white', width: '115px', height: '45px', marginTop: '18px', marginRight: '15px' }}
                  className="bg-secondary rounded-lg p-2 font-semibold"
                >
                  Sign In
                </button>
              </NavLink>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <HelpTopNav />
              </div>
            )}
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="sticky bg-white border-b-2 flex justify-between px-5 p-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowHelpContentPage(false)
            }}
          >
            <div className="cursor-pointer">
              <img style={{ width: '200px' }} className="py-2" src={storeLogo} />
            </div>
          </div>
        </div>{' '}
        <Menu
          styles={styles}
          isOpen={showSideMenu}
          onStateChange={state => {
            setShowSideMenu(state.isOpen)
          }}
          className="bg-white"
          right
        >
          {Object.keys(user).length === 0 ? (
            <NavLink to="/auth">
              <a
                style={{
                  marginLeft: '15px',
                  fontSize: '15px',
                  marginTop: '30px',
                  fontWeight: '600',
                  paddingTop: '20px',
                }}
                rel="noopener"
                className="text-secondary p-2 font-semibold"
              >
                Sign In
              </a>
            </NavLink>
          ) : (
            <div>
              <div style={{ paddingBottom: '5px', marginLeft: '5px' }}>
                <span style={{ marginTop: '20px', marginLeft: '50px' }}>
                  <HelpTopNav />
                </span>
              </div>
              <div style={{ paddingTop: '5px' }}>
                <NavLink
                  style={{ fontSize: '14px', marginLeft: '20px', marginTop: '10px' }}
                  className="text-black"
                  to="/app"
                >
                  <p style={{ marginTop: '10px', marginLeft: '35px' }} className="text-secondary">
                    View Dashboard
                  </p>
                </NavLink>
              </div>
            </div>
          )}
          <hr />
          <a
            href="https://youtube.com/playlist?list=PLc8DW6Kg4VqbOzm3uQ_5JhKn-AnfgYru7"
            rel="noopener"
            target="_blank"
            style={{ color: 'black', marginLeft: '20px', fontSize: '15px', marginTop: '20px', fontWeight: '450' }}
          >
            Video Tutorials
          </a>
          <a
            href="/helpcenter/contactus"
            rel="noopener"
            style={{ color: 'black', marginLeft: '20px', fontSize: '15px', marginTop: '20px', fontWeight: '450' }}
          >
            Contact Us
          </a>
          <hr />
          {Object.keys(user).length && (
            <p
              onClick={logoutHandler}
              style={{ marginLeft: '20px', fontSize: '15px', marginTop: '20px', fontWeight: '500' }}
            >
              Sign Out
            </p>
          )}
        </Menu>
      </Mobile>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.get('global').user,
  }
}
const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch({ type: LOGOUT }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HelpTopBar)
