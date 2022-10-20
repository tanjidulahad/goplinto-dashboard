import { Dropdown, Menu } from 'antd'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import React from 'react'
import { Helmet } from 'react-helmet'
import { AiOutlineCheck } from 'react-icons/ai'
import { FaEllipsisV } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import "./style.css"

const NoAddOnContainer = ({ title, desc, added, ImgSrc, onClick}) => {
    const menuAddon = () => (
        <Menu>
            <Menu.Item>
                <div
                    className="p-2"
                    onClick={onClick}
                >
                    Remove Add-On
                </div>
            </Menu.Item>
        </Menu>
    )
    const Desktop = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 992 })
        return isTablet ? children : null
    }

    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 991 })
        return isMobile ? children : null
    }

    const MenuAddonDropDown = () => {
        return (
            <div className='DropDownDiv'>
                <Dropdown overlay={menuAddon()} trigger={['click']}>
                    <button className="focus:outline-none text-md gap-2">
                        <FaEllipsisV className='dropDownDots' />
                    </button>
                </Dropdown>
            </div>
        )
    }
    return (
    <>
          <Helmet>
              <title>{title}</title>
              <meta name="description" content="Bank Page" />
          </Helmet>
          <ExtendedNavBar text={title} />
          {/* feature widget */}
          <div className="bg-white mx-4 md:mx-10 mb-8 mt-10">
              <Desktop>
                  <div className='flex flex-row w-full pb-6'>
                      <div className='pl-5 pt-5 mx-4 pr-1'>
                          <img className='AddOnIcon' src={ImgSrc} alt="Best Seller Icon" />
                      </div>
                      <div className=" mx-4 pr-1 px-5 pt-5">
                          <p className="text-left text-xl font-bold mb-1">
                              {title}
                          </p>
                          <p className="text-left font-medium text-16 text-gray-700">
                              By Goplinto
                          </p>

                          <div className='pb-1'>
                              <p className="text-sm text-left item-label font-medium text-16" >
                                  {desc}
                              </p>
                          </div>
                          {!added ?
                            <button onClick={onClick} className="cta-btn">Add to site</button>
                           :
                          <div className="text-medium flex">
                              <div className='addedDiv'>
                                  <AiOutlineCheck className="my-auto mr-5 text-white" size={15}>
                                      {' '}
                                  </AiOutlineCheck>
                              </div>
                              <div className='AddedTxt'>Added</div>
                          </div> } 
                      </div>
                    {added&&  <MenuAddonDropDown />}
                  </div>
              </Desktop>
              <Mobile>
                  <div className='flex flex-row pb-2'>
                      <div className='pt-5 pl-5'>
                          <img width="100" height="100" src={ImgSrc} alt="Best Seller Icon" />
                      </div>
                      <div className='topHeading'>
                          <p className="text-left font-bold text-lg">
                                {title}
                          </p>
                          <p className="text-sm text-left font-medium text-gray-700 text-medium">
                              By Goplinto
                          </p>
 
                     
                        </div>
                          {added && <MenuAddonDropDown />}
                    </div>
                  <div className='flex flex-row pb-5'>
                      <div className='pb-3 pr-1 pl-5'>
                          <p className="text-sm text-left font-medium text-16">
                              Create a list of new arrival items from your inventory to promote.
                          </p>

                            {!added ?
                                <button onClick={onClick} className="cta-btn" >Add to site</button>
                                :
                                <div className="text-medium flex">
                                    <div className='addedDiv'>
                                        <AiOutlineCheck className="my-auto mr-5 text-white" size={15}>
                                            {' '}
                                        </AiOutlineCheck>
                                    </div>
                                    <div className='AddedTxt'>Added</div>
                                </div>} 
                      </div>
                  </div>
              </Mobile>
          </div>
          <hr />
    </>
  )
}

export default NoAddOnContainer