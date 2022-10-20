import React from 'react'
import orderStatusEnums from 'utils/orderStatusEnums'
import newOrderTag from '../../images/orderTags/new.png'
import preparingTag from '../../images/orderTags/preparing.png'
import deliveryTag from '../../images/orderTags/delivery.png'
import deliveredTag from '../../images/orderTags/delivered.png'
import cancelledTag from '../../images/orderTags/cancelled.png'
const CreateStoreModal = ({bannerType, title, children, closeModal }) =>{
  return(
    <>
      <div className="fixed inset-0 z-50 px-4 overflow-y-auto my-6" style={{marginBottom:"2%"}}>
        
        <div className="orderDetails-modal w-1/3 mx-auto">
          
          {/* content */}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg outline-none focus:outline-none">
            { bannerType &&
              <div className="absolute block tag-position" style={{marginLeft: "0px"}}>
                <img
                  src={
                    (bannerType === orderStatusEnums.CANCELLED && cancelledTag) ||
                    (bannerType === orderStatusEnums.DELIVERED && deliveredTag) ||
                    (bannerType === orderStatusEnums.OUT_FOR_DELIVERY && deliveryTag) ||
                    (bannerType === orderStatusEnums.PREP && preparingTag) ||
                    (bannerType === orderStatusEnums.NEW && newOrderTag)
                  }
                />
              </div>
            }
            
            {/* header */}
            <div className="flex md:px-4 py-4">
              <h3 style={{margin: "0 auto"}} className="text-base font-bold capitalize text-black-pl">{title}</h3>
              <button
                className="float-right bg-transparent border-0 outline-none focus:outline-none"
                type="button"
                onClick={closeModal}
              >
                <i className="fas fa-times text-gray-400 text-sm px-4"></i>
              </button>
            </div>
            {/* body */}
            <div className={`relative flex-auto ${bannerType ? 'mt-10':'mt-1'}`} style={{ background: '#F2F2F2' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          opacity: '0.2',
        }}
        className="fixed inset-0 z-40 bg-black "
      />
    </>
  )
}

export default CreateStoreModal
