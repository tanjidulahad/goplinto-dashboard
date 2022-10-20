import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import BestSeller from '../../images/best-seller-big.svg'
import Modal from 'components/ReportsModal'
import AddonListItem from 'components/AddonListItem'
import { Menu, Dropdown } from 'antd'
import { Avatar } from 'antd'
import { FaPlus, FaEllipsisV } from 'react-icons/fa'
import makeStoreUrl from 'utils/makeStoreUrl'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import {
  makeSelectStore,
  makeSelectStoreId,
  makeSelectMerchantId,
  makeSelectBestSellerItems,
  makeSelectProducts,
  makeSelectStatusBS,
} from './selector'
import {
  getAllItems,
  deleteItem,
  resetAllItems,
  getPaginationProduct,
  addItemsToBestSeller,
  getWidgetStatusForBS,
} from './action'
import { setWidgetStatus } from '../AddOns/actions'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import reducer from './reducer'
import saga from './saga'
import AddOnsReducer from '../AddOns/reducers'
import AddOnsSaga from '../AddOns/sagas'
import ShareModal from '../../components/ShareModal'
import ErrorLine from 'components/ErrorLine'
import "assets/BestSeller.css"
import NoAddOnContainer from 'components/NoAddOnConatiner'

const IMG_PLACEHOLDER = 'https://dsa0i94r8ef09.cloudfront.net/general/Img+Placeholder.png'
const BestSellers = ({
  store,
  storeId,
  status,
  merchantId,
  getBestSellerItems,
  getAllProducts,
  ItemsBestSeller,
  allProducts,
  insertItemsToBestSeller,
  deleteCurrentItem,
  setWidget,
  getWidgetStatusForBS
}) => {
  useInjectReducer({ key: 'bestSellerReducer', reducer })
  useInjectReducer({ key: 'addOnsReducer', reducer: AddOnsReducer })
  useInjectSaga({ key: 'bestSellerSaga', saga })
  useInjectSaga({ key: 'addOnsSaga', saga: AddOnsSaga })
  const widgetId = 1
  const [id, setId] = useState(null)
  const [showModalProductList, setShowModalProductList] = useState(false)
  const [products, setAllProducts] = useState([])
  const [displayBestSellerProducts, setDisplayBestSellerProducts] = useState()
  var selectedProducts = []
  const [ShowSelectedErr, setShowSelectedErr] = useState("")
  useEffect(() => {
    getWidgetStatusForBS(storeId)
  }, [])
  
  useEffect(() => {
    if (status) {
      setDisplayBestSellerProducts(true)
      getBestSellerItems(storeId)
      getAllProducts(storeId)
    } else {
      setDisplayBestSellerProducts(false)
    }
  }, [status])

  useEffect(() => {
    if (showModalProductList) {
      setAllProducts(allProducts)
    }
  }, [showModalProductList])

  const isTablet = useMediaQuery({ minWidth: 992 })
  const Desktop = ({ children }) => {
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const onSubmitProduct = () => {
     if(selectedProducts&&selectedProducts.length<1)
    {
      setShowSelectedErr("No products are selected.");
      return;
    }else{
      insertItemsToBestSeller(storeId, selectedProducts)
      clearCheckedProducts()
      setDisplayBestSellerProducts(true)
      setShowModalProductList(false)
      setTimeout(() => {      
        window.location.reload()
      }, 500);
    }
  }

  const handleCheckedProducts = _item_id => {
    if(selectedProducts.includes(_item_id)){
      selectedProducts = selectedProducts.filter(elem=>elem!==_item_id)
    } else {
      selectedProducts.push(_item_id)
    }
  }

  const clearCheckedProducts = ()=>{
     while (selectedProducts.length > 0) {
    selectedProducts.pop();
    }
  }

  const renderProductList = (item) => {
    const { primary_img, item_name, item_id } = item
    const isChecked = () => {
      return ItemsBestSeller.some(_item => _item.item_id === item_id)
    }
    if(isChecked())return
    return (
      <div className="flex flex-row mb-4 justify-start items-center">
        <input
          type="checkbox"
          defaultChecked={isChecked()}
          className="form-checkbox text-red-600 hover:border-none h-6 w-6 mr-4"
          onChange={() => handleCheckedProducts(item_id)}
        />
        <Avatar size={64} shape="square" src={(primary_img && primary_img) || IMG_PLACEHOLDER} />
        <h4 className="text-xs md:text-sm font-medium md:font-medium ml-4">{item_name}</h4>
      </div>
    )
  }

  const MenuItem = _item_id => (
    <Menu>
      <Menu.Item key={_item_id}>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            deleteCurrentItem(_item_id, storeId)
          }}
        >
          Remove
        </div>
      </Menu.Item>
    </Menu>
  )

  const menuAddon = () => (
    <Menu>
      <Menu.Item>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            setWidget(storeId, widgetId, 'INACTIVE', merchantId)
            setDisplayBestSellerProducts(false)
          }}
        >
          Remove Add-On
        </div>
      </Menu.Item>
    </Menu>
  )

const MenuAddonDropDown=()=>{
  return(
    <div className='DropDownDiv'>
    <Dropdown overlay={menuAddon()} trigger={['click']}>
      <button className="focus:outline-none text-md gap-2">
        <FaEllipsisV className='dropDownDots' />
      </button>
    </Dropdown>
    </div>
  )
}
const TopContainerOnClick=(e)=>{
  e.preventDefault();
  if(displayBestSellerProducts == true){
    setWidget(storeId, widgetId, 'INACTIVE', merchantId)
    setDisplayBestSellerProducts(false)
  }
  else
  {
    setWidget(storeId, widgetId, 'ACTIVE', merchantId); 
    setDisplayBestSellerProducts(true)
  }
}
  return (
    <>
      {/* feature widget */}
      <NoAddOnContainer title={"Best Sellers"} onClick={(e) => { TopContainerOnClick(e) }} added={displayBestSellerProducts == true} ImgSrc={BestSeller} desc={"Create a list of best selling items from your inventory to promote."} />
      {/* Control Button */}
      {displayBestSellerProducts && ItemsBestSeller.length>0? <div className='flex flex-row items-center justify-between p-4' >
        <div className={isTablet&&'flex'}>
          <h1 className='mx-1'><strong>Products</strong></h1>
          <p className='text-sm text-gray-700'>
            {ItemsBestSeller.length} item(s) added
          </p>
        </div>
        <div>
          <button
            onClick={e => {
              e.preventDefault()
              setShowModalProductList(true)
            }}
            className="text-sm cta-btn bestSeller_addProduct"
          >
            <FaPlus className='plusSymbol'/>{`Add Products`}</button>
        </div>
      </div>:
      <div>
          <Desktop>
        <div className="py-8 pb-4 flex items-center pl-10">
          <h1 className="font-sans text-xl font-bold text-black-700  break-normal lg:mt-0 ">Products</h1>
            <p className='itemsAddedNo'>{ItemsBestSeller.length} of 20 item(s) added</p>
        </div>
        <div className='noItems'>
          <p>You haven't added any item yet. Go ahead add items to your best sellers list.!</p>
        </div>
        <div style={{ paddingLeft: '500px' }}>
          <button
            onClick={e => {
              e.preventDefault()
              setShowModalProductList(true)
            }}
                className="text-sm cta-btn add_BTNS"
            >
            {`Add Products`}
          </button>
        </div>

</Desktop>
          <Mobile>
            <div>
              <div className='flex flex-row pt-5 pl-5'>
                <div className='text-xl font-bold pr-10'>Products</div>
                <p className='itemsAddedNo'>
                    {ItemsBestSeller.length} of 20 item(s) added
                  </p>
                
              </div>
            </div>
            <div className='noItems'>
              <p>You haven't added any item yet. Go ahead add items to your best sellers list.!</p>
            </div>
            <div className='flex justify-center pb-10'>
              <button
                onClick={e => {
                  e.preventDefault()
                  setShowModalProductList(true)
                }}
                className="text-sm cta-btn add_BTNS"
              >
                {`Add Products`}
              </button>
            </div>
          </Mobile>
          </div>
  }
      {/* item list */}
      {displayBestSellerProducts && 
        <div className='md:flex flex-row flex-wrap mb-5 pb-10'>
          {ItemsBestSeller.length >0
            && ItemsBestSeller.map(item => (
              <div className='pl-5' style={{ flex: '0 0 33.3333%' }} key={item.item_id}>
                <AddonListItem item={item} setId={setId} Menu={MenuItem} />               
              </div>
            ))}
        </div>}

      {/* add products */}
      {showModalProductList && (
        <Modal
          closeModal={() => {
            setShowModalProductList(false)
            clearCheckedProducts()
          }}
          title="Add Products"
          onCreateAttribute={() => {
            setShowModalProductList(false)
          }}
          onCancel={() => {
            setShowModalProductList(false)
            clearCheckedProducts()
          }}
          page="product"
          proceedTitle="Done"
          submit={onSubmitProduct}
        >
          <div className="">
            <div className="">
              <div
                className="overflow-y-scroll overflow-x-auto"
                style={{
                  position: 'relative',
                  height: '40vh',
                }}
              >
                {products && products.map((item, index) => <div key={index}>{renderProductList(item)}</div>)}
              </div>
              <ErrorLine type={ShowSelectedErr} value={ShowSelectedErr} />
            </div>
          </div>
        </Modal>
      )}
      {/* share products */}
      {id && (
        <ShareModal
          close={e => {
            e.preventDefault()
            setId(null)
          }}
          heading="Share the Product with your customers!"
          itemLink={`${makeStoreUrl(store.store_name, storeId)}/item/${id}`}
        />
      )}

    </>
  )
}
const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  status: makeSelectStatusBS(),
  ItemsBestSeller: makeSelectBestSellerItems(),
  allProducts: makeSelectProducts(),
})

const mapDispatchToProps = dispatch => ({
  getBestSellerItems: storeId => dispatch(getAllItems(storeId)),
  deleteCurrentItem: (itemId, storeId) => dispatch(deleteItem(itemId, storeId)),
  getAllProducts: storeId => dispatch(getPaginationProduct(storeId)),
  insertItemsToBestSeller: (storeId, items) => dispatch(addItemsToBestSeller(storeId, items)),
  resetItems: () => dispatch(resetAllItems()),
  getWidgetStatusForBS: (storeId) => dispatch(getWidgetStatusForBS(storeId)),
  setWidget: (storeId, widgetId, widgetStatus, merchantId) =>
    dispatch(setWidgetStatus(storeId, widgetId, widgetStatus, merchantId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BestSellers)
