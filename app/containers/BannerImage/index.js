import ImageUpload from 'components/ImageUpload'
import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import checkoutSaga from '../CheckoutPage/saga'
import checkoutReducer from '../CheckoutPage/reducer'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import globalEnums from 'utils/globalEnums'
import { deleteBanner, getAllBanners, uploadBanner } from './actions'
import { getStoreModules } from 'containers/CheckoutPage/actions'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
const BannerImage = ({ displaySettings, storeModules, getStoreModules, storeId, roleId, deleteBannerImage, getBanners, uploadBannerImage,merchantId}) => {

    useInjectReducer({ key: "BannerImg", reducer })
    useInjectSaga({ key: "BannerImg", saga })
    useInjectSaga({ key: 'checkoutKey', saga: checkoutSaga })    
    useInjectReducer({ key: 'checkoutKey', reducer: checkoutReducer })    
   
    const history=useHistory()
    const [renderableBanners, setRendarableBanners] = useState([])
    const [loadingBanner, setloadingBanner] = useState([])
    const [maxBannerImageCount, setMaxBannerImageCount] = useState("");

    useEffect(() => {
        getStoreModules(storeId,roleId)
        getBanners(storeId)
    }, [])
    useEffect(() => {
        setloadingBanner(displaySettings && displaySettings.loadingBanner)    
    }, [displaySettings])

    var num = 0;
    useEffect(() => {
        num = storeModules && Object.keys(storeModules).length;
        setMaxBannerImageCount(num > 0 && storeModules && storeModules[globalEnums.BANNERS].plan_rules && storeModules[globalEnums.BANNERS].plan_rules.max_count)
    }, [storeModules]);

    useEffect(() => {
        for (let i = 0; i < 4; i++) {
            if (displaySettings && displaySettings.banners && displaySettings.banners[i] && !displaySettings.banners[i].imgUrl) {
                return setRendarableBanners(displaySettings &&displaySettings.banners && displaySettings.banners.slice(0, i + 1))
            }
        }
        setRendarableBanners(displaySettings &&displaySettings.banners)
    }, [displaySettings&&displaySettings.banners])

  return (
    <>
          <ExtendedNavBar text={"Banner Images"} onBack={()=>history.goBack()}/>

            <div className='p-10'>
                <h1 className='text-lg font-bold '>Banner Image</h1>
                <p className='item-label'>Add banner image in your website and make it more appealing.</p>
              <div className="w-full pt-2 bg-white tbl-rounded shadow-lg lg:mt-0 mb-4">
                  <div className="px-4 md:px-8 mb-2 mt-2">
                      <div className="md:flex">
                          <label id="section1" htmlFor="store" className="flex gap-2 mb-2 item-label text-base">
                              Upload Images
                              <small className="text-xs mt-1 text-muted-light">
                                  ( Upto {maxBannerImageCount} )
                              </small>
                          </label>
                          <small className="text-xs mt-1 mb-4 text-muted-light">
                              ( You can upload jpg, png format of size 1MB or less with a minimum resolution of 1600x400 )
                          </small>
                      </div>
                      <MediaQuery minDeviceWidth={1100}>
                          <div className="mt-2 w-full flex flex-wrap gap-4">
                              {renderableBanners&&renderableBanners.slice(0, maxBannerImageCount).map((banner, i) => (
                                  <div className="my-4" key={banner.id}>
                                      {loadingBanner && loadingBanner[i] ? (
                                          <div className="h-10 w-10 mx-4 my-6">
                                              <RingLoader color="#f64b5d" />
                                          </div>
                                      ) : (
                                          <ImageUpload
                                              bannerImage
                                              picture={banner.imgUrl}
                                              setPicture={(e, bannerLink) => {
                                                  uploadBannerImage(e, storeId, merchantId, i, bannerLink)
                                              }}
                                              remove={() => deleteBannerImage(i, storeId, banner.id)}
                                              storeId={storeId}
                                              banner
                                              bannerIdx={i}
                                          />
                                      )}
                                  </div>
                              ))}
                          </div>
                      </MediaQuery>
                      <MediaQuery maxDeviceWidth={1100}>
                          <div className="w-full md:w-1/2 mt-2">
                              {renderableBanners&&renderableBanners.map((banner, i) => (
                                  <div className="my-4  md:w-1/2" key={banner.id}>
                                      {loadingBanner && loadingBanner[i] ? (
                                          <div className="h-10 w-10 mx-4 my-6">
                                              <RingLoader color="#f64b5d" />
                                          </div>
                                      ) : (
                                          <ImageUpload
                                              bannerImage
                                              picture={banner.imgUrl}
                                              setPicture={(e, bannerLink) => {
                                                  uploadBannerImage(e, storeId, merchantId, i, bannerLink)
                                              }}
                                              remove={() => deleteBannerImage(i, storeId, banner.id)}
                                              storeId={storeId}
                                              banner
                                              bannerIdx={i}
                                          />
                                      )}
                                  </div>
                              ))}
                          </div>
                      </MediaQuery>
                  </div>
                  <br />
                  <hr />
                  <div className="flex flex-row bg-white justify-start align-center  px-2 py-4 tbl-rounded-bottom">
                      <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                      <span className="text-xs font-semibold text-muted-med">
                          Use this place for Advertisement of products or any notice about upcoming or on going sales and discounts.
                      </span>                  
                    </div>
              </div>
                        <div  onClick={() => history.push("/app/general/add-ons")} className="flex justify-end mb-4">
                            <button type="submit" className="px-4 py-2 text-white rounded-sm bg-secondary cta-btn">
                                Save Changes
                            </button>
                        </div>
          
               
            </div>
    </>
  )
}

const mapStateToProps = state => ({
    displaySettings: state.get('BannerImg'),
    storeModules: state.get('checkoutKey') && state.get('checkoutKey').storeModules.subscribed_modules,
    storeId: state.get('global').store.store_id,
    roleId: state.get('global').user.role_id,
    merchantId: state.get('global').user.merchantId,
})
const mapDispatchToProps = dispatch => ({
    getBanners: storeId => dispatch(getAllBanners(storeId)),
    uploadBannerImage: (imgFile, storeId, merchantId, bannerIdx, bannerLink) =>
        dispatch(uploadBanner(imgFile, storeId, merchantId, bannerIdx, bannerLink)),
    deleteBannerImage: (bannerIdx, storeId, bannerId) => dispatch(deleteBanner(bannerIdx, storeId, bannerId)),
    getStoreModules: (storeId,roleId) => dispatch(getStoreModules({ storeId,roleId })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BannerImage)