import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { useInjectReducer } from 'utils/injectReducer'
import { createStructuredSelector } from 'reselect'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import QRCode from 'qrcode.react'

import template_1 from 'images/cards/Template_1.jpg'
import template_2 from 'images/cards/Template_2.jpg'
import template_3 from 'images/cards/Template_3.jpg'
import qrImage from 'images/cards/Qr_poster_Template.jpg'

import TopNav from 'components/TopNav'
import ShareModal from 'components/ShareModal'
import BusinessCards from './BusinessCards'
import QRCodePosters from './QRCodePosters'

import 'assets/Branding.css'
import makeStoreUrl from 'utils/makeStoreUrl'
import { useHistory } from 'react-router'
import backImg from '../../images/icons/back.svg'
import reducer from './reducer'
import { initialize, startSetImageLink } from './actions'
import { makeSelectBrandingData, makeSelectGlobalStore } from './selectors'

const business_cards = [template_1, template_2, template_3]
const qr_codes = [qrImage]

const Branding = ({ store, brandingData, initializeBrandingData, uploadImgToS3 }) => {
  useInjectReducer({ key: 'brandingReducer', reducer })

  const history = useHistory()

  const [currentState, setcurrentState] = useState('Branding')
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareData, setShareData] = useState(null)
  const [downloadData, setDownloadData] = useState(null)
  const [cardShareUrl, setCardShareUrl] = useState(null)
  let storeURL = makeStoreUrl(store.store_name, store.store_id)

  useEffect(() => {
    if (store) {
      storeURL = makeStoreUrl(store.store_name, store.store_id)
      setShareData(null)
      setShowShareModal(false)
      initializeBrandingData(business_cards.length, qr_codes.length)
    }
  }, [store])

  useEffect(() => {
    if (shareData) {
      const { idx, kind, img, b64 } = shareData
      if (kind === 'branding') {
        if (brandingData.businessCards[idx]) {
          setCardShareUrl(brandingData.businessCards[idx])
          if (window.isWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'shareUrlImage', url: b64 }))
          } else setShowShareModal(true)
        } else {
          uploadImgToS3(img, idx, kind, store.store_id)
        }
      } else if (brandingData.qrCards[idx]) {
        setCardShareUrl(brandingData.qrCards[idx])
        if (window.isWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'shareUrlImage', url: b64 }))
        } else setShowShareModal(true)
      } else {
        uploadImgToS3(img, idx, kind, store.store_id)
      }
    }
  }, [brandingData, shareData])

  useEffect(() => {
    if (downloadData) {
      const { idx, kind, img } = downloadData
      if (kind === 'branding') {
        if (brandingData.businessCards[idx]) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'downloadUrlImage', url: brandingData.businessCards[idx] }),
          )
        } else {
          uploadImgToS3(img, idx, kind, store.store_id)
        }
      } else if (kind === 'qrCode') {
        if (brandingData.qrCards[idx]) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: 'downloadUrlImage', url: brandingData.qrCards[idx] }),
          )
        } else {
          uploadImgToS3(img, idx, kind, store.store_id)
        }
      }
    }
  }, [brandingData, downloadData])

  return (
    <div className="h-screen">
      <Helmet>
        <title>{currentState}</title>
        <meta name="description" content={`${currentState}`} />
      </Helmet>
      {/* Share Modal */}
      {showShareModal && (
        <ShareModal
          heading="Share the digital card with your customers!"
          close={e => {
            e.preventDefault()
            setShareData(null)
            setCardShareUrl(null)
            setShowShareModal(false)
          }}
          itemLink={cardShareUrl}
        />
      )}
      <div className="sticky bg-white">
        <div className="flex justify-between px-4 pt-4 border-b">
          <p className="flex text-xl font-semibold text-muted-med">
            {currentState !== 'Branding' ? (
              <img
                src={backImg}
                style={{ height: '24px', width: '24px', cursor: 'pointer' }}
                className="ml-2 mr-4 my-1"
                onClick={e => {
                  e.preventDefault()
                  setcurrentState('Branding')
                }}
              />
            ) : (
              <img
                src={backImg}
                style={{ height: '24px', width: '24px', cursor: 'pointer' }}
                className="ml-2 mr-4 my-1"
                onClick={e => {
                  e.preventDefault()
                  history.goBack()
                }}
              />
            )}
            {currentState}
          </p>
          <TopNav />
        </div>
      </div>
      <div className="branding__main__container">
        <QRCode value={storeURL} size={250} style={{ display: 'none' }} id="qr_code" />
        {currentState !== 'QR Code Posters' && (
          <>
            {/* Business Cards */}
            <span className="branding__heading">Business Cards</span>
            <div className="branding__card">
              {currentState !== 'Business Cards' ? (
                <>
                  <div className="branding__card__main">
                    <BusinessCards
                      numberOfElements={business_cards.length}
                      store={store}
                      business_cards={business_cards}
                      setShareData={setShareData}
                      downloadUrlFromApp={setDownloadData}
                    />
                  </div>
                  <span
                    onClick={e => {
                      e.preventDefault()
                      setcurrentState('Business Cards')
                    }}
                  >
                    See all designs <IoIosArrowForward className="ml-2 my-auto self-center text-secondary" size={16} />
                  </span>
                </>
              ) : (
                <div className="branding__card__main__all">
                  <BusinessCards
                    numberOfElements={business_cards.length}
                    store={store}
                    business_cards={business_cards}
                    setShareData={setShareData}
                    downloadUrlFromApp={setDownloadData}
                  />
                </div>
              )}
              <div className="branding__card__sub">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light flex-none" size={18} />
                <span>Create custom business card to promote your business.</span>
              </div>
            </div>
          </>
        )}

        {currentState !== 'Business Cards' && (
          <>
            {/* QR Code Posters */}
            <span className="branding__heading">QR Code Posters</span>
            <div className="branding__card">
              {currentState !== 'QR Code Posters' ? (
                <>
                  <div className="branding__card__main">
                    <QRCodePosters
                      numberOfElements={qr_codes.length}
                      store={store}
                      qr_codes={qr_codes}
                      setShareData={setShareData}
                      downloadUrlFromApp={setDownloadData}
                    />
                  </div>
                  <span
                    onClick={e => {
                      e.preventDefault()
                      setcurrentState('QR Code Posters')
                    }}
                  >
                    See all designs <IoIosArrowForward className="ml-2 my-auto self-center text-secondary" size={16} />
                  </span>
                </>
              ) : (
                <div className="branding__card__main__all">
                  <QRCodePosters
                    numberOfElements={qr_codes.length}
                    store={store}
                    qr_codes={qr_codes}
                    setShareData={setShareData}
                    downloadUrlFromApp={setDownloadData}
                  />
                </div>
              )}
              <div className="branding__card__sub">
                <AiOutlineInfoCircle className="ml-4 mr-2 text-muted-light flex-none" size={18} />
                Create custom QR Posters to promote your business.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectGlobalStore(),
  brandingData: makeSelectBrandingData(),
})

const mapDispatchToProps = dispatch => ({
  initializeBrandingData: (businessCards, qrCards) => dispatch(initialize(businessCards, qrCards)),
  uploadImgToS3: (imgFile, idx, kind, storeId) => dispatch(startSetImageLink(imgFile, idx, kind, storeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Branding)
