import React, { useEffect, useState } from 'react'

import moment from 'moment'

import orderStatusEnums from 'utils/orderStatusEnums'
import OrderModal from 'components/OrderModal'

import { connect } from 'react-redux'
import { showOrder } from 'containers/OrdersPage/actions'

import capitalize from 'utils/capitalize'
import { NavLink } from 'react-router-dom'
import newOrderTag from '../../images/orderTags/new.png'
import preparingTag from '../../images/orderTags/preparing.png'
import deliveryTag from '../../images/orderTags/delivery.png'
import deliveredTag from '../../images/orderTags/delivered.png'
import cancelledTag from '../../images/orderTags/cancelled.png'

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
let bannerType = ''
const OrderCard = ({
  order,
  orderType,
  onUpdate,
  selectedOrder,
  showOrder,
  setShowOrder,
  index,
  storeCurrency,
}) => {
  const { orderId } = order
  const datePlaced = moment.unix(order.orderPlacedTime).format('D, MMM YY, h:mm A z')
  const lastModified = moment.unix(order.lastModifiedTime).format('D MMM YY, h:mm A z')
  const name = order.customerName || 'NOT AVAILABLE'
  const phoneNumber = order.phone
  const email = order.email || 'NOT AVAILABLE'
  const totalAmount = parseFloat(order.orderAmount).toFixed(2) || 0.0
  const finalAmount = parseFloat(order.calculatedOrderTotal).toFixed(2) || 0.0
  const paymentMode = order && order.paymentDetails && order.paymentDetails.payment_mode
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    const items = order.orderItems
    const itemList = []
    for (const key in items) {
      itemList.push(items[key])
    }
    setOrderItems(itemList)
  }, [order])
  const currencySymbol = storeCurrency

  let orderPlacedType
  if (order.isDelivery === 'N' && order.isParcel === 'N') {
    orderPlacedType = 'Dine In'
  } else if (
    (order.isDelivery === 'Y' && order.isParcel === 'N') ||
    (order.isDelivery === 'Y' && order.isParcel === 'Y')
  ) {
    orderPlacedType = 'Delivery'
  } else if (order.isDelivery === 'N' && order.isParcel === 'Y') {
    orderPlacedType = 'Pickup'
  }
  const cardType = convertToFriendlyEnum(orderType)
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    setItemList([])
    if (selectedOrder) {
      const items = []
      for (const [, value] of Object.entries(selectedOrder.orderItems)) {
        items.push(value)
      }
      setItemList(items)
    }
  }, [selectedOrder])

  return (
    <div
      className="relative ordersPage-orderCard-container p-magic"
      style={{
        marginTop: '24px',
      }}
    >
      <div className="absolute block tag-position">
        <img
          className="h-10"
          src={
            (cardType === orderStatusEnums.CANCELLED && cancelledTag) ||
            (cardType === orderStatusEnums.DELIVERED && deliveredTag) ||
            (cardType === orderStatusEnums.OUT_FOR_DELIVERY && deliveryTag) ||
            (cardType === orderStatusEnums.PREP && preparingTag) ||
            (cardType === orderStatusEnums.NEW && newOrderTag)
          }
        />
      </div>
      <div
        key={index}
        style={{
          borderRadius: '12px',
        }}
        className="ordersPage-orderCard px-4 py-4 my-2 bg-white shadow-lg "
      >
        <div className="flex justify-between mb-6">
          <p className="text-sm item-label font-bold">Order Id - {orderId}</p>
          <p className="text-xs text-muted-light font-bold">{datePlaced}</p>
        </div>

        <div className="pt-4 ">
          <p className="text-sm">
            <span className="font-normal item-sublabel">Name</span>:{' '}
            <span className="mx-2 font-bold text-black-pl">{name}</span>
          </p>
          <p className="text-sm">
            <span className="font-normal item-sublabel">{phoneNumber?"Phone Number":"Email"}</span>:{' '}
            <span className="mx-2 font-bold text-black-pl">{phoneNumber||email}</span>
          </p>
          <p className="text-sm">
            <span className="font-normal item-sublabel">Order Type</span>:{' '}
            <span className="mx-2 font-bold text-black-pl">{orderPlacedType}</span>
          </p>
          {order.diningTableName && (
            <p className="text-sm">
              <span className="font-normal item-sublabel">Dining Table</span>:{' '}
              <span className="mx-2 text-black-pl font-bold truncate">{order.diningTableName}</span>
            </p>
          )}
          <p className="text-sm">
            <span className="font-normal item-sublabel">Payment Mode</span>:{' '}
            <span className="mx-2 font-bold text-black-pl">
              {paymentMode === 'COD' ? 'Cash on Delivery' : 'Online Payment'}
            </span>
          </p>
        </div>
        <div>
          {orderItems && orderItems[0] && (
            <div>
              <hr className="mb-4" />
              <p className="text-sm font-semibold text-black-pl">ITEMS</p>
              <div className="mt-1 text-gray-600">
                <p className="px-2 text-sm truncate">
                  {orderItems[0].itemQuantity} x {capitalize(orderItems[0].itemName)} <br />
                  {orderItems.length > 1 && <span className="mt-2">more ...</span>}
                  {orderItems.length === 1 && (
                    <span className="mt-2 unselectable" style={{ pointerEvents: 'none'}}>
                      &nbsp;
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <p className="text-xs font-semibold text-black-pl">
            <span className="text-xs font-bold">Total: {currencySymbol+finalAmount}</span>
          </p>
          <NavLink to={{ pathname: '/app/orders/details', state: { order,currencySymbol } }}>
            <p
              className="text-xs text-blue-500 cursor-pointer focus:outline-none"
            >
              View Order Details <i className="fas fa-angle-right" />
            </p>
          </NavLink>
        </div>

        {cardType === orderStatusEnums.NEW && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onUpdate(orderId, orderStatusEnums.ORDER_DECLINED_BY_RESTAURANT)}
              className="h-10 cta-danger"
            >
              Reject Order
            </button>

            <button
              onClick={() => onUpdate(orderId, orderStatusEnums.ORDER_CONFIRMED_BY_REST)}
              style={{ width: '100%', borderRadius: '4px' }}
              className="h-10 cta-success"
            >
              Accept Order
            </button>
          </div>
        )}
        {cardType === orderStatusEnums.PREP && (
          <div className="flex justify-center">
            <button
              onClick={() => onUpdate(orderId, orderStatusEnums.PENDING_PICKUP_BY_CUST)}
              className="h-10 w-32 cta-success"
            >
              Mark Ready
            </button>
          </div>
        )}

        <div className="">
          {cardType === orderStatusEnums.OUT_FOR_DELIVERY && (
            <div className="flex justify-center">
              <button
                onClick={() => onUpdate(orderId, orderStatusEnums.ORDER_DELIVERED_SUCCESS)}
                className="h-10 w-32 cta-success"
              >
                Mark Completed
              </button>
            </div>
          )}
          {cardType === orderStatusEnums.DELIVERED && (
            <div className="flex mt-6 justify-center">
              <p className="text-xs font-bold text-green-500">Order Delivered Successfully at {lastModified}</p>
            </div>
          )}
          {cardType === orderStatusEnums.CANCELLED && (
            <div className="flex mt-6 justify-center">
              <p className="text-xs font-bold text-red-500">Order Cancelled at {lastModified}</p>
            </div>
          )}
        </div>
      </div>
      {showOrder && (
        <OrderModal bannerType={bannerType} title="Order Details" closeModal={() => setShowOrder(false)}>
          <div className="jagged-bottom">
            <div className="px-2 md:px-6 bg-white ">
              <div className="flex justify-between pt-4">
                <p className="font-bold text-xs text-black-pl">Order Id - {selectedOrder.orderId}</p>
                <p className="font-semibold text-xs text-muted-light">
                  {moment.unix(selectedOrder.createTime).format('D, MMM YY, h:mm A z')}
                </p>
              </div>
              <div className="py-4">
                <p className="text-sm">
                  <span className="item-sublabel font-semibold">Name</span>:{' '}
                  <span className="text-black-pl font-bold">{selectedOrder.customerName || 'NOT AVAILABLE'}</span>
                </p>
                <p className="text-sm">
                  <span className="item-sublabel font-semibold">Phone Number</span>:{' '}
                  <span className="text-black-pl font-bold">{selectedOrder.phone || 'NOT AVAILABLE'}</span>
                </p>
                <p className="text-sm">
                  <span className="item-sublabel font-semibold">Order Type</span>:{' '}
                  <span className="text-black-pl font-bold">{selectedOrder.orderPlacedType}</span>
                </p>
                {selectedOrder.diningTableName && (
                  <p className="text-sm">
                    <span className="item-sublabel font-semibold">Dining Table</span>:{' '}
                    <span className="text-black-pl font-bold">{selectedOrder.diningTableName}</span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="item-sublabel font-semibold">Payment Mode</span>:{' '}
                  <span className="text-black-pl font-bold">
                    {selectedOrder.paymentDetails && selectedOrder.paymentDetails.payment_mode === 'COD'
                      ? 'Cash on Delivery'
                      : 'Online Payment'}
                  </span>
                </p>
              </div>
              <hr
                style={{ width: '100%', height: '2px', color: '#f2f2f2', backgroundColor: '#f2f2f2', margin: '0 auto' }}
              />
              <br />
              <div className="my-2">
                <p className="text-sm font-semibold text-black-pl">ITEMS</p>
                {itemList.map(item => (
                  <div className="flex text-sm justify-between" key={item.itemId}>
                    <span className="text-black font-medium">
                      {item.itemQuantity} x {capitalize(item.itemName)}
                      {item.customizationDetails !== null
                        ? Object.entries(item.customizationDetails[0].variant_item_attributes).map(x => (
                          <p className="ml-6 mb-0 text-xs my-0 font-normal">
                            {capitalize(x[1].variant_group_name)} : {capitalize(x[1].variant_value_name)}
                          </p>
                        ))
                        : null}
                    </span>
                    <span className="text-black font-medium">
                      {item.currencySymbol} {item.itemPrice}
                    </span>
                  </div>
                ))}
                <div className="pb-6">
                  {convertToFriendlyEnum(selectedOrder.orderStatus) === orderStatusEnums.NEW && (
                    <div className="flex mt-6 justify-evenly">
                      <button
                        onClick={() => {
                          onUpdate(selectedOrder.orderId, orderStatusEnums.ORDER_DECLINED_BY_RESTAURANT)
                          setShowOrder(false)
                        }}
                        className="w-32 h-10 cta-danger"
                      >
                        Reject Order
                      </button>
                      <button
                        onClick={() => {
                          onUpdate(selectedOrder.orderId, orderStatusEnums.ORDER_CONFIRMED_BY_REST)
                          setShowOrder(false)
                        }}
                        className="w-32 h-10 cta-success"
                      >
                        Accept Order
                      </button>
                    </div>
                  )}
                  {convertToFriendlyEnum(selectedOrder.orderStatus) === orderStatusEnums.PREP && (
                    <div className="flex mt-6 justify-center">
                      <button
                        onClick={() => {
                          onUpdate(selectedOrder.orderId, orderStatusEnums.PENDING_PICKUP_BY_CUST)
                          setShowOrder(false)
                        }}
                        className="w-32 h-10 cta-success"
                      >
                        Mark Ready
                      </button>
                    </div>
                  )}

                  {convertToFriendlyEnum(selectedOrder.orderStatus) === orderStatusEnums.OUT_FOR_DELIVERY && (
                    <div className="flex mt-6 justify-center">
                      <button
                        onClick={() => {
                          onUpdate(selectedOrder.orderId, orderStatusEnums.ORDER_DELIVERED_SUCCESS)
                          setShowOrder(false)
                        }}
                        className="w-32 h-10 cta-success"
                      >
                        Mark Completed
                      </button>
                    </div>
                  )}
                  {convertToFriendlyEnum(selectedOrder.orderStatus) === orderStatusEnums.DELIVERED && (
                    <div className="flex mt-6 justify-center">
                      <p className="text-sm font-bold text-green-500">Order Delivered Successfully</p>
                    </div>
                  )}
                  {convertToFriendlyEnum(selectedOrder.orderStatus) === orderStatusEnums.CANCELLED && (
                    <div className="flex mt-6 justify-center">
                      <p className="text-sm font-bold text-red-500">Order Cancelled</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {selectedOrder.isDelivery === 'Y' && (
              <div className="w-full bg-white">
                <p
                  className="text-base font-bold text-black-pl pt-1 pb-2 text-center"
                  style={{ background: '#f2f2f2' }}
                >
                  Delivery Address
                </p>
                <div className="mt-4" style={{ padding: '1.2em' }}>
                  <address className="item-label font-semibold text-base">{selectedOrder.address}</address>
                </div>
              </div>
            )}
            <div className="w-full bg-white">
              <p className="text-base font-bold text-black-pl pt-1 pb-2 text-center" style={{ background: '#f2f2f2' }}>
                Bill Details
              </p>
              <div className="px-6 py-2 bg-white jagged-bottom" style={{ marginBottom: '15%' }}>
                <div className="my-4 ">
                  <div className="flex justify-between my-2">
                    <p className="text-sm text-black-pl font-bold">Item Total</p>
                    <div className="flex">
                      <p className="mx-4 text-xs font-semibold text-gray-500m mt-1">Total Items: {itemList.length}</p>
                      <p className="text-sm text-black-pl font-bold">
                        {currencySymbol} {selectedOrder.orderAmount || (0.0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" style={{ borderTop: 'dashed 2px #f2f2f2' }} />
                  <div className="flex justify-between">
                    <p className="item-sublabel">Tax</p>
                    <p className="item-sublabel">{currencySymbol} {selectedOrder.taxAmount || (0.0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-green-400">Discount</p>
                    <p className="text-green-400">- {currencySymbol} {selectedOrder.savingsAmount || (0.0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="item-sublabel">Parcel Charges</p>
                    <p className="item-sublabel">{currencySymbol} {selectedOrder.parcelCharge || (0.0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="item-sublabel">Delivery Charges</p>
                    <p className="item-sublabel">{currencySymbol} {selectedOrder.deliveryCharge || (0.0).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="item-sublabel">Payment Gateway Charges</p>
                    <p className="item-sublabel">{currencySymbol} {selectedOrder.convenienceFee || (0.0).toFixed(2)}</p>
                  </div>
                  <hr style={{ borderTop: 'dashed 2px #f2f2f2' }} className="mb-4" />
                  <div className="flex justify-between">
                    <p className="text-sm text-black-pl font-bold">Total Amount</p>
                    <p className="text-sm text-black-pl font-bold">
                      {currencySymbol} {selectedOrder.calculatedOrderTotal || (0.0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OrderModal>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  selectedOrder: state.get('orders').order,
  showOrder: state.get('orders').showOrder,
})

const mapDispatchToProps = dispatch => ({
  setShowOrder: value => dispatch(showOrder(value)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderCard)
