import BinaryToggle from 'components/BinaryToggle'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import capitalize from 'utils/capitalize'
import makeStoreUrl from 'utils/makeStoreUrl'

import ShareModal from 'components/ShareModal'

import 'assets/StoreCard.css'
import InventoryPlaceholderImage from '../../images/Img Placeholder.png'

const StoreCard = ({ store, onToggle, setId }) => {
  const [availability, setAvailability] = useState(store.is_open_today === 'Y')
  const [itemImage, setItemImage] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    if (store.logo_img_url) setItemImage(store.logo_img_url)
    else setItemImage(InventoryPlaceholderImage)
  }, [store.logo_img_url])

  return (
    <>
      <div className="store-card__outer">
        <div className="store-card__upper">
          {/* store Image */}
          <div className="store-card-upper__left">
            <img src={itemImage} alt={store.store_name} />
          </div>
          <div className="store-card-upper__right">
            {/* store Name */}
            <p className="line-clamp">{capitalize(store.store_name)}</p>
            <div className="item-sublabel store-card-storeDesc">{store.store_desc}</div>
            <div className="store-card__actions">
              {/* store Availabilty */}
              <BinaryToggle
                activeColor="#1492E6"
                inactiveColor="rgba(36,36,36,0.3)"
                toggle={availability}
                toggleCallback={() => {
                  const availabilityBoolean = !availability
                  onToggle(store.store_id, availabilityBoolean)
                  setAvailability(availabilityBoolean)
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="store-card__bottom"
          onClick={e => {
            e.preventDefault()
            setShowShareModal(true)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>

          <span>Share Store</span>
        </div>
      </div>
      {showShareModal && (
        <ShareModal
          close={e => {
            e.preventDefault()
            setShowShareModal(false)
          }}
          storeUrl={makeStoreUrl(store.store_name, store.store_id)}
        />
      )}
    </>
  )
}
export default StoreCard
