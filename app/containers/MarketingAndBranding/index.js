import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import 'assets/MarketingAndBranding.css'
import PushNotification from 'images/PushNotification.png'
import Branding from 'images/branding.png'
import Coupon from 'images/coupon.png'
import couponsReducer from 'containers/Coupons/reducer'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { DownOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { Dropdown } from 'antd'
import WalletIcon from "../../images/icons/wallet.svg"
import { makeSelectCreditDetails } from "../AddCreditsPage/selectors"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import creditsReducer from 'containers/AddCreditsPage/reducer'
import creditsSaga from 'containers/AddCreditsPage/saga'
import { useMediaQuery } from 'react-responsive'
import { setCreditNumbers } from 'containers/AddCreditsPage/actions'
import { makeSelectMerchantId, makeSelectStoreId } from 'containers/Dashboard/selectors'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import SocialIcon from "images/icons/social.svg"
import PhoneIcon from "images/icons/Phone.svg"
import NewFooter from 'components/Footer/newFooter'
import EmailIcon from 'images/icons/email.svg'
const MarketingAndBranding = ({ creditDetails,setCreditNumbers,storeId,merchantId }) => {
  useInjectReducer({ key: 'couponsReducer', reducer: couponsReducer })
  useInjectReducer({ key: 'creditDetails', reducer: creditsReducer })
  useInjectSaga({ key: 'creditDetails', saga: creditsSaga })
  const history = useHistory()
  

  const creditNumbersKeys = creditDetails.creditNumbers && Object.keys(creditDetails.creditNumbers)

  const wallet_menu = () => {
    return (
      <Menu className='rounded-lg p-2 w-56' style={{ boxShadow: '0px 4px 12px #00000029' }}>
        {creditDetails.creditNumbers&&creditNumbersKeys.map((val, ind) => {
          return (<Menu.Item key={ind}>
            <span
              type="button"
              className='flex justify-between  font-semibold text-sm'
            >
              <p style={{ color: 'rgba(36,36,36,0.7)' }}>{creditDetails.creditNumbers[val].credit_name}</p>
              <b>{creditDetails.creditNumbers[val].number_of_credits}</b>
            </span>
          </Menu.Item>)
        })}
        <Menu.Item key={99}>
          <span
            type="button"
            className='flex justify-center font-bold text-md text-red-500 p-2'
            style={{ backgroundColor: "#F64B5D0D", margin: "-12px" }}
            onClick={() => {
              history.push({
                pathname: '/app/general/marketing&branding/addCredits',
                state: {},
              })
            }}
          >
            + Add Credits
          </span>
        </Menu.Item>
      </Menu>
    )
  }
  const isTablet = useMediaQuery({ minWidth: 992 })
  useEffect(() => {
    setCreditNumbers(storeId, merchantId);
  }, [])
  const MarketingCard=({title,iconImg,RouteLink,description})=>{
    return(
      <div
        className="marketing_branding_card"
        onClick={e => {
          e.preventDefault()
          history.push(RouteLink)
        }}
      >
        <div>
          <img src={iconImg} />
          <h1>
            {title}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </h1>
        </div>
        <span>{description}</span>
      </div>
    )
  }

  return (
    <>
      <ExtendedNavBar text="Marketing & Branding" noBack />
      <div className="w-full mt-8 px-6 h-full mb-5">
        <div className='flex justify-between'>
        <h1 className={isTablet?"font-bold text-xl mb-6":"font-semibold text-lg mb-6"}>Marketing Home</h1>
          <div className={isTablet ? 'flex mr-10 px-2' : 'flex mr-0 px-0 '} >
            <Dropdown
              trigger={['click']}
              overlay={wallet_menu}
              className="flex justify-between capitalize gap-2 focus:outline-none"
              placement="bottomCenter"
              arrow
            >
              <div className='flex bg-white rounded-lg font-semibold p-2 shadow-sm mx-2 mr-5 cursor-pointer' style={{ height: "35px",marginRight:!isTablet&&"10px" }} >
                <img src={WalletIcon} className='mx-2 ml-1 h-5 w-5' />
                <p >
                  Wallet
                </p>
                <DownOutlined className='mx-2' style={{ marginTop: "5px", fontSize: '0.7em' }} />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="marketing_branding_cards">
          <div
            className="marketing_branding_card"
            onClick={e => {
              e.preventDefault()
              history.push('/app/general/marketing&branding/push-notification')
            }}
          >
            <div>
              <img src={PushNotification} />
              <h1>
                Push Notifications
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 inline"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </h1>
            </div>
            <span>Send push notifications to your customers to promote your business.</span>
          </div>
        <MarketingCard 
              title={"SEO Settings"}
              description={"Add keywords to get more targeted traffic to your website from a search engine."}
              iconImg={PhoneIcon}
              RouteLink={"/app/general/seo"}
            />
          <MarketingCard
            title={'Branding'}
            description={'Print business cards, t-shirts and more to promote your business.'}
            iconImg={Branding}
            RouteLink={'/app/general/marketing&branding/branding'}
          />
        </div>
        <hr className="my-5" />

        <h1 className={isTablet ? 'font-bold text-xl mb-6' : 'font-semibold text-lg mb-6'}>Social Media & Coupons</h1>
        <div className="marketing_branding_cards">
          <MarketingCard
            title={'Social Accounts'}
            description={'Add your social profiles for customers to reach you better.'}
            iconImg={SocialIcon}
            RouteLink={'/app/general/socials'}
          />
          <MarketingCard
            title={'Coupons'}
            description={'Offering discounts using coupons can be a powerful marketing strategy for your store.'}
            iconImg={Coupon}
            RouteLink={'/app/general/marketing&branding/coupons'}
          />
        </div>
      
    </div>
     <NewFooter/>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  creditDetails: makeSelectCreditDetails(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
})
const mapDispatchToProps = dispatch => ({
  setCreditNumbers: (storeId, merchantId) => dispatch(setCreditNumbers({ storeId, merchantId })),
 })
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketingAndBranding)