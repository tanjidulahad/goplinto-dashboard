import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import BinaryToggle from 'components/BinaryToggle'
import { IoLogoWhatsapp } from 'react-icons/io'
import './styles.css'
import { numberInputValidation } from 'utils/validation'
import ContactInput from 'components/ContactInput'
export default function StoreDetailsUpdate({
  setFormInput,
  formInput,
  onInputChangeHandler,
  isContact,
  ToggleContactInput,
  onUpdateStore,
  navigatePageIndex,
  errorEmail,
  errorPhone,
  errorAddress,
  errorCity,
  errorState,
  errorPin,
  errorCountry,
  errorWhatsapp,
  desktop: Desktop,
  mobile: Mobile,
  contactInfo
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center px-2 md:px-10 justify-start md:my-10 my-4">
        <div className="w-full  px-4">
          <h1 className="my-4 text-lg md:text-xl item-label-title">Contact Details</h1>
        </div>

        <div className="w-full  leading-normal text-gray-800 lg:mt-0 mb-6 px-4">
          <div className="divide-y divide-grey-500 bg-white rounded-lg   ">
            <div className="px-2 py-8 sm:px-8 sm:py-8">
              <div className=" md:flex flex-row justify-between gap-4 st-form ">
                <div className="w-full md:w-1/2 lg:w-1/2  mb-2 ">
                  <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                    Email Id *
                  </label>
                  <input
                    placeholder="yourmail@domain.com"
                    className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                    type="email"
                    name="storeEmail"
                    onChange={onInputChangeHandler}
                    value={formInput.storeEmail}
                  />
                  <span className="text-sm text-secondary font-semibold">{errorEmail}</span>
                </div>

                <div className=" w-full md:w-1/2 lg:w-1/2 mb-2  ">
                  <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                    Phone Number *
                  </label>
                  <ContactInput
                    formInput={formInput}
                    contactInfo={contactInfo}
                    setFormInput={setFormInput}
                    number={formInput.storePhone}
                    code={formInput.storePhoneCode}
                    flag={formInput.storePhoneFlag}
                    isPhone="Phone"
                  />
                  <span className="text-sm font-semibold text-secondary font-secondary">{errorPhone}</span>
                </div>
              </div>
              <div className="md:flex flex-row justify-between gap-4 st-form">
                <div className="w-full mb-2 md:w-1/2">
                  <label className="mb-2 font-semibold item-label">
                    <IoLogoWhatsapp color="#4CAF50" className="inline-block mr-1" size={20} /> Whatsapp Number
                  </label>
                  <ContactInput
                    formInput={formInput}
                    contactInfo={contactInfo}
                    setFormInput={setFormInput}
                    number={formInput.whatsappNumber}
                    code={formInput.whatsappNumberCode}
                    flag={formInput.whatsappNumberFlag}
                    isPhone=""
                  />
                  <span className="text-sm font-semibold text-secondary">{errorWhatsapp}</span>
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    type="checkbox"
                    className="mt-12 mr-1"
                    checked={formInput.useSameNumber}
                    onChange={() => {
                      setFormInput(prev => ({
                        ...prev,
                        useSameNumber: !formInput.useSameNumber,
                        whatsappNumber: formInput.storePhone,
                        whatsappNumberCode: formInput.storePhoneCode,
                        whatsappNumberFlag: formInput.storePhoneFlag,
                      }))
                    }}
                  />
                  <span className="text-muted-med font-semibold">Use Same as Phone Number</span>
                </div>
              </div>
            </div>

            <div className="border flex flex-row px-2 py-4">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
              <span className="text-xs text-muted-med font-semibold">
                Goplinto and your customers will use this information to contact you.
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-4">
          <h1 className="my-4 text-lg md:text-xl item-label-title">Address</h1>
        </div>

        <div className="w-full leading-normal px-4 mb-8">
          <div className="divide-y divide-grey-500 bg-white rounded-lg">
            <div className="px-2 py-8 sm:px-8 sm:py-8">
              <div className=" flex flex-row justify-start items-center px-2 pb-2">
                <BinaryToggle
                  activeColor="#F64B5D"
                  inactiveColor="rgba(36,36,36,0.3)"
                  toggle={isContact}
                  toggleCallback={ToggleContactInput}
                />
                <span className="text-sm text-muted-med font-semibold ml-2">My business has a physical address.</span>
              </div>

              {isContact && (
                <div className="px-2">
                  <div className="w-full mt-4 flex-row leading-normal text-gray-800 bg-white rounded-lg lg:mt-0 py-6">
                    <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                      Store address *
                    </label>
                    <input
                      placeholder="Enter Full Address"
                      className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                      name="storeAddress"
                      type="text"
                      required
                      onChange={onInputChangeHandler}
                      value={formInput.storeAddress}
                    />

                    <span className="text-sm text-secondary font-semibold">{errorAddress}</span>
                  </div>

                  <div className="md:flex justify-between gap-4">
                    <div className="w-full md:w-1/2 lg:w-1/2  mb-2 ">
                      <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                        City *
                      </label>
                      <input
                        placeholder="Enter City Name"
                        className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                        name="storeCity"
                        type="text"
                        required
                        onChange={onInputChangeHandler}
                        value={formInput.storeCity}
                      />

                      <span className="text-sm text-secondary font-semibold">{errorCity}</span>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/2 mb-2 ">
                      <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                        Pincode *
                      </label>
                      <input
                        placeholder="600024"
                        className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                        name="storePin"
                        type="number"
                        onKeyDown={e => numberInputValidation(e)}
                        required
                        onChange={onInputChangeHandler}
                        value={formInput.storePin}
                      />
                      <span className="text-sm text-secondary font-semibold">{errorPin}</span>
                    </div>
                  </div>

                  <div className=" md:flex justify-between gap-4">
                    <div className="w-full md:w-1/2 mb-2">
                      <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                        State *
                      </label>
                      <input
                        placeholder="Enter State Name"
                        className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                        name="storeState"
                        type="text"
                        required
                        onChange={onInputChangeHandler}
                        value={formInput.storeState}
                      />
                      <span className="text-sm text-secondary font-semibold">{errorState}</span>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/2 mb-2  ">
                      <label id="section1" htmlFor="resName" className="mb-2 font-semibold item-label">
                        Country *
                      </label>
                      <input
                        placeholder="Enter Country Name"
                        className="w-full p-3 border border-b-1 border-gray-400 rounded-lg focus:outline-none focus:border-secondary mb-3"
                        name="storeCountry"
                        type="text"
                        required
                        onChange={onInputChangeHandler}
                        value={formInput.storeCountry}
                      />
                      <span className="text-sm text-secondary font-semibold">{errorCountry}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border flex flex-row px-2 py-4">
              <AiOutlineInfoCircle className="mr-2" size={18} />
              <span className="text-sm text-muted-med font-semibold">
                Enter your location, like a store or office, so people can find you.
              </span>
            </div>
          </div>
          <Desktop>
            <div className="w-full flex justify-between items-end">
              <button
                type="button"
                className="my-2 mt-10 cta-btn-alt
                "
                onClick={() => navigatePageIndex(2)}
              >
                {' '}
                <i className="mr-2 fas fa-chevron-left" />
                Previous
              </button>

              <button
                type="button"
                className="my-2 mt-10 cta-btn
                "
                onClick={onUpdateStore}
              >
                {' '}
                Next
                <i className="ml-2 fas fa-chevron-right" />
              </button>
            </div>
          </Desktop>
        </div>
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
              onClick={onUpdateStore}
            >
              {' '}
              Next
              <i className=" fas fa-chevron-right" style={{ marginLeft: '15%' }} />
            </button>
          </div>
        </Mobile>
        <div />
      </div>
    </div>
  )
}
