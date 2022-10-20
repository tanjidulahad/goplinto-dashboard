 import React from "react"
 import { useMediaQuery } from 'react-responsive'
 import { NavLink, useHistory } from 'react-router-dom'
 import TopNav from 'components/TopNav'
 import backImg from 'images/icons/back.svg'
 
 const ExtendedNavBar = ({ text, onBack,noHelp,noBack,onHelp }) => {

    const Desktop = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 992 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isTablet = useMediaQuery({ maxWidth: 991 })
        return isTablet ? children : null
    }  
    const history=useHistory();
    return (<>
    <div className="sticky bg-white">
      <div className="flex justify-between p-1 py-3 md:p-4 border-b">
        <div className="flex items-center">
            {!noBack&& <div
            onClick={onBack?onBack:()=>history.goBack()}
            className="flex mr-4 text-xl font-medium text-black hover:text-secondary"
          >
            <img
              src={backImg}
              className="flex text-xl text-black font-medium ml-2 my-1 h-6 w-6 cursor-pointer"
            />
          </div>}
          <div
            className="flex text-lg md:text-xl text-black font-semibold text-muted-med"
          >
            {text}
          </div>
            {!noHelp&&
              <NavLink to={onHelp ? onHelp:"/helpcenter/"} className="ml-1">
              <span className="flex items-center font-normal text-sm text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{' '}
                <Desktop>
                <div className="pl-1">Learn how to Use </div>
                </Desktop>
                <Mobile>
                <div className="text-xs">Learn More</div>
                </Mobile>                
              </span>
            </NavLink>
         }
        </div>
        <TopNav />
      </div>
    </div>
    </>)
  }

  export default ExtendedNavBar