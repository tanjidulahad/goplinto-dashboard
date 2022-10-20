import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import NoAddOnContainer from 'components/NoAddOnConatiner'
import AboutUsImg from "images/icons/AboutUs.svg"
import NewFooter from 'components/Footer/newFooter'
import { getAboutUs, sendAboutUs, setAboutUsEmail, setAboutUsContact, setAboutUsDescription, getAboutUsStatus, setAboutUsStatus } from './actions'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import reducer from './reducer'
import { useHistory } from 'react-router-dom'
import { setWidgetStatus } from '../AddOns/actions'
import AddOnsReducer from '../AddOns/reducers'
import AddOnsSaga from '../AddOns/sagas'
import { createStructuredSelector } from 'reselect'
import { makeSelectAboutUsContact, makeSelectAboutUsDesc, makeSelectAboutUsDetails, makeSelectAboutUsEmail, makeSelectAboutUsImgUrl, makeSelectAboutUsStatus, makeSelectGlobalUserMerchantId, makeSelectGlobalUserStoreId } from './selectors'
import "./style.css"
const key = 'AboutUs'

const AboutUs = ({ getAboutUs, storeId, merchantId, sendAboutUs, Email, Contact, setAboutUsEmail, setAboutUsContact, setAboutUsDescription, getAboutUsStatus, setAboutUsStatus, Description, ImgUrl, Status, setWidgetStatus }) => {

  useInjectReducer({ key: key, reducer })
  useInjectSaga({ key: key, saga })
  useInjectReducer({ key: 'addOnsReducer', reducer: AddOnsReducer })
  useInjectSaga({ key: 'addOnsSaga', saga: AddOnsSaga })
const [RemoveUploaddedImage, setRemoveUploaddedImage] = useState(false)
  useEffect(() => {
    getAboutUs(storeId)
    getAboutUsStatus(storeId)
  }, [])

  const history = useHistory();

  const [Img, setImg] = useState("")
  const inputImage = useRef(0)
  const modalImage = useRef(0)
  const checkSize = inpField => {
    let inpCheck = inputImage
    if (inpField === 'modalImage') {
      inpCheck = modalImage
    }
    if (inpCheck.current.files.length > 0) {
      for (let i = 0; i <= inpCheck.current.files.length - 1; i++) {
        const fsize = inpCheck.current.files.item(i).size
        const file = Math.round(fsize / 1024)
        if (file > 4096) {
          alert('File too big.')
          return false
        }
        return true
      }
    }
  }
  return (
    <>
      <NoAddOnContainer title={"About Us"} onClick={(e) => { e.preventDefault(); setWidgetStatus(storeId, 4, Status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE', merchantId); setAboutUsStatus(Status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE') }} added={Status === "ACTIVE"} ImgSrc={AboutUsImg} desc={"This will help your customers to know more about your website."} />
      {Status === "ACTIVE" ? <div className="mx-4 md:mx-10 mt-10">
        <h2 className='font-bold text-base'>About Us</h2>
        <div className="bg-white mb-8 mt-10 p-10">
          <p className='font-semibold text-sm'>Write About your store</p>
          <input
            type="text"
            value={Description&&Description.slice(0, 1000)}
            onChange={(e) => setAboutUsDescription(e.target.value)}
            className="form-input w-full h-20 my-5"
            placeholder='Describe your customers about your website / store.'
          />
          <p className='font-semibold text-sm'>Email<span className='item-label text-sm'> (Optional)</span></p>
          <input
            type="text"
            value={Email}
            onChange={(e) => setAboutUsEmail(e.target.value)}
            className="form-input w-full md:w-1/2 mb-5"
            placeholder='Enter you Email'
          />
          <p className='font-semibold text-sm'>Mobile Number<span className='item-label text-sm'> (Optional)</span></p>
          <input
            type="number"
            value={Contact}
            onChange={(e) => setAboutUsContact(e.target.value)}
            className="form-input w-full md:w-1/2 mb-10"
            placeholder='Enter you Phone Number'
          />
          <div className='md:flex'>
            <span className={`topDiv flex border p-1 w-36 mb-2 mr-4 border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600 ${!Img?"cursor-pointer":""}`}>
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <label htmlFor="uploadInput" className={`font-medium mt-1 text-sm mx-2 ${!Img&&"cursor-pointer"} `}>
                {!Img?"Upload File":"Uploaded"}
              </label>
              <input
                type="file"
                id="uploadInput"
                disabled={Img}
                hidden
                className="hidden"
                accept=".jpeg, .jpg, .png"
                ref={inputImage}
                onChange={e => {
                  if (checkSize(Img)) setImg(e.target.files[0])
                }}
              />
            </span>
            {Img && <p className='text-blue-400 mt-2 mx-2'>{Img.name}<button className='font-semibold mx-2' onClick={() => setImg("")}>X</button></p>}
            {ImgUrl && !RemoveUploaddedImage && <a href={ImgUrl} target="_blank" className='text-blue-400 mt-2 mr-2 font-semibold '>Uploaded Image</a>}
            {ImgUrl && !RemoveUploaddedImage && <span className='text-blue-400 mt-2 mr-2 font-semibold cursor-pointer' onClick={() => setRemoveUploaddedImage(true)}>X</span>}
            <p className='item-label text-xs mt-2'>( You can upload .png,.jpeg,.jpg formats with max size of 5 mb )</p>
          </div>
        </div>
        <div className='flex justify-end mx-4 md:mx-10 my-10'>
          <button onClick={() => { sendAboutUs(storeId, merchantId, Email, Contact, Description, Img, RemoveUploaddedImage?"":ImgUrl); setRemoveUploaddedImage(false);history.push("/app/general/add-ons") }} className='cta-btn'>Save Changes</button>
        </div>
      </div>
      :
        <div className='h-screen' >         
      </div>
      }
      <NewFooter />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectGlobalUserStoreId(),
  merchantId: makeSelectGlobalUserMerchantId(),
  AboutUsDetails: makeSelectAboutUsDetails(),
  Email: makeSelectAboutUsEmail(),
  Contact: makeSelectAboutUsContact(),
  Description: makeSelectAboutUsDesc(),
  ImgUrl: makeSelectAboutUsImgUrl(),
  Status: makeSelectAboutUsStatus(),
})
const mapDispatchToProps = dispatch => ({
  getAboutUs: (value) => dispatch(getAboutUs(value)),
  sendAboutUs: (storeId, merchantId, contactEmail, contactPhone, description, imgFile, SavedUrl) => dispatch(sendAboutUs(storeId, merchantId, contactEmail, contactPhone, description, imgFile, SavedUrl)),
  setAboutUsEmail: (value) => dispatch(setAboutUsEmail(value)),
  setAboutUsContact: (value) => dispatch(setAboutUsContact(value)),
  setAboutUsDescription: (value) => dispatch(setAboutUsDescription(value)),
  getAboutUsStatus: (value) => dispatch(getAboutUsStatus(value)),
  setAboutUsStatus: (value) => dispatch(setAboutUsStatus(value)),
  setWidgetStatus: (storeId, widgetId, widgetStatus, merchantId) =>
    dispatch(setWidgetStatus(storeId, widgetId, widgetStatus, merchantId)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutUs)
