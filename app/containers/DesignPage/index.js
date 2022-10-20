import NewFooter from 'components/Footer/newFooter'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import '../../assets/DesignPage.css'
import arrow from '../../images/Path.png'

const DesignPage = () => {
  const Card = ({ heading, text, Unavailable, RouteLink }) => {
    return (
      <div
        className={Unavailable ? 'design-page-unavailable-cards' : 'design-page-cards w-1/3'}
        onClick={() => history.push(RouteLink, { firstTime: false, pageParam: 'display info' })}
      >
        <h1 className="flex">
          {heading} <img className="card-arrow" src={arrow} />
        </h1>
        <p>{text}</p>
        {Unavailable && <p className="coming_soon">Coming Soon...</p>}
      </div>
    )
  }

  const history = useHistory()

  return (
    <>
      
      <Helmet>
        <title>Design</title>
        <meta name="description" content="Design page" />
      </Helmet>

      <ExtendedNavBar text="Design" noHelp noBack />

      <div className="main_div">
        <h1>Templates</h1>
        <div className="flex">
          <Card
            heading="Free Templates"
            text="Select a free templet for your website which suits your requirements."
            RouteLink="/app/design/templates"
          />
          <Card
            heading="Premium Templates"
            text="Unlock your limits, go premium for lot's of additional features in your website."
            Unavailable
          />
          <Card
            heading="Website Setting"
            text="You can change store logo, colour and theme or your website."
            RouteLink="/app/edit/information"
          />
        </div>
      </div>
     <NewFooter/>
    </>
  )
}
export default DesignPage
