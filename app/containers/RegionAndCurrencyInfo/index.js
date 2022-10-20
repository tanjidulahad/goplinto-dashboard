import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'
import { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Select from 'react-select'

import TopNav from 'components/TopNav'
import backImg from '../../images/icons/back.svg'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { customSelect, DropdownIndicator } from '../../utils/dropdownConfig'
import { setStoreCountry, setStoreTimezone, setStoreCurrency, setStoreRegionDetails, getStoreRegionDetails, getAllCountryDetails, setStoreCurrencySymbol } from './actions'
import { makeSelectStoreId, makeSelectStoreRegionDetails } from './selectors'
import saga from './saga'
import reducer from './reducer'
import PaymentPromotionImages from 'components/PaymentPromotionImages'

const RegionAndCurrencyInfo = ({
  setStoreCountry, setStoreCurrency, setStoreTimezone, getStoreRegionDetails, setStoreRegionDetails, storeId, merchantId, getAllCountryDetails, storeRegionDetails, setStoreCurrencySymbol,
  navigatePageIndex, setOnBoardProgress,  formInput, setFormInput
}) => {
  const locationPath = window.location.pathname.split('/');

  useInjectReducer({ key: 'storeRegionDetails', reducer })
  useInjectSaga({ key: 'storeRegionDetails', saga })

  useEffect(() => {
    getStoreRegionDetails(storeId)
  }, [])
  const { storeCountry, storeCurrencyCode, storeTimezone, allCountryDetails: allCountryData } = storeRegionDetails

  const [countryDropdown, setcountryDropdown] = useState("")
  const [timezoneDropdown, settimezoneDropdown] = useState("")
  const [currencyDropdown, setcurrencyDropdown] = useState("")
  const [edit, setEdit] = useState(false)

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
useEffect(() => {
  getAllCountryDetails()
  }, [])
useEffect(() => {
  setcountryDropdown({ value: allCountryData&&allCountryData[storeCountry]&&allCountryData[storeCountry].country_code, label: storeCountry })
}, [edit])

  useEffect(() => {
    if (countryDropdown) {
      setStoreCountry(countryDropdown.label)
    }
    if (timezoneDropdown) {
      setStoreTimezone(timezoneDropdown.value)
    }
    if (currencyDropdown) {
      setStoreCurrency(currencyDropdown.value)
      setStoreCurrencySymbol(currencyDropdown.symbol)
    }
  }, [countryDropdown, timezoneDropdown, currencyDropdown])

  const countries = allCountryData&&Object.keys(allCountryData)
  const countryOptions = [
    countries&&countries.map((val) => {
      return (
        { value: allCountryData[val].country_code, label: allCountryData[val].country_name }
      )
    })
  ]
  const currency=allCountryData && allCountryData[countryDropdown.label] && allCountryData[countryDropdown.label].currency_code;
  const currencyOptions = [countryDropdown&&[1].map((val)=>{return { value: currency, label: currency }})]
  const storeCountryCode = countryDropdown.value;
  const timezoneOptions = [
    allCountryData && allCountryData[countryDropdown.label]&&allCountryData[countryDropdown.label].region_timeszone.map((val) => {
              return { value: val, label: val }      
    })
  ]
  const saveRegionDetails = (e) => {
    e.preventDefault();
    const currency_symbol = currencyDropdown.symbol;
    setStoreRegionDetails({
      storeId,
      storeCountry,
      storeCurrencyCode,
      storeTimezone,
      currency_symbol
    })
    if (locationPath && locationPath[locationPath.length-1] != "region-and-currency-info")
    {
      const existStoreInfo = { ...formInput }
      existStoreInfo.storeCountry = storeCountry
      existStoreInfo.storeCurrencyCode = storeCurrencyCode
      existStoreInfo.currency_symbol = storeRegionDetails.storeCurrencySymbol
      existStoreInfo.storeTimezone = storeTimezone
      setFormInput(existStoreInfo);
      setOnBoardProgress('IN_PROGRESS_3', storeId, merchantId)
      navigatePageIndex(3)
    }
    else
    {
    setEdit(!edit)
  }
  }
  return (
    <div>
      {locationPath && ( locationPath[locationPath.length - 1] === "region-and-currency-info")
&&  <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between pt-4">
          <p className="flex text-xl font-semibold text-muted-med">
            <NavLink className="mr-2" to="/app/storeSettings">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            Region & Currency Details
          </p>
          <TopNav />
        </div>
      </div>
}

      {!edit && locationPath && (locationPath[locationPath.length - 1] === "region-and-currency-info") ? (
        <div className="h-full px-4 py-4 md:px-10 md:py-8 mar-128">
          <div className="flex justify-between">
            <p className="my-4 text-lg md:text-xl item-label-title">Region & Currency Details</p>
            <EditButton style={{ margin: '0.8rem 0px' }} onClick={() => setEdit(prev => !prev)} className="edit-btn">
              Edit
            </EditButton>
          </div>
          <Desktop>
            <StyledTable className="w-full overflow-hidden text-black bg-white shadow-lg tbl-rounded-top">
              <tbody>
                <tr>

                  <td className="px-8 py-4 font-semibold border item-label">Country</td>
                  <td className="px-8 py-4 font-normal border item-sublabel">{storeCountry}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 font-semibold border item-label">Time Zone</td>
                  <td className="px-8 py-4 font-normal border item-sublabel">{storeTimezone}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 font-semibold border item-label">Currency</td>
                  <td className="px-8 py-4 font-normal border item-sublabel">{storeCurrencyCode}</td>
                </tr>
              </tbody>
            </StyledTable>
            <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
              <span className="text-xs font-normal text-muted-light">
                Set time zone and currency displayed on your site. This will be default format on your site.
              </span>
            </div>
          </Desktop>

          <Mobile>
            <div>
              <div>
                <div className="px-4 py-4 bg-white tbl-rounded-top">
                  <div className="flex flex-col py-2">
                    <label className="mb-1 text-sm item-label">Country</label>
                    <span className="text-sm font-semibold item-sublabel"> {storeCountry}</span>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="mb-1 text-sm item-label">Time Zone</label>
                    <span className="text-sm font-semibold item-sublabel">{storeTimezone}</span>
                  </div>
                  <div className="flex flex-col py-2">
                    <label className="mb-1 text-sm item-label">Currency</label>
                    <span className="text-sm font-semibold item-sublabel">{storeCurrencyCode}</span>
                  </div>
                </div>

                <div className="flex flex-row justify-start px-4 py-4 bg-white border tbl-rounded-bottom align-center">
                  <AiOutlineInfoCircle className="mr-2" size={18} />
                  <span className="self-center text-xs font-semibold text-muted-light">
                    Set time zone and currency displayed on your site. This will be default format on your site.
                  </span>
                </div>
              </div>
            </div>
          </Mobile>
        </div>
      ) : (
        <div className="h-full mx-4 mt-4 mar-128 md:mt-16 px-4 md:px-10">
          <div className="w-full  mx-auto mt-6">
            <p className="my-4 text-lg md:text-xl item-label-title"> Region & Currency Details</p>
          </div>
          <div className="w-full mx-auto mt-4 bg-white rounded-lg ">
            <div className="inline-block w-full px-4 py-8 st-form">
              <div className="flex flex-wrap w-full mb-4 ">
                <div className="w-full mb-2 md:w-1/2 md:px-2">
                  <p className="mb-2 item-label">Country</p>

                  <Select
                   className="w-full border  cursor-pointer border-gray-400 rounded-lg focus:outline-none"
                    styles={customSelect}
                    style={{outline:"none"}}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    hasValue
                    placeholder="Select Country"
                    options={countryOptions[0]}
                    onChange={e => {
                      setcountryDropdown(e)
                    }}
                      value={{ label: storeCountry, value: storeCountryCode&& storeCountryCode[0] && storeCountryCode[0].country_code}}
                  />

                </div>
                <div className="w-full md:w-1/2">
                  <p className="mb-2 item-label">Time Zone</p>

                  <Select
                    isDisabled={countryDropdown===""} 
                    className="w-full  cursor-pointer border border-gray-400 rounded-lg focus:outline-none"
                    styles={customSelect}
                    style={{ outline: "none" }}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    hasValue
                    placeholder="Select TimeZone"
                    options={timezoneOptions[0]}
                    onChange={e => {
                      settimezoneDropdown(e)
                    }}
                      value={{ label: storeTimezone, value: storeTimezone }}
                  />

                </div>
              </div>
              <div className="flex flex-wrap w-full mb-4 ">
                <div className="w-full mb-2 md:w-1/2 md:px-2">
                  <p className="mb-2 item-label">Currency</p>

                  <Select
                    isDisabled={countryDropdown === ""} 
                    className="w-full border cursor-pointer border-gray-400 rounded-lg focus:outline-none"
                    styles={customSelect}
                    style={{ outline: "none" }}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    hasValue
                    placeholder="Select Currency"
                    options={currencyOptions[0]}
                    onChange={e => {
                      setcurrencyDropdown(e)
                    }}
                      value={{value:storeCurrencyCode,label:storeCurrencyCode}}
                  />

                </div>
                <div className="md:w-1/2 ">
                  <div className="rounded-lg px-5 py-1" style={{ background: '#F2F2F2', width: '100%' }}>
                    <p className="font-bold">Format Preview</p>
                    <p className="font-medium">Date & Time : 13 Aug 20, 3:30 Pm</p>
                      <p className="font-medium">Currency : {storeRegionDetails.storeCurrencyCode} 1,000.50</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex w-full px-5 mx-5 py-4 text-muted-light">
              <AiOutlineInfoCircle className="mr-4" size={25} />

              <span className="mt-1 text-xs font-semibold text-muted-med">
                Choose the country & time zone your store is located at and set the currency you want to accept and show
                on your site.
              </span>
            </div>
          </div>

            {locationPath && (locationPath[locationPath.length - 1] != "region-and-currency-info")?
         
         <div>
                <Desktop>
                  <div className="w-full flex justify-between items-end">
                    <button
                      type="button"
                      className="my-2 mt-10 cta-btn-alt
                "
                      onClick={() => navigatePageIndex(1)}
                    >
                      {' '}
                      <i className="mr-2 fas fa-chevron-left" />
                      Previous
                    </button>

                    <button
                      type="button"
                      className="my-2 mt-10 cta-btn
                "
                      onClick={(e) => saveRegionDetails(e)}
                    >
                      {' '}
                      Next
                      <i className="ml-2 fas fa-chevron-right" />
                    </button>
                  </div>
                </Desktop>
                <Mobile>
                  <span className="spacer" />
                  <div
                    className="w-full flex bg-white bottomButtons justify-between mar-128 "
                    style={{ marginBottom: '2.6rem' }}
                  >
                    <button
                      type="button"
                      className="mt-2 cta-btn-alt text-secondary bg-white"
                      style={{
                        width: '40%',
                        padding: '5px 7px',
                        height: 'auto',
                        color: '#f64b5d',
                      }}
                      onClick={() => navigatePageIndex(1)}
                    >
                      {' '}
                      <i style={{ marginRight: '10%', color: '#f64b5d' }} className="fas fa-chevron-left" /> Previous
                    </button>

                    <button
                      type="button"
                      className="mt-2 cta-btn"
                      style={{ width: '40%', padding: '5px 7px', height: 'auto' }}
                      onClick={(e) => saveRegionDetails(e)}

                    >
                      {' '}
                      Next
                      <i className=" fas fa-chevron-right" style={{ marginLeft: '15%' }} />
                    </button>
                  </div>
                </Mobile>
         </div>
         :<div className="bg-mob mt-10 py-2">
            <button onClick={(e) => saveRegionDetails(e)} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
              Save Changes
            </button>
          </div>}
        </div>
      )}
      {!edit && (locationPath && locationPath[locationPath.length - 1] === "region-and-currency-info")&& <PaymentPromotionImages />}   
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeRegionDetails: makeSelectStoreRegionDetails(),
  storeId: makeSelectStoreId(),
})
const mapDispatchToProps = dispatch => ({
  setStoreCountry: text => dispatch(setStoreCountry({ storeCountry: text })),
  setStoreCurrency: text => dispatch(setStoreCurrency({ storeCurrencyCode: text })),
  setStoreTimezone: text => dispatch(setStoreTimezone({ storeTimezone: text })),
  getStoreRegionDetails: storeId => dispatch(getStoreRegionDetails({ storeId })),
  setStoreRegionDetails: ({ storeId, storeCountry, storeCurrencyCode, storeTimezone }) =>
  dispatch(setStoreRegionDetails({ storeId, storeCountry, storeCurrencyCode, storeTimezone })),
  getAllCountryDetails: () => dispatch(getAllCountryDetails()),
  setStoreCurrencySymbol: currency_symbol => dispatch(setStoreCurrencySymbol({ currency_symbol })),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegionAndCurrencyInfo)
