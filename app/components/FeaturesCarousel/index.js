import React from 'react'

import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { connect } from 'react-redux'
import { setShowFeaturesCarousel } from 'containers/Auth/actions'

import 'assets/FeaturesCarousel.css'

import FirstSlideImage from 'images/Design inspiration-amico.png'
import SecondSlideImage from 'images/customization.png'
import ThirdSlideImage from 'images/Reports.png'
import FourthSlideImage from 'images/Email campaign-amico.png'

const indicatorStyles = {
  height: '9px',
  width: '8px',
  borderRadius: '50%',
  background: '#242424BF 0% 0% no-repeat padding-box',
  display: 'inline-block',
  margin: '0 5px 10px 5px',
}

const arrowStyles = {
  zIndex: 2,
  position: 'absolute',
  bottom: '20px',
  left: '30px',
  cursor: 'pointer',
  outline: 'none',
  color: '#F64B5D',
  fontWeight: '600',
  fontSize: 'medium',
}

const FeaturesCarousel = ({ setShowFeatures }) => {
  return (
    <>
      <span
        className="features__slides__skip"
        onClick={e => {
          e.preventDefault()
          setShowFeatures(false)
        }}
      >
        Skip
      </span>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        swipeable
        renderArrowPrev={(onClickHandler, hasPrev, label) => {
          return (
            hasPrev && (
              <span type="button" onClick={onClickHandler} title={label} style={arrowStyles}>
                Prev
              </span>
            )
          )
        }}
        renderArrowNext={(onClickHandler, hasNext, label) => {
          if (hasNext) {
            return (
              <span
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{ ...arrowStyles, right: '30px', left: 'auto' }}
              >
                Next
              </span>
            )
          } else {
            return (
              <span
                type="button"
                onClick={e => {
                  e.preventDefault()
                  setShowFeatures(false)
                }}
                title={label}
                className="lets__start"
              >
                Let's Start
              </span>
            )
          }
        }}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          if (isSelected) {
            return (
              <li
                style={{
                  ...indicatorStyles,
                  background:
                    'transparent linear-gradient(121deg, #F64B5D 0%, #FF818E 100%) 0% 0% no-repeat padding-box',
                  borderRadius: '5px',
                  width: '15px',
                }}
                aria-label={`Selected: ${label} ${index + 1}`}
                title={`Selected: ${label} ${index + 1}`}
              />
            )
          }
          return (
            <li
              style={indicatorStyles}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              title={`${label} ${index + 1}`}
              aria-label={`${label} ${index + 1}`}
            />
          )
        }}
        autoPlay={false}
        interval={60000}
      >
        <div className="features__slides unselectable">
          <div>
            <img src={FirstSlideImage} />
          </div>
          <span className="features__slides__title">Create store in a jiffy</span>
          <span className="features__slides__desc">
            No coding knowledge mojo required, Set up your store online in a matter of a few minutes!
          </span>
        </div>
        <div className="features__slides unselectable">
          <div>
            <img src={SecondSlideImage} />
          </div>
          <span className="features__slides__title">Customize Your Website In Style</span>
          <span className="features__slides__desc">
            Throw in some colour, choose the layout of your website. Maybe, add your logo and some banners. See all your
            changes get updated instantly!
          </span>
        </div>
        <div className="features__slides unselectable">
          <div>
            <img src={ThirdSlideImage} />
          </div>
          <span className="features__slides__title">Numbers, Numbers... Here they are!</span>
          <span className="features__slides__desc">
            Check out our reports, learn and analyse your sales. Want to integrate your website with other analytics
            tools? We made it super easy for you to do that!
          </span>
        </div>
        <div className="features__slides unselectable">
          <div>
            <img src={FourthSlideImage} />
          </div>
          <span className="features__slides__title">Marketing is the key</span>
          <span className="features__slides__desc">
            Engage with your customers as you like, try sending push notifications on the offer you are running or
            download posters and share them across.
          </span>
        </div>
      </Carousel>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  setShowFeatures: val => dispatch(setShowFeaturesCarousel(val)),
})

export default connect(
  null,
  mapDispatchToProps,
)(FeaturesCarousel)
