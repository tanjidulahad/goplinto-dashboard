import React from 'react'
import moment from 'moment'
import Logo from '../../images/plinto-site-logo.png'
const BasicDetails = (
  customerName,
  orderId,
  orderPlacedDateTime,
  itemCount,
  full_name,
  address_line_1,
  address_line_2,
  city,
  state,
  zip_code,
  country,
  address,
  storeCity,
  storeState,
  pincode,
  storeCountry,
  storeName,
  deliveryAddressDetails,
  storeLogo,
  pickUpData,
) => (
  <div>
    {storeLogo&&<img src={storeLogo} className="h-10 w-10" />}
    <h2 className="text-xl font-bold">{customerName}</h2>
    <p className="text-md font-medium mb-1">Order #{orderId}</p>
    <p className="text-md font-medium">Order placed : {orderPlacedDateTime}</p>
    <h2 className="text-lg font-semibold">Total Items:{itemCount}</h2>

    <div className="grid grid-cols-2">
      {deliveryAddressDetails ? (
  <div>
        <h2 className="text-lg font-bold">Shipped to: </h2>
       <p className="mb-0 font-medium">{full_name} ,</p>
        <p className="mb-0 font-medium">
            {address_line_1&&(address_line_1+",")} {address_line_2&&(address_line_2+",")}
        </p>
        <p className="mb-0 font-medium">
          {city&&(city+",")} {state&&(state+",")} {zip_code&&(zip_code+",")} {country}
        </p>
      </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold">Shipped to: </h2>
          <h2 className="text-xl mx-4 font-bold">-</h2>
      </div>
      )}
      <div>
        <h2 className="text-lg font-bold">{deliveryAddressDetails ? 'Shipped by:' : 'Pick-up address'}</h2>
          {!deliveryAddressDetails&&pickUpData?
        <>
          <p className="mb-0 font-medium">{pickUpData.pickup_point_name && (pickUpData.pickup_point_name + ",") } </p>
          <p className="mb-0 font-medium">{pickUpData.address && (pickUpData.address + ",")}</p>
          <p className="mb-0 font-medium">
              {pickUpData.city && (pickUpData.city + ",")}{pickUpData.state && (pickUpData.state + "-")}
             {pickUpData.zip_code && (pickUpData.zip_code + ",")}  {pickUpData.country && (pickUpData.country + ",")}
        </p>
       </>
       :
       <>
        <p className="mb-0 font-medium">{storeName} ,</p>
        <p className="mb-0 font-medium">{address&&(address+",")}</p>
        <p className="mb-0 font-medium">
          {storeCity&&(storeCity+",")} {storeState&&(storeState+",")} {pincode&&(pincode+",")} {storeCountry}
        </p>
       </>}
      </div>
    </div>
  </div>
)
export const SlipPrint = React.forwardRef((props, ref) => {
  const {
    orderId,
    itemCount,
    orderItems,
    customerName,
    deliveryAddressDetails,
    orderPlacedTime,
    storeName,
  } = props.order
  const storeLogo = props.storeLogo
  var full_name, address_line_1, address_line_2, city, state, zip_code, country

  if (deliveryAddressDetails) {
    full_name = deliveryAddressDetails.full_name

    address_line_1 = deliveryAddressDetails.address_line_1
    address_line_2 = deliveryAddressDetails.address_line_2
    city = deliveryAddressDetails.city
    state = deliveryAddressDetails.state
    zip_code = deliveryAddressDetails.zip_code
    country = deliveryAddressDetails.country
  }

  const keys = Object.keys(orderItems)
  const orderPlacedDateTime = moment.unix(orderPlacedTime).format('MMM DD,YYYY h:mm A')
  const { address, city: storeCity, state: storeState, pincode, country: storeCountry } = props.storeInfo

  return (
    <div ref={ref} className="p-5 bg-white mx-10 my-5">
      {BasicDetails(
        customerName,
        orderId,
        orderPlacedDateTime,
        itemCount,
        full_name,
        address_line_1,
        address_line_2,
        city,
        state,
        zip_code,
        country,

        address,
        storeCity,
        storeState,
        pincode,
        storeCountry,
        storeName,
        deliveryAddressDetails,
        storeLogo,
        props.pickUpData,
      )}
      <div className="text-lg font-bold">
        <div className="grid grid-cols-2 my-2 capitalize text-center">
          <h2 className="bg-gray-300 ">Item Name</h2>
          <h2 className="bg-gray-300">Item Quantity</h2>
        </div>
        {keys.map(key => (
          <div className="grid grid-cols-2 text-sm my-2 capitalize text-center" key={key}>
            <p className=" font-semibold">{orderItems[key].itemName}</p>
            <p className="font-semibold ">{orderItems[key].itemQuantity}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-sm my-auto">
        Powered by <img src={Logo} className="h-4 inline w-15" />
      </p>
    </div>
  )
})

export const OrderPrint = React.forwardRef((props, ref) => {
  const {
    orderId,
    itemCount,
    orderItems,
    customerName,
    deliveryAddressDetails,
    orderPlacedTime,
    orderAmount,
    taxAmount,
    savingsAmount,
    parcelCharge,
    discountedOrderAmount,
    calculatedOrderTotal,
    couponDetails,
    storeName,
    paymentDetails,
    deliveryCharge,
    convenienceFee,
  } = props.order
  const { address, city: storeCity, state: storeState, pincode, country: storeCountry } = props.storeInfo

  const storeLogo = props.storeLogo
  var full_name, address_line_1, address_line_2, city, state, zip_code, country
  const { gstNo, panNo, email, phone } = props
  if (deliveryAddressDetails) {
    full_name = deliveryAddressDetails.full_name

    address_line_1 = deliveryAddressDetails.address_line_1
    address_line_2 = deliveryAddressDetails.address_line_2
    city = deliveryAddressDetails.city
    state = deliveryAddressDetails.state
    zip_code = deliveryAddressDetails.zip_code
    country = deliveryAddressDetails.country
  }
  const pickUpAddress = props.pickUpData;
  const keys = Object.keys(orderItems)
  const orderPlacedDateTime = moment.unix(orderPlacedTime).format('MMM DD,YYYY h:mm A')
  const currencySymbol = props.currencySymbol
  return (
    <div ref={ref} className="px-5 bg-white mx-10 mt-1">
      <div>
        {storeLogo&&<img src={storeLogo} className="h-10 w-10 my-2" />}
        <h1 className='text-center font-bold text-xl my-5'>Tax Invoice</h1>
        <div className="grid grid-cols-2 text-md font-medium my-5 pb-10">
          <div>
            <b>{!pickUpAddress ? 'Sold by ' : 'Pick-up address '}: </b>
            {pickUpAddress?
              <p className='w-56'>{pickUpAddress.address && (pickUpAddress.address + ",")} {pickUpAddress.city && (pickUpAddress.city + ",")} {pickUpAddress.state && (pickUpAddress.state + "-")}-{pickUpAddress.zip_code && (pickUpAddress.zip_code + ",")} {pickUpAddress.country && (pickUpAddress.country +",")}</p>
          :
            <p className='w-56'>{address&&(address+",")} {storeState&&(storeState+",")} {storeCity&&(storeCity+"-")}-{pincode&&(pincode+",")} {storeCountry&&(storeCountry+",")}</p>
}
            <p><b>Email : </b>{email}</p>
            <p><b>Phone : </b>{phone}</p>
          </div>
          <div>
            <p><b>PAN No : </b>{panNo}</p>
            <p><b>GST No : </b>{gstNo}</p>
            <p><b>Order No : </b>{orderId}</p>
            <p><b>Order Date : </b>{orderPlacedDateTime}</p>
          </div>
          <div className='mt-10'>

          {deliveryAddressDetails ? (
            <div>
              <h2 className="text-md font-bold">Sold to: </h2>
              <p className="font-medium">{full_name}</p>
              <p className="mb-0 font-medium">
                {address_line_1}, {address_line_2},
              </p>
              <p className="mb-0 font-medium">
                {city}, {state}, {zip_code}, {country}
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold">Shipped to: </h2>
              <h2 className="text-xl mx-4 font-bold">-</h2>
            </div>
          )}

          </div>
        </div>
      </div>
      <table className='w-full text-left my-5'>
        <tbody>
        <tr>
          <th>No.</th>
          <th className='w-56'>Product</th>
          <th>Qty</th>
          <th>Tax Amount</th>
          <th>Tax Percentage</th>
          <th>Total Price</th>
        </tr>
          {keys.map((key, index) => (
            
    <tr key={key}>
                <td>{++index}</td>
                <td>{orderItems[key].itemName}</td>  

                <td>{orderItems[key].itemQuantity}</td>
                <td>{orderItems[key].orderItemTax}</td>
                <td>{orderItems[key].taxRate}</td>
                <td>
                  {currencySymbol}
                  {orderItems[key].itemQuantity * orderItems[key].itemPrice}
                  {orderItems[key].isTaxInclusve === 'Y' ? "*" : ""}
                </td>
            

      </tr>
 
          ))} 
        </tbody>
      </table>
        <hr />
      <div className="bg-white p-5 text-right text-md font-semibold">
          <p>Item Total : {currencySymbol} {orderAmount}</p>
          <p> Tax : {currencySymbol} {taxAmount} </p>

          {savingsAmount > 0 && <p>Discount : {currencySymbol + savingsAmount}</p>}

          {couponDetails.length > 0 && <p>
            Promo Code {couponDetails.length > 0 ? couponDetails.coupon_code : ''}
            {couponDetails.discount_amount
              ? `-${currencySymbol} ${couponDetails.discount_amount}`
              : `${currencySymbol}0`}
          </p>}

          {parcelCharge > 0 && <p>Parcel Charges : {currencySymbol}{parcelCharge}</p>}

          {deliveryCharge > 0 && <p>{paymentDetails.payment_mode === 'COD' ? 'Delivery Charges' : ''}
            {currencySymbol} {paymentDetails.payment_mode === 'COD' ? deliveryCharge : ""}
          </p>}
       
        <div className="text-lg font-bold capitalize">Total Amount : {currencySymbol} {calculatedOrderTotal}</div>
      </div>
      
      <p className='text-right mt-10'>Authorised Signatory</p>
      <p className="text-center text-sm">
        Powered by <img src={Logo} className="h-4 inline w-15" />
      </p>
      <p className='text-xs'>* Tax Inclusive</p>
    </div>
  )
})

export const KOTPrint = React.forwardRef((props, ref) => {

  const { orderId, orderItems, orderPlacedTime, calculatedOrderTotal, storeName } = props.order
  const keys = Object.keys(orderItems)
  const orderPlacedDate = moment.unix(orderPlacedTime).format('DD/MM/YYYY')
  const orderPlacedOnlyTime = moment.unix(orderPlacedTime).format('h:mm A')
  const { currencySymbol } = props
  return (
    <div ref={ref} className="p-5 bg-white mx-10 my-5 w-1/2" style={{ fontFamily: "courier" }}>
      <div className="text-md capitalize text-center border-b-2 border-dashed border-black">
        <p>Store:{storeName} </p>
        <p>Order Id : #{orderId}</p>
        <p>GST : </p>
        <p>Date : {orderPlacedDate}</p>
        <p>Time : {orderPlacedOnlyTime}</p>
      </div>
      <div className="border-b-2 border-dashed border-black">
        <div className="flex justify-around my-2 capitalize text-lg border-b-2 border-dashed border-black">
          <h2>Product</h2>
          <h2>Qty</h2>
          <h2>Amt</h2>
        </div>
        {keys.map((key, index) => (
          <div className="flex justify-around my-2 capitalize text-md" key={key}>
            <p>{orderItems[key].itemName}</p>
            <p>{orderItems[key].itemQuantity}</p>
            <p>
              {currencySymbol}
              {orderItems[key].itemQuantity * orderItems[key].itemPrice}
            </p>
          </div>
        ))}
      </div>
      <hr />
      <div className='border-b-2 border-dashed border-black'>

      <h2 className="mt-2 text-lg text-gray-800 capitalize">
        Total Items :{keys.length}
      </h2> 
      <h2 className="text-lg text-gray-800 capitalize">
        Total Amount :{currencySymbol} {calculatedOrderTotal}
      </h2>
</div>
      <h2 className="py-2 text-md text-center">
        THANK YOU, SEE YOU AGAIN !
      </h2>

    </div>
  )
})
