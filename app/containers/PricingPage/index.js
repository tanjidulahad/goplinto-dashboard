import React from 'react'

import { Helmet } from 'react-helmet'

import PricingCard from 'components/PricingCard'

const PricingPage = () => (
  <div>
    <Helmet>
      <title>Pricing</title>
      <meta name="description" content="Pricing" />
    </Helmet>
    <div className="flex justify-between bg-white">
      <div className="text-3xl uppercase font-semibold border-b px-4 py-4">
        <p>Plan</p>
      </div>
    </div>
    {/* Placing Stub Cards; Should be populated with APIs */}
    <div className="flex mt-8 ml-8 mr-8 mb-8 content-start flex-wrap">
      <PricingCard
        planName="Plan 1"
        planAmount={500}
        currency="₹"
        planContent="This is a stub plan. This will be populated by the API. This is some content which I'm feeding to check if it wraps"
        features={['feature', 'feature']}
      />
      <PricingCard
        planName="Plan 1"
        planAmount={500}
        currency="₹"
        planContent="This is a stub plan. This will be populated by the API. This is some content which I'm feeding to check if it wraps"
        features={['feature', 'feature']}
      />
      <PricingCard
        planName="Plan 1"
        planAmount={500}
        currency="₹"
        planContent="This is a stub plan. This will be populated by the API. This is some content which I'm feeding to check if it wraps"
        features={['feature', 'feature']}
      />
      <PricingCard
        planName="Plan 1"
        planAmount={500}
        currency="₹"
        planContent="This is a stub plan. This will be populated by the API. This is some content which I'm feeding to check if it wraps"
        features={['feature', 'feature']}
      />
    </div>
  </div>
)

export default PricingPage
