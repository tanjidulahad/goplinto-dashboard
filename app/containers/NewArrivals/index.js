import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router'
import NewArrival from '../../images/new-arrival-big.svg'
import Modal from 'components/ReportsModal'
import AddonListItem from 'components/AddonListItem'
import { Menu, Dropdown } from 'antd'
import { Avatar } from 'antd'
import { FaPlus, FaEllipsisV } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import makeStoreUrl from 'utils/makeStoreUrl'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import {
  makeSelectStore,
  makeSelectStoreId,
  makeSelectMerchantId,
  makeSelectNewArrivalItems,
  makeSelectProducts,
} from './selector'
import { makeSelectGetStatusNewArrival } from '../AddOns/selectors'
import { getAllItems, deleteItem, resetAllItems, getPaginationProduct, addItemsToNewArrivals, getNewArrivalStatus } from './action'
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
const NewArrivals = ({
  store,
  storeId,
  status,
  merchantId,
  getNewArrivalItems,
  getAllProducts,
  ItemsNewArrival,
  allProducts,
  insertItemsToNewArrivals,
  deleteCurrentItem,
  setWidget,
  getNewArrivalStatus
}) => {
  useInjectReducer({ key: 'newArrivalsReducer', reducer })
  useInjectSaga({ key: 'newArrivalsSaga', saga })
  useInjectReducer({ key: 'addOnsReducer', reducer: AddOnsReducer })
  useInjectSaga({ key: 'addOnsSaga', saga: AddOnsSaga })

  const widgetId = 2
  const [id, setId] = useState(null)
  const [showModalProductList, setShowModalProductList] = useState(false)
  const [products, setAllProducts] = useState([])
  const [displayNewArrivalProducts, setDisplayNewArrivalProducts] = useState()
  var selectedProducts = []
  const [ShowSelectedErr, setShowSelectedErr] = useState("")
  useEffect(() => {
    getNewArrivalStatus(storeId)
  }, [])
  useEffect(() => {
    if (status) {
      setDisplayNewArrivalProducts(true)
      getAllProducts(storeId)
    } else {
      setDisplayNewArrivalProducts(false)
    }
  }, [status])

  useEffect(() => {
    if (showModalProductList) {
      setAllProducts(allProducts)
    }
  }, [showModalProductList])

  useEffect(() => {
    if (status) getNewArrivalItems(storeId)
  }, [status])

  const isTablet = useMediaQuery({ minWidth: 992 })
  const Desktop = ({ children }) => {
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const onSubmitProduct = () => {
    if(selectedProducts&&selectedProducts.length<1){
      setShowSelectedErr("No products are selected.");
      return;
    }else {
      setDisplayNewArrivalProducts(false)
      insertItemsToNewArrivals(storeId, selectedProducts)
      setDisplayNewArrivalProducts(true)
      setShowModalProductList(false)
      clearCheckedProducts()
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

  const renderProductList = (_item) => {
    const { primary_img, item_name, item_id } = _item
    const isChecked = () => {
      return ItemsNewArrival.some(elem => elem.item_id === item_id)
    }
    if(isChecked())return
    return (
      <div className="flex flex-row mb-4 justify-start items-center">
        {' '}
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

  const MenuItem = item_id => (
    <Menu>
      <Menu.Item key={item_id}>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            deleteCurrentItem(item_id, storeId)
          }}
        >
          Remove
        </div>
      </Menu.Item>
    </Menu>
  )

  const TopContainerOnClick = (e) => {
    e.preventDefault();

    if (displayNewArrivalProducts===true) {
      setWidget(storeId, widgetId, 'INACTIVE', merchantId)
      setDisplayNewArrivalProducts(false)
    }
    else {
      setWidget(storeId, widgetId, 'ACTIVE', merchantId)
      setDisplayNewArrivalProducts(true)
    }
  }
  return (
    <>
      {/* feature widget */}
      <NoAddOnContainer title={"New Arrivals"} onClick={(e) =>TopContainerOnClick(e)} added={displayNewArrivalProducts===true} ImgSrc={NewArrival} desc={"Create a list of new arrival items from your inventory to promote."} />

      {/* Control Button */}
      {displayNewArrivalProducts && ItemsNewArrival.length > 0 ? <div className='flex flex-row items-center justify-between p-4'>
        <div className={isTablet&&'flex'}>
          <h1 className='mr-1'><strong>Products</strong></h1>
          <p className='text-sm text-gray-700'>
            {ItemsNewArrival.length} item(s) added
          </p>
        </div>
        <div>
          <button
            onClick={e => {
              e.preventDefault()
              setShowModalProductList(true)
            }}
            className="text-sm cta-btn bestSeller_addProduct">
            <FaPlus className='plusSymbol'/>{' '}
            {`Add Products`}
          </button>
        </div>
      </div>
      :
        <div>
      <hr />
      <Desktop>
        <div className="py-8 pb-4 flex items-center pl-10">
          <h1 className="font-sans text-xl font-bold text-black-700  break-normal lg:mt-0 ">Products</h1>
              <p className='itemsAddedNo'>{ItemsNewArrival.length} of 20 item(s) added</p>
        </div>
            <div className='noItems'>
          <p>You haven't added any item yet. Go ahead add items to your new arrivals list.!</p>
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
                <div>
                  <p className='itemsAddedNo'>{ItemsNewArrival.length} of 20 item(s) added</p>
                </div>
              </div>
            </div>
            <div className='noItems'>
                <p>You haven't added any item yet. Go ahead add items to your best sellers list.!</p>
              </div>
            <div className='flex justify-center pb-10'>
                <button
                  type="button"
                className="text-sm cta-btn add_BTNS"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowModalProductList(true)
                  }}>
                {`Add Products`}
                </button>
              </div>    
          </Mobile>
          </div>
          }
       {/* item list */}
      {displayNewArrivalProducts && 
        <div className='md:flex flex-row flex-wrap mb-5 pb-10' >
          {ItemsNewArrival.length > 0 && ItemsNewArrival.map(item => (
            <div className='pl-5' style={{ flex: '0 0 33.3333%' }} key={item.item_id}>
                <AddonListItem item={item} setId={setId} Menu={MenuItem} />
              </div>
            ))}
      </div>}
      {/* modals */}
      {showModalProductList && (
        <Modal
          closeModal={() => {
            setShowModalProductList(false)
          }}
          title="Add Products"
          onCreateAttribute={() => {
            setShowModalProductList(false)
          }}
          onCancel={() => {
            setShowModalProductList(false)
            setSelectedProducts([])
          }}
          page="product"
          proceedTitle="Done"
          submit={onSubmitProduct}
        >
          <div className="">
            <div className="">
              <div
                className="overflow-y-scroll overflow-x-auto "
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
  status: makeSelectGetStatusNewArrival(),
  ItemsNewArrival: makeSelectNewArrivalItems(),
  allProducts: makeSelectProducts(),
})

const mapDispatchToProps = dispatch => ({
  getNewArrivalItems: storeId => dispatch(getAllItems(storeId)),
  deleteCurrentItem: (itemId, storeId) => dispatch(deleteItem(itemId, storeId)),
  getAllProducts: storeId => dispatch(getPaginationProduct(storeId)),
  insertItemsToNewArrivals: (storeId, items) => dispatch(addItemsToNewArrivals(storeId, items)),
  resetItems: () => dispatch(resetAllItems()),
  getNewArrivalStatus: (storeId) => dispatch(getNewArrivalStatus(storeId)),
  setWidget: (storeId, widgetId, widgetStatus, merchantId) =>
    dispatch(setWidgetStatus(storeId, widgetId, widgetStatus, merchantId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewArrivals)