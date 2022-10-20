import React, { useState } from 'react'
import "assets/StorePolicy.css"
import TopNav from 'components/TopNav'
import { NavLink, Link } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import parse from 'html-react-parser'
import { EditButton } from 'components/EditButton'
import { StyledTableAlt } from 'components/StyledTableAlt'
import MediaQuery from 'react-responsive'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const StorePolicy = () => {
  const [terms, setTerms] = useState("")
  const [privacyPolicy, setPrivacyPolicy] = useState("")
  const [returnRefundCancellation, setReturnRefundCancellation] = useState("")

  const [edit, setEdit] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)
  return (
    <div className="mb-16">
      <div className="sticky w-full bg-white" style={{ paddingLeft: "0", paddingRight: "0" }}>
        <div className="sticky bg-white mobile-topNav">

          <div className="flex justify-between  pt-4 text-xl font-semibold">
            <MediaQuery minDeviceWidth={651}>
              <div className="left_container  ml-2 flex">
                <Link to="/app/storeSettings">
                  <div className="arrow_icon "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg></div>
                </Link>
                <p className="flex text-sm md:text-lg ml-2 text-black font-semibold text-black">Store Policies</p>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={650}>
              <div className="left_container  ml-2 flex">
                <Link to="/app/storeSettings" >
                  <div className="arrow_icon "><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg></div>
                </Link>
                <p className="flex text-sm md:text-lg ml-2 text-black font-semibold text-black">Store Policies</p>
              </div>
            </MediaQuery>


            <TopNav />
          </div>
        </div>
      </div>
      <MediaQuery minDeviceWidth={651}>
        <div>
          <div className="flex justify-between mx-10 mt-8">
            <p className="mb-6 text-xl font-semibold text-black">Store Policies</p>
            {((!isFirstTime && !edit) || !edit) && <EditButton onClick={() => setEdit(prev => !prev)}>Edit</EditButton>}
          </div>
          {isFirstTime && !edit && (
            <div style={{ minHeight: '500px' }} className="mx-10 bg-white rounded-lg">
              <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="text-center">
                <p className="mb-2 text-base">Your Store doesn't have policies at the Moment</p>
                <button
                  onClick={() => {
                    setIsFirstTime(prev => !prev)
                    setEdit(prev => !prev)
                  }}
                  className="px-6 py-2 text-base tracking-wide text-white rounded-lg bg-secondary text-nowrap focus:outline-none"
                >
                  Add Store Policies{' '}
                </button>
              </div>
              <div className="flex px-6 pt-4 border-t">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-normal text-gray-800">
                  Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                </span>
              </div>
            </div>
          )}
          {edit && (
            <div>
              <div className="px-8 py-6 mx-10 bg-white rounded-lg">
                <div className="mb-6">
                  <p className="mb-4 text-base font-semibold text-black">Terms of Service</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={terms}
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setTerms(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's terms of service here"
                      }}


                    />


                  </div>
                </div>
                <div className="mb-6">
                  <p className="mb-4 text-base font-semibold text-black">Privacy Policy</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={privacyPolicy}
                      placeholder="Write your store's Privacy Policy here"
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setPrivacyPolicy(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's terms of service here",
                        height: "500 px"
                      }}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <p className="mb-4 text-top font-semibold text-black">Returns, Refunds & Cancellations</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={returnRefundCancellation}
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setReturnRefundCancellation(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's Returns, Refunds & Cancellations here"
                      }}


                    />
                  </div>
                </div>
                <div className="flex px-6 pt-4 border-t">
                  <AiOutlineInfoCircle className="mr-4" size={25} />
                  <span className="mt-1 text-xs font-normal text-gray-800">
                    Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                  </span>
                </div>
              </div>

              <MediaQuery maxDeviceWidth={1100}>
                <div className="bg-white flex justify-between" style={{ paddingBottom: '90px' }}>
                  <div
                    className=" w-full bottomButtons bg-white items-center place-items-center text-center"
                    style={{ marginBottom: '0.8rem' }}
                  >
                    <button
                      onClick={() => {
                        setEdit(false)
                        setIsFirstTime(false)
                      }}
                      className=" editItemPage-save-add-Button w-auto h-auto px-4 text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery minDeviceWidth={1100}>
                <div className="flex justify-end mx-10 my-6">
                  <button
                    onClick={() => {
                      setEdit(false)
                      setIsFirstTime(false)
                    }}
                    className="px-4 py-2 text-base text-white rounded-lg bg-secondary focus:outline-none"
                  >
                    Save Changes
                  </button>
                </div>
              </MediaQuery>
            </div>
          )}
          {!isFirstTime && !edit && (
            <div className="pb-4 mx-10 bg-white rounded-lg policy_table_container">
              <StyledTableAlt>
                <tr style={{}}>
                  <th
                    className="item-label"
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                  >
                    Policy
                  </th>
                  <th
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                    className="item-label"
                  >
                    Description
                  </th>
                </tr>
                <tr>
                  <td className="text-sm font-medium title ">Terms of Service</td>
                  <td className="text-sm font-medium">{parse(terms)}</td>

                </tr>
                <tr>
                  <td className="text-sm font-medium title">Privacy Policy</td>
                  <td className="text-sm font-medium">{parse(privacyPolicy)}</td>
                </tr>
                <tr>
                  <td className="text-sm font-medium title">Return, Refund & Cancellations</td>
                  <td className="text-sm font-medium">{parse(returnRefundCancellation)}</td>
                </tr>
              </StyledTableAlt>
              <div className="flex px-6 pt-4 border-t">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-normal text-gray-800">
                  Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                </span>
              </div>

            </div>
          )}
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={650}>
        <div>
          <div className="flex justify-between mx-4 mt-8">
            <p className="mb-6 text-xl font-semibold text-black">Store Policies</p>
            {((!isFirstTime && !edit) || !edit) && <EditButton onClick={() => setEdit(prev => !prev)}>Edit</EditButton>}
          </div>
          {isFirstTime && !edit && (
            <div style={{ minHeight: '500px' }} className="mx-4 bg-white rounded-lg">
              <div style={{ paddingTop: '8rem', paddingBottom: '8rem' }} className="text-center">
                <p className="mb-2 text-base">Your Store doesn't have policies at the Moment</p>
                <button
                  onClick={() => {
                    setIsFirstTime(prev => !prev)
                    setEdit(prev => !prev)
                  }}
                  className="px-6 py-2 text-base tracking-wide text-white rounded-lg bg-secondary text-nowrap focus:outline-none"
                >
                  Add Store Policies{' '}
                </button>
              </div>
              <div className="flex px-6 pt-4 border-t">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-normal text-gray-800">
                  Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                </span>
              </div>
            </div>
          )}
          {edit && (
            <div>
              <div className="px-8 py-6 mx-4 bg-white rounded-lg">
                <div className="mb-6">
                  <p className="mb-4 text-base font-semibold text-black">Terms of Service</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={terms}
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setTerms(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's terms of service here"
                      }}


                    />


                  </div>
                </div>
                <div className="mb-6">
                  <p className="mb-4 text-base font-semibold text-black">Privacy Policy</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={privacyPolicy}
                      placeholder="Write your store's Privacy Policy here"
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setPrivacyPolicy(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's terms of service here",
                        height: "500 px"
                      }}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <p className="mb-4 text-top font-semibold text-black">Returns, Refunds & Cancellations</p>

                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={returnRefundCancellation}
                      onChange={(e, editor) => {
                        const data = editor.getData()
                        setReturnRefundCancellation(data)
                      }}
                      config={{
                        ckfinder: {
                          uploadUrl: "/upload"
                        },
                        placeholder: "Write your store's Returns, Refunds & Cancellations here"
                      }}


                    />
                  </div>
                </div>
                <div className="flex px-6 pt-4 border-t">
                  <AiOutlineInfoCircle className="mr-4" size={25} />
                  <span className="mt-1 text-xs font-normal text-gray-800">
                    Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                  </span>
                </div>
              </div>

              <div className="bg-white flex justify-between" style={{ paddingBottom: '90px' }}>
                <div
                  className=" w-full bottomButtons bg-white items-center place-items-center text-center"
                  style={{ marginBottom: '0.8rem' }}
                >
                  <button
                    onClick={() => {
                      setEdit(false)
                      setIsFirstTime(false)
                    }}

                    className=" editItemPage-save-add-Button w-auto h-auto px-4 text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isFirstTime && !edit && (
            <div className="pb-4 mx-4 bg-white rounded-lg policy_table_container">
              <StyledTableAlt>
                <tr style={{ background: '#e8e9ee' }}>
                  <th
                    className="item-label"
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                  >
                    Policy
                  </th>
                  <th
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                    className="item-label"
                  >
                    Description
                  </th>
                </tr>
                <tr>
                  <td className="text-sm font-medium  ">Terms of Service</td>
                  <td className="text-sm font-medium">{parse(terms)}</td>
                </tr>
                <tr style={{ background: '#e8e9ee' }}>
                  <th
                    className="item-label"
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                  >
                    Policy
                  </th>
                  <th
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                    className="item-label"
                  >
                    Description
                  </th>
                </tr>
                <tr>
                  <td className="text-sm font-medium ">Privacy Policy</td>
                  <td className="text-sm font-medium">{parse(privacyPolicy)}</td>
                </tr>
                <tr style={{ background: '#e8e9ee' }}>
                  <th
                    className="item-label"
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                  >
                    Policy
                  </th>
                  <th
                    style={{ paddingBottom: '1rem', paddingTop: '1rem', paddingLeft: '1rem' }}
                    className="item-label"
                  >
                    Description
                  </th>
                </tr>
                <tr>
                  <td className="text-sm font-medium ">Return, Refund & Cancellations</td>
                  <td className="text-sm font-medium">{parse(returnRefundCancellation)}</td>
                </tr>
              </StyledTableAlt>
              <div className="flex px-6 pt-4 border-t">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-normal text-gray-800">
                  Enter the policies your store needs. Policies will appear in the footer of your website.{' '}
                </span>
              </div>

            </div>
          )}
        </div>
      </MediaQuery>
    </div>
  )
}

export default StorePolicy
