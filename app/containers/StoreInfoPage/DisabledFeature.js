import React from 'react'
import MediaQuery from 'react-responsive'
import { IoIosArrowForward } from 'react-icons/io'
import 'assets/GlobalStyles.css'

const DisabledFeature = ({ title, desc, upgradePlan }) => {
  return (
    // <div className="flex flex-col items-end  cursor-not-allowed disabled__feature px-6 py-4 border-b-2">
    <div className="flex flex-col items-end  cursor-not-allowed disabled__feature px-6 py-4 border-b-2">
      <button disabled className="flex justify-between items-center block w-full text-left">
        <div>
          <p className="text-base md:text-lg font-semibold text-gray-500">{title}</p>
          <p className="text-gray-400 break-normal">{desc}</p>
        </div>
        <MediaQuery maxDeviceWidth={769}>
          <IoIosArrowForward
            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
            size={25}
          />
        </MediaQuery>
        <MediaQuery minDeviceWidth={769}>
          <span className="flex-none upgrade__btn" onClick={upgradePlan}>
            Upgrade
          </span>
        </MediaQuery>
      </button>
      <MediaQuery maxDeviceWidth={769}>
        <span className="flex-none upgrade__btn" onClick={upgradePlan}>
          Upgrade
        </span>
      </MediaQuery>
    </div>
  )
}

export default DisabledFeature
