import React from 'react'
import './style.css'

import BinaryToggle from 'components/BinaryToggle'
import InventoryPlaceholderImage from '../../images/Img Placeholder.png'
import { numberInputValidation } from 'utils/validation'

const ProductRow = ({ arr, index, p, checkBoxHandler, color, onChangeHandler, onToggleChangeHandler, isTablet }) => {
  

  return (
    <tr key={index} className="mt-1 bg-white">
      <td>
        <label
          id={p.variantItemId ? p.variantItemId : p.itemId}
          className="ncheckbox_container flex justify-center item-center"
          style={{
            backgroundSize:
              arr.indexOf((p.variantItemId ? p.variantItemId : p.itemId).toString()) === -1 ? '0px' : 'cover',
          }}
          onClick={e => checkBoxHandler(e, p.variantItemId ? p.variantItemId : p.itemId)}
        />
      </td>

      <td className="px-2">
      <div className="flex">
          <span className="img_div">
            <figure>
              <img src={p.img ? p.img : InventoryPlaceholderImage} className="product_img" />
            </figure>
          </span>
          <p className="my-auto capitalize">
                      {p.item_name && isTablet ? p.item_name.substring(0, 80) : p.item_name.substring(0, 40)}
                      {p.item_name && isTablet ? p.item_name.length > 80 && "......":p.item_name.length>40&&"......"}
            <br />
            <span className="text-gray-500 text-sm">
              {p.variantDetails && p.variantDetails.variant_value_1}{' '}
              {p.variantDetails && p.variantDetails.variant_value_2 && ' | ' + p.variantDetails.variant_value_2}
            </span>
          </p>
        </div>
      </td>
      <td className="px-2">
        <input className='inputStyle' type="number" name="maxQuantity" onKeyDown={e=>numberInputValidation(e)} value={p.maxQuantity} onChange={e => onChangeHandler(e, index)} />
      </td>
      <td className="px-2">
        <input className='inputStyle' type="number" name="minQuantity" value={p.minQuantity} onKeyDown={e => numberInputValidation(e)} onChange={e => onChangeHandler(e, index)} />
      </td>
      <td className="px-2">
        {!color ? (
          <span className="stock_status">
            <BinaryToggle
              inactiveColor="rgba(36,36,36,0.3)"
              activeColor="#1492E6"
              name="itemStatus"
              toggle={p.itemStatus === 'AVAILABLE'}
              toggleCallback={() => {
                const availability = p.itemStatus === 'AVAILABLE'
                onToggleChangeHandler(index, !availability)
              }}
            />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{p.itemStatus === 'AVAILABLE' ? 'In Stock' : 'Out Of Stock'}</p>
          </span>
        ) : (
          <input
            className='inputStyle'
            type="number"
            name="inventoryQuantity"
            value={p.inventoryQuantity}
            onChange={e => onChangeHandler(e, index)}
            onKeyDown={e => numberInputValidation(e)}
          />
        )}
      </td>
      <td className="px-2">
        <input
          name="thresholdQuantity"
          type="number"
          value={p.thresholdQuantity}
          className='inputStyle1'
          style={{ background: !color && '#F2F2F2', }}
          onChange={e => onChangeHandler(e, index)}
          onKeyDown={e => numberInputValidation(e)}
          disabled={!color}
        />
      </td>
    </tr>
  )
}
export default ProductRow
