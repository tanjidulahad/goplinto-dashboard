import React from 'react'
import '../../assets/DesignPage.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ImagesSlider = ({ Array }) => {
  const settings = {
    arrow: false,
    slidesToShow: 1,
    dots: false,
    slidesToScroll: 1,
  }

  const SliderCard = ({ val, key }) => {
    return (
      <div key={key} className="flex">
        <h2 className="text-white">
          <img className="sliderCardImg" src={val} />
        </h2>
      </div>
    )
  }
  return (
    <div>
      <Slider {...settings} >
        {Array.map((val, ind) => (
          <SliderCard val={val} key={ind} />
        ))}
      </Slider>
    </div>
  )
}

export default ImagesSlider
