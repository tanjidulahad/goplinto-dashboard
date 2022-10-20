import React from 'react'
import { ColorPicker, useColor } from 'react-color-palette'

import colorNameToHex from 'utils/colorNameToHex'

const VariantColorPicker = ({ color, onSubmitColorVariant }) => {
  const newColorHex = colorNameToHex(color)
  const [currentColor, setCurrentColor] = useColor('hex', newColorHex ? newColorHex : '#121212')

  return (
    <div
      style={{ boxShadow: '0px 4px 16px #00000040', borderRadius: '10px' }}
      className=" pb-4 bg-white flex flex-col items-center"
    >
      <ColorPicker width={250} height={100} color={currentColor} onChange={setCurrentColor} hideHSV hideRGB light />
      <div>
        <button
          className="cta-btn rounded-md text-white focus:outline-none"
          style={{ transition: 'all .15s ease', whiteSpace: 'nowrap' }}
          onClick={() => onSubmitColorVariant(currentColor.hex)}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default VariantColorPicker
