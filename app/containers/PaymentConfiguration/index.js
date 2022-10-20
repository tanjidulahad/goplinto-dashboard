import React, { useEffect } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Tooltip } from 'antd'
import BinaryToggle from 'components/BinaryToggle'
import { createStructuredSelector } from 'reselect'
import { useMediaQuery } from 'react-responsive'
import { useInjectReducer } from 'utils/injectReducer'
import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'
import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import reducer from './reducer'
import {
  makeSelectMerchantId,
  makeSelectPaymentConfig,
  makeSelectStoreId,
  makeSelectSubscribedModules,
} from './selectors'
import {
  applyConvenienceCharge,
  getPaymentSettings,
  setConvenience,
  setInitialLoading,
  setPaymentMode,
  setCod,
  setOnline,
} from './actions'
import saga from './saga'
import OnlinePayment from '../../images/online.png'
import COD from '../../images/cod.png'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import NewFooter from 'components/Footer/newFooter'

const PaymentConfiguration = ({
  paymentConfig,
  storeId,
  merchantId,
  setPaymentMode,
  setConvenience,
  setOnline,
  setCod,
  getPaymentConfig,
  setFirstTime,
  applyConvenienceCharge,
  subscribedTo,
}) => {
  useInjectReducer({ key: 'paymentConfig', reducer })
  useInjectSaga({ key: 'paymentConfig', saga })

  useEffect(() => {
    getPaymentConfig({ storeId })
  }, [])
  const { cod, online, convenience, convenienceAmount, firstTime } = paymentConfig
  const isTablet = useMediaQuery({ minWidth: 1101 })
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 1101 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 1100 })
    return isMobile ? children : null
  }

  const toggleConvenienceChargeHandler = React.useCallback(
    e => {
      setConvenience({ boolean: !convenience })
      applyConvenienceCharge({ storeId, flagStatus: !convenience ? 'Y' : 'N', convenienceFee: 0 })
    },
    [convenience],
  )
  const toggleOnlinePayment = React.useCallback(
    e => {
      setOnline({ boolean: !online })
      setPaymentMode({ storeId, merchantId, paymentType: 'ONL', boolean: !online })
    },
    [online],
  )
  const toggleOfflinePayment = React.useCallback(
    e => {
      setCod({ boolean: !cod })
      setPaymentMode({ storeId, merchantId, paymentType: 'COD', boolean: !cod })
    },
    [cod],
  )

  return (
    <div>
      <ExtendedNavBar text={"Payment Configuration"} onHelp="/helpcenter/payment-configuration"/>
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.PAYMENT_CONFIGURATION}>
        <div className="relative h-full pb-3">
          <div className="mx-4 md:mx-10 mt-4 md:mt-8">
            <p className="my-4 text-lg md:text-xl item-label font-semibold">Payment Methods</p>
          </div>
          {firstTime ? (
            <div className="bg-white mx-4 md:mx-10 mb-16" style={{ borderRadius: '12px' }}>
              <div className=" mx-4 h-64 flex flex-col justify-center items-center">
                <p className="text-base text-center text-muted-med font-semibold">
                  Your Store Isn't Accepting Payments at the Moment
                </p>
                <button
                  onClick={() => setFirstTime({ boolean: false })}
                  className="text-base cta-btn"
                  style={{ borderRadius: '8px', padding: '0.7rem 1.2rem' }}
                >
                  Start Accepting Payments
                </button>
              </div>
              <hr />
              <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light font-semibold" size={18} />
                <span className="text-xs font-normal text-muted-light font-semibold">
                  Your store name appears on your dashboard and website.
                </span>
              </div>
            </div>
          ) : (
            <div className="mar-128">
              <div className="flex flex-wrap justify-between mx-4 md:mx-10 mt-4 md:mt-8 px-4  md:px-8  py-4 md:py-8 bg-white rounded-lg">
                <div className="w-1/2 md:w-3/4  flex">
                  <img src={COD} alt="COD Payment" className="w-full md:w-32" />
                  <Desktop>
                    <div className="px-8 self-center">
                      <p className="text-base item-label font-black">COD / POD</p>
                      <small className="text-sm md:text-xs item-sublabel font-medium">
                        Customers can pay you through cash or other methods, according to your instructions.
                      </small>
                    </div>
                  </Desktop>
                </div>
                <div className="flex justify-end items-center w-1/2 md:w-1/4 ">
                  <BinaryToggle
                    activeColor="#f64b5d"
                    inactiveColor="rgba(36,36,36,0.3)"
                    toggle={cod}
                    toggleCallback={toggleOfflinePayment}
                  />
                </div>
                <Mobile>
                  <div className="w-full py-2">
                    <p className="text-base item-label font-semibold">COD / POD</p>
                    <span className="text-sm item-sublabel font-normal">
                      Customers can pay you through cash or other methods, according to your instructions.
                    </span>
                  </div>
                </Mobile>
              </div>

              <div className="flex flex-wrap  justify-between mx-4 md:mx-10 mt-4 md:mt-8 px-4  md:px-8  py-4 md:py-8 bg-white rounded-lg">
                <div className="w-1/2 md:w-3/4  flex">
                  <img src={OnlinePayment} alt="Online Payment" className="w-full md:w-32" />
                  <Desktop>
                    <div className="px-8 pt-4 self-ceter">
                      <p className="text-base item-label font-semibold">Online Payments</p>
                      <small className="text-sm md:text-xs item-sublabel font-medium">
                        It gives you access to all payment modes including credit card, debit card, net banking, UPI and
                        popular wallets.{' '}
                        <span className="text-xs text-muted-light font-light">(3% per transaction)</span>
                      </small>
                    </div>
                  </Desktop>
                </div>
                <div className="flex justify-end items-center w-1/4 ">
                  <BinaryToggle
                    activeColor="#f64b5d"
                    inactiveColor="rgba(36,36,36,0.3)"
                    toggle={online}
                    toggleCallback={toggleOnlinePayment}
                  />
                  <div className="hide-mobile">&emsp;</div>
                </div>
                <Mobile>
                  <div className="w-full py-2">
                    <p className="text-base item-label font-semibold">Online Payments</p>
                    <span className="text-xs item-sublabel font-medium">
                      It gives you access to all payment modes including credit card, debit card, net banking, UPI and
                      popular wallets. <span className="text-xs">(3% per transaction)</span>
                    </span>
                  </div>
                </Mobile>
              </div>

              {online && (
                <div className="flex flex-wrap justify-between mx-4 md:mx-10  px-4 md:px-8 py-4   bg-white ">
                  <div className="w-full flex pt-4 border-t">
                    <BinaryToggle
                      activeColor="#f64b5d"
                      inactiveColor="rgba(36,36,36,0.3)"
                      toggle={convenience}
                      toggleCallback={toggleConvenienceChargeHandler}
                    />
                    <div className="hide-mobile">&emsp;</div>
                    <span className="text-xs flex md:text-sm mt-1 font-normal text-muted-light font-semibold">
                      <Tooltip
                        title="A 3% fee on the entire purchase amount will be deducted on every online payment as part of payment gateway charges. Toggle ON to add this on to your customers bill."
                        arrowPointAtCenter
                        color="#242424"
                      >
                        <AiOutlineInfoCircle className="mx-2 text-muted-light" size={18} />
                      </Tooltip>
                      Enable Convenience charges
                    </span>
                  </div>

                  {convenience && (
                    <div className=" pt-4">
                      <p className="mb-4 text-sm item-label font-semibold">
                        Convenience Charge : <span className="text-secondary">{convenienceAmount}%</span> applied
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          </div>
        <NewFooter/>
      </IsFeatureSubscribed>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  paymentConfig: makeSelectPaymentConfig(),
  subscribedTo: makeSelectSubscribedModules(),
})

const mapDispatchToProps = dispatch => ({
  setCod: ({ boolean }) => dispatch(setCod({ boolean })),
  setOnline: ({ boolean }) => dispatch(setOnline({ boolean })),
  setPaymentMode: ({ storeId, merchantId, paymentType, boolean }) =>
    dispatch(setPaymentMode({ storeId, merchantId, paymentType, boolean })),
  setConvenience: ({ boolean }) => dispatch(setConvenience({ boolean })),
  getPaymentConfig: ({ storeId }) => dispatch(getPaymentSettings({ storeId })),
  setFirstTime: ({ boolean }) => dispatch(setInitialLoading({ boolean })),
  applyConvenienceCharge: ({ storeId, flagStatus, convenienceFee }) =>
    dispatch(applyConvenienceCharge({ storeId, flagStatus, convenienceFee })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaymentConfiguration)
