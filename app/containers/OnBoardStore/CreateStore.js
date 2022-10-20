import React from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Select, { components } from 'react-select'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import MediaQuery from 'react-responsive'
import { customSelect} from 'utils/dropdownConfig'
const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <FaCaretDown />
  </components.DropdownIndicator>
)
export default function CreateStore({
  isDesktop,
  onCreateStore,
  onSelectHandler,
  errorContext,
  formInput,
  onInputChangeHandler,
  storeType,
  storeTypeOptions,
  errorName,
  errorDesc,
  errorStoreType,
  desktop: Desktop,
  mobile: Mobile,
}) {
  return (
    <div className="relative">
      <div className="flex flex-col px-2 md:px-8 items-center justify-start my-10">
        <div className="w-full px-4">
          <p className="my-4 text-lg md:text-xl sub-heading">Store Details</p>
        </div>
        <div className="w-full leading-normal text-gray-800 mb-6 px-4">
          <div className="divide-y divide-grey-500 bg-white tbl-rounded st-form ">
            <div className="px-6 py-6 md:p-4">
              <div className="mb-6 flex flex-wrap w-full">
                <div className="w-full md:w-1/2 lg:w-1/2 md:px-2 mb-2 ">
                  <label id="section1" htmlFor="resName" className="mb-2 item-label font-semibold">
                    Store Name *
                  </label>
                  <input
                    placeholder="Your Store's Name"
                    className="w-full px-2 py-2 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3 "
                    
                    type="text"
                    name="storeName"
                    onChange={onInputChangeHandler}
                    value={formInput.storeName}
                  />
                  <span className="text-sm font-semibold text-secondary">{errorName}</span>
                </div>

                <div className=" w-full self-start md:w-1/2 lg:w-1/2 md:px-2 ">
                  <label id="section1" htmlFor="resName" className="mb-2 item-label">
                    Store Category *
                  </label>
                  <Select
                    className="w-full border border-gray-400 rounded-lg text-gray-600 focus:outline-none "
                    defaultValue={storeType}
                    options={storeTypeOptions}
                    onChange={onSelectHandler}
                    styles={customSelect}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    style={{ outline: 'none' }}
                  />
                  <div className="justify-start align-start">
                    <span className="text-sm font-semibold text-secondary ">{errorStoreType}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 md:px-2">
                <label id="section1" htmlFor="resName" className="mb-2 item-label font-semibold">
                  Description *&nbsp;
                  <small className="text-muted-light text-xs mt-1">( upto 200 chars )</small>
                </label>
                <textarea
                  placeholder="Enter short Description of your store"
                  className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                  name="storeDesc"
                  type="text"
                  rows="4"
                  onChange={onInputChangeHandler}
                  value={formInput.storeDesc}
                  maxLength="200"
                />
                <span className="text-sm font-semibold text-secondary">{errorDesc}</span>
              </div>
            </div>
            <hr />
            <div className="flex w-full px-4 py-4">
              <AiOutlineInfoCircle className="mr-2" size={25} />
              <span className="mt-1 text-sm text-muted-med font-semibold">
                Your store name appears on your dashboard and website.
              </span>
            </div>
          </div>
          <Desktop>
            <div className="w-full flex justify-end  mt-4 items-end">
              <button type="button" className="mt-10 cta-btn" onClick={onCreateStore}>
                {' '}
                Next
                <i className="ml-2 fas fa-chevron-right" />
              </button>
            </div>
          </Desktop>
          <br />
          <br />
          <br />
          <br />
          <br />
          <MediaQuery maxDeviceWidth={1100}>
            <div
              style={{ marginBottom: '1rem' }}
              className=" w-full bottomButtons bg-white font-semibold items-center place-items-center text-center"
            >
              <button style={{ color: 'white', backgroundColor: '#f64b5d' }} onClick={onCreateStore}>
                Next
              </button>
            </div>
          </MediaQuery>
        </div>
      </div>
    </div>
  )
}
