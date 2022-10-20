import React from 'react'
import MediaQuery from 'react-responsive'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import 'assets/MarketingAndBranding.css'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { createStructuredSelector } from 'reselect'
import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import NewFooter from 'components/Footer/newFooter'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import { listAllActiveWidgets } from './actions'
import { makeSelectStoreId, makeSelectAddOns, makeSelectSubscribedModules } from './selectors'
import saga from './sagas'
import reducer from './reducers'
import BestSeller from '../../images/best-seller.svg'
import NewArrivals from '../../images/new-arrivals.svg'
import BannerImage from '../../images/icons/bannerImage.svg'
import AboutUs from '../../images/icons/AboutUs.svg'
import AddGrid from '../../images/icons/addgrid.svg'
import premium from '../../images/icons/premium.png'
const AddOns = ({ listAllWidgets, addOns, subscribedTo }) => {
  useInjectReducer({ key: 'addOnsReducer', reducer })
  useInjectSaga({ key: 'addOnsSaga', saga })

  React.useEffect(() => {
    listAllWidgets()
  }, [])

  const AddOnsWidgets = ({ title, desc, RouteLink, iconSrc }) => (
    <div
      className="marketing_branding_card"
      onClick={e => {
        e.preventDefault()
        history.push(RouteLink)
      }}
    >
      <div>
        <img src={iconSrc} />
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
      <span>{desc}</span>
    </div>
  )
  const PremiumAddOnsWidgets = ({ title, desc, RouteLink, iconSrc }) => (
    <div
      className="marketing_branding_card relative"
      onClick={e => {
        e.preventDefault()
        history.push(RouteLink)
      }}
    >
      <div>
        <img src={iconSrc} />
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
      <img className="absolute" style={{ right: '-20px', top: '5px' }} src={premium} alt="" />
      <span>{desc}</span>
    </div>
  )

  const history = useHistory()
  return (
    <>
      <ExtendedNavBar text="Add Ons" onBack={() => history.goBack()} />
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.GOPLINTO_ADDONS}>
        <div className="w-full mt-8 px-6 mb-2">
          <MediaQuery minDeviceWidth={1101}>
            <h1 className="font-bold text-xl mb-4" style={{ paddingLeft: '15px' }}>
              Add Ons
            </h1>
            <p style={{ paddingLeft: '15px' }}>
              Add-ons are pre built widgets created by Goplinto to make your online store more functional.!
            </p>
          </MediaQuery>

          <div className="marketing_branding_cards">
            {addOns &&
              addOns.map(addOnsItem => {
                switch (addOnsItem.widget_name) {
                  case 'Best Sellers':
                    return (
                      <AddOnsWidgets
                        key={1}
                        title={addOnsItem.widget_name}
                        desc={addOnsItem.widget_description}
                        RouteLink="/app/general/add-ons/best-sellers"
                        iconSrc={BestSeller}
                      />
                    )
                  case 'New Arrivals':
                    return (
                      <AddOnsWidgets
                        key={2}
                        title={addOnsItem.widget_name}
                        desc={addOnsItem.widget_description}
                        RouteLink="/app/general/add-ons/new-arrivals"
                        iconSrc={BannerImage}
                      />
                    )
                  case 'Banner Image':
                    return (
                      <AddOnsWidgets
                        key={3}
                        title={addOnsItem.widget_name}
                        desc={addOnsItem.widget_description}
                        RouteLink="/app/general/add-ons/banner-image"
                        iconSrc={NewArrivals}
                      />
                    )
                  case 'About Us':
                    return (
                      <AddOnsWidgets
                        key={4}
                        title={addOnsItem.widget_name}
                        desc={addOnsItem.widget_description}
                        RouteLink="/app/general/add-ons/about-us"
                        iconSrc={AboutUs}
                      />
                    )
                  default:
                    return <div>{addOnsItem.widget_name} Feature Missing</div>
                }
              })}
            <PremiumAddOnsWidgets
              key={4}
              title="Add Grid"
              desc="You can add images in grid, displayed on the home page of your website."
              RouteLink="/app/general/add-ons/add-grid"
              iconSrc={AddGrid}
            />
          </div>
        </div>
        <NewFooter />
      </IsFeatureSubscribed>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  listAllWidgets: () => dispatch(listAllActiveWidgets()),
})

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  addOns: makeSelectAddOns(),
  subscribedTo: makeSelectSubscribedModules(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddOns)
