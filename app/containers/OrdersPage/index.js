import React, { useState } from 'react'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { NavLink } from 'react-router-dom'
import CurrentOrders from 'containers/CurrentOrders/Loadable'
import PastOrders from 'containers/PastOrders/Loadable'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import TopNav from 'components/TopNav'
import MediaQuery from 'react-responsive'
import reducer from './reducer'
import saga from './saga'
import { makeSelectOrderItem } from './selectors'

const key = 'orders'

const OrdersPage = () => {
  useInjectSaga({ key, saga })
  useInjectReducer({ key, reducer })

  const [currentPage, setCurrentPage] = useState(true)

  const toggleOrderPage = () => setCurrentPage(!currentPage)

  return (
    <div className="">
      <MediaQuery minDeviceWidth={1025}>
        <div>
          <div className="sticky bg-white mobile-topNav">
            <MediaQuery minDeviceWidth={1101}>
              <div className="flex justify-between px-4 pt-4 text-xl font-semibold">
                <p className="text-heavy flex justify-center items-center">Your Orders - {currentPage ? 'Live' : 'Past'}<NavLink to="/helpcenter/manage-order" className="ml-2" >
                  <span className="flex items-center justify-start m-0" >    <span className="flex items-center ml-4 font-normal " style={{ fontSize: "14px", color: "#2424247F", lineHeight: "16px" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> Learn how to Use</span></span></NavLink>
                </p>
                <TopNav />
                <button id="tb-click" className="unselectable" onClick={toggleOrderPage} style={{ display: 'none' }} />
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1100}>
              <div className="flex justify-between h-full  px-2 text-base font-semibold items-center">
                <p className="text-heavy m-0 ">{currentPage ? 'Live Orders' : 'Past Orders'}</p>
                <NavLink to="/helpcenter/manage-order" className="ml-2" >
                  <p className="flex items-center justify-start m-0" >    <span className="flex items-center ml-4 font-normal " style={{ fontSize: "14px", color: "#2424247F", lineHeight: "16px" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> Learn how to Use</span></p></NavLink>
              </div>
            </MediaQuery>
          </div>


          <MediaQuery maxDeviceWidth={1100}>
            <div className="sticky p-2 flex justify-end items-center" style={{ top: "55px", backgroundColor: "#F2F2F2" }}>
              <button
                id="tb-click"
                onClick={toggleOrderPage}
                style={{ marginTop: '-4px', marginRight: '-13px' }}
                className="font-light text-white mt-0 rounded-lg py-2 px-4 text-sm ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
              >
                {currentPage ? 'View Past Orders' : 'View Live Orders'}
              </button>
            </div>
          </MediaQuery>
          <div className="">{currentPage ? <CurrentOrders /> : <PastOrders />}</div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1025}>
        <div>
          <div className="sticky bg-white mobile-topNav">
            <MediaQuery minDeviceWidth={1101}>
              <div className="flex justify-between px-4 pt-4 text-xl font-semibold">
                <p className="text-heavy">Your Orders - {currentPage ? 'Live' : 'Past'}</p>

                <TopNav />
                <button id="tb-click" className="unselectable" onClick={toggleOrderPage} style={{ display: 'none' }} />
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1100}>
              <div className="flex justify-between pt-4 px-2 text-base font-semibold items-center">
                <p className="text-heavy m-0">{currentPage ? 'Live Orders' : 'Past Orders'}</p>

                <NavLink to="/helpcenter/manage-order" className="ml-2" >
                  <p className="flex items-center justify-start m-0" >    <span className="flex items-center ml-4 font-normal " style={{ fontSize: "10px", color: "#2424247F", lineHeight: "16px" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg> Learn how to Use</span></p></NavLink>


              </div>
            </MediaQuery>
          </div>

          <div className="sticky p-2 flex justify-end items-center" style={{ top: "55px", backgroundColor: "#F2F2F2" }}>
            <button
              id="tb-click"
              onClick={toggleOrderPage}
              style={{ marginTop: '-4px', marginRight: '-13px' }}
              className="font-light text-white mt-0 rounded-lg py-2 px-4 text-sm ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
            >
              {currentPage ? 'View Past Orders' : 'View Live Orders'}
            </button>
          </div>

          <div className="">{currentPage ? <CurrentOrders /> : <PastOrders />}</div>
        </div>
      </MediaQuery>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  order: makeSelectOrderItem(),
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersPage)
