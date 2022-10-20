import React, { useEffect, useState} from 'react'
import { useMediaQuery } from 'react-responsive'
import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'
import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'

import { convertToFLUpperCase, validateURL } from 'utils/validation'
import { createStructuredSelector } from 'reselect'
import '../../assets/SocialMediaAccounts.css'

import Modal from 'components/ReportsModal'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import { makeSelectSocial, makeSelectStoreId, makeSelectMerchantId, makeSelectSubscribedModules } from './selectors'
import { getSocialAccounts, setSocialAccountsInDb } from './actions'
import saga from './saga'
import reducer from './reducer'
import editIcon from "../../images/edit-3.svg"
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import { useInjectReducer } from 'utils/injectReducer'
import NewFooter from 'components/Footer/newFooter'

const SocialAccounts = ({ setSocialAccounts, getSocialAccounts, social, merchantId, storeId, subscribedTo }) => {
  useInjectSaga({ key: 'socialAccounts', saga })
  useInjectReducer({ key: 'socialAccounts', reducer })

  const [buttonMax, setButtonMax] = useState(false)

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    if (isMobile) setButtonMax(true)
    return isMobile ? children : null
  }

  const [url, setUrl] = React.useState({})
  const [showModal, setShowModal] = useState(false)
  const [newSocial, setNewSocial] = useState([])
  const [edit, setEdit] = useState(false)

  const [SelectedCount, setSelectedCount] = useState(5)
  const[errors,setErrors]=useState({})

  useEffect(() => {
    getSocialAccounts(storeId)
  }, [])

  useEffect(() => {
    if (social) {
      const isNotFirstTime = social.some(el => el.socialAccountLink !== null)
      if (isNotFirstTime) {
        setNewSocial(social.filter(sa => sa.socialAccountLink !== null))
        generateURL(social.filter(sa => sa.socialAccountLink !== null))
      } else {
        const newSocialAccounts = social.filter(
          sa =>
            sa.social_account_name !== 'PINTEREST' &&
            sa.social_account_name !== 'YOUTUBE' &&
            sa.social_account_name !== 'MEDIUM',
        )
        generateURL(newSocialAccounts)
        setNewSocial(newSocialAccounts)
      }
    }
  }, [social])

  const generateURL = newSocialAccounts => {
    const urlObj = {}
    const errorObj = {}
    newSocialAccounts &&
      newSocialAccounts.length > 0 &&
      newSocialAccounts.map(item => {
        urlObj[item.social_account_name] = item.socialAccountLink ? item.socialAccountLink : null
        errorObj[item.social_account_name] = item.socialAccountLink ? false : true
      })
    setUrl(urlObj)
  }

  const onInputChangeHandler = e => {
    const { value, name } = e.target
    setErrors({...errors,[name]:false})
    return setUrl({ ...url, [name]: value })
  }

  const renderList = (item, index) => (
    <tr key={index}>
      <td className="px-8 py-4 border font-semibold item-label">{convertToFLUpperCase(item.social_account_name)}</td>
      <td className="px-8 py-4 border font-normal item-sublabel">
        {item.socialAccountLink ? item.socialAccountLink : 'NIL'}
      </td>
    </tr>
  )

  const renderMobileList = (item, index) => (
    <div key={index} className="flex flex-col py-2">
      <label className="mb-1 font-semibold item-label">{convertToFLUpperCase(item.social_account_name)}</label>
      <span className="text-sm font-normal item-sublabel ">
        {item.socialAccountLink ? item.socialAccountLink : 'NIL'}
      </span>
    </div>
  )

  const renderInput = (list, index) => (
    <div className="py-2 st-form" key={index}>
      <p className="flex mb-2 font-semibold item-label">
        <img src={list.primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
        {convertToFLUpperCase(list.social_account_name)}
      </p>
      <input
        type="text"
        className="px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
        onChange={onInputChangeHandler}
        style={{ width: '95%' }}
        name={list.social_account_name}
        value={url[list.social_account_name]}
      />
      {errors[list.social_account_name]&&<p className='font-semibold text-secondary'>Invalid {list.social_account_name} URL</p>}
    </div>
  )

  const onSubmit = React.useCallback(() => {
    let errorFlag = false
    let errorsData = {}
    for (const key in url){
      const error = !validateURL(url[key])
      if(error){
        errorFlag=true
        errorsData[key]=error
      }
    }
    if(errorFlag)return setErrors(errorsData)
    setSocialAccounts(url, storeId, merchantId)
    setEdit(prev => !prev)
  }, [url, storeId, merchantId])

  useEffect(() => {
    const CurrSelected = Object.keys(url)&&Object.keys(url).length;
    setSelectedCount(CurrSelected);
  }, [url])  

  const handleCheckbox = e => {
    if (!e.target.checked) {
      setSelectedCount(count => count - 1)
      const tempSocial = newSocial.filter(val => val.social_account_name !== e.target.name)
      setNewSocial(tempSocial)
      const tempUrl = url
      delete tempUrl[e.target.name]
      setUrl(tempUrl)
    }

    if (e.target.checked) {
      setSelectedCount(count => count + 1)
      const newSocialObject = social.filter(val => val.social_account_name === e.target.name)
      setNewSocial(val => [...val, newSocialObject[0]])
      const tempUrl = url
      tempUrl[e.target.name] = ''
      setUrl(tempUrl)
    }
  }

  return (
    <>
      <ExtendedNavBar text={"Social Accounts"} />
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.SOCIAL_ACCOUNTS}>
        {!edit ? (
          <div className="px-4 py-4 md:px-10 md:py-8 mar-128 ">
            <div className="flex justify-between">
              <p className="my-4 text-lg md:text-xl item-label-title">Social Accounts</p>
              <EditButton style={{ margin: '0.8rem 0px' }} onClick={() => setEdit(true)} className="edit-btn">
                Edit
              </EditButton>
            </div>
            <Desktop>
              <StyledTable className="w-full overflow-hidden text-black bg-white rounded-lg shadow-lg">
                <tbody>
                  {newSocial && newSocial.length > 0 && newSocial.map((item, index) => renderList(item, index))}
                </tbody>
              </StyledTable>
              <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4" style={{ fontWeight: '500' }} size={18} />
                <span className="text-xs font-semibold text-muted-med">
                  Add your social profiles for customers to reach you better, links will be available on Contact Us page of your
                  site.
                </span>
              </div>
            </Desktop>
            <Mobile>
              <div className="bg-white rounded-lg px-4 py-4 ">
                {newSocial && newSocial.length > 0 && newSocial.map((item, index) => renderMobileList(item, index))}
              </div>
              <div className="flex flex-row bg-white rounded-l-lg rounded-r-lg rounded-b-lg justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="mr-2 ml-4" size={30} />
                <span className="text-xs text-muted-light font-semibold">
                  Add your social profiles for customers to reach you better, links will be available on Contact Us page of your
                  site.
                </span>
              </div>
            </Mobile>
          </div>
        ) : (
          <div className="flex flex-col justify-start md:px-10 my-5 mx-4">
            <div>
              <p className="my-4 text-lg md:text-xl item-label-title">Social Accounts</p>
            </div>
            <div className="w-full bg-white tbl-rounded sm-spacer">
              <div className="inline-block w-full px-6 py-4 md:px-10 md:py-6 ">
                <div className="mb-6 grid grid-cols-2 gap-4 editPageSocialMedia">
                  {newSocial && newSocial.length > 0 && newSocial.map((list, i) => renderInput(list, i))}

                  <div className="py-2 st-form flex flex-col items-start justify-end">
                    <p className="flex mb-2 font-semibold item-label">
                      <button
                        className="font-medium item-label flex justify-between items-center"
                        style={{ color: '#F64B5D' }}
                        onClick={() => {
                          setShowModal(true)
                        }}
                      >
                        <img src={editIcon} className="mr-2" />
                        Edit Social Media accounts
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row bg-white justify-start border-t align-center px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4" style={{ fontWeight: '500' }} size={18} />
                <span className="text-xs font-semibold text-muted-med" style={{ fontWeight: '500' }}>
                  Add your social profiles for customers to reach you better, links will be available on Contact Us page of your
                  site.
                </span>
              </div>
            </div>
            <div className="bg-mob mt-10 py-2">
              <button onClick={onSubmit} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </IsFeatureSubscribed>

      {showModal && (
        <Modal
          title="Edit Social Media Accounts"
          submit={() => setShowModal(false)}
          closeModal={() => setShowModal(false)}
          hideCancel
          proceedTitle="Save Changes"
          widthOfProceed={buttonMax ? '100%' : null}
        >
          <div className="containter">
            <p className="text-base text-muted-med font-medium mb-8">
              Choose any 5 Social accounts to sync with your website.
            </p>
            <div className="mb-6  grid grid-cols-2 gap-4">
              <div className="flex flex-row items-center mb-6">
                <input
                  name="FACEBOOK"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'FACEBOOK' in url}
                  disabled={!('FACEBOOK' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[0].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Facebook
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="PINTEREST"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'PINTEREST' in url}
                  disabled={!('PINTEREST' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[4].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Pinterest
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="INSTAGRAM"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'INSTAGRAM' in url}
                  disabled={!('INSTAGRAM' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[2].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Instagram
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="YOUTUBE"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'YOUTUBE' in url}
                  disabled={!('YOUTUBE' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[7].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Youtube
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="TWITTER"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'TWITTER' in url}
                  disabled={!('TWITTER' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[1].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Twitter
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="MEDIUM"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'MEDIUM' in url}
                  disabled={!('MEDIUM' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[5].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Medium
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="LINKEDIN"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'LINKEDIN' in url}
                  disabled={!('LINKEDIN' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[3].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Linkedin
                </p>
              </div>
              <div className="flex flex-row items-center mb-6">
                <input
                  name="WORDPRESS"
                  type="checkbox"
                  className="socialCheckbox"
                  onChange={handleCheckbox}
                  defaultChecked={'WORDPRESS' in url}
                  disabled={!('WORDPRESS' in url) && SelectedCount === 5}
                />
                <p className="flex flex-row items-center font-semibold item-label" style={{ marginBottom: 0 }}>
                  <img src={social[6].primary_logo_img_url} className="mr-2 rounded-lg" width={25} height={25} />
                  Wordpress
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
   {!edit&& <NewFooter/>}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  social: makeSelectSocial(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  subscribedTo: makeSelectSubscribedModules(),
})

const mapDispatchToProps = dispatch => ({
  setSocialAccounts: (social, storeId, merchantId) => dispatch(setSocialAccountsInDb(social, storeId, merchantId)),
  getSocialAccounts: (storeId) => dispatch(getSocialAccounts(storeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialAccounts)
