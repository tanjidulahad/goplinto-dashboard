import React, { useState, useEffect } from 'react'

import Arrow from '../../images/arrow.svg'

import HelpTopBar from 'components/HelpTopBar'
import HelpAccordion from 'components/HelpAccordion'

import { useMediaQuery } from 'react-responsive'

import {
  CreateAccountContent,
  CreateStoreContent,
  DashboardIntroContent,
  YourAccountContent,
  ProductsOfGoPlintoContent,
  CustomizeWebsiteContent,
  ProductsContent,
  PaymentConfigurationContent,
  DeliveryConfigurationContent,
  ManageOrderContent,
  ReportsAnalyticsContent,
  BasicSettingsContent,
  IntegrationsContent,
  MarketingContent,
} from './HelpPageContent'
const Desktop = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 992 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  return isMobile ? children : null
}
const BasicHelp = ({
  accordionId,
  setAccordionId,
  setAccordionKey,
  setShowHelpContentPage,
  secondLevel,
  thirdLevel,
  accordionKey,
}) => {
  const [currentContent, setCurrentContent] = useState()
  useEffect(() => {
    switch (accordionId) {
      case 1:
        setCurrentContent(<CreateAccountContent />)
        setAccordionKey('1')
        break
      case 2:
        setCurrentContent(<CreateStoreContent />)
        setAccordionKey('1')
        break
      case 3:
        setCurrentContent(<DashboardIntroContent />)
        setAccordionKey('1')
        break
      case 4:
        setCurrentContent(<YourAccountContent />)
        setAccordionKey('1')
        break
      case 5:
        setCurrentContent(<ProductsOfGoPlintoContent />)
        setAccordionKey('1')
        break
      case 6:
        setCurrentContent(<CustomizeWebsiteContent />)
        setAccordionKey('2')
        break
      case 7:
        setCurrentContent(<ProductsContent />)
        setAccordionKey('2')
        break
      case 8:
        setCurrentContent(<PaymentConfigurationContent />)
        setAccordionKey('2')
        break
      case 9:
        setCurrentContent(<DeliveryConfigurationContent />)
        setAccordionKey('2')
        break
      case 10:
        setCurrentContent(<ManageOrderContent />)
        setAccordionKey('2')
        break
      case 11:
        setCurrentContent(<ReportsAnalyticsContent />)
        setAccordionKey('3')
        break
      case 12:
        setCurrentContent(<BasicSettingsContent />)
        setAccordionKey('3')
        break
      case 13:
        setCurrentContent(<IntegrationsContent />)
        setAccordionKey('3')
        break
      case 14:
        setCurrentContent(<MarketingContent />)
        setAccordionKey('3')
        break
      default:
        setCurrentContent(<div className="text-xl">No Content</div>)
    }
  }, [accordionId])

  return (
    <>
      <Desktop>
        <div style={{ background: '#F2F2F2' }} className="min-h-screen">
          <HelpTopBar setShowHelpContentPage={setShowHelpContentPage} />
          <div
            className="flex"
            style={{
              marginLeft: '120px',
              marginTop: '30px',
              fontSize: '16px',
              textDecoration: 'underline',
              color: 'black',
            }}
          >
            <div
              onClick={() => setShowHelpContentPage(false)}
              style={{
                marginRight: '10px',
                whiteSpace: 'nowrap',
                color: 'black',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              <p>Home</p>
            </div>
            <img style={{ width: '12px', marginRight: '9px', marginBottom: '13px' }} src={Arrow} />
            <div
              style={{ whiteSpace: 'nowrap', color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
              className="mr-2"
            >
              <p>{secondLevel || ''}</p>
            </div>
            <img style={{ width: '12px', marginRight: '9px', marginBottom: '13px' }} src={Arrow} />
            <div
              style={{ whiteSpace: 'nowrap', color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
              className="mr-10"
            >
              <p>{thirdLevel || ''}</p>
            </div>
          </div>
          <div style={{ paddingTop: '1rem' }}>
            <div style={{ paddingLeft: '4rem', paddingRight: '4rem', paddingTop: '1rem' }} className="flex bg-white">
              <div className="border-r" style={{ minWidth: '370px', maxWidth: '370px' }}>
                <HelpAccordion
                  thirdLevel={thirdLevel}
                  secondLevel={secondLevel}
                  accordionId={accordionId}
                  setAccordionId={setAccordionId}
                  setAccordionKey={setAccordionKey}
                  defaultKey={accordionKey}
                />
              </div>
              <div className="p-8">{currentContent}</div>
            </div>
          </div>
        </div>
      </Desktop>
      <Mobile>
        {' '}
        <div style={{ background: '#FFFFFF' }} className="min-h-screen">
          <HelpTopBar setShowHelpContentPage={setShowHelpContentPage} />
          <div
            className="flex"
            style={{
              marginLeft: '25px',
              marginTop: '30px',
              fontSize: '12px',
              textDecoration: 'underline',
              color: 'black',
            }}
          >
            <div
              onClick={() => setShowHelpContentPage(false)}
              style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}
              className="mr-2"
            >
              <p>Home</p>
            </div>
            <img style={{ width: '12px', marginRight: '9px', marginBottom: '13px' }} src={Arrow} />
            <div style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }} className="mr-2">
              <p>{secondLevel || ''}</p>
            </div>
            <img style={{ width: '12px', marginRight: '9px', marginBottom: '13px' }} src={Arrow} />
            <div style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }} className="mr-10">
              <p>{thirdLevel || ''}</p>
            </div>
          </div>
          <hr />
          <HelpAccordion
            thirdLevel={thirdLevel}
            accordionId={accordionId}
            setAccordionId={setAccordionId}
            defaultKey={accordionKey}
          />
          <div className="p-8">{currentContent}</div>
        </div>
      </Mobile>
    </>
  )
}
export default BasicHelp
