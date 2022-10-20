import React, { useRef, useEffect } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'
import TopNav from '../../components/TopNav'
import backImg from '../../images/icons/back.svg'
import tickIcon from '../../images/icons/activity.svg'
import printIcon from '../../images/icons/printer.svg'
import packingIcon from '../../images/icons/packing.svg'
import invoiceIcon from '../../images/icons/invoice.svg'
import { updateOrderDetails } from '../CurrentOrders/actions'
import orderStatusEnums from '../../utils/orderStatusEnums'
import { OrderPrint, SlipPrint, KOTPrint } from './ComponentToPrint'
import PlaceHolderImage from 'images/Img Placeholder.png'
import { makeSelectContactInfo } from '../ContactInfo/selectors'
import saga from '../ContactInfo/saga'
import reducer from '../ContactInfo/reducer'
import { getStoreRegionDetails } from "../RegionAndCurrencyInfo/actions"

import { useInjectReducer } from '../../utils/injectReducer'
import { useInjectSaga } from '../../utils/injectSaga'
import { makeSelectStore } from "../BestSellers/selector"
import { getContactInfo } from 'containers/ContactInfo/actions'

import DeliveryReducer from "../DeliveryConfiguration/reducer"
import DeliverySaga from "../DeliveryConfiguration/saga"
import { loadDeliveryPickupData } from "../DeliveryConfiguration/actions"
import { makeSelectPickUpData } from './Selector'

const OrderDetails = ({ updateOrder, getContactInfo, contactInfo, store, getStoreRegionDetails, pickUpData, loadDeliveryPickupData }) => {
  useInjectReducer({ key: 'contactInfo', reducer })
  useInjectSaga({ key: 'contactInfo', saga })

  useInjectReducer({ key: "delConfig", reducer: DeliveryReducer })
  useInjectSaga({ key: "delConfig", saga: DeliverySaga })

  useEffect(() => {
    loadDeliveryPickupData('Pickup', store.store_id, store.owner_id)
  }, [])
  const loc = useLocation()
  const componentRef = useRef()
  const kotRef = useRef()
  const slipRef = useRef()
  useEffect(() => {
    getStoreRegionDetails(storeId);
    getContactInfo({ storeId })
  }, [])
  const { logo_img_url: storeLogo, store_name: storeName } = store;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const handlePrintKOT = useReactToPrint({
    content: () => kotRef.current,
  })
  const handlePrintSlip = useReactToPrint({
    content: () => slipRef.current,
  })
  const history = useHistory();
  const { order, currencySymbol } = loc.state
  const {
    orderId,
    itemCount,
    orderItems,
    orderAmount,
    taxAmount,
    savingsAmount,
    discountedOrderAmount,
    parcelCharge,
    customerName,
    phone,
    orderPlacedTime,
    deliveryAddressDetails,
    isDelivery,
    isParcel,
    isConvenienceFeeCharged,
    paymentDetails,
    storeId,
    orderStatus,
    couponDetails,
    calculatedOrderTotal,
    lastModifiedTime,
    storeConfirmedTime,
    customerPickupReadyTime,
    deliveredTime,
    orderCancelledTime,
    deliveryCharge,
    convenienceFee
  } = order
  const {
    address: storeAddress,
    city: storeCity,
    state: storeState,
    pincode: storeZIP,
    country: storeCountry,
  } = contactInfo;

  const currentPageStatus = 'ALL'
  const pageNumber = 1
  const onStatusChange = (orderId, status) => {
    updateOrder(orderId, status, storeId, currentPageStatus, pageNumber)
  }
  const orderPlacedDateTime = moment.unix(orderPlacedTime).format('DD MMM,YY h:mm a z')
  const lastModified = moment.unix(lastModifiedTime).format('D MMM YY, h:mm A z')
  const AcceptTime = moment.unix(storeConfirmedTime).format('D MMM YY, h:mm A z')
  const MarkReadyTime = moment.unix(customerPickupReadyTime).format('D MMM YY, h:mm A z')
  const MarkCompletedTime = moment.unix(deliveredTime).format('D MMM YY, h:mm A z')
  const RejectTime = moment.unix(orderCancelledTime).format('D MMM YY, h:mm A z')
  const convertToFriendlyEnum = unFriendlyEnum => {
    let friendlyEnum
    switch (unFriendlyEnum) {
      case orderStatusEnums.KOT_PRINTED:
      case orderStatusEnums.PAYMENT_COMPLETED:
        friendlyEnum = orderStatusEnums.NEW
        break
      case orderStatusEnums.ORDER_CONFIRMED_BY_REST:
      case orderStatusEnums.PENDING_PICKUP_BY_DA:
        friendlyEnum = orderStatusEnums.PREP
        break
      case orderStatusEnums.PENDING_PICKUP_BY_CUST:
      case orderStatusEnums.ORDER_PICKED_UP_BY_DA:
        friendlyEnum = orderStatusEnums.OUT_FOR_DELIVERY
        break
      case orderStatusEnums.ORDER_DELIVERED_SUCCESS:
        friendlyEnum = orderStatusEnums.DELIVERED
        break
      case orderStatusEnums.ORDER_CANCELLED_BY_CUST:
      case orderStatusEnums.ORDER_CANCELLED_BY_REST:
      case orderStatusEnums.ORDER_DECLINED_BY_RESTAURANT:
        friendlyEnum = orderStatusEnums.CANCELLED
        break

      default:
        friendlyEnum = orderStatusEnums.INVALID
    }

    return friendlyEnum
  }

  const orderType = orderStatus
  const cardType = convertToFriendlyEnum(orderType)
  const keys = Object.keys(orderItems)
  const hr = () => { return (< hr style={{ margin: "20px -35px 20px", borderTop: "2px solid #24242429" }} />) }
  const OrderItemsDiv = () => (
    <div className="bg-white rounded-lg shadow-sm" style={{ padding: "35px" }}>
      <div className="flex justify-between">
        <p className="text-lg font-bold  text-gray-800 capitalize">
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </p>
        <p className="text-red-500 mr-5 text-xs font-medium cursor-pointer" onClick={() => handlePrintKOT()}>
          <img src={printIcon} className="inline mx-2" />
          Print KOT
        </p>
      </div>
      {hr()}
      <div className="p-5">
        {keys.map(key => (
          <div className="grid grid-cols-2 my-2 capitalize" key={key}>
            <div className="grid grid-cols-2">
              <img src={orderItems[key].itemImg ? orderItems[key].itemImg : PlaceHolderImage} className="h-20 w-20 rounded" />
              <p className=" text-xs md:text-md ml-0 md:ml-0 font-bold mt-2 md:mt-5" style={{ width: "150%" }} >
                {orderItems[key].itemQuantity} X {orderItems[key].itemName}
              </p>
            </div>
            <p className="text-right font-semibold mt-5">
              {currencySymbol} {orderItems[key].itemQuantity * orderItems[key].itemPrice}
            </p>
          </div>
        ))}
      </div>
      <hr style={{ margin: "30px -35px 20px", borderTop: "2px solid #24242429" }} />

      {cardType === orderStatusEnums.NEW && (
        <div className="flex">
          <button
            onClick={() => {
              history.push('/app/orders')
              onStatusChange(orderId, orderStatusEnums.ORDER_DECLINED_BY_RESTAURANT)
            }}
            className="h-10 w-40 p-2 mx-2 cta-danger"
          >
            Reject Order
          </button>

          <button
            onClick={() => {
              history.push('/app/orders')
              onStatusChange(orderId, orderStatusEnums.ORDER_CONFIRMED_BY_REST)
            }}
            className="h-10 rounded-lg w-40 p-2 mx-2 cta-success"
          >
            Accept Order
          </button>
        </div>
      )}
      {cardType === orderStatusEnums.PREP && (
        <div className="flex">
          <button
            onClick={() => {
              history.push('/app/orders')
              onStatusChange(orderId, orderStatusEnums.PENDING_PICKUP_BY_CUST)
            }}
            className="h-10 w-32 cta-success"
          >
            Mark Ready
          </button>
        </div>
      )}
      {cardType === orderStatusEnums.OUT_FOR_DELIVERY && (
        <div className="flex">
          <button
            onClick={() => {
              history.push('/app/orders');
              onStatusChange(orderId, orderStatusEnums.ORDER_DELIVERED_SUCCESS);
            }}
            className="h-10 w-32 cta-success"
          >
            Mark Completed
          </button>
        </div>
      )}
      {cardType === orderStatusEnums.DELIVERED && (
        <div className="flex mt-6 justify-center">
          <p className="text-sm font-bold text-green-500">Order Delivered Successfully at {lastModified}</p>
        </div>
      )}
      {cardType === orderStatusEnums.CANCELLED && (
        <div className="flex mt-6 justify-center">
          <p className="text-sm font-bold text-red-500">Order Cancelled at {lastModified}</p>
        </div>
      )}
    </div>
  )
  const OrderPriceDiv = () => (
    <div className="bg-white my-5 rounded-lg p-5" style={{ padding: "35px" }}>
      <div className='flex justify-between'>
        <h2 className=" text-xl font-semibold  text-gray-800 capitalize mt-2 mb-4 ">Payment Details</h2>
        <p className="text-red-500 text-xs font-medium cursor-pointer" onClick={() => handlePrint()}>
          <img src={invoiceIcon} className="inline mx-2" />
          Print Invoice
        </p>
      </div>
      {hr()}
      <div className="grid md:grid-cols-2 pt-5 mb-4">
        <h2 className=" md:text-lg font-semibold  text-gray-800 capitalize">Item Total</h2>
        <div className="text-right text-xs font-medium text-gray-600">
          Total Items {itemCount} &emsp;&emsp;{' '}
          <span className=" md:text-lg text-xs md:font-bold  text-gray-800 capitalize mt-2 mb-4 ">{currencySymbol} {orderAmount}</span>
        </div>
      </div>
      <div className="border-2 border-dashed grid grid-cols-2 py-4 capitalize font-medium" style={{ borderLeft: "0px", borderRight: "0px" }}>
        <p className="">Tax</p>
        <p className="text-right">{currencySymbol} {taxAmount}</p>

        <p className="text-green-500">Discount</p>
        <p className="text-right text-green-500 ">-{currencySymbol} {savingsAmount}</p>

        {couponDetails && <p className="text-green-500">Promo Code {couponDetails.coupon_code ? (couponDetails.coupon_code) : ""}</p>}

        {couponDetails && <p className="text-right text-green-500">
          {couponDetails.discount_amount ? `-${currencySymbol} ${couponDetails.discount_amount}` : `${currencySymbol} 0`}
        </p>}
        {isParcel && <p>Parcel Charges</p>}
        {isParcel && <p className="text-right">{currencySymbol} {parcelCharge}</p>}
        {isDelivery === 'Y' && <p> Delivery Charges</p>}
        {isDelivery === 'Y' && <p className="text-right">{currencySymbol} {deliveryCharge}</p>}
        {isConvenienceFeeCharged === 'Y' && <p> Convenience Fee</p>}
        {isConvenienceFeeCharged === 'Y' && <p className="text-right">{currencySymbol} {convenienceFee}</p>}
      </div>
      <div className="grid grid-cols-2 mt-3">
        <h2 className=" text-lg font-bold  text-gray-800 capitalize">Total Amount</h2>
        <div className=" text-lg font-bold  text-gray-800 capitalize text-right">{currencySymbol} {calculatedOrderTotal}</div>
      </div>
    </div>
  )
  function OrderActivityDiv() {
    return (
      <div className="bg-white my-5 rounded-lg  p-2" style={{ padding: "35px" }}>
        <h2 className=" text-xl font-semibold  text-gray-800 capitalize mt-2 mb-4 ">Order Activity</h2>
        {hr()}
        <br />
        <div >
          {orderCancelledTime && <div>
            <img src={tickIcon} className="inline h-5 w-5 mx-2" />
            <span className='font-bold'>Order Rejected</span>
            <p className="ml-10 pl-50 font-medium">{RejectTime} </p>
          </div>}
          {deliveredTime && <div>
            <img src={tickIcon} className="inline h-5 w-5 mx-2" />
            <span className='font-bold'>Order marked Delivered</span>
            <p className="ml-10 pl-50 font-medium">{MarkCompletedTime} </p>
          </div>}
          {customerPickupReadyTime && <div>
            <img src={tickIcon} className="inline  h-5 w-5 mx-2" />
            <span className='font-bold'>Order marked as ready</span>
            <p className="ml-10 pl-50 font-medium">{MarkReadyTime} </p>
          </div>}
          {storeConfirmedTime && <div > <img src={tickIcon} className="inline h-5 w-5 mx-2" />
            <span className='font-bold'>Order marked Accepted</span>
            <p className="ml-10 pl-50 font-medium">{AcceptTime} </p>
          </div>}
          <div> <img src={tickIcon} className="inline h-5 w-5 mx-2" />
            <span className='font-bold'>Order Placed</span>
            <p className="ml-10 pl-50 font-medium">{orderPlacedDateTime} </p>
          </div>
        </div>
      </div>
    )
  }
  function OrderDetailsDiv() {
    const hr2 = () => { return (< hr style={{ margin: "20px -30px 20px", borderTop: "1px solid #24242429" }} />) }
    const pickUpAddress = pickUpData && pickUpData.pickupPoints && pickUpData.pickupPoints[0];
    return (
      <div className='mt-1'>
        <div className="grid grid-cols-2 m-0 p-0">
          <h2 className=" text-xl font-semibold  text-gray-800  mb-4 ">Order Details</h2>
          <span className="text-red-500 text-center font-medium text-xs inline" onClick={() => handlePrintSlip()}>

            <img src={packingIcon} className="inline mx-1" />
            <span className="cursor-pointer" onClick={() => handlePrintSlip()}> Print Packing Slip</span>
          </span>
        </div>
        {hr2()}
        <div className="flex justify-between mt-4">
          <h4 className="text-md font-bold  text-gray-800 ">Order Id-{orderId}</h4>
          <p className="font-semibold text-gray-600 ">{orderPlacedDateTime}</p>
        </div>
        <p className="font-medium text-gray-600 ">Name:{customerName}</p>
        <p className="font-medium text-gray-600 ">Number:{phone}</p>
        {hr2()}
        <h2 className="text-md font-bold  my-4 text-gray-800">Payment Method</h2>
        <p className="font-medium my-4 text-gray-600 ">{paymentDetails.payment_mode === "COD" ? paymentDetails.payment_mode : "Online Payment"}</p>
        {hr2()}
        {deliveryAddressDetails ? <div>

          <h2 className="text-md font-bold my-4  text-gray-800">Delivery address</h2>
          {deliveryAddressDetails.address_line_1 && <p className="font-medium my-4 text-gray-600 ">
            {deliveryAddressDetails.address_line_1} , {deliveryAddressDetails.address_line_2} ,
            {deliveryAddressDetails.city}-{deliveryAddressDetails.zip_code} , {deliveryAddressDetails.country}
          </p>}
        </div>
          :
          <div>
            <h2 className="text-md font-bold my-4  text-gray-800">Pick-up address</h2>
            {pickUpAddress ? <span className="font-medium my-4 text-gray-600 ">
              <p className="mb-0 font-medium">{pickUpAddress.pickup_point_name && (pickUpAddress.pickup_point_name + ",")} </p>
              <p className="mb-0 font-medium">{pickUpAddress.address && (pickUpAddress.address + ",")}</p>
              <p className="mb-0 font-medium">
                {pickUpAddress.city && (pickUpAddress.city + ",")}{pickUpAddress.state && (pickUpAddress.state + "-")}
                {pickUpAddress.zip_code && (pickUpAddress.zip_code + ",")}  {pickUpAddress.country && (pickUpAddress.country + ",")}
              </p>
            </span> : <p>-</p>}
          </div>
        }
        {hr2()}
        <h2 className="text-md font-bold  my-4 text-gray-800">Delivery Method</h2>
        <p className="font-medium my-4 text-gray-600 ">{isDelivery === 'Y' ? 'Delivery' : 'PICK-UP'}</p>
      </div>
    )
  }
  const TopNavDiv = () => (
    <div className="sticky bg-white mobile-topNav">
      <div className="flex justify-between md:px-4 pt-4 text-sm md:text-xl">
        <div className="flex justify-between font-semibold">
          <NavLink className="mr-4" to="/app/orders">
            <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
          </NavLink>
          <span className="text-heavy flex justify-center items-center">
            Order # {orderId}
            <NavLink to="/helpcenter/manage-order" className="ml-2">
              <p className="flex items-center justify-start m-0">
                {' '}
                <span
                  className="flex items-center ml-4 font-normal "
                  style={{ fontSize: '14px', color: '#242424BF', lineHeight: '16px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>{' '}
                  Learn how to Use
                </span>
              </p>
            </NavLink>
          </span>
        </div>
        <TopNav />
      </div>
    </div>
  )
  return (
    <div>
      <div style={{ display: 'none' }}>
        <OrderPrint ref={componentRef} pickUpData={pickUpData && pickUpData.pickupPoints && pickUpData.pickupPoints[0]} order={order} storeInfo={contactInfo} storeLogo={storeLogo} currencySymbol={currencySymbol} panNo={store.company_legal_id} gstNo={store.company_tax_id} email={store.primary_email} phone={store.primary_phone} />
        <KOTPrint ref={kotRef} order={order} currencySymbol={currencySymbol} />
        <SlipPrint ref={slipRef} order={order} pickUpData={pickUpData && pickUpData.pickupPoints && pickUpData.pickupPoints[0]} storeInfo={contactInfo} storeLogo={storeLogo} currencySymbol={currencySymbol} />
      </div>

      <MediaQuery minDeviceWidth={768}>
        <div>
          {TopNavDiv()}
          <div className="p-10">
            <div className="flex md:my-10 text-xl font-bold text-center text-gray-800 capitalize">Order Summary</div>

            <div className="flex">
              <div style={{ width: "65%" }}>
                {OrderItemsDiv()}
                {OrderPriceDiv()}
                {OrderActivityDiv()}
              </div>
              <div className="bg-white rounded-lg mx-4 mt-5 md:mt-0 capitalize" style={{ maxHeight: "580px", padding: "30px" }}>{OrderDetailsDiv()}</div>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={768}>
        <div>
          {TopNavDiv()}
          <div className="p-10">
            <div className="mx-auto md:my-10 text-xl font-bold text-center text-gray-800 capitalize">Order Summary</div>

            {OrderItemsDiv()}
            <div className="bg-white rounded-lg mt-5 p-5 capitalize">{OrderDetailsDiv()}</div>
            {OrderPriceDiv()}
            {OrderActivityDiv()}
          </div>
        </div>
      </MediaQuery>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  contactInfo: makeSelectContactInfo(),
  store: makeSelectStore(),
  pickUpData: makeSelectPickUpData(),
})
const mapDispatchToProps = dispatch => ({
  updateOrder: (orderId, status, storeId, currentPageStatus, pageNumber) =>
    dispatch(updateOrderDetails(orderId, status, storeId, currentPageStatus, pageNumber)),
  getContactInfo: ({ storeId }) => dispatch(getContactInfo({ storeId })),
  setContactInfo: ({
    storeId,
    merchantId,
    email,
    phone,
    address,
    city,
    pincode,
    state,
    country,
    hasPhysicalAddress,
    whatsappNumber,
  }) =>
    dispatch(
      setContactInfo({
        storeId,
        merchantId,
        email,
        phone,
        address,
        city,
        pincode,
        state,
        country,
        hasPhysicalAddress,
        whatsappNumber,
      }),
    ),
  getStoreRegionDetails: storeId => dispatch(getStoreRegionDetails({ storeId })),
  loadDeliveryPickupData: (kind, storeId, merchantId) => dispatch(loadDeliveryPickupData(kind, storeId, merchantId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDetails)
