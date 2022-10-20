import React from 'react'
import OrderCard from 'components/OrderCard'

import enums from './enums'

export default ({ type, orders }) => {
  let headerMessage
  let noOrderMessage
  switch (type) {
    case enums.NEW:
      headerMessage = 'New Orders'
      noOrderMessage = 'You have no new Orders ...'
      break
    case enums.PREP:
      headerMessage = 'Preparing Orders'
      noOrderMessage = 'You have no orders being prepared ...'
      break
    case enums.OUT_FOR_DELIVERY:
      headerMessage = 'Out for Delivery'
      noOrderMessage = "You don't have any orders out for delivery yet!"
      break
  }
  return (
    <>
      <div className="my-4">
        <h1 className="text-base font-semibold tracking-wide item-label uppercase">{headerMessage}</h1>
      </div>
      <div className="flex flex-wrap">
        {orders.length ? (
          orders.map(order => <OrderCard key={order.orderId} />)
        ) : (
          <p className="text-base font-semibold uppercase"> {noOrderMessage}</p>
        )}
      </div>
    </>
  )
}
