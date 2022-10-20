import React from 'react'
import MediaQuery from 'react-responsive'
import { NavLink } from 'react-router-dom'

import { ProgressBar } from 'react-step-progress-bar'
import { PrimarySideBarWrapper, StyledNavLink } from './styled'

import product from '../../images/icons/prd.svg'
import bank from '../../images/icons/bank.svg'
import theme from '../../images/icons/theme.svg'
import done from '../../images/icons/done.svg'

const StoreSetUpCard = ({ onboardingStatus, currentProgress, setCurrentSection, currentSection }) => (
  <>
    {onboardingStatus && onboardingStatus.onboardingStatus !== 'COMPLETED' ? (
      <>
        <div className="mt-8 pb-2 px-2">
          <h3 className="item-label text-base md:text-lg font-black">Set Up Your Store</h3>
        </div>
        <div className=" bg-white md:flex justify-between tbl-rounded-top shadow-lg">
          {/* DESKTOP VERSION */}
          <MediaQuery minDeviceWidth={1100}>
            <div className="w-full flex">
              <div className="flex flex-col w-1/3">
                <PrimarySideBarWrapper>
                  <div className="flex flex-col justify-center w-full border" style={{ borderTopLeftRadius: '0.5rem' }}>
                    <div className="px-6 mt-6 mb-6 text-left">
                      <br />
                      <label className="item-label px-1 text-sm font-medium capitalize">
                        {currentProgress} / 3 Completed
                      </label>
                      <ProgressBar className="mt-2" percent={(100 * currentProgress) / 3} />
                    </div>
                    <ul className="flex flex-col sidebar-menu">
                      <StyledNavLink
                        onClick={() => {
                          setCurrentSection('FirstProduct')
                        }}
                        className={`li ${currentSection === 'FirstProduct' && 'active-dashboard'}`}
                      >
                        <span className="flex font-medium text-sm w-full justify-start px-10 mt-1">
                          <img
                            src={done}
                            className={
                              onboardingStatus && onboardingStatus.inventory.status === 'IN_USE'
                                ? 'checked'
                                : 'checked-inv'
                            }
                            alt="Done!"
                          />
                          Add Your First Product
                        </span>
                      </StyledNavLink>
                      <StyledNavLink
                        onClick={() => {
                          setCurrentSection('BankDetails')
                        }}
                        className={`li ${currentSection === 'BankDetails' && 'active-dashboard'}`}
                      >
                        <span className="flex font-medium text-sm w-full justify-start px-10 mt-1">
                          <img
                            src={done}
                            className={
                              onboardingStatus && onboardingStatus.bankDetails.status === 'IN_USE'
                                ? 'checked'
                                : 'checked-inv'
                            }
                            alt="Done!"
                          />
                          Add Bank Details
                        </span>
                      </StyledNavLink>
                      <StyledNavLink
                        onClick={() => {
                          setCurrentSection('CustomTheme')
                        }}
                        className={`li ${currentSection === 'CustomTheme' && 'active-dashboard'}`}
                      >
                        <span className="flex font-medium text-sm w-full justify-start px-10 mt-1">
                          <img
                            src={done}
                            className={
                              onboardingStatus && onboardingStatus.themeCustomization.status === 'IN_USE'
                                ? 'checked'
                                : 'checked-inv'
                            }
                            alt="Done!"
                          />
                          Customize Theme
                        </span>
                      </StyledNavLink>
                    </ul>
                  </div>
                </PrimarySideBarWrapper>
              </div>
              <div
                className="w-2/3 flex flex-col items-center border"
                style={{ borderTopRightRadius: '0.5rem', padding: '4em 1em' }}
              >
                <div style={{ position: 'relative', padding: '2.5em' }}>
                  <span
                    className="rounded-full flex items-center"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      padding: '2.5rem',
                      margin: '0 auto',
                      backgroundColor: 'rgba(246, 75, 93, 0.1)',
                    }}
                  >
                    <img
                      style={{ position: 'absolute', top: '0', left: '0', width: '100%' }}
                      src={
                        currentSection === 'FirstProduct'
                          ? product
                          : currentSection === 'BankDetails'
                          ? bank
                          : currentSection === 'CustomTheme'
                          ? theme
                          : null
                      }
                      alt="Add your first product!"
                    />
                  </span>
                </div>
                <br />
                <h4 className="item-label font-semibold text-base my-2 capitalize">
                  {currentSection === 'FirstProduct'
                    ? onboardingStatus && onboardingStatus.inventory.status === 'IN_USE'
                      ? "You've Added Your First Product"
                      : 'Add Your First Product'
                    : currentSection === 'BankDetails'
                    ? onboardingStatus && onboardingStatus.bankDetails.status === 'IN_USE'
                      ? "You've set up bank details"
                      : 'Add Bank Details'
                    : currentSection === 'CustomTheme'
                    ? onboardingStatus && onboardingStatus.themeCustomization.status === 'IN_USE'
                      ? "You've Customized Theme"
                      : 'Customize Theme'
                    : null}
                </h4>
                <label className="item-sublabel font-medium text-sm my-2">
                  {currentSection === 'FirstProduct'
                    ? 'Build your product catalog and add what you want to sell.'
                    : currentSection === 'BankDetails'
                    ? 'Bank details are important to get settlements'
                    : currentSection === 'CustomTheme'
                    ? 'Design your store with your brand colors and your styles'
                    : null}
                </label>
                <br />
                {currentSection === 'FirstProduct' ? (
                  <NavLink
                    to={{
                      pathname: '/app/manage-items/item',
                      state: { edit: false },
                    }}
                  >
                    <button type="button" className="cta-btn">
                      Add Product
                    </button>
                  </NavLink>
                ) : currentSection === 'BankDetails' ? (
                  <NavLink to="/app/general/bank-details">
                    <button type="button" className="cta-btn">
                      {onboardingStatus && onboardingStatus.bankDetails.status === 'IN_USE'
                        ? 'View Bank Details'
                        : 'Add Bank Details'}
                    </button>
                  </NavLink>
                ) : currentSection === 'CustomTheme' ? (
                  <NavLink
                    to={{
                      pathname: '/app/edit/information',
                      state: {
                        firstTime: false,
                        pageParam: 'display info',
                      },
                    }}
                  >
                    <button type="button" className="cta-btn">
                      Customize Theme
                    </button>
                  </NavLink>
                ) : null}
              </div>
            </div>
          </MediaQuery>
          {/* MOBILE VERSION */}
          <MediaQuery maxDeviceWidth={1100}>
            <div className="container">
              <div className="px-4 mt-2 mb-2 py-4 text-left">
                <br />
                <label className="item-label px-1 text-sm font-semibold capitalize">
                  {currentProgress} / 3 Completed
                </label>
                <ProgressBar className="mt-2" percent={(100 * currentProgress) / 3} />
              </div>
              <ul className="flex flex-row justify-center sidebar-menu">
                <StyledNavLink
                  onClick={() => {
                    setCurrentSection('FirstProduct')
                  }}
                  className={`li border w-1/3 ${currentSection === 'FirstProduct' && 'active-dashboard'}`}
                  style={{ padding: '10px' }}
                >
                  <img src={product} className="mx-auto" alt="Add Your First Product" />
                </StyledNavLink>
                <StyledNavLink
                  onClick={() => {
                    setCurrentSection('BankDetails')
                  }}
                  className={`li border w-1/3 ${currentSection === 'BankDetails' && 'active-dashboard'} `}
                  style={{ padding: '10px' }}
                >
                  <img src={bank} className="mx-auto" alt="Add Bank Details" />
                </StyledNavLink>
                <StyledNavLink
                  onClick={() => {
                    setCurrentSection('CustomTheme')
                  }}
                  className={`li border w-1/3 ${currentSection === 'CustomTheme' && 'active-dashboard'}`}
                  style={{ padding: '10px' }}
                >
                  <img src={theme} className="mx-auto" alt="Customize Theme" />
                </StyledNavLink>
              </ul>
              <div
                className="w-full flex flex-col items-center"
                style={{ borderTopRightRadius: '0.5rem', padding: '1em 1em' }}
              >
                <div style={{ position: 'relative', padding: '2em' }}>
                  <span
                    className="rounded-full flex items-center"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      padding: '2rem',
                      backgroundColor: 'rgba(246, 75, 93, 0.1)',
                    }}
                  >
                    <img
                      style={{ position: 'absolute', top: '0', left: '0', width: '100%' }}
                      src={
                        currentSection === 'FirstProduct'
                          ? product
                          : currentSection === 'BankDetails'
                          ? bank
                          : currentSection === 'CustomTheme'
                          ? theme
                          : null
                      }
                      alt="Add your first product!"
                    />
                  </span>
                </div>
                <br />
                <h4 className="item-label font-semibold text-base my-2 capitalize">
                  {currentSection === 'FirstProduct'
                    ? onboardingStatus && onboardingStatus.inventory.status === 'IN_USE'
                      ? "You've Added Your First Product"
                      : 'Add Your First Product'
                    : currentSection === 'BankDetails'
                    ? onboardingStatus && onboardingStatus.bankDetails.status === 'IN_USE'
                      ? "You've set up bank details"
                      : 'Add Bank Details'
                    : currentSection === 'CustomTheme'
                    ? onboardingStatus && onboardingStatus.themeCustomization.status === 'IN_USE'
                      ? "You've Customized Theme"
                      : 'Customize Theme'
                    : null}
                </h4>
                <label className="item-sublabel text-center font-semibold text-sm my-2">
                  {currentSection === 'FirstProduct'
                    ? 'Build your product catalog and add what you want to sell.'
                    : currentSection === 'BankDetails'
                    ? 'Bank details are important to get settlements'
                    : currentSection === 'CustomTheme'
                    ? 'Design your store with your brand colors and your styles'
                    : null}
                </label>
                <br />
                {currentSection === 'FirstProduct' ? (
                  <NavLink
                    to={{
                      pathname: '/app/manage-items/item',
                      state: { edit: false },
                    }}
                  >
                    <button type="button" className="cta-btn">
                      Add Product
                    </button>
                  </NavLink>
                ) : currentSection === 'BankDetails' ? (
                  <NavLink to="/app/general/bank-details">
                    <button type="button" className="cta-btn">
                      {onboardingStatus && onboardingStatus.bankDetails.status === 'IN_USE'
                        ? 'View Bank Details'
                        : 'Add Bank Details'}
                    </button>
                  </NavLink>
                ) : currentSection === 'CustomTheme' ? (
                  <NavLink
                    to={{
                      pathname: '/app/edit/information',
                      state: {
                        firstTime: false,
                        pageParam: 'display info',
                      },
                    }}
                  >
                    <button type="button" className="cta-btn">
                      Customize Theme
                    </button>
                  </NavLink>
                ) : null}
              </div>
            </div>
          </MediaQuery>
        </div>
      </>
    ) : null}
  </>
)
export default StoreSetUpCard
