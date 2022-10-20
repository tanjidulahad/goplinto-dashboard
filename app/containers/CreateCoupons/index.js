import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router'
import { BiSearchAlt2, BiTrash } from 'react-icons/bi'
import { AiOutlinePercentage } from 'react-icons/ai'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import SelectNormal from 'react-select'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import TopNav from 'components/TopNav'
import { Form, Input, Radio, DatePicker, TimePicker, Select, Avatar } from 'antd'
import Modal from 'components/ReportsModal'
import { createCoupons, updateCoupons, getAllCouponTypes } from 'containers/Coupons/actions'
import { makeSelectCouponTypes } from 'containers/Coupons/selectors'
import moment from 'moment'
import { resetData, getCategories, getPaginationProduct, emptyProduct, getPaginationCount } from './actions'
import saga from './saga'
import reducer from './reducer'
import {
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectStore,
  makeSelectCategories,
  makeSelectProducts,
  makeSelectCount,
  makeSelectLoading,
} from './selectors'
import { findTypeName, findTypeId } from './findIdAndName'
import couponTypesName from './couponTypesName'
import appliesTo from './appliesToEnum'
import '../../assets/CouponPage.css'
import { customInputSelect, DropdownIndicator } from 'utils/dropdownConfig'
import backImg from '../../images/icons/back.svg'
import { GridResponsive } from '../../components/DynamicPreviewPage/styled'
import FreeDelivery from '../../images/delivery.svg'
import FixedRupee from '../../images/fixed.svg'
import Percentage from '../../images/discount.svg'
import BuyXGetY from '../../images/shopping.svg'
import { validateContainOnlyWhitespace } from 'utils/validation'

const IMG_PLACEHOLDER = 'https://dsa0i94r8ef09.cloudfront.net/general/Img+Placeholder.png'
const { Option } = Select
const options = [
  {
    value: appliesTo.ALL_PRODUCTS,
    label: <span className="item-label-dropdown">All Products</span>,
  },
  {
    value: appliesTo.SPECIFIC_CATEGORY,
    label: <span className="item-label-dropdown">Specific Category</span>,
  },
  {
    value: appliesTo.SPECIFIC_PRODUCT,
    label: <span className="item-label-dropdown">Specific Product</span>,
  },
]

const buygetoptions = [
  {
    value: appliesTo.SPECIFIC_CATEGORY,
    label: <span className="item-label-dropdown">Specific Category</span>,
  },
  {
    value: appliesTo.SPECIFIC_PRODUCT,
    label: <span className="item-label-dropdown">Specific Product</span>,
  },
]

const customSingleValue = ({ data }) => (
  <div className="input-select">
    <div className="input-select__single-value">
      <span>{data.label}</span>
    </div>
  </div>
)

const CreateCoupons = ({
  storeId,
  paginationCount,
  loading,
  emptyProduct,
  getPaginationProduct,
  products,
  postCoupon,
  count,
  updateCoupon,
  category,
  getCategories,
  getCouponTypes,
  couponTypesData,
  store,
}) => {
  useInjectReducer({ key: 'createCoupons', reducer })
  useInjectSaga({ key: 'createCoupons', saga })
  const isMobile = useMediaQuery({ maxWidth: 991 })

  const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format('DD MMM YYYY'))
  const [selectedStartTime, setSelectedStartTime] = useState('')
  const [selectedEndDate, setSelectedEndDate] = useState('')
  const [selectedEndTime, setSelectedEndTime] = useState('')
  const [showCategoryList, setCategoryList] = useState(false)
  const [showProductList, setProductList] = useState(false)
  const [couponType, setCouponType] = useState(couponTypesName.FIXED_AMOUNT)
  const [discountAmount, setDiscountAmount] = useState(null)
  const [usageLimitsToOne, setUsageLimitsToOne] = useState(false)
  const [usageLimitsToN, setUsageLimitsToN] = useState(false)
  const [NoTimes, setNoTimes] = useState('')
  const [AppliesTo, setAppliesTo] = useState(options[0])
  const [hasEndTime, setHasEndTime] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponName, setCouponName] = useState('')
  const [searchCategory, setSearchCategoryValue] = useState('')
  const [searchProduct, setSearchProductValue] = useState('')
  const [minimumRequirements, setMinimumRequirements] = useState(false)
  const [availableTypes, setAvailableTypes] = useState([])
  const [capValue, setCapValue] = useState(null)
  const [buyValue, setBuyValue] = useState('')
  const [buyAppliesTo, setBuyAppliesTo] = useState(buygetoptions[0])
  const [getValue, setGetValue] = useState('')
  const [getAppliesTo, setGetAppliesTo] = useState(buygetoptions[0])
  const [capValueChecked, setCapValueChecked] = useState(false)
  const [minimumRequirementsValue, setMinimumRequirementsValue] = useState()
  const [existingCoupon, setExistingCoupon] = useState()
  const [checkedCategories, setCheckedCategories] = useState([])
  const [doneCategories, setDoneCategories] = useState([])
  const [doneBuyCategories, setDoneBuyCategories] = useState([])
  const [doneGetCategories, setDoneGetCategories] = useState([])
  const [checkedBuyCategories, setCheckedBuyCategories] = useState([])
  const [checkedGetCategories, setCheckedGetCategories] = useState([])
  const [checkedProducts, setCheckedProducts] = useState([])
  const [doneProducts, setDoneProducts] = useState([])
  const [doneBuyProducts, setDoneBuyProducts] = useState([])
  const [doneGetProducts, setDoneGetProducts] = useState([])
  const [checkedBuyProducts, setCheckedBuyProducts] = useState([])
  const [checkedGetProducts, setCheckedGetProducts] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [edit_coupon_id, setEditCouponId] = useState(0)
  const [type, setType] = useState('')
  const [edit, setEdit] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [categoriesFinalData, setCategoriesFinalData] = useState([])
  const [productsFinalData, setProductsFinalData] = useState([])
  const [errors, showErrors] = useState({
    couponName: false,
    couponCode: false,
    discountAmount: false,
    capValue: false,
    minimumRequirementsValue: false,
    NoTimes: false,
  })
  const history = useHistory()
  const location = useLocation()

  function handleChangeCouponType(value) {
    setCouponType(value)
    setCapValueChecked(false)
    setCheckedCategories([])
    setCheckedBuyCategories([])
    setCheckedGetCategories([])
    setDoneCategories([])
    setDoneBuyCategories([])
    setDoneGetCategories([])
    setType('')
    setCheckedProducts([])
    setDoneProducts([])
    setDoneGetProducts([])
    setDoneBuyProducts([])
    setCheckedBuyProducts([])
    setCheckedGetProducts([])
  }

  useEffect(() => {
    getCouponTypes()
    couponTypesData.map((coupontype, id) => {
      availableTypes.push(coupontype.coupon_type_name)
    })
    getCategories(storeId)
    paginationCount(storeId)
    setCouponType(couponTypesName.FIXED_AMOUNT)
    if (edit == false) {
      setSelectedStartTime(moment(new Date()).format('hh:mm a'))
      setSelectedEndDate(moment(new Date()).format('DD MMM YYYY'))
      setSelectedEndTime(moment(new Date()).format('hh:mm a'))
    }
    if (location.state !== undefined) {
      setEditCouponId(location.state.couponId)
      setExistingCoupon(location.state.couponObj)
    }
  }, [])

  useEffect(() => {
    if (edit_coupon_id != 0) {
      setEdit(true)
    }
  }, [edit_coupon_id])

  useEffect(() => {
    if (!showCategoryList) {
      setSearchCategoryValue(null)
      setType('')
    }
  }, [showCategoryList])

  useEffect(() => {
    if (showProductList == true || pageNum <= count) getPaginationProduct(storeId, pageNum)
  }, [pageNum, showProductList])

  const getCategoriesFinalData = () => {
    doneCategories.map((categories, id) => {
      const myObj = {
        category_id: categories.category_id,
        category_name: categories.category_name,
        img_url: categories.img_url,
      }
      categoriesFinalData.push(myObj)
    })
    return categoriesFinalData
  }

  const getProductsFinalData = () => {
    doneProducts.map((products, id) => {
      const myObj = {
        item_id: products.item_id,
        item_name: products.item_name,
        primary_img: products.primary_img,
      }
      productsFinalData.push(myObj)
    })
    return productsFinalData
  }

  const findAttributesForType = couponType => {
    const id = findTypeId(couponType)
    let obj
    if (id == 1) {
      obj = {
        couponName,
        couponCode,
        discountAmount,
        products: doneProducts.length > 0 ? getProductsFinalData() : [],
        category: doneCategories.length > 0 ? getCategoriesFinalData() : [],
      }
    }
    if (id == 2) {
      obj = {
        couponName,
        couponCode,
        discountPercentage: discountAmount,
        capValue: capValue || null,
        products: doneProducts.length > 0 ? getProductsFinalData() : [],
        category: doneCategories.length > 0 ? getCategoriesFinalData() : [],
      }
    }
    if (id == 3) {
      obj = {
        couponName,
        couponCode,
      }
    }
    if (id == 4) {
      obj = {
        couponName,
        couponCode,
        buyCount: buyValue,
        buyCategory: doneBuyCategories || [],
        buyProduct: doneBuyProducts || [],
        getCount: getValue,
        getCategory: doneGetCategories || [],
        getProduct: doneGetProducts || [],
      }
    }
    return obj
  }

  const findAttributesForId = couponId => {
    const name = findTypeName(couponId)
    if (name == couponTypesName.FIXED_AMOUNT) {
      setDiscountAmount(existingCoupon.coupon_attributes.discountAmount)
      if (existingCoupon.coupon_attributes.products != [] && existingCoupon.coupon_attributes.category != []) {
        setAppliesTo(options[0])
        setDoneProducts([])
        setDoneCategories([])
      }
      if (existingCoupon.coupon_attributes.products && existingCoupon.coupon_attributes.products.length > 0) {
        setAppliesTo(options[2])
        setCheckedProducts(existingCoupon.coupon_attributes.products)
        setDoneProducts(existingCoupon.coupon_attributes.products)
        setDoneCategories([])
      }
      if (existingCoupon.coupon_attributes.category && existingCoupon.coupon_attributes.category.length > 0) {
        setAppliesTo(options[1])
        setCheckedCategories(existingCoupon.coupon_attributes.category)
        setDoneProducts([])
        setDoneCategories(existingCoupon.coupon_attributes.category)
      }
    }
    if (name == couponTypesName.PERCENTAGE) {
      if (existingCoupon.coupon_attributes.capValue != null) {
        setCapValueChecked(true)
        setCapValue(existingCoupon.coupon_attributes.capValue)
      }
      setDiscountAmount(existingCoupon.coupon_attributes.discountPercentage)
      if (existingCoupon.coupon_attributes.products != [] && existingCoupon.coupon_attributes.category != []) {
        setAppliesTo(options[0])
        setDoneProducts([])
        setDoneCategories([])
      }
      if (existingCoupon.coupon_attributes.products.length > 0) {
        setAppliesTo(options[2])
        setCheckedProducts(existingCoupon.coupon_attributes.products)
        setDoneProducts(existingCoupon.coupon_attributes.products)
        setDoneCategories([])
      }
      if (existingCoupon.coupon_attributes.category.length > 0) {
        setAppliesTo(options[1])
        setCheckedCategories(existingCoupon.coupon_attributes.category)
        setDoneProducts([])
        setDoneCategories(existingCoupon.coupon_attributes.category)
      }
    }
    if (name == couponTypesName.BUY_X_GET_Y) {
      setBuyValue(existingCoupon.coupon_attributes.buyCount ? existingCoupon.coupon_attributes.buyCount : ' ')
      setGetValue(existingCoupon.coupon_attributes.getCount ? existingCoupon.coupon_attributes.getCount : ' ')
      if (
        existingCoupon.coupon_attributes.buyProduct.length > 0 &&
        existingCoupon.coupon_attributes.buyCategory.length == 0
      ) {
        setDoneBuyProducts(
          existingCoupon.coupon_attributes.buyProduct ? existingCoupon.coupon_attributes.buyProduct : [],
        )
        setDoneGetProducts(
          existingCoupon.coupon_attributes.getProduct ? existingCoupon.coupon_attributes.getProduct : [],
        )
        setBuyAppliesTo(options[2])
        setGetAppliesTo(options[2])
      }
      if (
        existingCoupon.coupon_attributes.buyProduct.length == 0 &&
        existingCoupon.coupon_attributes.buyCategory.length > 0
      ) {
        setDoneBuyCategories(
          existingCoupon.coupon_attributes.buyCategory ? existingCoupon.coupon_attributes.buyCategory : [],
        ),
          setDoneGetCategories(
            existingCoupon.coupon_attributes.getCategory ? existingCoupon.coupon_attributes.getCategory : [],
          )
        setBuyAppliesTo(options[1])
        setGetAppliesTo(options[1])
      }
    }
  }

  const addCouponAPI = storeId => {
    if (!couponCode)  showErrors(prev => ({ ...prev, couponCode: true }))
    if (!couponName||validateContainOnlyWhitespace(couponName))  showErrors(prev => ({ ...prev, couponName: true }))
    /*  discountAmount is used as both percentage value and amount value.
    If couponType is fixed amount and percentage this state is used
    */
   if (couponType != couponTypesName.FREE_DELIVERY) {
     if (!discountAmount)
      showErrors(prev => ({
       ...prev,
       discountAmount: true,
      }))
    }
    if (couponType == couponTypesName.PERCENTAGE && capValueChecked == true) {
      if (!capValue)
       showErrors(prev => ({
        ...prev,
        capValue: true,
      }))
    }
    if (minimumRequirements == true) {
      if (!minimumRequirementsValue) {
         showErrors(prev => ({
          ...prev,
          minimumRequirementsValue: true,
        }))
      }
    }
    if (usageLimitsToN == true) {
      if (!NoTimes)
      return showErrors(prev => ({
        ...prev,
        NoTimes: true,
      }))
    }
    if (!couponCode || !couponName || (couponType != couponTypesName.FREE_DELIVERY&&!discountAmount)
      || (couponType == couponTypesName.PERCENTAGE && capValueChecked == true && !capValue)
      || (minimumRequirements===true && !minimumRequirementsValue) || (usageLimitsToN&&!NoTimes)
      ||validateContainOnlyWhitespace(couponName)) return;
    const couponData = {
      couponTypeId: findTypeId(couponType),
      couponCode,
      couponName,
      minimumOrderAmount: minimumRequirements == true ? minimumRequirementsValue : null,
      countPerCustomer: usageLimitsToOne || null,
      couponLimit: usageLimitsToN ? NoTimes : null,
      startTime: moment(`${selectedStartDate} ${selectedStartTime}`, 'DD MMM YYYY hh:mm a').format('X'),
      endTime: hasEndTime ? moment(`${selectedEndDate} ${selectedEndTime}`, 'DD MMM YYYY hh:mm a').format('X') : null,
      couponAttributes: findAttributesForType(couponType),
    }
    if (edit == true) {
      updateCoupon(storeId, edit_coupon_id, couponData)
      setEdit(false)
    } else {
      postCoupon(storeId, couponData, pageNum)
    }
    history.goBack()
  }

  useEffect(() => {
    if (edit == true) {
      setCouponType(findTypeName(existingCoupon.coupon_type_id))
      setCouponCode(existingCoupon.coupon_code != null ? existingCoupon.coupon_code : '')
      setCouponName(existingCoupon.coupon_name != null ? existingCoupon.coupon_name : '')
      findAttributesForId(existingCoupon.coupon_type_id)
      if (existingCoupon.min_order_amount != null) {
        setMinimumRequirements(true)
        setMinimumRequirementsValue(existingCoupon.min_order_amount)
      } else {
        setMinimumRequirements(false)
        setMinimumRequirementsValue('')
      }
      if (existingCoupon.count_per_customer != null) {
        setUsageLimitsToOne(true)
      } else {
        setUsageLimitsToOne(false)
      }
      if (existingCoupon.max_coupon_limit != null) {
        setUsageLimitsToN(!usageLimitsToN)
        setNoTimes(existingCoupon.max_coupon_limit)
      } else {
        setUsageLimitsToN(usageLimitsToN)
      }
      const start_time = parseInt(existingCoupon.start_time.toString().concat('000'))

      const s_date = moment(start_time)
        .utc(true)
        .format('DD MMM YYYY')
      const s_time = moment(start_time)
        .utc(true)
        .format('hh:mm a')
      setSelectedStartDate(s_date)
      setSelectedStartTime(s_time)
      if (existingCoupon.end_time != null) {
        const end_time = parseInt(existingCoupon.end_time.toString().concat('000'))
        const e_date = moment(end_time)
          .utc(true)
          .format('DD MMM YYYY')
        const e_time = moment(end_time)
          .utc(true)
          .format('hh:mm a')
        if (existingCoupon.end_time != null) {
          setHasEndTime(true)
          setSelectedEndDate(e_date)
          setSelectedEndTime(e_time)
        }
        if (existingCoupon.end_time == null) {
          setHasEndTime(false)
        }
      }
    }
  }, [edit])

  const renderCategoryList = (list, i) => {
    const { img_url, category_id, category_name } = list
    const isChecked = () => {
      if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && type == 0) {
        return checkedBuyCategories.some(list => list.category_id == category_id)
      }
      if (couponType == couponTypesName.BUY_X_GET_Y && getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && type == 2) {
        return checkedGetCategories.some(list => list.category_id == category_id)
      }
      return checkedCategories.some(list => list.category_id == category_id)
    }

    return (
      <div className="flex flex-row mb-4 justify-start items-center">
        <input
          type="checkbox"
          defaultChecked={isChecked()}
          style={{ height: 24, width: 25 }}
          onChange={() => handleCheckedCategories(list)}
          className="form-checkbox text-red-600 hover:border-none h-6 w-6 mr-4"
        />

        <Avatar size={64} shape="square" src={(img_url && img_url) || IMG_PLACEHOLDER} />

        <h4 className="text-xs md:text-sm font-bold md:font-medium ml-4">{category_name}</h4>
      </div>
    )
  }

  const handleCheckedCategories = item => {
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && type == 0) {
      const check = checkedBuyCategories && checkedBuyCategories.findIndex(list => list.category_id == item.category_id)
      let result
      if (check == -1) {
        result = checkedBuyCategories
        result.push(item)
        setCheckedBuyCategories(result)
      } else {
        result = checkedBuyCategories
        const splice = result.filter((list, index) => index != check)
        setCheckedBuyCategories(splice)
      }
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
      type == 2
    ) {
      const check = checkedGetCategories && checkedGetCategories.findIndex(list => list.category_id == item.category_id)
      let result
      if (check == -1) {
        result = checkedGetCategories
        result.push(item)
        setCheckedGetCategories(result)
      } else {
        result = checkedGetCategories
        const splice = result.filter((list, index) => index != check)
        setCheckedGetCategories(splice)
      }
    } else {
      const check = checkedCategories && checkedCategories.findIndex(list => list.category_id == item.category_id)
      let result
      if (check == -1) {
        result = checkedCategories
        result.push(item)
        setCheckedCategories(result)
      } else {
        result = checkedCategories
        const splice = result.filter((list, index) => index != check)
        setCheckedCategories(splice)
      }
    }
  }
  const handleCheckedProducts = item => {
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && type == 1) {
      const check = checkedBuyProducts && checkedBuyProducts.findIndex(list => list.item_id == item.item_id)
      let result
      if (check == -1) {
        result = checkedBuyProducts
        result.push(item)
        setCheckedBuyProducts(result)
      } else {
        result = checkedBuyProducts
        const splice = result.filter((list, index) => index != check)
        setCheckedBuyProducts(splice)
      }
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
      type == 3
    ) {
      const check = checkedGetProducts && checkedGetProducts.findIndex(list => list.item_id == item.item_id)
      let result
      if (check == -1) {
        result = checkedGetProducts
        result.push(item)
        setCheckedGetProducts(result)
      } else {
        result = checkedGetProducts
        const splice = result.filter((list, index) => index != check)
        setCheckedGetProducts(splice)
      }
    } else {
      const check = checkedProducts && checkedProducts.findIndex(list => list.item_id == item.item_id)
      let result
      if (check == -1) {
        result = checkedProducts
        result.push(item)
        setCheckedProducts(result)
      } else {
        result = checkedProducts
        const splice = result.filter((list, index) => index != check)
        setCheckedProducts(splice)
      }
    }
  }
  const renderProductList = (list, i) => {
    const { primary_img, category_id, item_name, item_id } = list
    const isChecked = () => {
      if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && type == 1) {
        return checkedBuyProducts.some(list => list.item_id == item_id)
      }
      if (couponType == couponTypesName.BUY_X_GET_Y && getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && type == 3) {
        return checkedGetProducts.some(list => list.item_id == item_id)
      }
      return checkedProducts.some(list => list.item_id == item_id)
    }
    if (i + 1 < products.length) {
      return (
        <div className="flex flex-row mb-4 justify-start items-center">
          {' '}
          <input
            type="checkbox"
            defaultChecked={isChecked()}
            style={{ height: 24, width: 24 }}
            onChange={() => handleCheckedProducts(list)}
            className="form-checkbox text-red-600 hover:border-none h-6 w-6 mr-4"
          />
          <Avatar size={64} shape="square" src={(primary_img && primary_img) || IMG_PLACEHOLDER} />
          <h4 className="text-xs md:text-sm font-bold md:font-medium ml-4">{item_name}</h4>
        </div>
      )
    }
    else {
      return (
        <div className="flex flex-row mb-4 justify-start items-center">
          {' '}
          <input
            type="checkbox"
            defaultChecked={isChecked()}
            style={{ height: 24, width: 24 }}
            onChange={() => handleCheckedProducts(list)}
            className="form-checkbox text-red-600 hover:border-none h-6 w-6 mr-4"
          />
          <Avatar size={64} shape="square" src={(primary_img && primary_img) || IMG_PLACEHOLDER} />
          <h4 className="text-xs md:text-sm font-bold md:font-medium ml-4" ref={lastElementRef}>{item_name}</h4>
        </div>
      )
    }
  }

  const renderCheckedCategory = (list, i, type) => {
    const { img_url, category_id, category_name } = list
    return (
      <div className="flex flex-row mb-4 justify-between items-center">
        <div className="flex flex-row items-center">
          <Avatar size={64} shape="square" src={(img_url && img_url) || IMG_PLACEHOLDER} />

          <h4 className="text-xs md:text-sm font-bold md:font-medium ml-4">{category_name}</h4>
        </div>

        <BiTrash
          color="#F64B5D"
          className="h-16 cursor-pointer"
          style={{
            width: 18,
            height: 20,
          }}
          onClick={() => {
            setShowButton(true)
            handleDelete(category_id, type)
          }}
        />
      </div>
    )
  }

  const renderCheckedProduct = (list, i, type) => {
    const { primary_img, item_name, item_id } = list
    return (
      <div className="flex flex-row mb-4 justify-between items-center">
        <div className="flex flex-row items-center">
          <Avatar size={64} shape="square" src={(primary_img && primary_img) || IMG_PLACEHOLDER} />

          <h4 className="text-xs md:text-sm font-bold md:font-medium ml-4">{item_name}</h4>
        </div>

        <BiTrash
          color="#F64B5D"
          className="h-16 cursor-pointer"
          style={{
            width: 18,
            height: 20,
          }}
          onClick={() => {
            setShowButton(true)
            handleDeleteProduct(item_id, type)
          }}
        />
      </div>
    )
  }

  const onCancel = () => {
    setCategoryList(false)
  }

  const onSubmit = () => {
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && type == 0) {
      setDoneBuyCategories(checkedBuyCategories)
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
      type == 2
    ) {
      setDoneGetCategories(checkedGetCategories)
    } else {
      setDoneCategories(checkedCategories)
    }
    setType('')
    setCategoryList(false)
    setShowButton(true)
  }

  const onSubmitProduct = () => {
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && type == 1) {
      setDoneBuyProducts(checkedBuyProducts)
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
      type == 3
    ) {
      setDoneGetProducts(checkedGetProducts)
    } else {
      setDoneProducts(checkedProducts)
    }
    setType('')
    setProductList(false)
    setShowButton(true)
  }

  const handleDelete = (category_id, type) => {
    let index
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && type == 0) {
      index = doneBuyCategories.findIndex(item => item.category_id == category_id)
      if (index != -1) {
        const temp = [...doneBuyCategories]
        temp.splice(index, 1)
        setDoneBuyCategories(temp)
      }
      const temp1 = [...checkedBuyCategories]
      temp1.splice(index, 1)
      setCheckedBuyCategories(temp1)
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
      type == 2
    ) {
      index = doneGetCategories.findIndex(item => item.category_id == category_id)
      if (index != -1) {
        const temp = [...doneGetCategories]
        temp.splice(index, 1)
        setDoneGetCategories(temp)
      }
      const temp1 = [...checkedGetCategories]
      temp1.splice(index, 1)
      setCheckedGetCategories(temp1)
    } else {
      index = doneCategories.findIndex(item => item.category_id == category_id)
      if (index != -1) {
        const temp = [...doneCategories]
        temp.splice(index, 1)
        setDoneCategories(temp)
      }
      const temp1 = [...checkedCategories]
      temp1.splice(index, 1)
      setCheckedCategories(temp1)
    }
  }

  const handleDeleteProduct = (item_id, type) => {
    let index
    if (couponType == couponTypesName.BUY_X_GET_Y && buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && type == 1) {
      index = doneBuyProducts.findIndex(item => item.item_id == item_id)
      if (index != -1) {
        const temp = [...doneBuyProducts]
        temp.splice(index, 1)
        setDoneBuyProducts(temp)
      }
      const temp1 = [...checkedBuyProducts]
      temp1.splice(index, 1)
      setCheckedBuyProducts(temp1)
    } else if (
      couponType == couponTypesName.BUY_X_GET_Y &&
      getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
      type == 3
    ) {
      index = doneGetProducts.findIndex(item => item.item_id == item_id)

      if (index != -1) {
        const temp = [...doneGetProducts]
        temp.splice(index, 1)
        setDoneGetProducts(temp)
      }
      const temp1 = [...checkedGetProducts]
      temp1.splice(index, 1)
      setCheckedGetProducts(temp1)
    } else {
      index = doneProducts.findIndex(item => item.item_id == item_id)
      if (index != -1) {
        const temp = [...doneProducts]
        temp.splice(index, 1)
        setDoneProducts(temp)
      }
      const temp1 = [...checkedProducts]
      temp1.splice(index, 1)
      setCheckedProducts(temp1)
    }
  }
  const observer = React.useRef()
  const lastElementRef = React.useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && pageNum < count) {
        setPageNum(prev => prev + 1)
      }
    })
    if (node) observer.current.observe(node)
  })

  return (
    <>
      <div className="sticky bg-white">
        <div className="flex justify-between p-4 border-b">
          <div className="flex items-center">
            <div
              onClick={() => history.goBack()}
              className="flex mr-4 text-xl font-medium text-black hover:text-secondary"
            >
              <img
                src={backImg}
                style={{ height: '24px', width: '24px', cursor: 'pointer' }}
                className="flex text-xl text-black font-medium ml-2 my-1"
              />
            </div>

            {edit == true ? (
              <div className="flex md:text-xl text-black font-medium" style={{ color: '#242424' }}>
                Update Coupon
              </div>
            ) : (
              <div className="flex md:text-xl text-black font-medium" style={{ color: '#242424' }}>
                Create New Coupons
              </div>
            )}
          </div>
          <TopNav />
        </div>
      </div>
      <div className="coupon_container">
        <p className="font-bold text-lg self-start">Coupons Details</p>

        <div className="bg-white p-8 container rounded-lg mb-6">
          <Form className="w-full " layout="vertical">
            <div className=" mb-8 ">
              <Form.Item className=" font-bold mb-2" label="Select the Type of Coupon">
                {isMobile && (
                  <Select
                    value={couponType}
                    onChange={handleChangeCouponType}
                    className="bg-white rounded-lg border-none coupon_selection"
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    disabled={edit == true}
                  >
                    {availableTypes.includes(couponTypesName.FIXED_AMOUNT) && (
                      <Option value={couponTypesName.FIXED_AMOUNT} className="">
                        <div className="couponPage-option">
                          <img src={FixedRupee} alt="Fixed Amount" width="50" height="5" style={{}} />
                          <p
                            className="font-bold text-center"
                            style={{ paddingLeft: '20px', alignSelf: 'center', paddingTop: 12 }}
                          >
                            Fixed Amount
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.PERCENTAGE) && (
                      <Option value={couponTypesName.PERCENTAGE} className="">
                        <div className="couponPage-option">
                          <img src={Percentage} alt="Percentage" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Percentage
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.FREE_DELIVERY) && (
                      <Option value={couponTypesName.FREE_DELIVERY} className="">
                        <div className="couponPage-option">
                          <img src={FreeDelivery} alt="Free Delivery" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Free delivery
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.BUY_X_GET_Y) == true && (
                      <Option value={couponTypesName.BUY_X_GET_Y} className="">
                        <div className="couponPage-option">
                          <img src={BuyXGetY} alt="Buy X Get Y" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Buy X Get Y
                          </p>
                        </div>
                      </Option>
                    )}
                  </Select>
                )}
                {!isMobile && (
                  <Select
                    value={couponType}
                    onChange={handleChangeCouponType}
                    className="bg-white rounded-lg border-none coupon_selection"
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                    style={{ width: 395 }}
                    disabled={edit == true}
                  >
                    {availableTypes.includes(couponTypesName.FIXED_AMOUNT) == true && (
                      <Option value={couponTypesName.FIXED_AMOUNT} className="">
                        <div className="couponPage-option">
                          <img src={FixedRupee} alt="Fixed Amount" width="50" height="5" style={{}} />
                          <p
                            className="font-bold text-center"
                            style={{ paddingLeft: '20px', alignSelf: 'center', paddingTop: 12 }}
                          >
                            Fixed Amount
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.PERCENTAGE) == true && (
                      <Option value={couponTypesName.PERCENTAGE} className="">
                        <div className="couponPage-option">
                          <img src={Percentage} alt="Percentage" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Percentage
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.FREE_DELIVERY) == true && (
                      <Option value={couponTypesName.FREE_DELIVERY} className="">
                        <div className="couponPage-option">
                          <img src={FreeDelivery} alt="Free Delivery" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Free delivery
                          </p>
                        </div>
                      </Option>
                    )}
                    {availableTypes.includes(couponTypesName.BUY_X_GET_Y) == true && (
                      <Option value={couponTypesName.BUY_X_GET_Y} className="">
                        <div className="couponPage-option">
                          <img src={BuyXGetY} alt="Buy X Get Y" width="50" height="5" />
                          <p
                            className="font-bold"
                            style={{
                              paddingLeft: '20px',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 12,
                            }}
                          >
                            Buy X Get Y
                          </p>
                        </div>
                      </Option>
                    )}
                  </Select>
                )}
              </Form.Item>
            </div>
            <hr className="mb-6" />

            <GridResponsive layout={isMobile}>
              <div className="">
                <Form.Item className="font-bold  " label="Coupon Code *">
                  <Input
                    style={{ height: 40, borderRadius: '0.5rem' }}
                    className={`font-normal px-2 py-2 checkout-form-input ${errors.couponCode == true ? 'input-red' : ''
                      }`}
                    placeholder="e.g., WINTER500"
                    value={couponCode}
                    onChange={e => {
                      if (e.target.value.includes(" ")) {
                        e.target.value = e.target.value.replace(" ", "")
                      } else {
                        showErrors(prev => ({ ...prev, couponCode: false }))
                        setCouponCode(e.target.value)
                        setShowButton(true)
                      }
                    }}
                    onInput={e => {
                      e.target.value = `${e.target.value}`.toUpperCase()
                    }}
                  />
                  {errors.couponCode == true && (
                    <span className="my-1 text-sm font-semibold text-secondary">Coupon code is mandatory</span>
                  )}
                </Form.Item>
              </div>

              <div className="">
                <Form.Item className="font-bold" label="Coupon Name *">
                  <Input
                    style={{ height: 40, borderRadius: '0.5rem' }}
                    className={`font-normal checkout-form-input ${errors.couponName == true ? 'input-red' : ''}`}
                    placeholder="e.g., Winter Sale"
                    value={couponName}
                    onChange={e => {
                      setShowButton(true)
                      showErrors(prev => ({ ...prev, couponName: false }))
                      setCouponName(e.target.value)
                    }}
                  />
                  {errors.couponName == true && (
                    <span className="my-1 text-sm font-semibold text-secondary">Coupon name is mandatory</span>
                  )}
                </Form.Item>
              </div>
            </GridResponsive>

            <div>
              <div>
                {couponType == couponTypesName.BUY_X_GET_Y && (
                  <div>
                    <GridResponsive layout={isMobile}>
                      <div className="">
                        <Form.Item className="font-bold" label="Buy *">
                          <Input
                            className="font-normal checkout-form-input"
                            placeholder="1"
                            value={buyValue}
                            onChange={e => {
                              setBuyValue(e.target.value)
                            }}
                            style={{ height: '40px', borderRadius: '0.5rem' }}
                          />
                        </Form.Item>
                      </div>
                      <div className="">
                        <Form.Item className="font-bold" label="Applies To ">
                          <SelectNormal
                            className="bg-white border border-gray-400 rounded-lg "
                            options={buygetoptions}
                            styles={customInputSelect}
                            isSearchable={false}
                            components={{
                              SingleValue: customSingleValue,
                              IndicatorSeparator: () => null,
                              DropdownIndicator,
                            }}
                            defaultValue={buyAppliesTo}
                            getOptionLabel={x => x.label}
                            getOptionValue={x => x.value}
                            onChange={e => {
                              setBuyAppliesTo(e)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </GridResponsive>

                    {buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-6">
                          <div className="flex-auto">
                            <Input
                              placeholder="Search Categories for Buy Value "
                              style={{
                                padding: '1px',
                                marginRight: '5px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                paddingLeft: '12px',
                              }}
                              onFocus={() => {
                                setCategoryList(true)
                                setType(0)
                              }}
                              prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                            />
                          </div>
                          <button
                            onClick={e => {
                              e.preventDefault()
                              setCategoryList(true)
                              setType(0)
                            }}
                            className="   py-2 px-4 border border-gray-400   rounded-lg text-red bg-transparent focus:outline-none"
                          >
                            Browse
                          </button>
                        </div>
                        {buyAppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
                          couponType != couponTypesName.FREE_DELIVERY &&
                          doneBuyCategories &&
                          doneBuyCategories.map((list, i) => renderCheckedCategory(list, i, 0))}
                        <hr className="mb-6 mt-6" />
                      </>
                    )}

                    {buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-6">
                          <div className="flex-auto">
                            <Input
                              placeholder="Search Products for Buy Value"
                              style={{
                                padding: '1px',
                                marginRight: '5px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                paddingLeft: '12px',
                              }}
                              onFocus={() => {
                                setProductList(true)
                                setType(1)
                              }}
                              prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                            />
                          </div>
                          <button
                            onClick={e => {
                              e.preventDefault()
                              setProductList(true)
                              setType(1)
                            }}
                            className="   py-2 px-4 border border-gray-400   rounded-lg text-red bg-transparent focus:outline-none"
                          >
                            Browse
                          </button>
                        </div>
                        {buyAppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
                          couponType != couponTypesName.FREE_DELIVERY &&
                          doneBuyProducts &&
                          doneBuyProducts.map((list, i) => renderCheckedProduct(list, i, 1))}
                        <hr className="mb-6 mt-6" />
                      </>
                    )}

                    <GridResponsive layout={isMobile}>
                      <div className="">
                        <Form.Item className="font-bold" label="Get *">
                          <Input
                            className={`font-normal }`}
                            placeholder="1"
                            value={getValue}
                            onChange={e => {
                              setGetValue(e.target.value)
                            }}
                            style={{ height: '40px', borderRadius: '0.5rem' }}
                          />
                        </Form.Item>
                      </div>
                      <div className="">
                        <Form.Item className="font-bold" label="Applies To ">
                          <SelectNormal
                            className="bg-white border border-gray-400 rounded-lg "
                            options={buygetoptions}
                            styles={customInputSelect}
                            isSearchable={false}
                            components={{
                              SingleValue: customSingleValue,
                              IndicatorSeparator: () => null,
                              DropdownIndicator,
                            }}
                            defaultValue={getAppliesTo}
                            onChange={e => {
                              setGetAppliesTo(e)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </GridResponsive>
                    {getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-6">
                          <div className="flex-auto">
                            <Input
                              placeholder="Search Categories for Get Value"
                              style={{
                                padding: '1px',
                                marginRight: '5px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                paddingLeft: '12px',
                              }}
                              onFocus={() => {
                                setCategoryList(true)
                                setType(2)
                              }}
                              prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                            />
                          </div>
                          <button
                            onClick={e => {
                              e.preventDefault()
                              setCategoryList(true)
                              setType(2)
                            }}
                            className="   py-2 px-4 border border-gray-400   rounded-lg text-red bg-transparent focus:outline-none"
                          >
                            Browse
                          </button>
                        </div>
                        {getAppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
                          couponType != couponTypesName.FREE_DELIVERY &&
                          doneGetCategories &&
                          doneGetCategories.map((list, i) => renderCheckedCategory(list, i, 2))}
                      </>
                    )}
                    {getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT && (
                      <>
                        <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-6">
                          <div className="flex-auto">
                            <Input
                              placeholder="Search Products for Get Value"
                              style={{
                                padding: '1px',
                                marginRight: '5px',
                                height: '40px',
                                borderRadius: '0.5rem',
                                paddingLeft: '12px',
                              }}
                              onFocus={() => {
                                setProductList(true)
                                setType(3)
                              }}
                              prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                            />
                          </div>
                          <button
                            onClick={e => {
                              e.preventDefault()
                              setProductList(true)
                              setType(3)
                            }}
                            className="   py-2 px-4 border border-gray-400   rounded-lg text-red bg-transparent focus:outline-none"
                          >
                            Browse
                          </button>
                        </div>
                        {getAppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
                          couponType != couponTypesName.FREE_DELIVERY &&
                          doneGetProducts &&
                          doneGetProducts.map((list, i) => renderCheckedProduct(list, i, 3))}
                      </>
                    )}
                  </div>
                )}

                <GridResponsive layout={isMobile}>
                  <div className="">
                    <div>
                      {couponType != couponTypesName.FREE_DELIVERY && couponType != couponTypesName.BUY_X_GET_Y && (
                        <Form.Item className="font-bold" label="Discount *">
                          <Input
                            className="font-normal checkout-form-input"
                            placeholder={`Enter Discount ${couponType == couponTypesName.PERCENTAGE ? 'Percentage ' : 'Amount '
                              } `}
                            value={discountAmount}
                            style={{ height: '40px', borderRadius: '0.5rem' }}
                            onChange={e => {
                              const { value } = e.target
                              const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
                              if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                                setDiscountAmount(e.target.value)
                                setShowButton(true)
                                showErrors(prev => ({ ...prev, discountAmount: false }))
                              }
                            }}
                            prefix={
                              couponType == couponTypesName.FIXED_AMOUNT ? (
                               <b>{store.currency_symbol}</b>
                              ) : (
                                <></>
                              )
                            }
                            suffix={
                              couponType == couponTypesName.PERCENTAGE && (
                                <AiOutlinePercentage color="rgba(36,36,36,0.6)" />
                              )
                            }
                          />
                          {errors.discountAmount == true && (
                            <span className="my-1 text-sm font-semibold text-secondary">
                              {`Discount ${couponType == couponTypesName.PERCENTAGE ? 'Percentage' : 'Amount'
                                } is mandatory`}
                            </span>
                          )}
                        </Form.Item>
                      )}
                      <div>
                        {couponType == couponTypesName.PERCENTAGE && (
                          <div className="font-semibold mb-4" onClick={() => setCapValueChecked(!capValueChecked)}>
                            <input
                              className="form-checkbox text-red-600 hover:border-none h-6 w-6"
                              type="checkbox"
                              defaultChecked={capValueChecked}
                              style={{ height: 24, width: 24 }}
                              checked={capValueChecked == true}
                            />
                            &nbsp;&nbsp;&nbsp;Set Cap Value
                          </div>
                        )}
                        <div>
                          {capValueChecked && !isMobile && (
                            <Input
                              className="font-normal"
                              placeholder="0 *"
                              value={capValue}
                              onChange={e => {
                                setCapValue(e.target.value)
                                showErrors(prev => ({ ...prev, capValue: false }))
                              }}
                              style={{
                                height: '40px',
                                marginLeft: 34,
                                borderRadius: '0.5rem',
                                marginBottom: 16,
                                width: 360,
                              }}
                            />
                          )}
                          {capValueChecked && isMobile && (
                            <Input
                              className="font-normal"
                              placeholder="0 *"
                              value={capValue}
                              onChange={e => {
                                setCapValue(e.target.value)
                                showErrors(prev => ({ ...prev, capValue: false }))
                              }}
                              style={{
                                height: '40px',
                                marginLeft: 34,
                                borderRadius: '0.5rem',
                                marginBottom: 16,
                                width: 210,
                              }}
                            />
                          )}
                        </div>
                        {capValueChecked == true && errors.capValue == true && (
                          <span className="text-sm font-semibold text-secondary" style={{ marginLeft: 30 }}>
                            Cap Value is mandatory
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {couponType != couponTypesName.FREE_DELIVERY && couponType != couponTypesName.BUY_X_GET_Y && (
                      <Form.Item className="font-bold" label="Applies To ">
                        <SelectNormal
                          className="bg-white border border-gray-400 rounded-lg "
                          options={options}
                          styles={customInputSelect}
                          isSearchable={false}
                          components={{
                            SingleValue: customSingleValue,
                            IndicatorSeparator: () => null,
                            DropdownIndicator,
                          }}
                          defaultValue={AppliesTo}
                          onChange={e => {
                            setAppliesTo(e)
                            setCheckedCategories([])
                            setDoneCategories([])
                            setCheckedProducts([])
                            setDoneProducts([])
                            setShowButton(true)
                          }}
                          value={AppliesTo}
                        />
                      </Form.Item>
                    )}
                  </div>
                </GridResponsive>

                <div>
                  {AppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
                    couponType != couponTypesName.FREE_DELIVERY &&
                    couponType != couponTypesName.BUY_X_GET_Y && (
                      <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-4">
                        <div className="flex-auto">
                          <Input
                            placeholder="Search Categories"
                            style={{
                              padding: '1px',
                              marginRight: '5px',
                              height: '40px',
                              borderRadius: '0.5rem',
                              paddingLeft: '12px',
                            }}
                            onFocus={() => setCategoryList(true)}
                            prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                          />
                        </div>
                        <button
                          onClick={e => {
                            e.preventDefault()
                            setCategoryList(true)
                          }}
                          className="   py-2 px-4 border border-gray-400
                         rounded-lg text-red bg-transparent focus:outline-none"
                        >
                          Browse
                        </button>
                      </div>
                    )}

                  {AppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
                    couponType != couponTypesName.FREE_DELIVERY &&
                    couponType != couponTypesName.BUY_X_GET_Y && (
                      <div style={{ display: 'flex', flexDirection: 'row' }} className="flex-wrap gap-4 mb-4">
                        <div className="flex-auto">
                          <Input
                            className={`font-normal  ? 'input-red' : ''}focus:outline-none focus:border-secondary`}
                            placeholder="Search Products"
                            style={{
                              padding: '1px',
                              marginRight: '5px',
                              height: '40px',
                              borderRadius: '0.5rem',
                              paddingLeft: '12px',
                            }}
                            onFocus={() => setProductList(true)}
                            prefix={<BiSearchAlt2 color="rgba(36,36,36,0.6)" className="mr-2" />}
                          />
                        </div>
                        <button
                          onClick={e => {
                            e.preventDefault()
                            setProductList(true)
                          }}
                          className="   py-2 px-4 border border-gray-400   rounded-lg text-red bg-transparent focus:outline-none"
                        >
                          Browse
                        </button>
                      </div>
                    )}

                  {couponType != couponTypesName.FREE_DELIVERY &&
                    couponType != couponTypesName.BUY_X_GET_Y &&
                    AppliesTo.value == appliesTo.SPECIFIC_CATEGORY &&
                    doneCategories &&
                    doneCategories.map((list, i) => renderCheckedCategory(list, i))}

                  {couponType != couponTypesName.FREE_DELIVERY &&
                    couponType != couponTypesName.BUY_X_GET_Y &&
                    AppliesTo.value == appliesTo.SPECIFIC_PRODUCT &&
                    doneProducts &&
                    doneProducts.map((list, i) => renderCheckedProduct(list, i))}
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div className="container bg-white p-8 rounded-lg mb-6">
          <p className="font-bold">Minimum Requirements</p>
          <Radio.Group
            value={minimumRequirements}
            className="Radio-Group"
            onChange={e => {
              setMinimumRequirements(e.target.value)
              setShowButton(true)
            }}
            size="large"
          >
            <Radio className="font-semibold" size="large" value={false} style={{ margin: '10px 0px' }}>
              <div style={{ paddingLeft: '10px' }}>
                <span className=" text-sm font-normal" style={{ fontWeight: 450 }}>
                  None
                </span>
              </div>
            </Radio>
            <Radio className="" value size="large" style={{ margin: '10px 0px' }}>
              <div style={{ display: 'flex', paddingLeft: '10px' }} className="justify-center  items-center">
                <span className=" text-sm font-normal " style={{ fontWeight: 450 }}>
                  Minimum Purchase Amount &nbsp;
                </span>
                (<b size={16} className="" style={{ color: 'rgba(75, 81, 81, 0.8)' }}>{store.currency_symbol}</b>)
              </div>
            </Radio>
          </Radio.Group>
          {minimumRequirements === true && isMobile && (
            <div style={{ width: 210 }}>
              <Input
                className={`font-normal  ? 'input-red' : ''}`}
                placeholder="0 *"
                prefix={<b color="rgba(36,36,36,0.6)" className="mr-2" >{store.currency_symbol}</b>}
                style={{ borderRadius: '0.35rem', height: 40, marginLeft: 34 }}
                value={minimumRequirementsValue}
                onChange={e => {
                  const { value } = e.target
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
                  if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    setMinimumRequirementsValue(e.target.value)
                    showErrors(prev => ({ ...prev, minimumRequirementsValue: false }))
                  }
                }}
              />
              {minimumRequirements == true && errors.minimumRequirementsValue == true && (
                <span className="my-1 text-sm font-semibold text-secondary" style={{ marginLeft: 30 }}>
                  Minimum Requirements Value is mandatory
                </span>
              )}
            </div>
          )}
          {minimumRequirements === true && !isMobile && (
            <div style={{ width: 360 }}>
              <Input
                className={`font-normal  ? 'input-red' : ''}`}
                placeholder="0"
                prefix={<b color="rgba(36,36,36,0.6)" className="mr-2" >{store.currency_symbol}</b>}
                style={{ borderRadius: '0.35rem', height: 40, marginLeft: 34 }}
                value={minimumRequirementsValue}
                onChange={e => {
                  const { value } = e.target
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
                  if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    setMinimumRequirementsValue(e.target.value)
                    setShowButton(true)

                    showErrors(prev => ({ ...prev, minimumRequirementsValue: false }))
                  }
                }}
              />
              {minimumRequirements == true && errors.minimumRequirementsValue == true && (
                <span className="my-1 text-sm font-semibold text-secondary" style={{ marginLeft: 30 }}>
                  Minimum Requirements Value is mandatory
                </span>
              )}
            </div>
          )}
        </div>

        <div className="container bg-white p-8 rounded-lg mb-6">
          <p className="font-bold">Usage Limits</p>
          <div>
            <div
              className="font-semibold mb-4 mt-6 cursor-pointer"
              style={{ display: 'inline-flex' }}
              onClick={() => setUsageLimitsToOne(!usageLimitsToOne)}
            >
              <input
                id="limitOne"
                className="form-checkbox text-red-600 hover:border-none h-6 w-6 cursor-pointer"
                type="checkbox"
                defaultChecked={usageLimitsToOne}
                onChange={() => {
                  setShowButton(true)
                  if (usageLimitsToOne == false) {
                    setUsageLimitsToOne(true)
                  } else {
                    setUsageLimitsToOne(false)
                  }
                }}
                checked={usageLimitsToOne == true}
              />
              &nbsp;&nbsp;&nbsp;
              <span className=" text-sm font-normal" style={{ fontWeight: 450 }}>
                Limit to one use per customer
              </span>
            </div>
          </div>
          <div>
            <div
              className="font-semibold cursor-pointer "
              style={{ display: 'inline-flex' }}
              onClick={() => setUsageLimitsToN(!usageLimitsToN)}
            >
              <input
                className="form-checkbox text-red-600  h-6 w-6 cursor-pointer"
                type="checkbox"
                onChange={() => {
                  setShowButton(true)
                  setUsageLimitsToN(!usageLimitsToN)
                }}
                checked={usageLimitsToN == true}
              />
              &nbsp;&nbsp;&nbsp;
              <span className=" text-sm font-normal mb-2" style={{ fontWeight: 450 }}>
                Limit number of times this discount can be used in total
              </span>
            </div>
          </div>
          {usageLimitsToN && !isMobile && (
            <div style={{ width: 360 }}>
              <Input
                className="font-normal  "
                placeholder="0 *"
                value={NoTimes}
                style={{ borderRadius: '0.35rem', height: 40, marginTop: 12, marginLeft: 34 }}
                onChange={e => {
                  const { value } = e.target
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
                  if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    showErrors(prev => ({ ...prev, NoTimes: false }))
                    setNoTimes(e.target.value)
                    setShowButton(true)
                  }
                }}
              />
              {usageLimitsToN == true && errors.NoTimes == true && (
                <span className="my-1 text-sm font-semibold text-secondary" style={{ marginLeft: 30 }}>
                  Limit Number of times is mandatory
                </span>
              )}
            </div>
          )}
          {usageLimitsToN && isMobile && (
            <div style={{ width: 210 }}>
              <Input
                className="font-normal  "
                placeholder="0 *"
                value={NoTimes}
                style={{ borderRadius: '0.35rem', height: 40, marginTop: 12, marginLeft: 34 }}
                onChange={e => {
                  const { value } = e.target
                  const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
                  if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
                    showErrors(prev => ({ ...prev, NoTimes: false }))
                    setNoTimes(e.target.value)
                  }
                }}
              />
              {usageLimitsToN == true && errors.NoTimes == true && (
                <span
                  className="my-1 text-sm font-semibold text-secondary"
                  style={{ marginLeft: 30, textAlign: 'left' }}
                >
                  Number of times is mandatory
                </span>
              )}
            </div>
          )}
        </div>

        <div className="container bg-white p-8 rounded-lg  mb-8">
          <p className="font-bold">Valid Between</p>

          <div className=" flex flex-row  mx-auto mb-4">
            <div className="mb-4 mr-8  ">
              <span className=" font-normal text-muted-med mb-2" style={{ fontSize: 13, fontWeight: 550 }}>
                Start Date
              </span>
              <div className="mt-2">
                {edit && (
                  <DatePicker
                    allowClear={false}
                    disabledDate={current => {
                      const customDate = moment().format('DD MMM YYYY')
                      return current && current < moment(customDate, 'DD MMM YYYY')
                    }}
                    value={moment(selectedStartDate, 'DD MMM YYYY')}
                    onChange={(date, dateString) => {
                      setSelectedStartDate(dateString)
                      setShowButton(true)
                      setSelectedEndDate(prev => (selectedEndDate === date._i ? dateString : prev))
                    }}
                    format="DD MMM YYYY"
                    style={{ borderRadius: '0.35rem', height: 40 }}
                  />
                )}
                {!edit && (
                  <DatePicker
                    allowClear={false}
                    disabledDate={current => {
                      const customDate = moment().format('DD MMM YYYY')
                      return current && current < moment(customDate, 'DD MMM YYYY')
                    }}
                    defaultValue={() => moment(selectedStartDate, 'DD MMM YYYY')}
                    onChange={(date, dateString) => {
                      setSelectedStartDate(dateString)
                      setSelectedEndDate(prev => (selectedEndDate === date._i ? dateString : prev))
                    }}
                    format="DD MMM YYYY"
                    style={{ borderRadius: '0.35rem', height: 40 }}
                  />
                )}
              </div>
            </div>

            <div className="mb-2">
              <span className=" font-normal text-muted-med mb-2" style={{ fontSize: 13, fontWeight: 550 }}>
                Start Time
              </span>
              <div className="mt-2">
                <TimePicker
                  defaultValue={() => moment(selectedStartTime, 'YYYY-MM-DD')}
                  use12Hours
                  format="hh:mm a"
                  value={moment(selectedStartTime, 'hh:mm a')}
                  onSelect={time => {
                    setSelectedStartTime(moment(time).format('hh:mm a'))
                    setShowButton(true)
                  }}
                  allowClear={false}
                  style={{ borderRadius: '0.35rem', height: 40 }}
                  popupStyle={{ backgroundColor: '#f64b5d' }}
                />
              </div>
            </div>
          </div>

          <div className="w-full ">
            <div
              className="cursor-pointer"
              style={{ display: 'inline-flex', flexDirection: 'row' }}
              onClick={() => setHasEndTime(!hasEndTime)}
            >
              <input
                type="checkbox"
                className="form-checkbox text-red-600  h-6 w-6 cursor-pointer"
                style={{ marginRight: '5px', height: 20, width: 20 }}
                onChange={() => {
                  setShowButton(true)
                  setHasEndTime(!hasEndTime)
                }}
                checked={hasEndTime == true}
              />
              <p className="text-muted-med mb-2" style={{ fontWeight: 550 }}>
                &nbsp;&nbsp;&nbsp;Set End Date
              </p>
              <br />
            </div>

            {hasEndTime && (
              <div className="flex flex-row">
                <div className="mr-8">
                  <div>
                    <br />
                  </div>
                  <span className=" font-normal text-muted-med mb-2" style={{ fontSize: 13, fontWeight: 550 }}>
                    End Date
                  </span>
                  <div className="mt-2">
                    <DatePicker
                      disabledDate={current => {
                        const customDate = moment().format('DD MMM YYYY')
                        return current && current < moment(customDate, 'DD MMM YYYY')
                      }}
                      defaultValue={() => moment(selectedEndDate, 'DD MMM YYYY')}
                      allowClear={false}
                      onChange={(date, dateString) => {
                        setSelectedEndDate(dateString)
                        setShowButton(true)
                      }}
                      format="DD MMM YYYY"
                      style={{ borderRadius: '0.35rem', height: 40 }}
                    />
                  </div>
                  &nbsp;&nbsp;
                </div>

                <div>
                  <div>
                    <br />
                  </div>
                  <span className=" font-normal text-muted-med mb-2" style={{ fontSize: 13, fontWeight: 550 }}>
                    End Time
                  </span>
                  <div className="mt-2">
                    <TimePicker
                      use12Hours
                      allowClear={false}
                      format="hh:mm a"
                      value={moment(selectedEndTime, 'hh:mm a')}
                      onSelect={time => {
                        setSelectedEndTime(moment(time).format('hh:mm a'))
                        setShowButton(true)
                      }}
                      style={{ borderRadius: '0.35rem', height: 40 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isMobile && <div style={{ marginTop: 120 }} />}

        <MediaQuery minDeviceWidth={1101}>
          {edit == true ? showButton &&
            <div className="editItemPage-rightButtons-container absolute bottom-0 bg-white p-2  flex justify-center items-center"
              style={{ width: 'calc(100% - 633px)', zIndex: '35' }}>
              <button
                className=" desktopVersion editItemPage-save-add-Button w-full  h-auto px-4 py-2text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                onClick={e => {
                  e.preventDefault()
                  addCouponAPI({ storeId })
                }}
              >
                <div >Update Coupon</div>
              </button>
            </div> :
            <div className="review_and_send ">
              <button
                onClick={e => {
                  e.preventDefault()
                  addCouponAPI({ storeId })
                }}
              >
                <div>Create Coupon</div>
              </button>
            </div>
          }

        </MediaQuery>
      </div>
      <MediaQuery maxDeviceWidth={1100}>
        {!showCategoryList && !showProductList && (
          <div className="review_and_send ">
            <button
              onClick={e => {
                e.preventDefault()
                addCouponAPI({ storeId })
              }}
            >
              {edit == true ? <div>Update Coupon</div> : <div>Create Coupon</div>}
            </button>
          </div>
        )}
      </MediaQuery>

      {showCategoryList && (
        <Modal
          closeModal={() => {
            setCategoryList(false)
          }}
          title="Add Categories"
          submit={onSubmit}
          onCancel={() => onCancel}
          cancel
          isMobile={isMobile}
          page="coupon"
          proceedTitle="Done"
        >
          <div className="container mb-6">
            <div className="">
              <Input
                placeholder="Search Categories"
                prefix={<BiSearchAlt2 />}
                style={{ borderRadius: '0.35rem', height: 40 }}
                onChange={e => setSearchCategoryValue(e.target.value)}
                className="mb-6 focus:outline-none focus:border-secondary"
                value={searchCategory}
                autoFocus="autoFocus"
              />

              <div className="overflow-y-auto overflow-x-auto">
                {category &&
                  category.length > 0 &&
                  category
                    .filter(item => {
                      if (!searchCategory) return true
                      if (item.category_name.toLowerCase().includes(searchCategory.toLowerCase())) {
                        return true
                      }
                    })
                    .map((list, i) => renderCategoryList(list, i))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showProductList && (
        <Modal
          closeModal={() => {
            setProductList(false)
            reset()
          }}
          title="Add Products"
          onCreateAttribute={() => {
            setProductList(false)
          }}
          onCancel={() => {
            setProductList(false)
            emptyProduct()
          }}
          page="coupon"
          proceedTitle="Done"
          submit={onSubmitProduct}
        >
          <div className="">
            <div className="">
              <Input
                placeholder="Search Products"
                prefix={<BiSearchAlt2 />}
                style={{ borderRadius: '0.35rem', height: 40 }}

                onChange={e => setSearchProductValue(e.target.value)}
                className="mb-6 focus:outline-none focus:border-secondary"
                value={searchProduct}
                autoFocus="autoFocus"
              />

              <div
                className="overflow-y-scroll overflow-x-auto "
                style={{
                  position: 'relative',
                  height: '40vh',
                }}
              >
                {products &&
                  products.length > 0 &&
                  products
                    .filter(item => {
                      if (!searchProduct) return true
                      if (item.item_name.toLowerCase().includes(searchProduct.toLowerCase())) {
                        return true
                      }
                    })
                  .map((list, i) => renderProductList(list, i))}
              </div>
             
            
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  category: makeSelectCategories(),
  products: makeSelectProducts(),
  count: makeSelectCount(),
  loading: makeSelectLoading(),
  couponTypesData: makeSelectCouponTypes(),
})

const mapDispatchToProps = dispatch => ({
  clearData: () => dispatch(resetData()),
  getCategories: storeId => dispatch(getCategories(storeId)),
  postCoupon: (storeId, couponData,pageNum) => dispatch(createCoupons(storeId, couponData,pageNum)),
  getPaginationProduct: (storeId, pageNum) => dispatch(getPaginationProduct(storeId, pageNum)),
  paginationCount: storeId => dispatch(getPaginationCount(storeId)),
  updateCoupon: (storeId, couponId, couponData) => dispatch(updateCoupons(storeId, couponId, couponData)),
  getCouponTypes: () => dispatch(getAllCouponTypes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCoupons)
