import React from 'react'

const BinaryToggle = ({ toggle, toggleCallback, activeColor, inactiveColor }) => (
  <div
    onClick={toggleCallback}
    style={{
      borderRadius: '4px',
      backgroundColor: toggle ? activeColor : inactiveColor,
    }}
    className="w-10 h-6 flex-shrink-0 p-1 cursor-pointer"
  >
    <div
      style={{
        borderRadius: '4px',
      }}
      className={`w-4 z-auto h-4 bg-white shadow-md transform duration-300 ease-in-out ${
        toggle ? `translate-x-4` : ``
      }`}
    />
  </div>
)

export default BinaryToggle
