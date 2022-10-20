import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink, useLocation, Link } from 'react-router-dom'

import { RiExternalLinkLine } from 'react-icons/ri'

import MediaQuery from 'react-responsive'
import { Menu, Dropdown } from 'antd'

import { LOGOUT } from 'containers/Auth/constants'
import logo from 'images/plinto-logo-white.png'
import dashboardLogo from '../../images/icons/dashboard.svg'
import storeLogo from '../../images/icons/store.svg'
import inventoryLogo from '../../images/icons/inventory.png'
import whatsappicon from '../../images/icons/chat-web.svg'
import whatsappng from '../../images/icons/whatsapp.png'
import helpIcon from '../../images/icons/help-web.svg'
import branding from '../../images/icons/branding.svg'
import ordersLogo from '../../images/icons/orders.png'
import reportsLogo from '../../images/icons/reports.svg'
import integrationLogo from '../../images/icons/integration.svg'
import addOns from '../../images/add.svg'
import { PrimarySideBarWrapper, StyledNavLink } from './styled'

import userAvatar from '../../images/icons/user.png'
import designIcon from '../../images/icons/design.png'

import ShareModal from '../ShareModal'

import timerLogout from './timerLogout'
import makeStoreUrl from 'utils/makeStoreUrl'
import { useInjectReducer } from 'utils/injectReducer'
import reducer from "../../containers/StoreInfoPage/reducer"
import globalEnums from 'utils/globalEnums'
import { getSubscribedModules } from 'containers/App/actions'
import userRoles from 'utils/userRoles'
import Config_Submodules from 'utils/configSettingsSubmodules'

const PrimarySideBar = ({ logoutHandler, userProfile, store, storeSubscribedModules, getSubscribedModules }) => {
  const timer = timerLogout(3600)
  useEffect(() => {
    if (timer === 0) {
      logoutHandler()
    }
  })
useEffect(() => {  
  getSubscribedModules(store.store_id,userProfile.role_id);
}, [])

  useInjectReducer({ key: 'storeInfo', reducer })
  const menu = (
    <Menu>
      <Menu.Item>
        {store && store.store_name && store.store_id && (          <a target="_blank" href={makeStoreUrl(store.store_name, store.store_id)}>
            <p className="m-0">Visit your store</p>
          </a>
        )}
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/app/general/payment-plan">
          <p className="text-secondary m-0">Upgrade Plan</p>
        </NavLink>
      </Menu.Item>
      {configEnums && configEnums.submodules[Config_Submodules.BILLING]&& <Menu.Item>
        <NavLink to="/app/billing">
          <span type="button">
            <p style={{ margin: '0' }}>Billing History</p>
          </span>
        </NavLink>
      </Menu.Item>}
      {configEnums && configEnums.submodules[Config_Submodules.INVITE_MEMBERS] && <Menu.Item>
        <NavLink to="/app/manage-members">
          <span type="button">
            <p style={{ margin: '0' }}>Invite Staff Members</p>
          </span>
        </NavLink>
      </Menu.Item>}
      <Menu.Item>
        <NavLink to="/app/general/marketing&branding">
          <span type="button">
            <p style={{ margin: '0' }}>Marketing & Branding</p>
          </span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to="/app/reports">
          <span type="button">
            <p style={{ margin: '0' }}>View Reports</p>
          </span>
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <button
          type="button"
          onClick={() => {
            if (window.isWebView) {
              window.ReactNativeWebView.postMessage('googleSignOut')
              window.ReactNativeWebView.postMessage('facebookSignOut')
            } else window.FB && window.FB.logout()
            logoutHandler()
          }}
          className="focus:outline-none "
        >
          Logout
          <i className="fas fa-sign-out-alt ml-2" />
        </button>
      </Menu.Item>
    </Menu>
  )
  const location = useLocation()

  const checkIsOnBoardPage = e => {
    if (location.pathname == 'app/onboard-store/create') {
      e.preventDefault()
    }
  }

  let DP = userAvatar
  if (userProfile.profileImg) {
    DP = userProfile.profileImg
  }

  const [showShareModal, setShowShareModal] = useState(false)
  const configEnums = storeSubscribedModules && storeSubscribedModules[globalEnums.GOPLINTO_CONFIG_SETTINGS];
  return (
    <>
      {showShareModal && (
        <ShareModal
          close={e => {
            e.preventDefault()
            setShowShareModal(false)
          }}
          storeUrl={makeStoreUrl(store.store_name, store.store_id)}
        />
      )}
      <MediaQuery minDeviceWidth={1100}>
        <div style={{ overflowY: "auto", height: "100vh"}} className="mainDiv invisible-scrollbar">
        <PrimarySideBarWrapper>
          <div className="flex flex-col justify-start w-full bg-primary ">
            <div className="mt-6 ml-4">
              <Link  to="/app">
                <img src={logo} id="db-logo" alt="GoPlinto Logo" />
              </Link>
            </div>

            <ul className="flex flex-col sidebar-menu">
              <StyledNavLink activeclassname="active" exact to="/app" className="li">
                <span className="flex font-semibold">
                  <img src={dashboardLogo} alt=" Store Dashboard Logo" />
                  &nbsp;Dashboard
                </span>
              </StyledNavLink>
                {userProfile.role_id === userRoles.GROUP_ADMIN && (
                <StyledNavLink activeclassname="active" exact to="/app/manageStore" className="li">
                  <span className="flex font-semibold">
                    <img src={storeLogo} alt=" Store Settings Logo" />
                    &nbsp;Manage Store
                  </span>
                </StyledNavLink>
              )}
                {userProfile.role_id !== userRoles.GROUP_ADMIN && (
                <>
                    {userProfile.role_id !== userRoles.OPERATOR&& <StyledNavLink activeclassname="active" exact to="/app/storeSettings" className="li">
                    <span className="flex font-semibold">
                      <img src={storeLogo} alt=" Store Settings Logo" />
                      &nbsp;Store Settings
                    </span>
                  </StyledNavLink>}
                  <StyledNavLink activeclassname="active" exact to="/app/design" className="li">
                    <span className="flex font-semibold">
                        <img src={designIcon} alt="Inventory Logo" />
                      &nbsp;Design
                    </span>
                  </StyledNavLink>  
                  <StyledNavLink activeclassname="active" exact to="/app/manage-items" className="li rounded-r-lg border-none" style={{ background: "none", opacity: (window.location.pathname === "/app/manage-items" || window.location.pathname === "/app/manage-inventory-items") && "1" }}>
                    <span className="flex font-semibold">
                      <img src={inventoryLogo} alt="Inventory Logo" />
                      &nbsp;Products
                    </span>
                  </StyledNavLink>
                    <StyledNavLink activeclassname="active" exact to="/app/manage-items" className="li" style={{ display: (window.location.pathname !== "/app/manage-items" && window.location.pathname !== "/app/manage-inventory-items") && "none" }}>
                      &emsp;&emsp;All Products
                    </StyledNavLink>

                    <StyledNavLink activeclassname="active" exact to="/app/manage-inventory-items" className="li" style={{ display: (window.location.pathname !== "/app/manage-items" && window.location.pathname !== "/app/manage-inventory-items") && "none" }}>
                      &emsp;&emsp;Manage Inventory
                    </StyledNavLink>
                  <StyledNavLink activeclassname="active" exact to="/app/orders" className="li">
                    <span className="flex font-semibold">
                      <img src={ordersLogo} alt="Orders Logo" />
                      &nbsp;Your Orders
                    </span>
                  </StyledNavLink>
                </>
              )}
                {userProfile.role_id !== userRoles.OPERATOR && storeSubscribedModules && storeSubscribedModules[globalEnums.REPORTS] &&
              <StyledNavLink activeclassname="active" exact to="/app/reports" className="li">
                <span className="flex font-semibold">
                  <img src={reportsLogo} alt="Reports Logo" />
                  &nbsp;Reports &amp; Analytics
                </span>
              </StyledNavLink>}
              {storeSubscribedModules && storeSubscribedModules[globalEnums.MARKETING]&& (
                <>
                  <StyledNavLink activeclassname="active" exact to="/app/general/marketing&branding" className="li">
                    <span className="flex font-semibold">
                      <img src={branding} />
                      &nbsp;Marketing & Branding
                    </span>
                  </StyledNavLink>
                    {storeSubscribedModules && storeSubscribedModules[globalEnums.GOPLINTO_ADDONS] &&
                  <StyledNavLink activeclassname="active" exact to="/app/general/add-ons" className="li">
                    <span className="flex font-semibold">
                      <img src={addOns} alt="Add-Ons Logo" />
                      &nbsp;Add-ons
                    </span>
                  </StyledNavLink>}
                    
                    {storeSubscribedModules && storeSubscribedModules[globalEnums.THIRD_PARTY_SOURCE_INTEGRATION] &&
                  <StyledNavLink activeclassname="active" exact to="/app/integrations" className="li">
                    <span className="flex font-semibold">
                      <img src={integrationLogo} alt="Integrations Logo" />
                      &nbsp;Integrations
                    </span>
                  </StyledNavLink>}
                </>
              )}
            </ul>

            {store && store.store_name && store.store_id && (
              <>
                <hr className="self-center w-full mt-2 hr-dash" />
                <div className="flex py-2 w-full text-base justify-start items-center font-semibold text-white">
                  <a
                    className="font-semibold li vls"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={store.store_domain_url?store.store_domain_url:makeStoreUrl(store.store_name, store.store_id, store.store_domain_url)}
                  >
                    <p className="my-auto mr-2 capitalize text-white">View Live Store</p>
                    <RiExternalLinkLine size={27} className="text-white" />
                  </a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={e => {
                      e.preventDefault()
                      setShowShareModal(true)
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <hr className="self-center w-full mt-2 hr-dash" />
              </>
            )}

            <StyledNavLink activeclassname="active" to="/helpcenter" className="li">
              <span className="flex font-semibold items-center">
                <img src={helpIcon} alt="help logo" />
                &nbsp;Help & FAQs
              </span>
            </StyledNavLink>
            <StyledNavLink
              activeclassname="active"
              to={{ pathname: 'https://wa.me/917397306444' }}
              target="_blank"
              className="li"
            >
              <span className="flex font-semibold items-center">
                <img src={whatsappicon} alt="whatsapp logo" height="30px" width="30px" />
                &nbsp;Chat
              </span>
            </StyledNavLink>
          </div>
        </PrimarySideBarWrapper>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1099}>
        <div className="z-50">
          <ul className="mobile-bottom-nav">
            <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app">
              <img className="mobile-bottomNav-icon" src={dashboardLogo} alt="Dashboaad Logo" />
              Dashboard
            </NavLink>
            {userProfile.role_id === userRoles.GROUP_ADMIN ? (
              <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app/manageStore">
                <img className="mobile-bottomNav-icon" src={storeLogo} alt="Store Settings Logo" />
                Stores
                <div className="bottomNav-active-overlay" />
              </NavLink>
            ) : (
              <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app/storeSettings">
                <img className="mobile-bottomNav-icon" src={storeLogo} alt="Store Settings Logo" />
                Settings
                <div className="bottomNav-active-overlay" />
              </NavLink>
            )}
            <NavLink
              activeclassname="bottomNav-active"
              className="bottomNav-inactive"
              to={{ pathname: 'https://wa.me/917397306444' }}
              target="_blank"
            >
              <img className="mobile-bottomNav-icon" src={whatsappng} alt="whatsapp icon" />
              Chat
              <div className="bottomNav-active-overlay" />
            </NavLink>
            {userProfile.role_id === userRoles.GROUP_ADMIN ? (
              <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app/reports">
                <img className="mobile-bottomNav-icon" src={reportsLogo} alt="orders Logo" />
                Reports
              </NavLink>
            ) : (
              <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app/orders">
                <img className="mobile-bottomNav-icon" src={ordersLogo} alt="orders Logo" />
                Orders
              </NavLink>
            )}
            <NavLink activeclassname="bottomNav-active" className="bottomNav-inactive" exact to="/app/more-options">
              <div
                className="mobile-bottomNav-icon"
                style={{ lineHeight: '50px', marginTop: '-20px', fontSize: '35px' }}
              >
                ...
              </div>
              More
            </NavLink>
          </ul>
        </div>
      </MediaQuery>
    </>
  )
}

function mapStateToProps(state) {
  return {
    userProfile: state.get('global').user,
    store: state.get('global').store,
    storeSubscribedModules: state.get('global').storeSubscribedModules,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutHandler: () => dispatch({ type: LOGOUT }),
    getSubscribedModules: (storeId, roleId) => getSubscribedModules({storeId,roleId }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimarySideBar)
