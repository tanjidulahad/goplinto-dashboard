import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router'
import backImg from '../../images/icons/back.svg'

import RingLoader from 'react-spinners/RingLoader'
import tick from '../../images/tick.svg'
import dash from '../../images/dash.svg'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import subscriptionPlansData from './subscriptionPlans.json'
import { Collapse, Modal, Form, Input, Select } from 'antd'

import { useMediaQuery } from 'react-responsive'
import { getCurrentSubcriptionPlan, setPaymentPlan } from './actions'
import { setPageIndex } from 'containers/OnBoardStore/actions'
import onBoardStoreReducer from 'containers/OnBoardStore/reducer'
import saga from './saga'
import reducer from './reducer'
import './paymentPlan.css'
import {
  makeSelectCurrentSubscriptionPlan,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectStore,
} from './selectors'
import TopNav from 'components/TopNav'
const { Panel } = Collapse
const { Option } = Select

const renderPlansDesktop = (currentSubscriptionPlan, subscriptionPlansData, onBoardFlow, togglePlanSelectModal) => {
  const history = useHistory()
  const currentPlan = subscriptionPlansData.find(
    plan => plan.plan_id === currentSubscriptionPlan[currentSubscriptionPlan.length - 1].plan_id,
  )
  const renderPlans = []
  subscriptionPlansData.map((plan, index) => {
    const planModules = Object.keys(plan.plan_modules)
    renderPlans.push(
      <tr key={index}>
        <td
          style={{
            height: '150px',
            width: '160px',
            borderBottomWidth: '0.3px',
            borderRightWidth: '0.3px',
            position: 'sticky',
            top: 0,
            background: 'white',
          }}
          className="px-4 py-4"
        >
          <div className="flex flex-col items-center justify-between h-full">
            <div style={{ color: '#242424', fontWeight: 'bold' }}>{plan.display_name}</div>
            {plan.plan_id == 1 &&
              (parseInt(plan.plan_id) === 1 && (
                <div className=" " style={{ fontSize: '14px', FontWeight: '500' }}>
                  Free Plan
                </div>
              ))}
            {plan.plan_id == 2 &&
              (parseInt(plan.plan_id) === 2 && (
                <div className="" style={{ fontSize: '14px', FontWeight: '500' }}>
                  For New Business
                </div>
              ))}
            {plan.plan_id == 3 &&
              (parseInt(plan.plan_id) === 3 && (
                <div className="flex flex-col items-center justify-between">
                  <div style={{ fontSize: '14px', FontWeight: '500' }}>For Growing </div>
                  <div style={{ fontSize: '14px', FontWeight: '500' }}>Business</div>
                </div>
              ))}
            {plan.plan_id == 4 &&
              (parseInt(plan.plan_id) === 4 && (
                <div className="" style={{ fontSize: '14px', FontWeight: '500' }}>
                  Get Full Suite{' '}
                </div>
              ))}
            {plan.plan_id == 5 &&
              (parseInt(plan.plan_id) === 5 && (
                <div className="" style={{ fontSize: '14px', FontWeight: '500' }}>
                  Custom Plan
                </div>
              ))}

            <button
              disabled={currentSubscriptionPlan && plan.priority <= currentPlan.priority}
              onClick={() => {
                togglePlanSelectModal(plan.plan_name)
              }}
              className={`px-2 py-1 border-2 rounded-md font-medium w-32
                ${
                  currentSubscriptionPlan && plan.priority <= currentPlan.priority
                    ? 'border-gray-400 text-gray-400 '
                    : 'border-secondary text-white bg-secondary-500'
                }`}
            >
              {currentSubscriptionPlan[currentSubscriptionPlan.length - 1].plan_id === plan.plan_id
                ? 'Current Plan'
                : 'Contact Us'}
            </button>
          </div>
        </td>
        <td style={{ height: '36px', width: '160px', background: 'rgba(246, 75, 93, 0.2)' }}>&nbsp;</td>
        <td style={{ height: '80px', width: '160px', borderBottomWidth: '0.3px', borderRightWidth: '0.3px' }}>
          <div style={{ paddingTop: '30px', paddingLeft: '22px', color: '#242424BF', fontWeight: 410 }}>
            {' '}
            {plan.total_products}
          </div>
        </td>
        {Object.keys(subscriptionPlansData[subscriptionPlansData.length - 1].plan_modules).map(module => {
          if (planModules.includes(module)) {
            return (
              <div>
                {module == 'Google Ads Integration' && (
                  <td style={{ height: '39px', width: '160px', background: 'rgba(246, 75, 93, 0.2)' }}>&nbsp;</td>
                )}
                {module == 'Download Customer Details' && (
                  <td style={{ height: '40px', width: '160px', background: 'rgba(246, 75, 93, 0.2)' }}>&nbsp;</td>
                )}
                {module == 'Inventory' && <td style={{ height: '40px', width: '160px' }}>{plan.total_products}</td>}

                <td
                  className="px-6 py-6 text-center  text-secondary"
                  style={{
                    height: '80px',
                    borderRightWidth: '0.3px',
                    borderBottomWidth: '0.3px',
                  }}
                >
                  <div style={{ paddingLeft: '45px', paddingTop: '8px' }}>
                    <img src={tick} alt="Y" width="14" height="12" />
                  </div>
                </td>
              </div>
            )
          } else if (!planModules.includes(module)) {
            return (
              <div>
                {module == 'Google Ads Integration' && (
                  <td style={{ height: '39px', width: '160px', background: 'rgba(246, 75, 93, 0.2)' }}>&nbsp;</td>
                )}
                {module == 'Download Customer Details' && (
                  <td style={{ height: '40px', width: '160px', background: 'rgba(246, 75, 93, 0.2)' }}>&nbsp;</td>
                )}
                {module == 'Inventory' && <td style={{ height: '40px', width: '160px' }}>{plan.total_products}</td>}

                <td
                  className="px-6 py-6 text-center "
                  style={{
                    color: 'rgba(0,0,0,.5)',
                    height: '80px',
                    borderRightWidth: '0.3px',
                    borderBottomWidth: '0.3px',
                  }}
                >
                  <div style={{ paddingLeft: '45px', paddingTop: '8px' }}>
                    <img src={dash} alt="N" width="14" height="12" />
                  </div>
                </td>
              </div>
            )
          }
        })}
        <td style={{ height: '40px', width: '160px', backgroundColor: '#F64B5D', opacity: 0.2 }}>&nbsp;</td>
        <td className="px-6 py-6 border text-center " style={{ height: '80px', width: '160px' }}>
          <div style={{ color: '#242424BF', fontWeight: 410 }}>{plan.additional_fees}</div>
        </td>
      </tr>,
    )
  })
  return renderPlans
}

const renderPlansMobile = (
  currentSubscriptionPlan,
  subscriptionPlansData,
  onBoardFlow,
  togglePlanSelectModal,
  overflowModules,
) => {
  const history = useHistory()
  const currentPlan = subscriptionPlansData.find(
    plan => plan.plan_id === currentSubscriptionPlan[currentSubscriptionPlan.length - 1].plan_id,
  )
  const renderPlans = []
  subscriptionPlansData.map((plan, index) => {
    const planModules = Object.keys(plan.plan_modules)
    renderPlans.push(
      <Panel style={{ color: '#242424', fontWeight: 500 }} header={plan.display_name} key={index + 1}>
        <div className="flex flex-col border-b-2 border-opacity-75 pt-2 pb-4">
          <button
            disabled={currentSubscriptionPlan && plan.priority <= currentPlan.priority}
            style={{ width: 'fit-content' }}
            className={`px-2 py-1 border-2 rounded-md font-medium  ${
              currentSubscriptionPlan && plan.priority <= currentPlan.priority
                ? 'border-gray-400 text-gray-400 '
                : 'border-secondary text-white bg-secondary-500'
            }`}
            onClick={() => {
              togglePlanSelectModal(plan.plan_name)
            }}
          >
            {currentSubscriptionPlan[currentSubscriptionPlan.length - 1].subscription_plan === plan.plan_name
              ? 'Current Plan'
              : 'Contact Us'}
          </button>
        </div>
        <div
          style={{
            background: 'rgba(246, 75, 93, 0.2)',
            color: '#242424',
            paddingTop: '5px',
            paddingBottom: '5px',
          }}
        >
          <div
            style={{
              paddingTop: '5px',
              paddingBottom: '5px',
              fontWeight: 450,
              paddingLeft: '20px',
            }}
          >
            Core E-Commerce Features
          </div>
        </div>
        <div className="flex items-center py-2 ">
          <div className="mr-2 p-0">
            <img src={tick} alt="Y" width="14" height="12" />
          </div>
          <div>{'Inventory - ' + plan.total_products}</div>
        </div>
        {planModules.map(module => (
          <div style={{ gap: '5px' }} className="flex flex-col py-2">
            {module == 'Google Ads Integration' && (
              <div
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  fontWeight: 450,
                  paddingLeft: '20px',
                  background: 'rgba(246, 75, 93, 0.2)',
                  color: '#242424',
                }}
              >
                Marketing
              </div>
            )}
            {module == 'Download Customer Details' && (
              <div
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  fontWeight: 450,
                  paddingLeft: '20px',
                  background: 'rgba(246, 75, 93, 0.2)',
                  color: '#242424',
                }}
              >
                Customer Engagement (CRM)
              </div>
            )}
            {!overflowModules.includes(module) && (
              <div className="flex flex-row items-center ">
                <div className="mr-2 p-0">
                  <img src={tick} alt="Y" width="16" height="12" />
                </div>
                <div>
                  <div>{module}</div>
                </div>
              </div>
            )}
            {overflowModules.includes(module) && (
              <div className="flex flex-row items-center">
                <div className="mr-2 p-0">
                  <img src={tick} alt="Y" width="16" height="12" />
                </div>
                <div className="flex pl-1">
                  <div>
                    {module == 'Payments & Checkout ( Visa / Master Card / AMEX / 75+ Options)'
                      ? 'Payments & Checkout (75+ Options)'
                      : module}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            paddingTop: '5px',
            paddingBottom: '5px',
            fontWeight: 450,
            paddingLeft: '20px',
            background: 'rgba(246, 75, 93, 0.2)',
            color: '#242424',
          }}
        >
          Additional Fees
        </div>
        <div className="flex items-center py-2">
          <div className="mr-2 p-0">
            <img src={tick} alt="Y" width="14" height="12" />
          </div>
          <div>{'Goplinto Transaction Fees - ' + plan.additional_fees}</div>
        </div>
      </Panel>,
    )
  })
  return renderPlans
}
const renderPlanDropdown = subscriptionPlansData => {
  const render = []
  subscriptionPlansData.map(plan => {
    render.push(<Option value={plan.plan_name}>{plan.plan_name} </Option>)
  })
  return render
}
const PaymentPlan = ({
  store,
  storeId,
  merchantId,
  getCurrentSubcriptionPlan,
  currentSubscriptionPlan,
  onBoardFlow,
  setPageIndex,
  navigatePageIndex,
  setPaymentPlan,
}) => {
  const [planSelectModal, setPlanSelectModal] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState(store.primary_phone)
  const [email, setEmail] = useState(store.primary_email)
  const [plan, setPlan] = useState('')
  const [errorFullName, setErrorFullName] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [overflowModules, setOverflowModules] = useState([])
  const history = useHistory()

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  useInjectReducer({ key: 'subscriptionPlans', reducer })
  useInjectReducer({ key: 'onBoardStore', reducer: onBoardStoreReducer })
  useInjectSaga({ key: 'subscriptionPlans', saga })

  useEffect(() => {
    getCurrentSubcriptionPlan({ storeId })
    setOverflowModules([
      'Pay On Delivery Option During Checkout',
      'Payments & Checkout ( Visa / Master Card / AMEX / 75+ Options)',
      'Delivery and Pick-Up Option During Checkout',
      'Banner Images For Highlights & Promotion',
      'Custom Website Templates ( 3 Pages )',
    ])
  }, [])

  const onSelectPlan = value => {
    setPlan(value)
  }

  const onSubmitPlanDetails = () => {
    if (fullName === '' || phone === null || email === '') {
      if (fullName === '') {
        setErrorFullName('Name can not be empty')
      }
      if (phone === null) {
        setErrorPhone('Phone can not be empty')
      }
      if (email === '') {
        setErrorEmail('email can not be empty')
      }
    } else {
      setPaymentPlan({
        merchantDetails: { fullName, plan, phone, email },
        merchantId,
        storeId,
      })
      togglePlanSelectModal()
    }
  }

  const togglePlanSelectModal = plan => {
    if (plan) {
      setPlan(plan)
    }
    setPlanSelectModal(!planSelectModal)
  }

  return (
    <div>
      {!onBoardFlow && (
        <div className="sticky bg-white mobile-topNav">
          <div className="flex justify-between pt-4 px-4 text-xl font-semibold">
            <div
              className="flex mr-4"
              onClick={() => {
                if (onBoardFlow) {
                  setPageIndex(2)
                  history.push({
                    pathname: '/app/onboard-store/create',
                    state: {},
                  })
                } else history.goBack()
              }}
            >
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1 cursor-pointer" />
            <p className="flex text-base md:text-xl font-semibold text-muted-med">Pick a plan for your store</p>
            </div>
            <TopNav />
          </div>
        </div>
      )}
      <div className="px-4 py-4 md:px-10 md:py-8">
        <div className="flex justify-between">
          {onBoardFlow && (
            <button
              onClick={() => {
                navigatePageIndex(4)
              }}
              className="mobile-paymentPlan-skip-button text-secondary w-12 h-8"
            >
              Skip
            </button>
          )}
        </div>
        {currentSubscriptionPlan.length !== 0 ? (
          <>
            <Desktop>
              <tbody
                className="plansTable"
                style={{ display: 'table', borderRadius: '10px', background: 'white', position: 'relative' }}
              >
                <tr>
                  <td
                    style={{
                      height: '150px',
                      borderRightWidth: '0.3px',
                      borderBottomWidth: '0.3px',
                      position: 'sticky',
                      top: 0,
                      backgroundColor: 'white',
                    }}
                    className="px-4 py-4 font-semibold"
                  >
                    <div style={{ alignItems: 'center', fontSize: '17px' }}>&nbsp;</div>
                  </td>
                  <td
                    style={{
                      height: '36px',
                      width: '310px',
                      background: 'rgba(246, 75, 93, 0.2)',
                      color: '#242424',
                    }}
                    className="px-6 py-1 "
                  >
                    <div style={{ fontSize: '18px', fontWeight: 450 }}>Core E-Commerce Features</div>
                  </td>
                  <td style={{ width: '310px', height: '80px' }} className="px-6 py-6 border">
                    <div style={{ paddingTop: '5px', color: '#242424;', fontWeight: 420 }}>Inventory</div>
                  </td>
                  {subscriptionPlansData.length !== 0 &&
                    Object.keys(subscriptionPlansData[subscriptionPlansData.length - 1].plan_modules).map(module => (
                      <div>
                        {module == 'Google Ads Integration' && (
                          <div
                            style={{
                              height: '39px',
                              width: '100%',
                              background: 'rgba(246, 75, 93, 0.2)',
                              color: '#242424',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '18px',
                                fontWeight: 450,
                                paddingLeft: '26px',
                                paddingTop: '6px',
                              }}
                            >
                              Marketing
                            </div>
                          </div>
                        )}
                        {module == 'Download Customer Details' && (
                          <div
                            style={{
                              height: '40px',
                              width: '100%',
                              background: 'rgba(246, 75, 93, 0.2)',
                              color: '#242424',
                            }}
                          >
                            <div
                              style={{
                                fontSize: '18px',
                                fontWeight: 450,
                                paddingLeft: '26px',
                                paddingTop: '6px',
                              }}
                            >
                              Customer Engagement (CRM)
                            </div>
                          </div>
                        )}
                        {!overflowModules.includes(module) && (
                          <td
                            style={{
                              width: '310px',
                              height: '80px',
                              borderBottomWidth: '0.3px',
                              borderRightWidth: '0.3px',
                            }}
                            className="px-6 py-6"
                          >
                            <div style={{ fontSize: '14px', paddingTop: '5px', color: '#242424;', fontWeight: 420 }}>
                              {module}
                            </div>
                          </td>
                        )}
                        {overflowModules.includes(module) && (
                          <td
                            style={{
                              width: '310px',
                              height: '80px',
                              borderBottomWidth: '0.3px',
                              borderRightWidth: '0.3px',
                            }}
                            className="px-6 py-3"
                          >
                            <div style={{ fontSize: '14px', paddingTop: '5px', color: '#242424;', fontWeight: 420 }}>
                              {module}
                            </div>
                          </td>
                        )}
                      </div>
                    ))}
                  <div
                    style={{ height: '40px', width: '100%', background: 'rgba(246, 75, 93, 0.2)', color: '#242424' }}
                  >
                    <div
                      style={{
                        fontSize: '18px',
                        fontWeight: 450,
                        paddingLeft: '26px',
                        paddingTop: '6px',
                      }}
                    >
                      Additional Fees
                    </div>
                  </div>
                  <td style={{ width: '310px', height: '80px', borderBottomWidth: '0.3px' }} className="px-6 py-6">
                    <div style={{ color: '#242424;', fontWeight: 420 }}>Goplinto Transaction Fee</div>
                  </td>
                </tr>
                {renderPlansDesktop(currentSubscriptionPlan, subscriptionPlansData, onBoardFlow, togglePlanSelectModal)}
              </tbody>
            </Desktop>
            <Mobile>
              <div style={{ paddingTop: '10px' }}>
                <div
                  style={{ minHeight: '270px' }}
                  className="mobile-paymentPlan-box bg-white rounded-lg mb-16 mt-4 pt-3 pb-3"
                >
                  <div className="flex flex-col font-semibold px-4">
                    <div className="flex flex-row justify-between">
                      {onBoardFlow && (
                        <button
                          onClick={() => {
                            navigatePageIndex(4)
                          }}
                          className="text-secondary w-12 h-8 -mt-10"
                        >
                          Skip
                        </button>
                      )}
                    </div>
                  </div>

                  <Collapse bordered={false}>
                    {renderPlansMobile(
                      currentSubscriptionPlan,
                      subscriptionPlansData,
                      onBoardFlow,
                      togglePlanSelectModal,
                      overflowModules,
                    )}
                  </Collapse>
                </div>
              </div>
            </Mobile>
          </>
        ) : (
          <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <RingLoader color="#F64C5D" size={150} />
          </div>
        )}
      </div>
      <Modal
        visible={planSelectModal}
        title="Contact Us"
        okText="Submit"
        cancelText="Cancel"
        onCancel={togglePlanSelectModal}
        onOk={() => {
          onSubmitPlanDetails()
        }}
        style={{ marginTop: '-50px', height: '660px' }}
      >
        <div className="flex justify-between">
          <div>
            <div className="text-s">Call us</div>
            <div className="text-s font-bold text-secondary">+91 73973 06444</div>
          </div>
          <div>
            <div className="text-s">Email us</div>
            <div className="text-s font-bold text-secondary">hello@goplinto.com</div>
          </div>
        </div>
        <p className="text-s mt-4">Our Sales Team will reach you to tailor fit the perfect custom plan you require.!</p>
        <Form className="w-full" layout="vertical">
          <Form.Item className="font-bold" label="Name *">
            <Input
              className={`font-normal checkout-form-input ${errorFullName && !fullName ? 'input-red' : ''}`}
              placeholder={errorFullName || 'Enter Full Name'}
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="font-bold" label="Phone Number *">
            <Input
              type="number"
              className={`font-normal checkout-form-input ${errorPhone && !phone ? 'input-red' : ''}`}
              placeholder={errorPhone || 'Enter Phone no'}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="font-bold" label="Email Id *">
            <Input
              className={`font-normal checkout-form-input ${errorEmail && !email ? 'input-red' : ''}`}
              placeholder={errorEmail || 'Enter Email Id'}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item className="font-bold" label="Interested Plan">
            <Select className="font-normal" value={plan} onChange={onSelectPlan}>
              {renderPlanDropdown(subscriptionPlansData)}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  currentSubscriptionPlan: makeSelectCurrentSubscriptionPlan(),
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
})

const mapDispatchToProps = dispatch => ({
  getCurrentSubcriptionPlan: ({ storeId }) => {
    dispatch(getCurrentSubcriptionPlan({ storeId }))
  },
  setPaymentPlan: ({ merchantDetails, merchantId, storeId }) => {
    dispatch(setPaymentPlan({ merchantDetails, merchantId, storeId }))
  },
  setPageIndex: value => dispatch(setPageIndex(value)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentPlan)
