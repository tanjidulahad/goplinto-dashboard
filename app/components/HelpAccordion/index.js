import React, { useState, useEffect } from 'react'
import { Collapse, Select } from 'antd'

import { useMediaQuery } from 'react-responsive'
const { Panel } = Collapse

const { Option, OptGroup } = Select
const Desktop = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 992 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 991 })
  return isMobile ? children : null
}

const HelpAccordion = ({ defaultKey, setAccordionId, secondLevel, setAccordionKey, accordionId, thirdLevel }) => {
  return (
    <>
      <Desktop>
        <div>
          <Collapse
            accordion={true}
            bordered={false}
            style={{ width: '80%', outline: 'none', marginLeft: '50px' }}
            defaultActiveKey={defaultKey}
            expandIconPosition={'right'}
          >
            <Panel
              className={`hover:text-secondary site-collapse-custom-panel font-bold bg-white`}
              header="Basics"
              key="1"
              style={{ fontSize: '18px' }}
            >
              <div
                className={`font-semibold hover:text-secondary  ${thirdLevel === 'How to Create an account' &&
                  'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => {
                  setAccordionId(1)
                }}
              >
                How to Create an Account
              </div>
              <div
                className={`font-semibold hover:text-secondary  ${thirdLevel === 'Create store' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => {
                  setAccordionId(2)
                }}
              >
                Create store
              </div>
              <div
                className={`font-semibold hover:text-secondary  ${thirdLevel === 'Intro to Dashboard' &&
                  'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(3)}
              >
                Intro to Dashboard
              </div>
              <div
                className={`font-semibold hover:text-secondary  ${thirdLevel === 'Your account' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(4)}
              >
                Your Account
              </div>
              <div
                className={`font-semibold hover:text-secondary  ${thirdLevel === 'Products of GoPlinto' &&
                  'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(5)}
              >
                Products of GoPlinto
              </div>
            </Panel>
            <Panel
              className=" hover:text-secondary site-collapse-custom-panel font-bold bg-white"
              header="Manage"
              key="2"
              style={{ fontSize: '18px' }}
            >
              <div
                onClick={() => setAccordionId(6)}
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Customize your website' &&
                  'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
              >
                Customize your website
              </div>
              <div
                onClick={() => setAccordionId(7)}
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Products' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
              >
                Products
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Payment Configuration' &&
                  'text-secondary'}`}
                onClick={() => setAccordionId(8)}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
              >
                Payment Configuration
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Delivery Configuration' &&
                  'text-secondary'}`}
                onClick={() => setAccordionId(9)}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
              >
                Delivery Configuration
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Manage Orders' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(10)}
              >
                Manage Orders
              </div>
            </Panel>
            <Panel
              className="site-collapse-custom-panel font-bold bg-white hover:text-secondary"
              header="Marketing & Analytics"
              key="3"
              style={{ fontSize: '18px' }}
            >
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel === 'Reports & Analytics' &&
                  'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(11)}
              >
                Reports & Analytics
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel ===
                  'Basic Settings - SEO settings, Social Accounts' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(12)}
              >
                Basic Settings - SEO settings, Social Accounts
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel ===
                  'Integrations - Google Analytics & more' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(13)}
              >
                Integrations - Google Analytics & more
              </div>
              <div
                className={`font-semibold hover:text-secondary ${thirdLevel ===
                  'Marketing - Branding page, Push notifications' && 'text-secondary'}`}
                style={{ marginLeft: '10px', padding: '0.5rem', fontSize: '16px', fontWeight: 500 }}
                onClick={() => setAccordionId(14)}
              >
                Marketing - Branding page, Push notifications
              </div>
            </Panel>
          </Collapse>
        </div>
      </Desktop>
      <Mobile>
        <Select
          size="large"
          style={{ marginTop: '25px', width: '90%', outline: 'none', marginLeft: '25px' }}
          defaultValue="How to Create an Account"
          value={thirdLevel}
        >
          <OptGroup label="Basics">
            <Option value="How to Create an Account">
              <div
                className={`hover:text-secondary ${thirdLevel === 'How to Create an Account' && 'text-secondary'}`}
                onClick={() => setAccordionId(1)}
              >
                How to Create an Account
              </div>
            </Option>
            <Option value="Create store">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Create store' && 'text-secondary'}`}
                onClick={() => setAccordionId(2)}
              >
                Create store
              </div>
            </Option>
            <Option value="Intro to Dashboard">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Intro to Dashboard' && 'text-secondary'}`}
                onClick={() => setAccordionId(3)}
              >
                Intro to Dashboard
              </div>
            </Option>
            <Option value="Your account">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Your account' && 'text-secondary'}`}
                onClick={() => setAccordionId(4)}
              >
                Your account
              </div>
            </Option>
            <Option value="Products of Goplinto">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Products of Goplinto' && 'text-secondary'}`}
                onClick={() => setAccordionId(5)}
              >
                Products of Goplinto
              </div>
            </Option>
          </OptGroup>
          <OptGroup label="Manage">
            <Option value="Customize your website">
              <div
                className={` hover:text-secondary ${thirdLevel === 'Customize your website' && 'text-secondary'}`}
                onClick={() => setAccordionId(6)}
              >
                Customize your website
              </div>
            </Option>
            <Option value="Products">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Products' && 'text-secondary'}`}
                onClick={() => setAccordionId(7)}
              >
                Products
              </div>
            </Option>
            <Option value="Payment Configuration">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Payment Configuration' && 'text-secondary'}`}
                onClick={() => setAccordionId(8)}
              >
                Payment Configuration
              </div>
            </Option>
            <Option value="Delivery Configuration">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Delivery Configuration' && 'text-secondary'}`}
                onClick={() => setAccordionId(9)}
              >
                Delivery Configuration
              </div>
            </Option>
            <Option value="Manage Orders">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Manage Orders' && 'text-secondary'}`}
                onClick={() => setAccordionId(10)}
              >
                Manage Orders
              </div>
            </Option>
          </OptGroup>
          <OptGroup label="Marketing & Analytics">
            <Option value="Reports & Analytics">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Reports & Analytics' && 'text-secondary'}`}
                onClick={() => setAccordionId(11)}
              >
                Reports & Analytics
              </div>
            </Option>
            <Option value="Basic Settings - SEO settings, Social Accounts">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Basic Settings - SEO settings, Social Accounts' &&
                  'text-secondary'}`}
                onClick={() => setAccordionId(12)}
              >
                Basic Settings - SEO settings, Social Accounts
              </div>
            </Option>
            <Option value="Integrations - Google Analytics & more">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Integrations - Google Analytics & more' &&
                  'text-secondary'}`}
                onClick={() => setAccordionId(13)}
              >
                Integrations - Google Analytics & more
              </div>
            </Option>
            <Option value="Marketing - Branding page, Push notifications">
              <div
                className={`hover:text-secondary ${thirdLevel === 'Marketing - Branding page, Push notifications' &&
                  'text-secondary'}`}
                onClick={() => setAccordionId(14)}
              >
                Marketing - Branding page, Push notifications
              </div>
            </Option>
          </OptGroup>
        </Select>
      </Mobile>
    </>
  )
}

export default HelpAccordion
