import React, { useState, useEffect } from 'react'
import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { connect } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'

import {
  makeSelectMerchantId,
  makeSelectStoreName,
  makeSelectSeoDetails,
  makeSelectStoreId,
  makeSelectSubscribedModules,
  makeSelectStoreDomainUrl,
  makeSelectStoreDesc,
} from './selectors'
import { createStructuredSelector } from 'reselect'
import { useMediaQuery } from 'react-responsive'
import RingLoader from 'react-spinners/RingLoader'
import { setSeoDetails, getSeoDetails, setSeoDesc, setSeoTitle, setSeoTags } from './actions'
import saga from './saga'
import reducer from './reducer'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import makeStoreUrl from 'utils/makeStoreUrl'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import { validateContainOnlyWhitespace } from 'utils/validation'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const SeoDetails = ({
  seoDetails,
  merchantId,
  storeId,
  setSeoTitle,
  setSeoTags,
  setSeoDesc,
  getSeoDetails,
  setSeoDetails,
  storeName,
  storeDesc,
  subscribedTo,
  storeDomainUrl,
}) => {
  useInjectReducer({ key: 'seoDetails', reducer })
  useInjectSaga({ key: 'seoDetails', saga })
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const [edit, setEdit] = useState(false)
  const [tagsArray, setTagsArray] = useState([])
  const [defaultValue, setDefaultValue] = useState('')
  const [errors,setErrors]=useState({
    title: false,
    keywords: false,
    desc:false
  })
  const { seoTitle, seoTags, seoDesc, loading, errorMessage } = seoDetails

  useEffect(() => {
    getSeoDetails(storeId)    
    if(!seoTitle)
    {
      setSeoTitle(storeName)
    }
    if(!seoDesc)
    {
      setSeoDesc(storeDesc.slice(0, 200))
    }
  }, [])

  useEffect(() => {
    if (seoTags !== '') {
      const keyWordsArray = seoTags&&seoTags.split(',')

      setTagsArray(keyWordsArray)
      setDefaultValue('')
    }
  }, [seoTags])

  function handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 188) {
      if (defaultValue&&defaultValue !== '') {
        if (defaultValue.charAt(defaultValue.length - 1) == ',') {
          defaultValue = defaultValue.substring(0, defaultValue.length - 1)
        }
        if(!tagsArray)  setTagsArray([defaultValue])        
        else  setTagsArray([...tagsArray, defaultValue])        
        if (tagsArray&&tagsArray.length >= 1) {
          const tagsToString = `${tagsArray.toString()},${defaultValue}`
          setSeoTags(tagsToString)
        } else {
          const tagsToString = defaultValue
          setSeoTags(tagsToString)
        }

        setDefaultValue('')
      }
    } else if (e.keyCode === 8) {
      if (defaultValue === '') {
        if (tagsArray&&tagsArray.length >= 1) {
          setTagsArray(tagsArray.slice(0, tagsArray.length - 1))
          const tagsToString = tagsArray.slice(0, tagsArray.length - 1).toString()
          setSeoTags(tagsToString)
          setDefaultValue(tagsArray[tagsArray.length - 1])
        }
      }
    }
  }

  function handleKeywords(e) {
    if (tagsArray&&tagsArray.length === 5) {
      setDefaultValue('')
    } else {
      const enteredValue = e.target.value.replace(',', '')
      setDefaultValue(enteredValue)
    }
  }

  function editPress() {
    setErrors({
      title: (!seoTitle||validateContainOnlyWhitespace(seoTitle))?true:false,
      keywords: (tagsArray&&tagsArray.length<1)?true:false,
      desc: (!seoDesc || validateContainOnlyWhitespace(seoDesc))?true:false
    })

    if (!seoTitle || !seoDesc || (tagsArray&&tagsArray.length < 1 )|| validateContainOnlyWhitespace(seoTitle) || validateContainOnlyWhitespace(seoDesc)) return;
    
    setSeoDetails({
      storeId,
      merchantId,
      seoTitle,
      seoTags,
      seoDesc,
    })
    if (edit !== false) {
      setEdit(prev => !prev)
    }
  }

  return (
    <div>
      {loading && (
        <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <RingLoader color="#F64C5D" size={150} />
        </div>
      )}

      <ExtendedNavBar text="SEO Settings" />
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.SEO_SETTINGS}>
        {!edit && !errorMessage ? (
          <div className="px-4 py-4 md:px-10 md:py-8">
            <div className="flex justify-between">
              <p className="my-4 text-lg md:text-xl item-label-title">SEO Details</p>
              <EditButton onClick={() => setEdit(prev => !prev)}>Edit</EditButton>
            </div>

            <Desktop>
              <StyledTable className="w-full overflow-hidden text-black bg-white rounded-lg shadow-lg">
                <tbody>
                  <tr>
                    <td className="px-8 py-4 border item-label font-semibold">Title / Store Name</td>
                    <td className="px-8 py-4 border item-sublabel font-normal">{seoTitle}</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 border item-label font-semibold">Keywords</td>
                    <td className="px-8 py-4 border item-sublabel font-normal">{seoTags}</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-4 border item-label font-semibold">Description</td>
                    <td className="px-8 py-4 border item-sublabel font-normal">{seoDesc}</td>
                  </tr>
                </tbody>
              </StyledTable>
              <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                <span className="text-xs font-semibold text-muted-med">
                  Search engine optimization (SEO) is the practice of getting targeted traffic to a website from a search
                  engine’s organic rankings.
              </span>
              </div>
            </Desktop>
            <Mobile>
              <div className="h-screen">
                <div className="bg-white rounded-lg px-4 py-4 ">
                  <div className="flex flex-col py-2">
                    <label className="font-semibold mb-1 text-base item-label">Title / Store Name</label>
                    <span className="text-sm item-sublabel font-normal">{seoTitle}</span>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="font-semibold mb-1 text-base item-label">Keywords</label>
                    <span className="text-sm item-sublabel font-normal">{seoTags}</span>
                  </div>

                  <div className="flex flex-col py-2">
                    <label className="font-semibold mb-1 text-base item-label">Description</label>
                    <span className="text-sm item-sublabel font-normal">{seoDesc}</span>
                  </div>
                </div>
                <div className="flex flex-row bg-white tbl-rounded-bottom justify-start align-center border px-2 py-2">
                  <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={12} />
                  <span className="text-xs font-semibold text-muted-med">
                    Search engine optimization (SEO) is the practice of getting targeted traffic to a website from a search engine’s organic rankings.
                </span>
                </div>
              </div>
            </Mobile>
          </div>
        ) : (errorMessage && !edit) || (edit && !errorMessage) || (edit && errorMessage) ? (
          <div>
            <div className="h-full mx-4 mt-4 mar-128 md:mt-16">
              <div className="w-full mx-auto my-2 md:w-3/4">
                <h1 className="my-4 text-lg md:text-xl item-label-title">SEO Details</h1>
              </div>
              <div className="w-full mx-auto mt-4 bg-white rounded-lg md:w-3/4">
                <div className="inline-block w-full px-6 py-6" style={{ paddingBottom: 0 }}>
                  <div className="flex flex-wrap flex-col w-full ">
                    <div className="w-full md:px-2 mb-6">
                      <p style={{ marginBottom: '0.75rem' }} className="mb-2 item-label">
                        Title / Store Name *{' '}
                        <span style={{ color: '#242424BF' }} className="text-xs">
                          ( upto 60 chars )
                      </span>
                      </p>
                      <input
                        type="text"
                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        value={seoTitle}
                        onChange={e => setSeoTitle(e.target.value.slice(0, 60))}
                      />
                      {errors.title&&<p className='font-semibold text-secondary'>Title/Store Name is Mandatory</p>}
                    </div>

                    <div className="w-full md:px-2 mb-6">
                      <p style={{ marginBottom: '0.75rem' }} className="mb-2 item-label">
                        Keywords *{' '}
                        <span style={{ color: '#242424BF' }} className="text-xs">
                          ( Enter words seperated by comma, upto 5 words ){' '}
                        </span>
                      </p>
                      <div
                        className="w-full h-9 px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        style={{ display: 'flex', flexFlow: 'wrap', alignItems: 'center' }}
                      >
                        <div style={{ display: 'flex', flexFlow: 'wrap', alignItems: 'center' }}>
                          {tagsArray&&tagsArray.map((val, index) => (
                            <div
                              key={index}
                              style={{
                                backgroundColor: '#F64B5D1A',
                                marginRight: 16,
                                marginTop: 8,
                                marginBottom: 8,
                                padding: '5px 16px',
                                borderRadius: 16,
                                display: 'flex',
                                flexFlow: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {val}
                              <span
                                id={index}
                                onClick={() => {
                                  const result = tagsArray.filter((word, indx) => indx !== index)

                                  setTagsArray(result)
                                  setSeoTags(result.toString())
                                }}
                                style={{ marginLeft: 13, color: '#F64B5D', cursor: 'pointer' }}
                              >
                                &#10006;
                            </span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <input
                            style={{ outline: 'none', border: 'transparent' }}
                            type="text"
                            placeholder="Enter upto 5 keywords"
                            className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary seoInput"
                            value={defaultValue}
                            onChange={handleKeywords}
                            onKeyDown={handleKeyDown}
                          />
                        </div>
                      </div>
                            {errors.keywords && <p className='font-semibold text-secondary'>Keywords are Mandatory</p>}
                    </div>

                    <div className="w-full md:px-2 mb-6">
                      <p style={{ marginBottom: '0.75rem' }} className="mb-2 item-label">
                        Description *{' '}
                        <span style={{ color: '#242424BF' }} className="text-xs">
                          ( upto 200 chars )
                      </span>{' '}
                      </p>

                      <textarea
                        style={{ height: 120 }}
                        value={seoDesc}
                        className="h-2 w-full px-3 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        onChange={e => {
                          setSeoDesc(e.target.value.slice(0, 200))
                        }}
                      />
                        {errors.desc && <p className='font-semibold text-secondary'>Description is Mandatory</p>}
                    </div>
                    <div className="w-full md:px-2 mb-10">
                      <p style={{ marginBottom: '0.75rem' }} className="mb-3 text-base font-medium">
                        SEO Listing Preview on Google
                      </p>

                      <div className="w-full p-2 rounded-lg" style={{ backgroundColor: '#f2f2f2' }}>
                        <p className="text-xs font-normal" style={{ color: '#242424', marginBottom: '0.5rem' }}>
                            {makeStoreUrl(storeName, storeId, storeDomainUrl)}
                        </p>
                        <p className="text-sm font-bold" style={{ color: '#1A0DAB', marginBottom: '0.5rem' }}>
                          {seoTitle}
                        </p>
                        <p className="text-sm font-normal" style={{ color: '#242424', marginBottom: 0 }}>
                          {seoDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
                  <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                  <span className="text-xs font-semibold text-muted-med">
                    Search engine optimization (SEO) is the practice of getting targeted traffic to a website from a
                    search engine’s organic rankings.
                </span>
                </div>
              </div>
              <div className="md:flex flex-row-reverse w-full md:w-3/4 mx-auto mt-6 hidden">
                <button onClick={editPress} className="px-4 py-2 text-white rounded-lg bg-secondary">
                  Save Changes
                </button>
              </div>

              {errorMessage ? (
                <p className="flex flex-row-reverse w-full md:w-3/4 mx-auto mt-6 text-red-500">
                  *Something went wrong! Please try again later!
                </p>
              ) : null}
            </div>
            <Mobile>
              <div
                className="bg-mob flex flex-row w-full justify-center items-center"
                style={{ zIndex: 2, backgroundColor: 'white', height: 56, boxShadow: '0px -2px 4px #00000029' }}
              >
                <button
                  onClick={editPress}
                  className="px-4 py-2 text-white rounded-lg bg-secondary w-4/5"
                  style={{ height: 40 }}
                >
                  Save Changes
                </button>
              </div>
            </Mobile>
          </div>
        ) : null}
      </IsFeatureSubscribed>
     {!edit&&<PaymentPromotionImages />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  seoDetails: makeSelectSeoDetails(),
  storeId: makeSelectStoreId(),
  storeName: makeSelectStoreName(),
  storeDesc: makeSelectStoreDesc(),
  merchantId: makeSelectMerchantId(),
  subscribedTo: makeSelectSubscribedModules(),
  storeDomainUrl: makeSelectStoreDomainUrl(),
})

const mapDispatchToProps = dispatch => ({
  setSeoTitle: text => dispatch(setSeoTitle({ seoTitle: text })),
  setSeoTags: text => dispatch(setSeoTags({ seoTags: text })),
  setSeoDesc: text => dispatch(setSeoDesc({ seoDesc: text })),
  getSeoDetails: storeId => dispatch(getSeoDetails({ storeId })),
  setSeoDetails: ({ storeId, merchantId, seoTitle, seoTags, seoDesc }) =>
    dispatch(setSeoDetails({ storeId, merchantId, seoTitle, seoTags, seoDesc })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeoDetails)
