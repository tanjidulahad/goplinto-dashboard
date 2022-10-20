import React, { useState, useEffect } from 'react'

import basicLogo from '../../images/basic.png'
import manageLogo from '../../images/manage.png'
import marketingLogo from '../../images/MarketingandAnalytics.png'
import Path from '../../images/Path.png'
import { useMediaQuery } from 'react-responsive'
import './style.css'
import HelpTopBar from 'components/HelpTopBar'
import BasicHelp from 'containers/BasicHelp'
const HelpCenter = ({ accordionid }) => {

  const [accordionId, setAccordionId] = accordionid !== undefined ? useState(accordionid) : useState(1)
  const [showHelpContentPage, setShowHelpContentPage] = accordionid !== undefined ? useState(true) : useState(false)
  const [secondLevel, setSecondLevel] = useState('')
  const [thirdLevel, setThirdLevel] = useState('')
  const [accordionKey, setAccordionKey] = useState('')
  useEffect(() => {
    switch (accordionId) {
      case 1:
        setSecondLevel('Basics')
        setThirdLevel('How to Create an account')
        break
      case 2:
        setSecondLevel('Basics')
        setThirdLevel('Create store')
        break
      case 3:
        setSecondLevel('Basics')
        setThirdLevel('Intro to Dashboard')
        break
      case 4:
        setSecondLevel('Basics')
        setThirdLevel('Your account')
        break
      case 5:
        setSecondLevel('Basics')
        setThirdLevel('Products of GoPlinto')
        break
      case 6:
        setSecondLevel('Manage')
        setThirdLevel('Customize your website')
        break
      case 7:
        setSecondLevel('Manage')
        setThirdLevel('Products')
        break
      case 8:
        setSecondLevel('Manage')
        setThirdLevel('Payment Configuration')
        break
      case 9:
        setSecondLevel('Manage')
        setThirdLevel('Delivery Configuration')
        break
      case 10:
        setSecondLevel('Manage')
        setThirdLevel('Manage Orders')
        break
      case 11:
        setSecondLevel('Marketing & Analytics')
        setThirdLevel('Reports & Analytics')
        break
      case 12:
        setSecondLevel('Marketing & Analytics')
        setThirdLevel('Basic Settings - SEO settings, Social Accounts')
        break
      case 13:
        setSecondLevel('Marketing & Analytics')
        setThirdLevel('Integrations - Google Analytics & more')
        break
      case 14:
        setSecondLevel('Marketing & Analytics')
        setThirdLevel('Marketing - Branding page, Push notifications')
        break
      default:
        setSecondLevel('Not Selected')
        setThirdLevel('Not Selected')
    }
  }, [accordionId])
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  return (
    <>
      <Desktop>
        {showHelpContentPage ? (
          <BasicHelp
            accordionKey={accordionKey}
            secondLevel={secondLevel}
            thirdLevel={thirdLevel}
            setShowHelpContentPage={setShowHelpContentPage}
            accordionId={accordionId}
            setAccordionId={setAccordionId}
            setAccordionKey={setAccordionKey}
          />
        ) : (
          <div style={{ background: '#F2F2F2', paddingBottom: '100px', marginBottom: '10px' }} className="min-h-screen">
            <HelpTopBar setShowHelpContentPage={setShowHelpContentPage} />
            <div>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: '500',
                  fontSize: '30px',
                  marginBottom: '5px',
                }}
              >
                GoPlinto Help Center
              </p>
              <p style={{ textAlign: 'center', fontWeight: '100', fontSize: '18px' }}>All the information you need</p>
            </div>
            <div style={{ paddingLeft: '4.5rem', paddingRight: '4.5rem', paddingTop: '1rem' }}>
              <div className="grid grid-cols-2 bg-white rounded-lg">
                <div className="border-b border-r">
                  <div
                    onClick={() => {
                      setShowHelpContentPage(true)
                      setAccordionId(1)
                    }}
                    className="flex"
                  >
                    <img style={{ marginLeft: '40px', width: '60px' }} className="py-4" src={basicLogo} />
                    <span style={{ marginTop: '32px', marginLeft: '20px', fontSize: '20px' }} className="font-semibold">
                      Basics
                    </span>
                  </div>

                  <div className="font-semibold">
                    <ul style={{ paddingLeft: '45px' }}>
                      <div className="flex hover:text-secondary">
                        <div
                          id="text-hover"
                          onClick={() => {
                            setAccordionKey('1')
                            setShowHelpContentPage(true)
                            setAccordionId(1)
                          }}
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>How to Create an Account</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>

                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('1')
                            setShowHelpContentPage(true)
                            setAccordionId(2)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black "
                        >
                          <li style={{ paddingRight: '1em' }}>Create Store</li>

                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('1')
                            setShowHelpContentPage(true)
                            setAccordionId(3)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Intro to Dashboard</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('1')
                            setShowHelpContentPage(true)
                            setAccordionId(4)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Your Account</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('1')
                            setShowHelpContentPage(true)
                            setAccordionId(5)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Products of GoPlinto</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="border-l border-b">
                  <div
                    onClick={() => {
                      setAccordionKey('2')
                      setShowHelpContentPage(true)
                      setAccordionId(6)
                    }}
                    id="text-hover"
                    className="flex"
                  >
                    <img style={{ marginLeft: '40px', width: '60px' }} className="py-4" src={manageLogo} />
                    <span style={{ marginTop: '32px', marginLeft: '20px', fontSize: '20px' }} className="font-semibold">
                      Manage
                    </span>
                  </div>
                  <div className="font-semibold">
                    <ul style={{ paddingLeft: '40px' }}>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('2')
                            setShowHelpContentPage(true)
                            setAccordionId(6)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Customize your website</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setAccordionKey('2')
                          setShowHelpContentPage(true)
                          setAccordionId(7)
                        }}
                        className="flex hover:text-secondary"
                      >
                        <div
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Products</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('2')
                            setShowHelpContentPage(true)
                            setAccordionId(8)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Payment Configuration</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('2')
                            setShowHelpContentPage(true)
                            setAccordionId(9)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Delivery Configuration</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('2')
                            setShowHelpContentPage(true)
                            setAccordionId(10)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Manage Orders</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className="border-r">
                  <div
                    onClick={() => {
                      setAccordionKey('3')
                      setShowHelpContentPage(true)
                      setAccordionId(11)
                    }}
                    id="text-hover"
                    className="flex"
                  >
                    <img
                      style={{ marginLeft: '40px', width: '60px', cursor: 'pointer' }}
                      className="py-4"
                      src={marketingLogo}
                    />
                    <span
                      style={{ marginTop: '32px', marginLeft: '20px', fontSize: '20px', cursor: 'pointer' }}
                      className="font-semibold"
                    >
                      Marketing & Analytics
                    </span>
                  </div>
                  <div className="font-semibold">
                    <ul style={{ paddingLeft: '40px' }}>
                      <div
                        onClick={() => {
                          setAccordionKey('3')
                          setShowHelpContentPage(true)
                          setAccordionId(11)
                        }}
                        className="flex hover:text-secondary"
                      >
                        <div
                          className="flex hover:text-secondary text-black"
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                        >
                          <li style={{ paddingRight: '1em' }}>Reports & Analytics</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('3')
                            setShowHelpContentPage(true)
                            setAccordionId(12)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Basic Settings - SEO settings, Social Accounts</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('3')
                            setShowHelpContentPage(true)
                            setAccordionId(13)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Integrations - Google Analytics & more</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                      <div className="flex hover:text-secondary">
                        <div
                          onClick={() => {
                            setAccordionKey('3')
                            setShowHelpContentPage(true)
                            setAccordionId(14)
                          }}
                          id="text-hover"
                          style={{ paddingBottom: '15px', cursor: 'pointer' }}
                          className="flex hover:text-secondary text-black"
                        >
                          <li style={{ paddingRight: '1em' }}>Marketing - Branding page, Push notifications</li>
                          <img id="move" style={{ marginLeft: '1px', marginTop: '5px', height: '15px' }} src={Path} />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* <PlintoFooter /> */}
          </div>
        )}
      </Desktop>
      <Mobile>
        {showHelpContentPage ? (
          <BasicHelp
            accordionKey={accordionKey}
            secondLevel={secondLevel}
            thirdLevel={thirdLevel}
            setShowHelpContentPage={setShowHelpContentPage}
            accordionId={accordionId}
            setAccordionKey={setAccordionKey}
            setAccordionId={setAccordionId}
          />
        ) : (
          <div style={{ background: '#F2F2F2' }} className="min-h-screen">
            <HelpTopBar setShowHelpContentPage={setShowHelpContentPage} />
            <div>
              <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: '550', fontSize: '25px' }}>
                GoPlinto Help Center
              </p>
              <p style={{ textAlign: 'center', fontWeight: '100', fontSize: '15px' }}>All the information you need</p>
            </div>
            <div style={{ paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
              <div className="bg-white rounded-lg">
                <div
                  onClick={() => {
                    setAccordionKey('1')
                    setShowHelpContentPage(true)
                    setAccordionId(1)
                  }}
                  className="flex"
                >
                  <img style={{ marginLeft: '20px', width: '40px' }} className="py-4" src={basicLogo} />
                  <span style={{ marginTop: '20px', marginLeft: '15px', fontSize: '20px' }} className="font-semibold">
                    Basics
                  </span>
                </div>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(1)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  How to Create an Account
                  <img
                    className="section"
                    style={{ display: 'inline', marginLeft: '15px', marginTop: '5px', height: '15px' }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(2)
                  }}
                  style={{ marginLeft: '20px', marginBottom: '15px', fontSize: '14px', fontFamily: 'Montserrat' }}
                >
                  Create store
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(3)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Intro to Dashboard
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(4)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Your account
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(5)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Products of Goplinto
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <hr />
                <div
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(6)
                  }}
                  className="flex"
                >
                  <img style={{ marginLeft: '20px', width: '40px' }} className="py-4" src={manageLogo} />
                  <span style={{ marginTop: '20px', marginLeft: '15px', fontSize: '20px' }} className="font-semibold">
                    Manage
                  </span>
                </div>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(6)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Customize your website
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(7)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Products
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(8)
                  }}
                  style={{ marginLeft: '20px', marginBottom: '15px', fontSize: '14px', fontFamily: 'Montserrat' }}
                >
                  Payment Configuration
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(9)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Delivery Configuration
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(10)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Manage Orders
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <hr />
                <div
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(11)
                  }}
                  className="flex"
                >
                  <img style={{ marginLeft: '20px', width: '40px' }} className="py-4" src={marketingLogo} />
                  <span style={{ marginTop: '20px', marginLeft: '15px', fontSize: '20px' }} className="font-semibold">
                    Marketing & Analytics
                  </span>
                </div>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(11)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Reports & Analytics
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(12)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Basic Settings - SEO settings, Social Accounts
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(13)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Integrations - Google Analytics & more
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      height: '15px',
                      marginBottom: '5px',
                    }}
                    src={Path}
                  />
                </p>
                <p
                  onClick={() => {
                    setShowHelpContentPage(true)
                    setAccordionId(14)
                  }}
                  style={{
                    marginLeft: '20px',
                    marginBottom: '15px',
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    cursor: 'pointer',
                  }}
                >
                  Marketing - Branding page, Push notifications
                  <img
                    className="section"
                    style={{
                      display: 'inline',
                      marginLeft: '15px',
                      marginTop: '5px',
                      marginBottom: '5px',
                      height: '15px',
                    }}
                    src={Path}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      </Mobile>
    </>
  )
}

export default HelpCenter
