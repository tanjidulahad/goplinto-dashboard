import React from 'react'

const LoadingOrderCard = () => {
  const TextRow = () => {
    return (
      <div className="flex">
        <p className="h-5 bg-gray-300 w-20" />
        <span className="mx-2 bg-gray-300 w-32 h-5" />
      </div>
    )
  }
  return (
    <div className="relative ordersPage-orderCard-container p-magic">
      <div className="absolute block tag-position">
        <p className="bg-gray-300 mt-4 w-32 h-6 text-gray-300">Order Status</p>
      </div>
      <div key={1} className="animate-pulse mt-5 px-4 py-4 my-2 bg-white shadow-lg ">
        <div className="flex justify-between mb-10">
          <p className="text-sm h-5 item-label font-bold bg-gray-300 w-1/4 pt-2" />
          <p className="text-sm h-5 item-label font-bold bg-gray-300 w-1/4 pt-2" />
        </div>
        <TextRow />
        <TextRow />
        <TextRow />
        <TextRow />

        <p className="text-sm font-semibold text-black-pl h-5 bg-gray-300 w-16" />
        <TextRow />

        <div className="grid grid-cols-2 gap-4">
        <button className="h-10 my-2 bg-gray-300 w-24" />
        <button className="h-10 my-2 bg-gray-300 w-24" />
        </div>
      </div>
    </div>
  )
}

export default LoadingOrderCard