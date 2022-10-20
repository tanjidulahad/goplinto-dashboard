import React from 'react'

const PricingCard = ({ planName, planAmount, currency, planContent, features }) => (
  <div style={{ width: '25rem', margin: '15px' }} className="h-auto bg-white shadow-lg p-6 rounded-lg items-center">
    <div className="flex justify-between mx-4">
      <p className="text-3xl">{planName}</p>
      <p className="text-3xl">
        {currency} {planAmount}
      </p>
    </div>
    <hr />
    <div id="content">
      <p className="my-4 text-xl font-semibold">About the plan</p>
      <p className="text-sm">{planContent}</p>
    </div>
    <hr className="my-4" />
    <p className="text-xl font-semibold">Features</p>
    <div className="mb-2" id="features">
      <ul className="list-disc">
        {features.map(ele => (
          <li>{ele}</li>
        ))}
      </ul>
    </div>
  </div>
)

export default PricingCard
