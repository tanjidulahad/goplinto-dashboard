import React, { useEffect, useState } from 'react'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import TopNav from 'components/TopNav'
import { MdArrowBack } from 'react-icons/md'
import reducer from './reducers'
import capitalize from 'utils/capitalize'
import convertDate from 'utils/convertDate'
import { connect } from 'react-redux'
import { StyledTableAlt } from 'components/StyledTableAlt'
import { NavLink, useHistory } from 'react-router-dom'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { Dropdown, Modal, Menu, Button, notification } from 'antd'
import saga from './sagas'
import { getBillingHistoryItems, getCreditHistoryItems, setCancelAuto } from './actions'
import { paymentMethodUrls } from 'utils/paymentEnums'
import moment from 'moment'
import userRoles from 'utils/userRoles'
import NewFooter from 'components/Footer/newFooter'
//const { TabPane } = Tabs

const BillingHistory = ({ getBillingHistory, getCreditHistoryItems, storeId, storeCurrency ,merchantId,roleId, billComponents, creditComponents, cancelAutoRenewal, cancelError }) => {
  useInjectReducer({ key: 'billingHistoryReducer', reducer })
  useInjectSaga({ key: 'billingHistoryReducer', saga })
  useEffect(() => {
    getBillingHistory(storeId)
    getCreditHistoryItems(storeId, merchantId)
  }, [])

const [showSubs, setshowSubs] = useState(true)
const [showCreditHistory, setshowCreditHistory] = useState(false)
  const [modalDate, setModalDate] = useState()
  const [modalSubscriptionId, setModalSubscriptionId] = useState()
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const [isModalVisible, setIsModalVisible] = useState(false)
  const openNotification = placement => {
    notification['error']({
      description: `Could not cancel auto-renewal. Try again later!`,
      placement,
      style: { color: 'red', padding: '1.75rem' },
    })
  }
  useEffect(() => {
    if (cancelError) return openNotification('bottomRight')
  }, [cancelError])

  const handleOk = subscriptionId => {
    cancelAutoRenewal(storeId, subscriptionId)
    setModalSubscriptionId()
    setModalDate()

    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setModalSubscriptionId()
    setModalDate()
    setIsModalVisible(false)
  }
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span type="button" className="px-0.5 focus:outline-none ">
          <p
            onClick={() => {
              setIsModalVisible(true)
            }}
            className="font-normal"
            style={{ color: 'rgba(36,36,36,0.7)' }}
          >
            Cancel Auto Renewal
          </p>
        </span>
      </Menu.Item>
    </Menu>
  )
  const menuForCredit = (
    <Menu>
      <Menu.Item key="0">
        <span type="button" className="px-0.5 focus:outline-none ">
          <p        
            className="font-normal"
            style={{ color: 'rgba(36,36,36,0.7)' }}
          >
            View Invoice
          </p>
        </span>
      </Menu.Item>
    </Menu>
  )

  const history = useHistory()

  return (
    <>
    <div className="mb-10">
      <Modal
        title="Auto Renewal"
        visible={isModalVisible}
        onOk={() => {
          handleOk(modalSubscriptionId)
        }}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Don't Change
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleOk(modalSubscriptionId)
            }}
          >
            Cancel Renewal
          </Button>,
        ]}
      >
        <p className="font-bold">Are you sure you want to cancel your subscription?</p>
        <br />
        <p>Your store subscription will be cancelled on {convertDate(modalDate)}. Keep enjoying it until then.</p>
        <br />
        <span className="font-semibold color-grey">NOTE : </span>
        <span>You can change this setting any time you want!</span>
      </Modal>
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4">
          <p className="flex text-xl text-black font-semibold text-muted-med">
            <span
              className="mr-2"
              onClick={e => {
                e.preventDefault()
                history.goBack()
              }}
            >
              <MdArrowBack className="text-black mr-2" size={30} />
            </span>
            Billing History
          </p>
          <TopNav />
        </div>
      </div>
      <Desktop>
        <div className="ml-4 py-4 mlw-full md:w-3/4 mt-6 md:mt-4">
          <h1 className="mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 ">
            All Payment History
          </h1>
        </div>
      </Desktop>
      <Mobile>
        <div className="ml-1 py-2 mlw-full md:w-3/4 mt-6 md:mt-4">
          <h1 className="mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 ">
            Billing History
          </h1>
        </div>
      </Mobile>
      <div className="flex ml-6 py-2 w-full md:w-3/4 mt-6 md:mt-4">
        <h1 onClick={(e) => { setshowSubs(true); setshowCreditHistory(false) }} className={showSubs ? "p-2 rounded-md mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 bg-white" :"p-2 mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 cursor-pointer"}>
          Subscriptions
        </h1>
        <h1 onClick={(e) => { setshowCreditHistory(true); setshowSubs(false); }} className={showCreditHistory ? "p-2 rounded-md mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 bg-white " : "p-2 mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 cursor-pointer "}>
          Credits History
        </h1>
      </div>
     {showSubs && roleId!==userRoles.OPERATOR&&<Desktop>
        <div className="px-10 ">
          <div className="order-last bg-white rounded-lg tbl-rounded-top shadow-lg" />
          {billComponents.length === 0 ? (
            <div className="text-lg font-bold my-4 flex content-center" style={{ position: 'relative' }}>
              <span className="w-full md:px-2 md:py-10  font-bold text-center text-lg text-muted-light text-base">
                You have no Billing History...
              </span>
            </div>
          ) : (
            // <Tabs defaultActiveKey="1" size="large" type="card">
            //   <TabPane
            //     tab={<span style={{ color: '#f64b5d', fontWeight: '600', padding: '1rem' }}>Subscriptions</span>}
            //     key="1"
            //     style={{ background: 'white', paddingTop: '1rem' }}
            //   >
            <StyledTableAlt>
              <tbody>
                <tr className="w-full tbl-rounded-top">
                  <th className="item-label font-semibold">Description</th>
                  <th className="item-label font-semibold">Billing Date</th>
                  <th className="item-label font-semibold">Payment Mode</th>
                  <th className="item-label font-semibold">Total</th>
                  <th className="item-label font-semibold" />
                </tr>
                {billComponents &&
                  billComponents.map(component => (
                    <tr
                      style={{ background: component.subscription_status === 'ACTIVE' ? '#FFF6F7' : '' }}
                      key={component.subscription_id}
                    >
                      <td className="text-base font-semibold">
                        {capitalize(component.subscription_plan)} Plan
                        <br />
                        <span className="color-grey font-normal text-xs">
                          {' '}
                          Paid - {capitalize(component.subscription_cycle)}
                        </span>
                      </td>
                      <td className="text-base font-semibold">
                        {convertDate(component.subscription_period.startDate)}
                        <br />
                        {component.is_auto_renewable === 'N' ? (
                          <span className="color-grey font-normal text-xs">
                            {component.subscription_period.endDate > new Date() ? 'Expired' : 'Expires'} on{' '}
                            {convertDate(component.subscription_period.endDate)}
                          </span>
                        ) : (
                          <span className="color-grey font-normal text-xs">
                            Next renewal is on {convertDate(component.subscription_cycle_renewal_date)}
                          </span>
                        )}
                      </td>
                      <td className="text-base font-semibold">
                        <div>
                          {component.payment_details ? (
                            <div className="flex flex-row">
                              <img src={paymentMethodUrls[component.payment_details.network]} />

                              <span style={{ marginLeft: '10px' }}>**** {component.payment_details.last4}</span>
                            </div>
                          ) : null}
                        </div>
                      </td>
                      <td className="text-base font-semibold">{storeCurrency} {component.payment_amount}</td>
                      <td className="flex justify-end item-sublabel" style={{ fontSize: '0.92rem' }}>
                        {component.subscription_status === 'ACTIVE' && component.is_auto_renewable === 'Y' ? (
                          <div className="relative">
                            <Dropdown overlay={menu} trigger={['click']}>
                              <button
                                onClick={() => {
                                  setModalDate(component.subscription_period.endDate)
                                  setModalSubscriptionId(component.subscription_id)
                                }}
                                className="focus:outline-none text-sm gap-2"
                              >
                                <AiOutlineEllipsis className="my-auto mr-5 text-secondary" size={33} />
                              </button>
                            </Dropdown>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </StyledTableAlt>
            // </TabPane>
            // <TabPane
            //   tab={<span style={{ color: '#525452', fontWeight: '600', padding: '1rem' }}>Order History</span>}
            //   key="2"
            //   className="item-label-title text-lg capitalize"
            //   style={{
            //     marginLeft: '30%',
            //     opacity: '1',
            //     position: 'absolute',
            //     backgroundColor: '#f2f2f2',
            //     paddingRight: '15px',
            //   }}
            // >
            // <div className="my-4 flex content-center" style={{ position: 'relative' }}>
            //   <span
            //     style={{ opacity: '1', position: 'absolute', backgroundColor: '#f2f2f2', paddingRight: '15px' }}
            //   >
            //     <h1 className="item-label-title text-lg capitalize">Order History Coming Soon!</h1>
            //   </span>
            // </div>
            //   </TabPane>
            // </Tabs>
          )}
        </div>
      </Desktop>}

      {showCreditHistory && roleId!== userRoles.OPERATOR&&<Desktop>
        <div className="px-10">
          <div className="order-last bg-white rounded-lg tbl-rounded-top shadow-lg" />
          {creditComponents.length === 0 ? (
            <div className="text-lg font-bold my-4 flex content-center" style={{ position: 'relative' }}>
              <span className="w-full md:px-2 md:py-10  font-bold text-center text-lg text-muted-light text-base">
                You have no Billing History...
              </span>
            </div>
          ) : (

            <StyledTableAlt>
              <tbody >              
                <tr className="w-full tbl-rounded-top">
                    <th className="item-label font-semibold">Type</th>
                    <th className="item-label font-semibold">Billing Date</th>
                    <th className="item-label font-semibold">Credits</th>
                    <th className="item-label font-semibold">Total</th>
                </tr>
                  {creditComponents &&
                    creditComponents.map(component => (
                    <tr
                      key={component.transaction_id}
                    >
                      <td className="text-base font-semibold">
                        {capitalize(component.credit_type_transaction)} 
                     </td>
                      <td className="text-md text-gray-700 font-medium">           
                        {moment(component.transaction_time).utc(true).format("DD-MMM-YYYY, h:mm A")}
                      </td>
                        <td className="text-base font-semibold">{component.no_of_credits}</td>
                        <td className="text-base font-semibold">{storeCurrency} {component.transaction_amount}</td>
                      <td className="flex justify-end item-sublabel invisible" style={{ fontSize: '0.92rem' }}>
                          <div className="relative">
                            <Dropdown overlay={menuForCredit} trigger={['click']}>
                              <button        
                                className="focus:outline-none text-sm gap-2"
                              >
                                <AiOutlineEllipsis className="my-auto mr-5 text-secondary" size={33} />
                              </button>
                            </Dropdown>
                          </div>
                      
                      </td>
                    </tr>
                  ))}
              </tbody>
            </StyledTableAlt>
          )}
        </div>
      </Desktop>}
 {  roleId!== userRoles.OPERATOR&& <Mobile>
        {billComponents.length === 0 ? (
          <div className="text-lg font-bold my-4 flex content-center" style={{ position: 'relative' }}>
            <span className="w-full md:px-2 md:py-10  font-bold text-center text-lg text-muted-light text-base">
              You have no Billing History...
            </span>
          </div>
        ) : (
          // <Tabs defaultActiveKey="1" size="large" type="card" className="content-center">
          //   <TabPane tab={<span style={{ color: '#f64b5d', fontWeight: '600' }}>Subscriptions</span>} key="1">
          <div style={{ marginBottom: '100px' }} className=" flex flex-wrap px-4 ">
            <div className="border-b-2 tbl-rounded-top w-full">
              {billComponents &&
                billComponents.map(component => (
                  <table className="w-full tbl-rounded-top">
                    <tbody>
                      <tr>
                        <td
                          className="w-1/3 font-semibold item-label text-right"
                          style={{
                            paddingBottom: '1rem',
                            paddingTop: '1rem',
                            paddingLeft: '0.7rem',
                            paddingRight: '0.4rem',
                            background: '#e8e9ee',
                            fontSize: '0.92em',
                            color: 'black',
                          }}
                        >
                          Description
                        </td>

                        <td
                          style={{
                            paddingTop: '2rem',
                            paddingLeft: '0.7rem',
                            paddingRight: '0.4rem',
                            background: component.subscription_status === 'ACTIVE' ? '#FFF6F7' : '#FFFFFF',
                            color: 'black',
                            fontSize: '0.92rem',
                            fontWeight: 'bold',
                          }}
                          className="p-2 w-2/3 px-2 font-medium item-sublabel"
                        >
                          <div className="flex flex-row" style={{ justifyContent: 'space-between' }}>
                            {capitalize(component.subscription_plan)} Plan
                            <br />
                              <div className="relative">
                                <Dropdown
                                  trigger={['click']}
                                  overlay={menu}
                                  placement="bottomRight"
                                  className="flex justify-between mt-2 gap-2 focus:outline-none"
                                >
                                  <button
                                    onClick={() => {
                                      setModalDate(component.subscription_period.endDate)
                                      setModalSubscriptionId(component.subscription_id)
                                    }}
                                    className="text-sm gap-2"
                                  >
                                    <AiOutlineEllipsis className="my-auto mr-5 text-secondary" size={33} />
                                  </button>
                                </Dropdown>
                              </div>
                            
                          </div>
                          <span className="color-grey font-normal text-xs">
                            {' '}
                            Paid - {capitalize(component.subscription_cycle)}
                          </span>
                        </td>
                      </tr>
                      <tr className="w-full">
                        <td
                          className="w-1/3 font-semibold item-label text-right"
                          style={{
                            paddingBottom: '1rem',
                            paddingTop: '1rem',
                            paddingLeft: '0.7rem',
                            paddingRight: '0.4rem',
                            background: '#e8e9ee',
                            fontSize: '0.92em',
                            color: 'black',
                          }}
                        >
                          Billing Date
                        </td>
                        <td
                          style={{
                            paddingTop: '1.5rem',
                            paddingLeft: '0.7rem',
                            paddingRight: '0.4rem',
                            background: component.subscription_status === 'ACTIVE' ? '#FFF6F7' : '#FFFFFF',
                            color: 'black',
                            fontSize: '0.92rem',
                          }}
                          className="w-2/3 px-2 font-semibold item-sublabel"
                        >
                          {convertDate(component.subscription_period.startDate)}
                          <br />
                          {component.is_auto_renewable === 'N' ? (
                            <span className="color-grey font-normal text-xs">
                              {component.subscription_period.endDate > new Date() ? 'Expired' : 'Expires'} on{' '}
                              {convertDate(component.subscription_period.endDate)}
                            </span>
                          ) : (
                            <span className="color-grey font-normal text-xs">
                              Next renewal is on {convertDate(component.subscription_cycle_renewal_date)}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="w-1/3 font-semibold item-label text-right"
                          style={{
                            paddingBottom: '1rem',
                            paddingTop: '1rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.4rem',
                            background: '#e8e9ee',
                            fontSize: '0.92em',
                            color: 'black',
                          }}
                        >
                          Payment Mode
                        </td>
                        <td
                          style={{ background: component.subscription_status === 'ACTIVE' ? '#FFF6F7' : '#FFFFFF' }}
                          className="w-2/3 px-2 font-semibold item-sublabel"
                        >
                          <div>
                            {component.payment_details ? (
                              <div className="flex flex-row">
                                <img src={paymentMethodUrls[component.payment_details.network]} />

                                <span style={{ marginLeft: '10px' }}>**** {component.payment_details.last4}</span>
                              </div>
                            ) : null}
                          </div>
                        </td>
                        <th className="px-2 text-sm w-2/3 font-semibold item-sublabel" />
                      </tr>
                      <tr>
                        <td
                          className="border-b-2 w-1/3 font-semibold item-label text-right"
                          style={{
                            paddingBottom: '1rem',
                            paddingTop: '1rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.4rem',
                            background: '#e8e9ee',
                            fontSize: '0.92em',
                            color: 'black',
                          }}
                        >
                          Total
                        </td>
                        <td
                          style={{ background: component.subscription_status === 'ACTIVE' ? '#FFF6F7' : '#FFFFFF' }}
                          className="border-b-2 w-2/3 px-2 font-semibold item-sublabel"
                        >
                          {storeCurrency} {component.payment_amount}
                        </td>
                        <th className="px-2 text-sm w-2/3 font-semibold item-sublabel" />
                      </tr>
                    </tbody>
                  </table>
                ))}
            </div>
          </div>
          //   </TabPane>
          //   <TabPane
          //     tab={<span style={{ color: '#525452', fontWeight: '600' }}>Order History</span>}
          //     key="2"
          //     className="content-center item-label-title text-md capitalize"
          //     style={{
          //       marginLeft: '10%',
          //       padding: '20px',
          //       opacity: '1',
          //       position: 'absolute',
          //       backgroundColor: '#f2f2f2',
          //     }}
          //   >
          //     Order History Coming Soon!
          //   </TabPane>
          // </Tabs>
        )}
      </Mobile>}
    </div>
      <NewFooter/>
    </>
  )
}
const mapStateToProps = state => {
  return {
    storeId: state.get('global').store.store_id,
    storeCurrency:state.get('global').store.currency_symbol,
    billComponents: state.get('billingHistoryReducer') ? state.get('billingHistoryReducer').billingHistoryItems : [],
    creditComponents: state.get('billingHistoryReducer') ? state.get('billingHistoryReducer').creditHistory : [],
    cancelError: state.get('billingHistoryReducer') ? state.get('billingHistoryReducer').showCancelError : false,
    merchantId: state.get('global').user.merchantId,
    roleId: state.get('global').user.role_id,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getBillingHistory: storeId => {
      dispatch(getBillingHistoryItems(storeId))
    }, 
    getCreditHistoryItems: (storeId,merchantId) => {
      dispatch(getCreditHistoryItems(storeId, merchantId))
    },
    cancelAutoRenewal: (storeId, subscriptionId) => {
      dispatch(setCancelAuto(storeId, subscriptionId))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BillingHistory)
