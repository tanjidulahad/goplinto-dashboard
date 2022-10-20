import React from 'react'

import aws from '../../images/paymentImages/aws.png'
import Azure from '../../images/paymentImages/Azure.png'

import httpsImg from '../../images/paymentImages/https.png'
import pciImg from '../../images/paymentImages/pcicerti.png'
import sslImg from '../../images/paymentImages/ssl.png'

import visa from '../../images/paymentImages/visa.png'
import mastercard from '../../images/paymentImages/mastercard.png'
import amex from '../../images/paymentImages/amex.png'
import upi from '../../images/paymentImages/upi.png'
import paytm from '../../images/paymentImages/paytm.png'
import pe from '../../images/paymentImages/pe.png'
import gpay from '../../images/paymentImages/gpay.png'
import { useMediaQuery } from 'react-responsive'

const PaymentPromotionImages = ({widthProp}) => {
    const isTablet = useMediaQuery({ minWidth: 1101 })


  return (
    <div style={{overflow:"hidden",width:"100vw"}}>
          <div className='flex absolute bottom-0 justify-around py-3' style={{ borderTop: isTablet&&"1px solid #00000029", width:!isTablet?"97vw": widthProp ? widthProp:"76vw" ,paddingBottom:!isTablet&&"60px"}}>
              <div>
                  <p className='text-center text-gray-500 text-sm font-semibold' style={{ fontSize: !isTablet && "6px" }}>{isTablet&&"Cloud"} Hosted on</p>
                  <div className={isTablet ? 'flex justify-evenly gap-4' : 'flex justify-evenly gap-1'}>
                      <img src={aws} className={isTablet?"h-6":"h-3"} />
                      <img src={Azure} className={isTablet ? "h-6" : "h-4"} style={{marginTop:"-3px"}}  />
                  </div>
              </div>
              <span className='my-auto mx-1' style={{ height: isTablet?"40px":"20px", borderRight:"2px solid #00000029"}}></span>
              <div>
                  <p className='text-center text-gray-500 text-sm font-semibold' style={{ fontSize: !isTablet && "6px" }}>Secured payments with</p>
                  <div className={isTablet ? 'flex justify-evenly gap-4' : 'flex justify-evenly gap-1'}>
                      <img src={pciImg} style={{ height: isTablet?'32px':"15px" }} />
                      <img src={sslImg} style={{ height: isTablet ? '32px' : "12px",marginTop:"5px"}} />
                      <img src={httpsImg} style={{ height: isTablet ? '32px' : "15px" }} />
                  </div>
              </div>
              <span className='my-auto mx-2 mr-4' style={{ height: isTablet ? "40px" : "20px", borderRight: "2px solid #00000029" }}></span>
              <div>
                  <p className='text-center text-gray-500 text-sm font-semibold' style={{fontSize:!isTablet&&"6px"}}>Payments accepted via</p>
                  <div className={isTablet?'flex justify-evenly gap-4':'flex justify-evenly gap-1'} >
                      <img src={visa} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={mastercard} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={amex} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={upi} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={paytm} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={pe} className={isTablet ? "h-6" : "h-3"}  />
                      <img src={gpay} className={isTablet ? "h-6" : "h-3"}  style={{ transform: 'scale(2)' }} />
                      {isTablet && <span className="my-auto">& more</span>}
                  </div>
              </div>
          </div>
    </div>
  )
}

export default PaymentPromotionImages