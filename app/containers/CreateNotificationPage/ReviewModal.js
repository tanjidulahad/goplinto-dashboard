import React from 'react'
import 'assets/ReviewModal.css'
import MediaQuery from 'react-responsive'
import { UnixTimeStampToDate } from 'utils/UnixTimeStampToDate'

const ReviewModal = ({ close, data, confirm }) => {
  return (
    <>
      <div className="flex justify-center items-center backdrop" />
      <MediaQuery minDeviceWidth={601}>
        <div className="modal">
          <div className="modal__main">
            <span>Review Notification</span>
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
          <div className="modal__sub">
            <div className="review__modal_div">
              <h3>Message</h3>
              <div>
                <div className="one">Title</div>
                <div className="two">{data.title}</div>
              </div>
              <div>
                <div className="one">Message</div>
                <div className="two">{data.message}</div>
              </div>
            </div>
            <div className="review__modal_div">
              <h3>Audience</h3>
              <div>{data.audienceType.split('_').map(string => `${string} `)}</div>
            </div>
            <div className="review__modal_div" style={{ borderBottom: 'none' }}>
              <h3>Delivery</h3>
              <div>
                {data.scheduleTime ? `Scheduled to send at ${UnixTimeStampToDate(data.scheduleTime)}` : `Immediately`}
              </div>
            </div>
            <div className="confirm_send">
              <button
                onClick={e => {
                  e.preventDefault()
                  confirm()
                }}
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={601}>
        <div className="modal_mobile_view">
          <div className="modal_mobile_view_main">
            <span>Review Notification</span>
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
          <div className="modal_mobile_view_sub">
            <div className="review__modal_div">
              <h3>Message</h3>
              <div>
                <div className="one">Title</div>
                <div className="two">{data.title}</div>
              </div>
              <div>
                <div className="one">Message</div>
                <div className="two">{data.message}</div>
              </div>
            </div>
            <div className="review__modal_div">
              <h3>Audience</h3>
              <div>{data.audienceType.split('_').map(string => `${string} `)}</div>
            </div>
            <div className="review__modal_div" style={{ borderBottom: 'none' }}>
              <h3>Delivery</h3>
              <div>
                {data.scheduleTime ? `Scheduled to send at ${UnixTimeStampToDate(data.scheduleTime)}` : `Immediately`}
              </div>
            </div>
          </div>
          <div className="confirm_send">
            <button
              onClick={e => {
                e.preventDefault()
                confirm()
              }}
            >
              Confirm & Send
            </button>
          </div>
        </div>
      </MediaQuery>
    </>
  )
}

export default ReviewModal
