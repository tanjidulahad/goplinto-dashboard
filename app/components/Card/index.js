import React from 'react'

const Card = ({ children }) => (
  <div className="p-8 mt-5 lg:mt-0 leading-normal rounded-lg text-gray-800 bg-white w-full">
    <div>{children}</div>
  </div>
)

export default Card
