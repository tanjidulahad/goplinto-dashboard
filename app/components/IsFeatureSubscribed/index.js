import React from 'react'

import Loader from 'components/LoadingIndicator'
import NotSubscribedCard from 'components/NotSubscribedCard'

const IsFeatureSubscribed = ({ subscribedTo, feature, children }) => {
  return subscribedTo.modules[feature] ? children : <NotSubscribedCard />
}

export default IsFeatureSubscribed
