import React from 'react'
import MediaQuery from 'react-responsive'
import 'assets/ReviewModal.css'
import 'assets/DeleteModal.css'

const DeactivateModal = ({ close, data, confirm, setReloadAfterStatusChangeToDeactivate }) => {
  return (
    <>
      <div className="flex justify-center items-center backdrop" />
      <MediaQuery minDeviceWidth={601}>
        <div className="modal">
          <div className="delete__main">
            <span className="text-base font-bold">Deactivate Coupon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-5 flex-none cursor-pointer"
              viewBox="0 0 20 20"
              fill="#242424BF"
              onClick={close}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="delete__sub mb-4 mt-2">
            <div className="delete__modal_div">
              <span className="text-base font-normal text-muted-med">
                Are you sure you want to deactivate this coupon?
              </span>
              <div>
                <span className="text-sm font-normal text-muted-light mt-4">
                  The coupon is currently active. Deactivated coupons can't be used by your customers
                </span>
              </div>
            </div>
            <div className="confirm_delete">
              <button
                className=" px-8 py-2 mr-4 text-sm font-bold text-red-500 outline-none background-transparent focus:outline-none border-2 border-secondary text-secondary rounded-lg"
                onClick={e => {
                  e.preventDefault()
                  close()
                }}
              >
                Cancel
              </button>
              <button
                className=" bg-secondary rounded-lg text-white px-8 py-2 font-medium focus:outline-none border-2 border-secondary"
                onClick={e => {
                  e.preventDefault()
                  confirm(data.coupon_id, 'INACTIVE')
                  setReloadAfterStatusChangeToDeactivate(true)
                  close()
                }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={601}>
        <div className="modal_mobile_view">
          <div className="modal_mobile_view_main remove__heading my-4">
            <span className="text-base font-bold">Deactivate Coupon</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-5 flex-none cursor-pointer"
              viewBox="0 0 20 20"
              fill="#242424BF"
              onClick={close}
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="modal_mobile_view_sub mb-4">
            <div className="delete__modal_div">
              <span className="text-sm md:text-base font-normal text-muted-med">
                Are you sure you want to deactivate this coupon?
              </span>
              <div>
                <span className="text-xs md:text-sm font-normal text-muted-light">
                  The coupon is currently active. Deactivated coupons can't be used by your customers
                </span>
              </div>
            </div>
          </div>
          <div className="confirm_delete">
            <button
              className=" px-8 py-2 mr-4 text-sm font-bold text-red-500 outline-none background-transparent focus:outline-none border-2 border-secondary text-secondary rounded-lg"
              onClick={e => {
                e.preventDefault()
                close()
              }}
            >
              Cancel
            </button>
            <button
              className=" bg-secondary rounded-lg text-white px-8 py-2 font-medium focus:outline-none border-2 border-secondary"
              onClick={e => {
                e.preventDefault()
                confirm(data.coupon_id, 'INACTIVE')
                setReloadAfterStatusChangeToDeactivate(true)
                close()
              }}
            >
              Deactivate
            </button>
          </div>
        </div>
      </MediaQuery>
    </>
  )
}

export default DeactivateModal
