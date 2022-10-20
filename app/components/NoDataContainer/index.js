import React from 'react'
import BottomLineDiv from 'components/BottomLineDiv'
const NoDataContainer = ({ heading, desc, btnText, bottomText, onBtnClick }) => {
  return (
    <div className="px-5 pt-5">
      <h1 className="font-sans text-xl md:mx-10 font-bold text-black-700  break-normal lg:mt-0 ">{heading}</h1>
      <div className="bg-white mx-4 md:mx-10 mb-16 shadow-lg mt-5 border-radius-3">
        <div className=" mx-4 h-64 flex flex-col justify-center items-center">
          <p className="text-base text-center text-muted-med font-semibold">{desc}</p>
          <button onClick={() => onBtnClick()} className="cta-btn">
            {btnText}
          </button>
        </div>
        <hr />
        <BottomLineDiv text={bottomText} />
      </div>
    </div>
  )
}

export default NoDataContainer
