import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { NavLink, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { customSelect, DropdownIndicator } from '../../utils/dropdownConfig'
import { connect } from 'react-redux'
import { setCreditNumbers, setCreditNumber, setCreditType, setCreditAmount } from './actions'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { makeSelectStore } from 'containers/Dashboard/selectors'
import saga from "./saga"

import "./style.css"
import { makeSelectCreditDetails, makeSelectStoreId, makeSelectMerchantId, makeSelectStoreRegionInfo } from "./selectors"
import reducer from "./reducer"
import { numberInputValidation } from 'utils/validation'
import ErrorLine from 'components/ErrorLine'
import storeDetailsSaga from 'containers/StoreDetails/saga'
import { getStoreRegionDetails } from 'containers/RegionAndCurrencyInfo/actions'
import storeRegionReducer from 'containers/RegionAndCurrencyInfo/reducer'
import storeRegionSaga from 'containers/RegionAndCurrencyInfo/saga'
import ExtendedNavbar from "../../components/TopNav/extendedNavBar"
import NewFooter from 'components/Footer/newFooter'
const AddCreditsPage = ({ storeId, merchantId, setCreditNumbers, creditDetails, setCreditNumber, setCreditType, setCreditAmount, store, storeRegionInfo, getStoreDetails }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    const [noOfCredit, setnoOfCredit] = useState("")
    const [creditTypeDropdown, setcreditTypeDropdown] = useState("")
    const [errors, setErrors] = useState({
        type:false,
        noOfCredit:false,
    })
    const history=useHistory();
    useInjectReducer({ key: 'creditDetails', reducer })
    useInjectSaga({ key: 'creditDetails', saga })
    useInjectSaga({ key: 'getStoreDetails', saga: storeDetailsSaga })
    useInjectReducer({ key: 'storeRegionInfo', reducer: storeRegionReducer })
    useInjectSaga({ key: 'storeRegionInfo', saga: storeRegionSaga})
    useEffect(() => {
        getStoreDetails(storeId);
        setCreditNumbers(storeId, merchantId);
    }, [])

    const { creditPricing } = creditDetails;

    const creditPricingKeys = creditPricing && Object.keys(creditPricing)

    const options = creditPricing && creditPricingKeys.map((val)=>{
            return(
                { value: val, label: <div className='flex py-2'><img src={creditPricing[val].icon_url} height="30px" width="30px" className='mx-4' />{creditPricing[val].credit_name}</div>, displayName: creditPricing[val].credit_name}
         )})     

    var currCreditTypePrice = creditPricing[creditDetails.creditType] ? creditPricing[creditDetails.creditType].credit_pricing : 0;

    useEffect(() => {
        if (currCreditTypePrice && noOfCredit) {
            setCreditAmount(currCreditTypePrice * noOfCredit)
        }
    }, [creditTypeDropdown, noOfCredit])
    useEffect(() => {

        if (creditTypeDropdown) {
            setCreditType(creditTypeDropdown.value)
        }
    }, [creditTypeDropdown])
const checkErrors=(e)=>{
    e.preventDefault();
    setErrors({
        type:false,
        noOfCredit:false
    })
    if(!creditTypeDropdown) setErrors(prev=>({...prev,type:true}));
    if(!noOfCredit) setErrors(prev=>({...prev,noOfCredit:true}));
}
const CurrencySymbol = storeRegionInfo && storeRegionInfo.currency_symbol;
const CurrencyCode = storeRegionInfo && storeRegionInfo.storeCurrencyCode;
const Country = storeRegionInfo && storeRegionInfo.storeCountry;
    return <div>
        <div className='pb-5 mb-5 relative'>
            <ExtendedNavbar text="Add Credits" onBack={() => history.push('/app/general/marketing&branding')} noHelp  />
            <div className='bg-white font-bold rounded-md shadow-md my-auto p-10 main_addCredit_div'>
            <p>Credit Type *</p>
            <Select
                className={isTablet?"my-2 w-1/2 border border-gray-400 rounded-md focus:outline-none":"my-2 w-full px-0 border border-gray-400 rounded-md "}
                styles={customSelect}
                components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                hasValue
                filterOption={false}
                placeholder="Select Type"
                options={options}
                onChange={e => {
                    setcreditTypeDropdown(e)
                }}
                value={creditTypeDropdown}
                defaultValue={options[0]}
            />
         <ErrorLine value="Credit Type is mandatory" type={errors.type} />
            <hr className='addCredit_division' />
            <p >No. Of Credits *</p>
            <input
                type="number"
                placeholder='Enter number of credits'
                className={isTablet?"mb-5 py-2 px-3 variant-modal-input w-1/2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary":"mb-5 py-2 px-3 variant-modal-input w-full border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"}
                onChange={(e) => { setnoOfCredit(e.target.value); setCreditNumber(e.target.value) }}
                value={noOfCredit}
                onKeyDown={e=>numberInputValidation(e)}
                disabled={creditTypeDropdown === ""}
            />
            <ErrorLine value="No. Of Credits are mandatory" type={errors.noOfCredit} />
            <p>Price Per Credit</p>
            <input
                type="text"
                className="mb-5 py-2 px-3 variant-modal-input border border-gray-400 rounded-lg focus:outline-none focus:border-secondary creditPriceInput"
                value={CurrencySymbol + " "+currCreditTypePrice}
                disabled
            />
            <p className='font-semibold text-gray-500 mt-0'>

                {currCreditTypePrice}x{noOfCredit}
            </p>
            <p>Amount</p>
            <h1 className='text-xl font-bold text-red-500'>{CurrencySymbol} {+parseFloat(currCreditTypePrice * noOfCredit).toFixed(2)}</h1>
        </div>
{isTablet?
        <div className='checkOutBtnDiv'>
         {   (!noOfCredit||!creditTypeDropdown)?
            <button className='text-decoration-none rounded-md shadow-md text-white p-2 text-sm font-semibold checkOutBtnBg'  onClick={e=>checkErrors(e)}>Proceed to Checkout</button>
                        : <NavLink to={{ pathname: "/app/checkout", state: { planAmount: (currCreditTypePrice * noOfCredit).toFixed(2), planName: creditTypeDropdown.value + " Credits", planType: creditTypeDropdown.value, planNumber: noOfCredit, planDisplayName: creditTypeDropdown.displayName, CurrencySymbol: CurrencySymbol, CurrencyCode: CurrencyCode, Country: Country} }}><button className='text-decoration-none rounded-md shadow-md text-white p-2 text-sm font-semibold checkOutBtnBg'>Proceed to Checkout</button></NavLink>  
       }
        </div>
:
<div className='bg-white w-full flex justify-center shadow-xl mb-5'>
            {(!noOfCredit || !creditTypeDropdown) ?
                <button className="text-white bg-secondary text-center absolute font-semibold text-base w-5/6 rounded-md py-2 mb-5 checkOutBtnBg" onClick={e=>checkErrors(e)}>Proceed to Checkou9t</button>
                        : <NavLink className="text-white bg-secondary text-center font-semibold text-base w-5/6 rounded-md" to={{ pathname: "/app/checkout", state: { planAmount: (currCreditTypePrice * noOfCredit).toFixed(2), planName: creditTypeDropdown.value + " Credits", planType: creditTypeDropdown.value, planNumber: noOfCredit, planDisplayName: creditTypeDropdown.displayName, CurrencySymbol: CurrencySymbol, CurrencyCode: CurrencyCode, Country: Country } }}><button className="text-white  text-center font-semibold text-base w-5/6 rounded-md py-2 checkOutBtnBg">Proceed to Checkout</button></NavLink>
       }
        </div>}
      </div>
        <NewFooter/>
    </div>
}
const mapStateToProps = createStructuredSelector({
    storeId: makeSelectStoreId(),
    merchantId: makeSelectMerchantId(),
    creditDetails: makeSelectCreditDetails(),
    store: makeSelectStore(),
    storeRegionInfo: makeSelectStoreRegionInfo(),
})
const mapDispatchToProps = dispatch => ({
    setCreditNumbers: (storeId, merchantId) => dispatch(setCreditNumbers({ storeId, merchantId })),
    setCreditType: creditType => dispatch(setCreditType({ creditType })),
    setCreditNumber: noOfCredits => dispatch(setCreditNumber({ noOfCredits })),
    setCreditAmount: creditAmount => dispatch(setCreditAmount({ creditAmount })),
    getStoreDetails: (storeId) => dispatch(getStoreRegionDetails({ storeId })),
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCreditsPage)
