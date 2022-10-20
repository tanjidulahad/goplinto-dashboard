import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect } from 'react-redux'

import OrderSection from 'components/OrderSection'

import { createStructuredSelector } from 'reselect'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'

import enums from 'utils/orderStatusEnums'
import RingLoader from 'react-spinners/RingLoader'
import saga from './saga'
import reducer from './reducer'
import MediaQuery from 'react-responsive'
import { getCurrentOrders, updateOrderDetails, getMoreCurrentOrders, setNewOrders, hasMore } from './actions'
import StoreRegionReducer from "containers/RegionAndCurrencyInfo/reducer"
import StoreRegionSaga from "containers/RegionAndCurrencyInfo/saga"
import { makeSelectOrders, makeSelectRegionInfo, makeSelectStore, makeSelectLoaderCard } from './selectors'
import { getStoreRegionDetails } from 'containers/RegionAndCurrencyInfo/actions'

const CurrentOrders = ({ getOrders, store, orders, updateOrder, getMoreOrders, setHasMore, storeCurrency, getStoreRegionDetails, loaderCard }) => {
  useInjectSaga({ key: 'currentOrders', saga })
  useInjectReducer({ key: 'currentOrders', reducer })
  useInjectReducer({ key: 'storeRegionInfo', reducer: StoreRegionReducer })
  useInjectSaga({ key: 'storeRegionInfo', saga: StoreRegionSaga })
  useEffect(() => {
    getStoreRegionDetails(storeId)
  }, [])

  const storeId = store.store_id

  const { newOrders, prepOrders, outForDeliveryOrders } = orders

  const [currentPageStatus, setCurrentPageStatus] = useState('ALL')
  const [pageNumber, setPageNumber] = useState(1)
  const [newOrderpageNumber, setNewOrderPageNumber] = useState(1)
  const [prepOrderpageNumber, setPrepOrderPageNumber] = useState(1)
  const [outForDeliverypageNumber, setOutForDeliveryPageNumber] = useState(1)

  useEffect(() => {
    if (currentPageStatus === 'ALL') {
      setPageNumber(1)
    }
    if (currentPageStatus === 'NEW_ORDERS') {
      setPageNumber(newOrderpageNumber)
    }
    if (currentPageStatus === 'OUT_FOR_DELIVERY') {
      setPageNumber(outForDeliverypageNumber)
    }
    if (currentPageStatus === 'PREPARING_ORDERS') {
      setPageNumber(prepOrderpageNumber)
    }
    setHasMore(true)
  }, [currentPageStatus])

  useEffect(() => {
    if (currentPageStatus === 'ALL')
      getOrders(storeId, currentPageStatus, pageNumber)
    if (currentPageStatus === 'NEW_ORDERS') {
      getMoreOrders(storeId, currentPageStatus, pageNumber)
      setNewOrderPageNumber(pageNumber)
    }
    if (currentPageStatus === 'OUT_FOR_DELIVERY') {
      getMoreOrders(storeId, currentPageStatus, pageNumber)
      setOutForDeliveryPageNumber(pageNumber)
    }
    if (currentPageStatus === 'PREPARING_ORDERS') {
      getMoreOrders(storeId, currentPageStatus, pageNumber)
      setPrepOrderPageNumber(pageNumber)
    }
  }, [pageNumber])

  const onStatusChange = (orderId, status) => {
    updateOrder(orderId, status, storeId, currentPageStatus, pageNumber)
  }

 
  // Switches between live and past orders
  const clicktb = () => {
    document.getElementById('tb-click').click()
  }

  return (
    <div className="ordersPage-ordersCategory-container relative" style={{ paddingBottom: '100px', marginTop: "0" }}>
      <MediaQuery minDeviceWidth={1025}>
        <div
          className="ordersPage-ordersCategory-list flex mx-6 justify-between w-full items-center z-40 sticky"
          style={{
            background: '#f2f2f2',
            paddingLeft: '0',
            marginLeft: '0',
            top: "67px"
          }}
        >
          <div className="flex justify-evenly px-6">
            <button
              type="button"
              onClick={() => setCurrentPageStatus('ALL')}
              className={`ordersPage-ordersCategory focus:outline-none mr-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === 'ALL' ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              All Orders
            </button>

            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.NEW)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === enums.NEW ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              New Orders
            </button>
            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.PREP)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md  bg-white ${currentPageStatus === enums.PREP ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              Mark Ready/Dispatched
            </button>
            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.OUT_FOR_DELIVERY)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === enums.OUT_FOR_DELIVERY
                ? 'border-2 border-secondary text-secondary'
                : 'text-gray-500'
                }`}
            >
              Mark Delivered
            </button>
          </div>
          <MediaQuery minDeviceWidth={1101}>
            <div className="flex justify-end" style={{ position: 'absolute', top: '0', right: '20px' }}>
              <button
                onClick={clicktb}
                className="w-auto py-2 px-4 mx-5 my-4 font-light text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
              >
                Past Orders
              </button>
            </div>
          </MediaQuery>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1025}>
        <div
          className="ordersPage-ordersCategory-list flex mx-6 justify-between w-full items-center z-50 sticky"
          style={{
            background: '#f2f2f2',
            paddingLeft: '0',
            marginLeft: '0',
            top: '104px',
            left: '0',
            width: '100%',
          }}
        >
          <div className="flex justify-evenly px-6">
            <button
              type="button"
              onClick={() => setCurrentPageStatus('ALL')}
              className={`ordersPage-ordersCategory focus:outline-none mr-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === 'ALL' ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              All Orders
            </button>

            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.NEW)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === enums.NEW ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              New Orders
            </button>
            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.PREP)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md  bg-white ${currentPageStatus === enums.PREP ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                }`}
            >
              Mark Ready/Dispatched
            </button>
            <button
              type="button"
              onClick={() => setCurrentPageStatus(enums.OUT_FOR_DELIVERY)}
              className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${currentPageStatus === enums.OUT_FOR_DELIVERY
                ? 'border-2 border-secondary text-secondary'
                : 'text-gray-500'
                }`}
            >
              Mark Delivered
            </button>
          </div>
          <MediaQuery minDeviceWidth={1101}>
            <div className="flex justify-end" style={{ position: 'absolute', top: '0', right: '365px' }}>
              <button
                onClick={clicktb}
                className="w-auto py-2 px-4 mx-5 my-4 font-light text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
              >
                Past Orders
              </button>
            </div>
          </MediaQuery>
        </div>
      </MediaQuery>
      <div className="px-3 live_orders_upperSpace">
        {currentPageStatus === enums.ALL && (
          <div className="ordersPage-orders-container flex flex-col">
            <div className="mb-6">
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.NEW} orders={newOrders} onUpdate={onStatusChange} max={10} setCurrentPageStatus={setCurrentPageStatus} />
            </div>
            <div className="mb-6">
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.PREP} orders={prepOrders} onUpdate={onStatusChange} max={10} setCurrentPageStatus={setCurrentPageStatus} />
            </div>
            <div className="mb-6">
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.OUT_FOR_DELIVERY} orders={outForDeliveryOrders} onUpdate={onStatusChange} max={10} setCurrentPageStatus={setCurrentPageStatus} />
            </div>
          </div>
        )}
        {currentPageStatus === enums.NEW && (
          <div className="ordersPage-orders-container flex flex-col">
            <div>
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.NEW} orders={newOrders} onUpdate={onStatusChange}
              />
            </div>
          </div>
        )}
        {currentPageStatus === enums.PREP && (
          <div className="ordersPage-orders-container flex flex-col">
            <div>
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.PREP} orders={prepOrders} onUpdate={onStatusChange}
              />
            </div>
          </div>
        )}

        {currentPageStatus === enums.OUT_FOR_DELIVERY && (
          <div className="ordersPage-orders-container flex flex-col">
            <div>
              <OrderSection loaderCard={loaderCard} storeCurrency={storeCurrency} type={enums.OUT_FOR_DELIVERY} orders={outForDeliveryOrders} onUpdate={onStatusChange}
              />
            </div>
          </div>
        )}
      </div>
      {
        currentPageStatus !== "ALL" &&
        <div className="flex justify-around absolute bottom-2	right-2.5 w-25" style={{ bottom: "70px", right: "50px" }}>
          {pageNumber > 1 ?
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2" onClick={() => setPageNumber(pageNumber - 1)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg></button>
            :
            <button disabled className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2" ><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg></button>
          }
          {orders.hasMore ?
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center" onClick={() => setPageNumber(pageNumber + 1)}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg></button>
            :
            <button disabled className="w-8 h-8 rounded-full bg-white flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg></button>

          }
        </div>
      }

      {orders.loading && (
        <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <RingLoader color="#F64C5D" size={150} />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  orders: makeSelectOrders(),
  storeCurrency: makeSelectRegionInfo(),
  loaderCard: makeSelectLoaderCard(),
})
const mapDispatchToProps = dispatch => ({
  getOrders: (storeId, status, pageNumber) => dispatch(getCurrentOrders(storeId, status, pageNumber)),
  getMoreOrders: (storeId, status, pageNumber) => dispatch(getMoreCurrentOrders(storeId, status, pageNumber)),
  setHasMore: boolean => dispatch(hasMore(boolean)),
  updateOrder: (orderId, status, storeId, currentPageStatus, pageNumber) => dispatch(updateOrderDetails(orderId, status, storeId, currentPageStatus, pageNumber)),
  getStoreRegionDetails: (storeId) => dispatch(getStoreRegionDetails({storeId})),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentOrders)
