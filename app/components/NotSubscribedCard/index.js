import React from 'react'
import { useHistory } from 'react-router-dom'

import '../../assets/NotSubscribedCard.css'

const NotSubscribedCard = () => {
  const history = useHistory()

  return (
    <div className="main__outer__container">
      <div className="card__main__container">
        <h1>Please upgrade your plan to access this feature.</h1>
        <button
          onClick={e => {
            e.preventDefault()
            history.push('/app/general/payment-plan')
          }}
        >
          Upgrade
        </button>
      </div>
    </div>
  )
}

export default NotSubscribedCard
