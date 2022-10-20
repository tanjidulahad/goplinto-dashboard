import React from 'react'

import '../../assets/ShareModal.css'

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'

const ShareModal = ({ heading = null, close, storeUrl = null, itemLink = null }) => {
  return (
    <>
      <div className="flex justify-center items-center backdrop" />
      <div className="modal">
        <div className="modal__main">
          <span>{heading ? heading : 'Share the website with your customers!'}</span>
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
          {storeUrl && (
            <>
              <span>Your customers can visit your online store and place the orders from this link.</span>
              <a target="_blank" rel="noopener noreferrer" href={storeUrl}>
                {storeUrl.substring(8)}
              </a>
            </>
          )}
          <div className="shareLinks">
            <span>Share link Via</span>
            <div className="shareIcons">
              <FacebookShareButton url={storeUrl ? storeUrl : itemLink}>
                <FacebookIcon size={50} borderRadius={5} />
              </FacebookShareButton>
              <WhatsappShareButton url={storeUrl ? storeUrl : itemLink}>
                <WhatsappIcon size={50} borderRadius={5} />
              </WhatsappShareButton>
              <TwitterShareButton url={storeUrl ? storeUrl : itemLink}>
                <TwitterIcon size={50} borderRadius={5} />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareModal
