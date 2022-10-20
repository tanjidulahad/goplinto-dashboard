import 'tailwindcss/tailwind.css'
import { NavLink, useHistory } from 'react-router-dom'
import React, {  useEffect } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { notification } from 'antd'
import { getIntegrations, setIntegrationStatus } from './actions'
import { makeSelectStoreId, makePageState, makeSelectSubscribedModules } from './selectors'
import saga from './saga'
import reducer from './reducer'

import 'assets/Integrations.css'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const Integrations = ({ storeId, getIntegrations, pageState, setIntegrationStatus, subscribedTo }) => {
  useInjectReducer({ key: 'integrationsReducer', reducer })
  useInjectSaga({ key: 'integrationsSaga', saga })

  useEffect(() => {
    getIntegrations(storeId)
  }, [])

  const { integrations, error } = pageState

  const handleMenu = idx => {
    if (document.getElementById(`menu-${idx}`).style.display === 'block')
      document.getElementById(`menu-${idx}`).style.display = 'none'
    else document.getElementById(`menu-${idx}`).style.display = 'block'
  }

  const openNotification = placement => {
    notification.error({
      description: `Could not complete action! Try again later.`,
      placement,
      style: { color: 'red', padding: '1.75rem' },
    })
  }

  useEffect(() => {
    if (error) openNotification('bottomRight')
  }, [error])

  const history=useHistory();
  return (<>
      {/* HELMET AREA */}
      <Helmet>
        <title>GoPlinto Integrations</title>
        <meta name="description" content="Dashboard and User Settings page" />
      </Helmet>
      {/* NAVBAR */}
    <ExtendedNavBar text={"Integrations"} onBack={()=>history.goBack()} />

      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.WIDGET_INTEGRATIONS}>
        <div className="px-6 integrations">
          {integrations.length
            ? integrations.map((component, idx) => (
                <div
                  key={component.integration_widget_id}
                  className="bg-white rounded-lg shadow-md px-4 py-4 my-4 relative integrations__card"
                >
                  {component.integration_attributes ? (
                    <div className="bold float-right integrations__threeDots">
                      <a>
                        <svg
                          width="20"
                          onClick={() => {
                            handleMenu(idx)
                          }}
                          className="float-right"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="#B2B2B2"
                        >
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </a>
                      <br />
                      <div
                        className="bg-white shadow-md px-4 py-4"
                        id={`menu-${idx}`}
                        style={{ zIndex: '2', display: 'none' }}
                      >
                        {component.record_status === 'ACTIVE' ? (
                          <p
                            onClick={() => {
                              setIntegrationStatus(storeId, component.integration_widget_domain, 'N')
                              document.getElementById('menu').style.display = 'none'
                            }}
                            className="text-black hover:text-secondary"
                          >
                            {' '}
                            Disable
                          </p>
                        ) : (
                          <p
                            onClick={() => {
                              setIntegrationStatus(storeId, component.integration_widget_domain, 'Y')
                              document.getElementById('menu').style.display = 'none'
                            }}
                            className="text-black hover:text-secondary"
                          >
                            Enable
                          </p>
                        )}
                        <br />
                        <NavLink
                          to={{
                            pathname: '/app/integration-edit',
                            state: { components: component, storeId },
                          }}
                          className="text-black hover:text-secondary"
                        >
                          {' '}
                          Edit
                        </NavLink>{' '}
                      </div>
                    </div>
                  ) : null}
                  <img width="125" height="60" className='h-8' src={component.widget_image_url} alt="analytics Logo" />
                  <br />
                  <p className="py-2 font-semibold h-16" >{component.widget_description}</p>

                  {component.integration_attributes === null ? (
                    <NavLink to={{ pathname: '/app/integration-edit', state: { components: component, storeId } }}>
                      {' '}
                      <button
                        style={{ color: '#F64C5D' }}
                        className=" text-secondary font-semibold py-2 px-4 border border-secondary rounded"
                      >
                        Connect
                      </button>
                    </NavLink>
                  ) : component.integration_attributes ? (
                    <span className="text-base flex justify-between items-center">
                      {' '}
                      <button
                        className="flex-none text-white font-semibold py-2 px-4 border bg-secondary rounded"
                        style={{ opacity: component.record_status === 'INACTIVE' ? 0.5 : 1, outline: 'none' }}
                      >
                        Connected
                      </button>
                      {component.record_status === 'INACTIVE' ? (
                        <span className="flex-none grey-text text-xs font-medium">Currently Disabled</span>
                      ) : null}
                    </span>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      </IsFeatureSubscribed>
      
      {/* footer */}
      <div style={{position:"sticky",top:"100vh",paddingTop:"10rem"}}>
        <PaymentPromotionImages/> 
      </div>
  </>)
}

const mapDispatchToProps = dispatch => ({
  getIntegrations: storeId => dispatch(getIntegrations(storeId)),
  setIntegrationStatus: (storeId, domain, status) => dispatch(setIntegrationStatus(storeId, domain, status)),
})

const mapStateToProps = createStructuredSelector({
  pageState: makePageState(),
  storeId: makeSelectStoreId(),
  subscribedTo: makeSelectSubscribedModules(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Integrations)
