import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink, useHistory } from 'react-router-dom'
import InventoryListItem from 'components/InventoryListItem'

import capitalize from 'utils/capitalize'

import { connect } from 'react-redux'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'

import TopNav from 'components/TopNav'
import EditCategoryModal from 'components/EditCategoryModal'
import { FaPlus } from 'react-icons/fa'
import backImg from '../../images/icons/back.svg'
import {
  getCategories,
  getItems,
  getItemsByCategory,
  getItemsBySubCategory,
  submitItemStatus,
  getSubCategories,
  toggleItem,
  submitNewSubCategory,
  submitNewCategory,
  deleteCategory,
  editCategory,
  deleteSubCategory,
  editSubCategory,
  changeNewCategoryName,
  uploadCategoryImage,
  uploadEditCategoryImage,
  getPageCount,
  getPaginatedItems,
  setItems,
  getCurrentItemsCount,
  getInventoryStatus,
  showUpgradePopUp,
  setSelectedCategoryId
} from './actions'

import { selectCategories } from './selectors'
import reducer from './reducers'
import saga from './sagas'
import MediaQuery from 'react-responsive'
import CategorySidebar from './CategorySidebar'
import useItemPagination from './useItemPagination'

import ShareModal from '../../components/ShareModal'

import NotSubscribedCard from 'components/NotSubscribedCard'
import globalEnums from 'utils/globalEnums'
import inventoryEnums from 'utils/inventorySubModuleEnums'
import makeStoreUrl from 'utils/makeStoreUrl'

import StoreInfoSaga from "../StoreInfoPage/saga"
import StoreInfoReducer from "../StoreInfoPage/reducer"
import StoreRegionReducer from "../RegionAndCurrencyInfo/reducer"
import StoreRegionSaga from "../RegionAndCurrencyInfo/saga"
import { notification } from 'antd'
import { getSubscribedModules } from 'containers/App/actions'
import { IoIosAdd } from 'react-icons/io'
import { RingLoader } from 'react-spinners'
import { getStoreRegionDetails } from 'containers/RegionAndCurrencyInfo/actions'
const getSelectedCategory = (categories, subcategories, selectedCategoryId, selectedSubCategoryId) => {
  if (selectedCategoryId === 0) {
    return {
      category_name: 'ALL PRODUCTS',
      category_id: 0,
      category_img_url: '',
      sub_category_id: 0,
      sub_category_name: '',
    }
  }
  let subcategory = {}
  const category = categories.filter(ele => ele.category_id === selectedCategoryId)[0]
  if (selectedSubCategoryId === 0) return { ...category, sub_category_id: 0, sub_category_name: '' }
  subcategory = subcategories.filter(subcategory => subcategory.sub_category_id === selectedSubCategoryId)[0]
  return { ...subcategory, ...category }
}

const key = 'inventory'
const InventoryPage = ({
  getPaginationPageCount,
  pageCount,
  setInventoryItems,
  getPaginatedItems,
  getCategoriesForStore,
  getSubCategoriesForStore,
  storeId,
  roleId,
  storeCurrency,
  storeName,
  items,
  toggleItemForStore,
  categories,
  subcategories,
  merchantId,
  setSubmissionStatus,
  deleteCategoryFromDb,
  editCategoryName,
  deleteSubCategoryFromDb,
  editSubCategoryName,
  uploadEditCategoryImage,
  editCategoryImageUrl,
  loading,
  getItemCount,
  itemCount,
  subscribedTo,
  checkInventoryStatus,
  upgradePopUpStatus,
  setUpgradePopUp,
  storeModules,
  getSubscribedModules,
  getStoreDetails,
  setSelectedCategoryId,
  selectedCategoryId,
}) => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  useInjectReducer({ key: 'storeInfo', reducer: StoreInfoReducer })
  useInjectSaga({ key: 'storeInfo', saga: StoreInfoSaga })
  useInjectReducer({ key: 'storeRegionInfo', reducer: StoreRegionReducer })
  useInjectSaga({ key: 'storeRegionInfo', saga: StoreRegionSaga })
  const history = useHistory()
  const [showBackDrop, setShowBackdrop] = useState(false)

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0)

  // For Edit Category Modal
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false)
  const [editableCategory, setEditableCategory] = useState({})

  const [availableItems, setAvailableItems] = useState([])
  const [outOfStockItems, setOutOfStockItems] = useState([])

  const [showAvailable, setShowAvailable] = useState(true)
  const [currentCategory, setCurrentCategory] = useState({})
  const [showPopUp, setShowPopUp] = useState(false)

  const handleCategoryTextChange = e => {
    const { value } = e.target
    return setEditableCategory({ ...editableCategory, [e.target.name]: value })
  }

  useEffect(() => {
    getPaginationPageCount(storeId)
    getCategoriesForStore(storeId)
    getSubCategoriesForStore(storeId)
    setSubmissionStatus(false)
    setUpgradePopUp(false)
    checkInventoryStatus(storeId)
    getSubscribedModules(storeId,roleId)
    getStoreDetails(storeId) 
  }, [])

  useEffect(() => {
    setCurrentCategory(getSelectedCategory(categories, subcategories, selectedCategoryId, selectedSubCategoryId))
    getItemCount(selectedCategoryId, selectedSubCategoryId, storeId)
  }, [selectedCategoryId, selectedSubCategoryId])

  useEffect(() => {
    if (storeId) {
      const availableItemList = items.filter(item => item.item_status === 'AVAILABLE')
      const unavailableItemList = items.filter(item => item.item_status !== 'AVAILABLE')
      setAvailableItems(availableItemList)
      setOutOfStockItems(unavailableItemList)
    }
  }, [items])
  const [showLoading, setshowLoading] = useState(true)

  // For Pagination
  const [pageNum, setPageNum] = useState(1)

  // Pagination using Interaction Observer
  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPageNum(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  })
  useItemPagination(
    pageNum,
    setPageNum,
    pageCount,
    selectedCategoryId,
    selectedSubCategoryId,
    storeId,
    getPaginatedItems,
    setInventoryItems,
  )

  const popupCloseHandler = () => setShowPopUp(false)
  const [id, setId] = useState(null)
  var num=0;
  const [maxProductCount, setMaxProductCount] = useState("");
  useEffect(() => {    
    num = storeModules && Object.keys(storeModules).length;
    setMaxProductCount(num > 0 && storeModules &&storeModules[globalEnums.INVENTORY].submodules[inventoryEnums.ITEMS].plan_rules.max_count)
  }, [storeModules]);

  const openNotification = placement => {
    notification.error({
      message: "Upgrade to add more products",
      placement,
    })  }
useEffect(() => {
  setTimeout(() => {
    setshowLoading(false)
  }, 1100);
}, [])

  return (
    <>
      {id && (
        <ShareModal
          close={e => {
            e.preventDefault()
            setId(null)
          }}
          heading="Share the Product with your customers!"
          itemLink={`${makeStoreUrl(storeName, storeId)}/item/${id}`}
        />
      )}
      <div className="h-screen">
        <Helmet>
          <title>Menu Details</title>
          <meta name="description" content="Menu Details" />
        </Helmet>
        {subscribedTo.modules[globalEnums.INVENTORY] ? (
          <>
            <div>
              <MediaQuery maxDeviceWidth={1100}>
                <div className="bottomSticky"
                  style={{ boxShadow: "0.5px 1.5px 6px 0.1px #f64b5d" }}

           onClick={() => setShowBackdrop(!showBackDrop)}
                >


                  <span className="block w-full h-full" >{showBackDrop ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>}</span>



                </div>
                {
                  showBackDrop && <div className="backdrop">
                    <div className="bottom_sticky_menu">
                    <NavLink
                      to={!upgradePopUpStatus ? {
                        pathname: '/app/manage-items/item',
                        state: { edit: false },
                      } : "#"}
                    >
                      <p className="font-semibold text-md border-b-2 pb-3 border-gray-300 flex"
                        style={{ color: "#F64B5D" }}
                        onClick={() => {
                          upgradePopUpStatus ? setShowPopUp(true) : setShowPopUp(false)
                          setSubmissionStatus(false)
                        }}
                      >
                        <IoIosAdd size={20} className="font-bold" />
                        Product
                      </p>
                    </NavLink>

                      <NavLink
                        to={!upgradePopUpStatus ? {
                          pathname: '/app/manage-items',
                          state: { edit: false },
                        } : "#"}

                      >
                        <p className="hover:text-secondary font-bold"
                          onClick={() => {
                            upgradePopUpStatus ? setShowPopUp(true) : setShowPopUp(false)
                            setSubmissionStatus(false)
                          }}
                        >All Products</p>
                      </NavLink>
                      <NavLink
                        to={{
                          pathname: '/app/manage-inventory-items',
                          state: { edit: false },
                        }}

                      >
                      <p className="hover:text-secondary font-medium">Manage Inventory</p>
                      </NavLink>


                    </div>
                  </div>
                }
              </MediaQuery>
              <div className="sticky bg-white mobile-topNav">
                <MediaQuery maxDeviceWidth={1100}>
                  {selectedCategoryId !== 0 ? (
                    <div className="flex justify-between w-full">
                      <div className="flex justify-start w-3/4">
                        <div
                          style={{ margin: 'auto 0 auto 10px', display: selectedCategoryId === 0 ? 'none' : '' }}
                          onClick={() => {
                            setSelectedCategoryId(0)
                            setSelectedSubCategoryId(0)
                          }}
                        >
                          <img src={backImg} style={{ height: '20px', width: '20px' }} alt="Go Back" />
                        </div>
                        <div className="inventoryPage-category-name flex">
                          <p className="text-base font-semibold text-heavy wrap-item">
                            {currentCategory && !currentCategory.sub_category_name
                              ? capitalize(currentCategory.category_name)
                              : capitalize(currentCategory.sub_category_name)}
                          </p>
                          <p style={{ whiteSpace: 'nowrap' }} className="font-light text-muted-med">
                            {itemCount} item(s)
                          </p>
                        </div>
                      </div>
                      {currentCategory.category_id === 0 ? null : (
                        <button
                          onClick={() => {
                            setSelectedCategoryId(currentCategory.category_id)
                            setSelectedSubCategoryId(currentCategory.sub_category_id)
                            setEditableCategory({
                              name: currentCategory.category_name,
                              id: currentCategory.category_id,
                              imgUrl: currentCategory.img_url === 'null' ? '' : currentCategory.img_url,
                              subcategoryName: currentCategory.sub_category_name,
                              subcategoryId: currentCategory.sub_category_id,
                            })
                            setShowEditCategoryModal(true)
                          }}
                          className="mx-2 text-xs justify-end font-semibold focus:outline-none text-secondary"
                        >
                          EDIT
                        </button>
                      )}
                    </div>
                  ) : null}
                </MediaQuery>

                <div
                  style={{ display: selectedCategoryId !== 0 && window.screen.width < 1280 ? 'none' : '' }}
                  className="flex justify-between px-4 pt-4 text-xl font-semibold"
                >
                  <MediaQuery minDeviceWidth={1101}>
                    <p className="text-heavy flex items-center justify-center"><span>Products</span>
                      <NavLink to="/helpcenter/products" className="ml-2" >
                        <span className="flex items-center ml-4 font-normal " style={{ fontSize: "14px", color: "#2424247F" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg> Learn how to  Use</span></NavLink>
                    </p>
                    <TopNav />
                  </MediaQuery>
                  <MediaQuery maxDeviceWidth={1100}>
                    <p className="text-heavy flex items-center justify-center"><span>Products</span>
                    </p>
                    <NavLink to="/helpcenter/products" className="ml-2" style={{ lineHeight: "31px" }}>
                      <span className="flex items-center ml-4 font-normal " style={{ fontSize: "10px", color: "#2424247F" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg> Learn how to  Use</span></NavLink>
                    {/* <TopNav /> */}
                  </MediaQuery>
                </div>
              </div>
            </div>
            <MediaQuery maxDeviceWidth={1100}>
              {selectedCategoryId !== 0 ? (
                <div className="inventoryPage-subcategory-list">
                  {subcategories.map(subcategory =>
                    subcategory.category_id === selectedCategoryId ? (
                      <div
                        key={subcategory.sub_category_id}
                        onClick={() => {
                          setSelectedCategoryId(subcategory.category_id)
                          setSelectedSubCategoryId(subcategory.sub_category_id)
                        }}
                        className="leading-normal border-secondary "
                      >
                        <button
                          style={{ fontSize: '0.8125rem', marginTop: '5px' }}
                          className={`inventoryPage-subcategory px-5 tracking-wider wrap-item outline-none focus:outline-none ${subcategory.sub_category_id === selectedSubCategoryId
                            ? 'border-b-4 font-semibold text-muted-heavy'
                            : null
                            }`}
                        >
                          {subcategory.sub_category_name}
                        </button>
                      </div>
                    ) : null,
                  )}
                </div>
              ) : null}
            </MediaQuery>
            <div className="flex">
              {storeId && (
                <CategorySidebar
                  categories={categories}
                  subcategories={subcategories}
                  setSelectedCategoryId={setSelectedCategoryId}
                  setSelectedSubCategoryId={setSelectedSubCategoryId}
                  selectedSubCategoryId={selectedSubCategoryId}
                  selectedCategoryId={selectedCategoryId}
                />
              )}
              <div
                style={{ display: selectedCategoryId === 0 && window.screen.width < 1280 ? 'none' : '' }}
                className="inventoryPage-itemCategories w-full p-6"
              >
                <div className="px-2 flex justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowAvailable(true)}
                      className={`inventoryPage-itemCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${showAvailable ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                        }`}
                    >
                      Available
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAvailable(false)}
                      className={`inventoryPage-itemCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${!showAvailable ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                        }`}
                    >
                      Out of Stock
                    </button>
                  </div>
                  <MediaQuery minDeviceWidth={1100}>

                    <div className="flex justify-center items-center">
                      <NavLink
                        to={!upgradePopUpStatus && ((availableItems.length + outOfStockItems.length) < maxProductCount) ? {
                          pathname: '/app/manage-items/item',
                          state: { edit: false },
                        } : "#"}
                      >
                        <button
                          type="button"
                          className="cta-btn my-2 flex text-sm justify-evenly"
                          onClick={() => {
                          if ((availableItems.length + outOfStockItems.length) >= maxProductCount)
                          {
                              openNotification('topRight')
                          }
                          else
                          {
                            upgradePopUpStatus ? setShowPopUp(true) : setShowPopUp(false)
                            setSubmissionStatus(false)
                          }
                          }}
                          style={{ padding: '10px 15px' }}
                        >
                          <FaPlus style={{ alignItems: 'center', marginTop: '3px', marginRight: '3px' }} /> Product
                        </button>
                      </NavLink>
                    </div>
                  </MediaQuery>
                </div>
                <MediaQuery minDeviceWidth={1100}>
                  <div className="flex justify-between w-full">
                    <div className="flex mt-3">
                      <p className="mb-4 ml-3 mr-5 text-xl font-medium tracking-wide item-label-title whitespace-nowrap">
                        {currentCategory && !currentCategory.sub_category_name
                          ? capitalize(currentCategory.category_name)
                          : capitalize(currentCategory.sub_category_name)}
                      </p>
                      <p className="mt-1 font-medium text-gray-600 whitespace-nowrap">{itemCount} item(s)</p>
                    </div>
                    {currentCategory.category_id === 0 ? null : (
                      <button
                        onClick={() => {
                          setSelectedCategoryId(currentCategory.category_id)
                          setSelectedSubCategoryId(currentCategory.sub_category_id)
                          setEditableCategory({
                            name: currentCategory.category_name,
                            id: currentCategory.category_id,
                            imgUrl: currentCategory.img_url === 'null' ? '' : currentCategory.img_url,
                            subcategoryName: currentCategory.sub_category_name,
                            subcategoryId: currentCategory.sub_category_id,
                          })
                          setShowEditCategoryModal(true)
                        }}
                        className="mx-6 text-base focus:outline-none text-secondary font-semibold capitalize edit-btn"
                      >
                        EDIT
                      </button>
                    )}
                  </div>
                </MediaQuery>
                {storeId ? (
                  items.length ? (
                    <div className="w-full">
                      <div>
                        {showAvailable ? (
                          <div
                            className="inv-grid p-1 invisible-scrollbar"
                            style={{ position: 'relative', height: '70vh', overflow: 'scroll' }}
                          >
                            {availableItems.length ? (
                              availableItems.map((ele, idx) => {
                                if (availableItems.length === idx + 1)
                                  return (
                                    <div key={ele.item_id} ref={lastElementRef}>
                                      <InventoryListItem
                                        currency_symbol={storeCurrency}
                                        isAvailable
                                        item={ele}
                                        onToggle={toggleItemForStore}
                                        setId={setId}
                                      />
                                    </div>
                                  )
                                return (
                                  <div className="px-2" key={ele.item_id}>
                                    <InventoryListItem
                                      currency_symbol={storeCurrency}
                                      isAvailable
                                      item={ele}
                                      onToggle={toggleItemForStore}
                                      setId={setId}
                                    />
                                  </div>
                                )
                              })
                            ) : (
                              <div className="w-full" style={{ position: 'absolute', top: '0', left: '0' }}>
                                <p className="text-xl font-semibold tracking-wide text-center">
                                  No items are in stock at the moment!
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="inv-grid p-2" style={{ position: 'relative' }}>
                            {outOfStockItems.length ? (
                              outOfStockItems.map(ele => (
                                <div key={ele.item_id}>
                                  <InventoryListItem
                                    currency_symbol={storeCurrency}
                                    isAvailable={false}
                                    item={ele}
                                    onToggle={toggleItemForStore}
                                    setId={setId}
                                  />
                                </div>
                              ))
                            ) : (
                              <div className="w-full" style={{ position: 'absolute', top: '0', left: '0' }}>
                                <p className="text-xl font-semibold tracking-wide text-center ">
                                  All Items are available!
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                    {!showLoading?
                    <div className="inventoryPage-noItems flex content-center justify-center mx-auto md:my-10 text-xl font-bold text-center text-gray-800 capitalize">
                      <div>Looks like you don't have any items for this selection ...</div>
                    </div>
                      :
                      <div className="opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                        <RingLoader color="#F64C5D" size={150} />
                      </div>}                   
                    </>
                  )
                ) : (
                  <div className="inventoryPage-noItems flex content-center justify-center mx-auto my-64 text-2xl font-bold text-center text-gray-800 capitalize">
                    <div>Please create a new store before proceeding.</div>
                  </div>
                )}
              </div>
            </div>
            {showEditCategoryModal && (
              <EditCategoryModal
                deleteCategoryFromDb={deleteCategoryFromDb}
                editCategoryName={editCategoryName}
                setEditableCategory={setEditableCategory}
                setShowEditCategoryModal={setShowEditCategoryModal}
                editableCategory={editableCategory}
                handleCategoryTextChange={handleCategoryTextChange}
                items={items}
                storeId={storeId}
                merchantId={merchantId}
                uploadEditCategoryImage={uploadEditCategoryImage}
                editCategoryImageUrl={editCategoryImageUrl}
                editSubCategoryName={editSubCategoryName}
                deleteSubCategoryFromDb={deleteSubCategoryFromDb}
                refreshCategoryList={(newCategoryName, newSubCategoryName) => {
                  if (!newCategoryName && !newSubCategoryName) {
                    setSelectedCategoryId(0)
                    setSelectedSubCategoryId(0)
                    setCurrentCategory(getSelectedCategory(categories, subcategories, 0, 0))
                  } else {
                    const t = currentCategory
                    if (newCategoryName) t.category_name = newCategoryName
                    if (newSubCategoryName) t.sub_category_name = newSubCategoryName
                    setCurrentCategory(t)
                  }
                }}
              />
            )}
          </>
        ) : (
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            <div className="sticky bg-white mobile-topNav">
              <div
                style={{ display: selectedCategoryId !== 0 && window.screen.width < 1280 ? 'none' : '' }}
                className="flex justify-between px-4 pt-4 text-xl font-semibold"
              >
                <p className="text-heavy">Products</p>


                <TopNav />
              </div>
            </div>
            <NotSubscribedCard />
          </div>
        )}

      </div>
      {showPopUp &&
        <div className="backdrop" >
          <div className="main__outer__container " style={{ alignItems: "center", }}>

            <div className="card__main__container relative p-4" style={{ height: "40vh", width: "100%", maxWidth: "600px", }}>
              <div className="flex justify-center items-center mb-5">
                <p className="font-semibold	 text-xl	text-center">Upgrade your store plan to add more items</p>
                <span onClick={popupCloseHandler} className="cursor-pointer absolute" style={{ top: "20px", right: "20px" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg></span>
              </div>
              <button
                onClick={e => {
                  e.preventDefault()
                  history.push('/app/general/payment-plan')
                }}
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = state => ({
  roleId:state.get('global').user.role_id,
  storeId: state.get('global').store.store_id,
  storeCurrency: state.get("storeRegionInfo")&&state.get("storeRegionInfo").currency_symbol,
  storeName: state.get('global').store.store_name,
  merchantId: state.get('global').user.merchantId,
  subscribedTo: state.get('global').subscription_details,
  items: state.get('inventory').items,
  categories: state.get('inventory').categories,
  subcategories: state.get('inventory').subCategories,
  categoryOptions: selectCategories(state),
  newCategoryName: state.get('inventory').newCategory.newCategoryName,
  newCategoryImageUrl: state.get('inventory').newCategory.newCategoryImgUrl,
  editCategoryImageUrl: state.get('inventory').editCategoryImageUrl,
  pageCount: state.get('inventory').pageCount,
  loading: state.get('inventory').loadingItems,
  itemCount: state.get('inventory').currentItemCount,
  upgradePopUpStatus: state.get("inventory").showUpgradePopUp,
  storeModules: state.get("storeInfo") && state.get("storeInfo").storeModules,
  selectedCategoryId: state.get('inventory').selectedCategoryId,
})

const mapDispatchToProps = dispatch => ({
  getItemsForStore: storeId => dispatch(getItems(storeId)),
  getCategoriesForStore: storeId => dispatch(getCategories(storeId)),
  getItemsByCategoryForStore: (storeId, categoryId) => dispatch(getItemsByCategory(storeId, categoryId)),
  getItemsBySubCategoryForStore: (storeId, categoryId, subCategoryId) =>
    dispatch(getItemsBySubCategory(storeId, categoryId, subCategoryId)),
  getSubCategoriesForStore: storeId => dispatch(getSubCategories(storeId)),
  toggleItemForStore: (itemId, isAvailable) => dispatch(toggleItem(itemId, isAvailable)),
  submitCategory: (storeId, merchantId, categoryName, imgUrl) =>
    dispatch(submitNewCategory(storeId, merchantId, categoryName, imgUrl)),
  submitSubCategory: (storeId, merchantId, categoryId, subCategoryName) =>
    dispatch(submitNewSubCategory(storeId, merchantId, categoryId, subCategoryName)),
  setSubmissionStatus: status => dispatch(submitItemStatus(status)),
  deleteCategoryFromDb: (storeId, categoryId, merchantId) => dispatch(deleteCategory(storeId, categoryId, merchantId)),
  editCategoryName: (storeId, merchantId, categoryId, categoryName, imgUrl) =>
    dispatch(editCategory(storeId, merchantId, categoryId, categoryName, imgUrl)),
  deleteSubCategoryFromDb: (storeId, merchantId, subCategoryId) =>
    dispatch(deleteSubCategory(storeId, merchantId, subCategoryId)),
  editSubCategoryName: (storeId, merchantId, subCategoryId, subCategoryName) =>
    dispatch(editSubCategory(storeId, merchantId, subCategoryId, subCategoryName)),
  setNewCategoryName: text => dispatch(changeNewCategoryName(text)),
  uploadNewCategoryImage: (imgFile, storeId) => dispatch(uploadCategoryImage(imgFile, storeId)),
  uploadEditCategoryImage: (imgFile, storeId) => dispatch(uploadEditCategoryImage(imgFile, storeId)),
  getPaginationPageCount: storeId => dispatch(getPageCount(storeId)),
  getPaginatedItems: (storeId, categoryId, subCategoryId, pageNum) =>
    dispatch(getPaginatedItems(storeId, categoryId, subCategoryId, pageNum)),
  setInventoryItems: items => dispatch(setItems(items)),
  getItemCount: (category, subcategory, storeId) => dispatch(getCurrentItemsCount(category, subcategory, storeId)),
  checkInventoryStatus: storeId => dispatch(getInventoryStatus(storeId)),
  setUpgradePopUp: boolean => dispatch(showUpgradePopUp(boolean)),
  getSubscribedModules: (storeId, roleId) => dispatch(getSubscribedModules(storeId, roleId)),
  getStoreDetails: (storeId) => dispatch(getStoreRegionDetails({ storeId })),
  setSelectedCategoryId: (value) => dispatch(setSelectedCategoryId(value)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryPage)
