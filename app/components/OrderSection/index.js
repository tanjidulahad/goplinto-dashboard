import React, { useState } from 'react'
import OrderCard from 'components/OrderCard'
import enums from 'utils/orderStatusEnums'
import LoadingOrderCard from 'components/LoadingOrderCard'
import "./style.css"

export default ({ type, orders, onUpdate, max, setCurrentPageStatus, storeCurrency,loaderCard }) => {
  let headerMessage = 'DEFAULT_MESSAGE'
  let noOrderMessage = 'DEFAULT_NULL_MESSAGE'
  switch (type) {
    case enums.NEW:
      headerMessage = 'New Orders'
      noOrderMessage = 'You have no new Orders ...'
      break
    case enums.PREP:
      headerMessage = 'Ongoing Orders'
      noOrderMessage = 'You have no orders being prepared ...'
      break
    case enums.OUT_FOR_DELIVERY:
      headerMessage = 'Out for Delivery'
      noOrderMessage = "You don't have any orders out for delivery yet!"
      break

    case enums.PAST_DELIVERED:
      headerMessage = 'Delivered Orders'
      noOrderMessage = 'No order has been delivered yet!'
      break

    case enums.PAST_CANCELLED:
      headerMessage = 'Cancelled Orders'
      noOrderMessage = "There aren't any cancelled orders to display ..."
      break
  }
  if (max === 10) {
    if (orders.length > 5)
      orders = orders.slice(0, 5)
  }
  return (
    <div>
      <div className="relative my-4 flex content-center">
        <hr className="absolute hr_height mt-3 w-full bg-black" />
        <span className='headerMsg'>
          <h1 className="item-label-title text-lg capitalize">
            {headerMessage}
          </h1>
        </span>
      </div>
      <div className="flex flex-wrap rounded-lg">
        {orders.length ? (
          orders.map((order, index) => (
            <OrderCard storeCurrency={storeCurrency} key={order.orderId} index={index} orderType={order.orderStatus} ordersLength={orders.length} order={order} onUpdate={onUpdate} />
          ))

        ) : (
            loaderCard ?  [1, 2, 3].map(() =>{return <LoadingOrderCard />}):
         <p className="w-full md:px-2 md:py-10  text-center font-medium text-muted-light text-base noOrderMsg">
            {' '}
            {noOrderMessage}
          </p>
        )}
        {max === 10 && orders.length >= 5 ?
          <div
            type="button"
            className="view_orders_btn  h-40 w-50   my-auto mx-auto capitalize px-4 py-4 cursor-pointer rounded-md "
            onClick={() => {
              headerMessage === "New Orders" ? setCurrentPageStatus(enums.NEW) : headerMessage === "Ongoing Orders" ? setCurrentPageStatus(enums.PREP) : headerMessage === "Delivered Orders" ? setCurrentPageStatus(enums.DELIVERED) : headerMessage === "Cancelled Orders" ? setCurrentPageStatus(enums.CANCELLED) : setCurrentPageStatus(enums.OUT_FOR_DELIVERY)
            }}

          ><span className="flex">view all<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg> </span> <span>{headerMessage}</span></div> : null}
      </div>
    </div >
  )
}
