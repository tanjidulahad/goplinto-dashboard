import React, { useState, useEffect } from 'react'
import capitalize from 'utils/capitalize'
import { useMediaQuery } from 'react-responsive'
import 'assets/AddonListItem.css'
import InventoryPlaceholderImage from '../../images/Img Placeholder.png'
import { FaEllipsisV } from 'react-icons/fa'
import { Dropdown } from 'antd'
const AddonListItem = ({ item, setId, Menu }) => {
  const [itemImage, setItemImage] = useState('')

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  useEffect(() => {
    if (item.primary_img) setItemImage(item.primary_img)
    else setItemImage(InventoryPlaceholderImage)
  }, [item.primary_img])
  return (
    <div className="inventory-item__outer">
      <div className="inventory-item__upper">
        <div className="upper__left">
          <img src={itemImage} alt={item.item_name} />
        </div>
        <div className="upper__right">
          <p className="line-clamp">
            <Desktop>
              {' '}
              {item.item_name.length > 20
                ? capitalize(item.item_name).substring(0, 20) + '...'
                : capitalize(item.item_name)}{' '}
            </Desktop>
            <Mobile>
              {' '}
              {item.item_name.length > 15
                ? capitalize(item.item_name).substring(0, 15) + '...'
                : capitalize(item.item_name)}{' '}
            </Mobile>
          </p>

          <p style={{ paddingTop: '20px', fontWeight: 500, fontSize: 'larger', color: '#242424bf' }}>
            <Desktop>
              {' '}
              {item.item_desc && item.item_desc.length > 34
                ? item.item_desc.substring(0, 34) + '...'
                : item.item_desc}{' '}
            </Desktop>
            <Mobile>
              {' '}
              {item.item_desc && item.item_desc.length > 26
                ? item.item_desc.substring(0, 26) + '...'
                : item.item_desc}{' '}
            </Mobile>
          </p>
        </div>
        <div className="upper__top_right">
          <Dropdown overlay={Menu(item.item_id)} trigger={['click']}>
            <button className="focus:outline-none text-md gap-2">
              <FaEllipsisV style={{ alignItems: 'center', cursor: 'pointer', outline: 'none' }} />
            </button>
          </Dropdown>
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
export default AddonListItem
