import BinaryToggle from 'components/BinaryToggle'
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import capitalize from 'utils/capitalize'

import 'assets/InventoryListItem.css'
import InventoryPlaceholderImage from '../../images/Img Placeholder.png'

const InventoryListItem = ({ item, isAvailable, onToggle, setId ,currency_symbol}) => {

  const [availability, setAvailability] = useState(isAvailable)
  const [itemImage, setItemImage] = useState('')

  useEffect(() => {
    if (item.primary_img) setItemImage(item.primary_img)
    else setItemImage(InventoryPlaceholderImage)
  }, [item.primary_img])

  return (
    <div className="inventory-item__outer">
      <div className="inventory-item__upper">
        {/* Item Image */}
        <div className="upper__left">
          <img src={itemImage} alt={item.item_name} />
        </div>
        <div className="upper__right" style={{textTransform:"capitalize"}}>
          {/* Item Name */}
          <p className="line-clamp">{item.item_name}</p>
          {/* Item Price */}
          <div className="inventory-item__price">
            <span className="selling__price">
              {currency_symbol} {parseFloat(item.sale_price).toFixed(2)}
              {item.sale_price < item.price && (
                <span className="cost__price">
                  {currency_symbol} {parseFloat(item.price).toFixed(2)}
                </span>
              )}
            </span>
          </div>
          <div className="inventory-item__actions">
            {/* Item Availabilty */}
            <BinaryToggle
              activeColor="#1492E6"
              inactiveColor="rgba(36,36,36,0.3)"
              toggle={availability}
              toggleCallback={() => {
                const availabilityBoolean = !availability
                onToggle(item.item_id, availabilityBoolean)
                setAvailability(availabilityBoolean)
              }}
            />
            {/* Item Edit */}
            <span>
              <NavLink
                to={{
                  pathname: '/app/manage-items/item',
                  state: {
                    edit: true,
                    item,
                  },
                }}
              >
                Edit
              </NavLink>
            </span>
          </div>
        </div>
      </div>
      <div
        className="inventory-item__bottom"
        onClick={e => {
          e.preventDefault()
          setId(item.item_id)
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
        <span>Share Product</span>
      </div>
    </div>
  )
}
export default InventoryListItem
