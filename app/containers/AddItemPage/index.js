import React, { useState, useEffect, useCallback } from 'react'
import { NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import CardSubtext from 'components/CardSubtext'
import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import Select from 'react-select'
import { Menu, Dropdown, Tooltip, Checkbox, notification } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import Modal from 'components/Modal'
import {
  submitNewCategory,
  submitNewVariant,
  removeVariant,
  removeVariantValue,
  submitNewSubCategory,
  uploadCategoryImage,
  getItemSpecifications,
  getItemVariants,
  getItemVariantCombinations,
  updateItemSpecifications,
  updateItemVariants,
  updateItemVariantCombinations,
  resetSubmittedItemId,
} from 'containers/InventoryPage/actions'
import { getTaxes, updateTax } from 'containers/StoreTax/actions'
import MediaQuery from 'react-responsive'
import TopNav from 'components/TopNav'
import storeTaxReducer from 'containers/StoreTax/reducer'
import inventorySaga from 'containers/InventoryPage/sagas'
import storeTaxSaga from 'containers/StoreTax/saga'
import { getSubscribedModules, onPageLoad } from 'containers/App/actions'
import BinaryToggle from 'components/BinaryToggle'
import ImageUpload from 'components/ImageUpload'
import CreateCategoryModal from 'components/CreateCategoryModal'
import AddVariantsModal from 'components/AddVariantsModal'
import CreateTaxModal from 'components/CreateTax'
import Store_Type from 'utils/inventoryEnums'
import { customSelect, DropdownIndicator } from 'utils/dropdownConfig'
import PlaceHolderImage from 'images/Img Placeholder.png'
import trash from '../../images/icons/trash-2.svg'
import backImg from '../../images/icons/back.svg'
import { categorySelector, subCategoriesSelector } from './selectors'
import reducer from './reducer'
import {
  deleteItem,
  resetItemImage,
  resetItemImage1,
  resetItemImage2,
  resetItemImage3,
  resetItemImage4,
  resetItemImage5,
  submitItem,
  submitVariantCombinations,
  uploadItemImage,
  uploadItemImage1,
  uploadItemImage2,
  uploadItemImage3,
  uploadItemImage4,
  uploadItemImage5,
  showUpgradeNotification,
  setSelectedCategory,
} from './actions'
import FormPage from './Form'
import saga from './saga'
import storeInfoReducer from "../StoreInfoPage/reducer"
import storeInfoSaga from "../StoreInfoPage/saga"
import 'assets/AddItem.css'
import Edit from 'images/edit-3.svg'
import AdditionalInfoModal from 'components/AdditionalInfoModal'

import globalEnums from 'utils/globalEnums'
import inventoryEnums from 'utils/inventorySubModuleEnums'
import 'assets/GlobalStyles.css'
import { numberInputValidation } from 'utils/validation'

const getRequiredSubcategories = (subCategories, categoryId) => {
  if (!categoryId) return []
  const requiredSubCategories = subCategories.filter(subcategory => subcategory.categoryId === categoryId)
  return [...requiredSubCategories, { label: '+ Create New Subcategory', value: -1 }]
}

const getCategoriesForModal = categories => categories.filter(item => item.value !== -1)

const buttonStyle = {
  color: '#F64B5D',
  height: '35px',
  width: '220px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #F64B5D',
  borderRadius: '8px',
  fontWeight: '500',
  padding: '5px',
  outline: 'none',
  position: 'relative',
}

const addAnother = {
  color: '#F64B5D',
  height: '35px',
  width: '220px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: '500',
  fontSize: 'small',
  outline: 'none',
  position: 'relative',
  marginTop: '10px',
}

const AddItemPage = ({
  merchantId,
  storeId,
  store,
  submitItemToStore,
  submitVariantCombinations,
  createNewCategoryForStore,
  createNewSubCategoryForStore,
  categories,
  subCategories,
  submissionStatus,
  submittedItemId,
  onPageInit,
  apiStatus,
  onItemImageUpload,
  onItemImage1Upload,
  onItemImage2Upload,
  onItemImage3Upload,
  onItemImage4Upload,
  onItemImage5Upload,
  itemImageUrl,
  itemImageUrl1,
  itemImageUrl2,
  itemImageUrl3,
  itemImageUrl4,
  itemImageUrl5,
  resetItemImageInForm,
  deleteItemFromStore,
  uploadNewCategoryImage,
  newCategoryImageUrl,
  getStoreTax,
  storeTaxes,
  updateTax,
  subscribedTo,
  moreItemData,
  getMoreItemData,
  getItemVariants,
  getItemVariantCombinations,
  resetMoreItemData,
  itemVariantGroups,
  itemVariantCombinations,
  createVariantForItem,
  removeVariantForItem,
  removeVariantValueForItem,
  resetSubmittedItemId,
  showUpgradeNotification,
  showNotification,
  resetItemImageFromStore,
  resetItemImage1FromStore,
  resetItemImage2FromStore,
  resetItemImage3FromStore,
  resetItemImage4FromStore,
  resetItemImage5FromStore,
  text,
  roleId,
  getSubscribedModules,
  storeModules,
  selectedCategory,
  setSelectedCategory
}) => {
  useInjectReducer({ key: 'addItem', reducer })
  useInjectReducer({ key: 'storeTax', reducer: storeTaxReducer })
  useInjectSaga({ key: 'addItem', saga })
  useInjectSaga({ key: 'inventory', saga: inventorySaga })
  useInjectSaga({ key: 'storeTax', saga: storeTaxSaga })
  useInjectSaga({ key: 'storeInfo', saga:storeInfoSaga })
  useInjectReducer({ key: 'storeInfo',reducer: storeInfoReducer })
  const openNotification = placement => {
    notification.error({
      message: text,
      placement,
    })
  }

  const location = useLocation()
  const edit = location.state ? location.state.edit : false
  const item = location.state ? location.state.item : null
  const [picture, setPicture] = useState(edit ? (item.primary_img ? item.primary_img : null) : null)
  const [picture1, setPicture1] = useState(edit ? (item.img_url_1 ? item.img_url_1 : null) : null)
  const [picture2, setPicture2] = useState(edit ? (item.img_url_2 ? item.img_url_2 : null) : null)
  const [picture3, setPicture3] = useState(edit ? (item.img_url_3 ? item.img_url_3 : null) : null)
  const [picture4, setPicture4] = useState(edit ? (item.img_url_4 ? item.img_url_4 : null) : null)
  const [picture5, setPicture5] = useState(edit ? (item.img_url_5 ? item.img_url_5 : null) : null)

  const [itemName, setItemName] = useState(edit ? item.item_name : '')
  const [isVeg, setIsVeg] = useState(edit ? item.is_veg === 'Y' : false)
  const [itemDescription, setItemDescription] = useState(edit ? item.item_desc || '' : '')
  const [price, setPrice] = useState(edit ? item.price : '')
  const [isAvailable, setIsAvailable] = useState(edit ? item.item_status === 'AVAILABLE' : false)
  const [sellingPrice, setSellingPrice] = useState(edit ? (item.sale_price ? item.sale_price : '') : '')
  const [productSpecifications, setProductSpecifications] = useState([])
  const [additionalInfo, setAdditionalInfo] = useState([])

  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [updateVariant, setUpdateVariant] = useState(false)
  const [currentVariant, setCurrentVariant] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [variantCombinations, setVariantCombinations] = useState(null)
  const [variantCombinationsUpdated, setVariantCombinationsUpdated] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [variantWithImages, setVariantWithImages] = useState(null)
  const [showSaveButton, setShowSaveButton] = useState(false)

  const [showCreateSubCategoryModal, setShowCreateSubCategoryModal] = useState(false)
  const [subCategoryName, setSubCategoryName] = useState('')
  const [selectedModalCategory, setSelectedModalCategory] = useState(0)
  const [taxModal, showTaxModal] = useState(false)
  const [selectTax, setSelectTax] = useState('')
  const [taxes, setTaxes] = useState([])
  const [isTaxInclusive, setTaxInclusive] = useState(!!(edit && item && item.is_tax_inclusive == 'Y'))

  const { initialProdSpecs, initialAddInfo } = moreItemData

useEffect(() => {
  const SelectedItemCategory = categories&&item&&categories.filter(e => e.value === item.category_id)[0] ;
  setSelectedCategory(edit && SelectedItemCategory? SelectedItemCategory : { value: null, label: 'Choose Category' },)
}, [edit])

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMesssage] = useState('')
  const [prodSpecsError, setProdSpecsError] = useState(null)
  const [error,setError]=useState({
    name:false,
    price:false,
    sellingPrice:false,
  })

  const subCategoriesForSelectedCategory = selectedCategory
    ? getRequiredSubcategories(subCategories, selectedCategory.value)
    : []

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    edit
      ? subCategoriesForSelectedCategory.filter(e => e.value === item.sub_category_id)[0]
      : { value: null, label: 'Choose Subcategory' },
  )

  const populateAdditionalPostData = useCallback(
    itemData => {
      if (edit || submittedItemId) {
        const prodSpecsToDelete = []
        const addInfoToDelete = []
        const prodSpecsEdited = []
        const addInfoEdited = []
        const prodSpecsNew = []
        const addInfoNew = []
        initialProdSpecs.forEach(spec => {
          if (productSpecifications.findIndex(prodSpec => prodSpec.attribute_id === spec.attribute_id) === -1) {
            prodSpecsToDelete.push(spec.attribute_id)
          }
        })
        productSpecifications.forEach(spec => {
          if (spec.attribute_id) {
            if (spec.specification !== spec.attribute_key || spec.value !== spec.attribute_value) {
              prodSpecsEdited.push({
                specificationId: spec.attribute_id,
                key: spec.specification,
                value: spec.value,
              })
            }
          } else {
            prodSpecsNew.push({ attribute_key: spec.specification, attribute_value: spec.value })
          }
        })
        initialAddInfo.forEach(info => {
          if (additionalInfo.findIndex(addInfo => addInfo.entry_id === info.entry_id) === -1) {
            addInfoToDelete.push(info.entry_id)
          }
        })
        additionalInfo.forEach(addInfo => {
          if (addInfo.entry_id) {
            if (
              addInfo.title !== addInfo.TITLE ||
              addInfo.desc !== addInfo.description ||
              (addInfo.type === 'video' && addInfo.videoLink !== addInfo.media_url) ||
              (addInfo.type === 'image' && addInfo.imageUrl !== addInfo.media_url)
            ) {
              addInfoEdited.push({
                entryId: addInfo.entry_id,
                title: addInfo.title,
                mediaType: addInfo.type === 'video' ? 'VIDEO' : 'IMAGE',
                description: addInfo.desc,
                mediaUrl: addInfo.type === 'image' ? addInfo.imageUrl : addInfo.videoLink,
              })
            }
          } else {
            addInfoNew.push({
              title: addInfo.title,
              mediaType: addInfo.type === 'video' ? 'VIDEO' : 'IMAGE',
              description: addInfo.desc,
              mediaUrl: addInfo.type === 'image' ? addInfo.imageUrl : addInfo.videoLink,
            })
          }
        })
        if (prodSpecsToDelete.length || prodSpecsEdited.length || prodSpecsNew.length) {
          const toAdd = {
            toDelete: prodSpecsToDelete,
            editedAttributes: prodSpecsEdited,
            newAttributes: prodSpecsNew,
          }
          itemData = { ...itemData, productSpecifications: toAdd }
        }
        if (addInfoToDelete.length || addInfoEdited.length || addInfoNew.length) {
          const toAdd = {
            toDelete: addInfoToDelete,
            editedAttributes: addInfoEdited,
            newAttributes: addInfoNew,
          }
          itemData = { ...itemData, additionalProductInformation: toAdd }
        }
      } else {
        if (productSpecifications.length) {
          const toAdd = productSpecifications.map(spec => ({
            attribute_key: spec.specification,
            attribute_value: spec.value,
          }))
          itemData = { ...itemData, productSpecifications: toAdd }
        }
        if (additionalInfo.length) {
          const toAdd = additionalInfo.map(info => ({
            title: info.title,
            mediaType: info.type === 'video' ? 'VIDEO' : 'IMAGE',
            description: info.desc,
            mediaUrl: info.type === 'video' ? info.videoLink : info.imageUrl,
          }))
          itemData = { ...itemData, additionalProductInformation: toAdd }
        }
      }
      return itemData
    },
    [productSpecifications, additionalInfo, initialProdSpecs, initialAddInfo],
  )

  const history = useHistory()

  const onSubmit = (e, redirect) => {
    e.preventDefault()
    setRedirect(redirect)
    setShowError(false)
    if (!selectTax) {
      setErrorMesssage('* Please Select Tax before saving! Tax is mandatory')
      return setShowError(true)
    }
    if (parseFloat(sellingPrice) > parseFloat(price)) {
      setErrorMesssage('* Selling Price must be lower than the product price!')
      return setShowError(true)
    }

    let errorId = null
    productSpecifications.forEach(spec => {
      if (!spec.specification.toString().length || !spec.value.toString().length) {
        errorId = spec.id
      }
    })
    if (errorId) {
      return setProdSpecsError(errorId)
    }
    const itemData = {
      itemName,
      itemDesc: itemDescription,
      imgUrl: edit
        ? picture
          ? itemImageUrl || (item.primary_img ? item.primary_img : '')
          : ''
        : picture
          ? itemImageUrl
          : '',
      imgUrl1: edit
        ? picture1
          ? itemImageUrl1 || (item.img_url_1 ? item.img_url_1 : '')
          : ''
        : picture1
          ? itemImageUrl1
          : '',
      imgUrl2: edit
        ? picture2
          ? itemImageUrl2 || (item.img_url_2 ? item.img_url_2 : '')
          : ''
        : picture2
          ? itemImageUrl2
          : '',
      imgUrl3: edit
        ? picture3
          ? itemImageUrl3 || (item.img_url_3 ? item.img_url_3 : '')
          : ''
        : picture3
          ? itemImageUrl3
          : '',
      imgUrl4: edit
        ? picture4
          ? itemImageUrl4 || (item.img_url_4 ? item.img_url_4 : '')
          : ''
        : picture4
          ? itemImageUrl4
          : '',
      imgUrl5: edit
        ? picture5
          ? itemImageUrl5 || (item.img_url_5 ? item.img_url_5 : '')
          : ''
        : picture5
          ? itemImageUrl5
          : '',

      categoryId: selectedCategory ? selectedCategory.value : 0,
      subCategoryId: selectedSubCategory ? selectedSubCategory.value : 0,
      price: parseFloat(price),
      salePrice: parseFloat(sellingPrice),
      productCode: '',
      cuisineId: 0,
      isParcelTaxApplicable: 'N',
      isTaxInclusive: isTaxInclusive ? 'Y' : 'N',
      parcelCharge: 0,
      itemStatus: isAvailable ? 'AVAILABLE' : 'UNAVAILABLE',
      isVeg: store && store.store_type === 'RESTAURANT' ? (isVeg ? 'Y' : 'N') : 'Y',
      isCustomizable: variantCombinations && !Array.isArray(variantCombinations) ? 'Y' : 'N',
      isTodaysSpecial: 'N',
      serviceTimes: {},
      prepTime: 0,
      itemTaxCode: selectTax ? selectTax.label : '',
    }
    const postData = populateAdditionalPostData(itemData)
    const combinations = {}
    if (variantCombinations && !Array.isArray(variantCombinations))
      Object.values(variantCombinations).map(combination => {
        combinations[combination.variant_item_id] = {
          list_price: combination.list_price,
          sale_price: combination.sale_price,
          variant_item_status: combination.variant_item_status,
          is_displayable: combination.is_displayable,
          is_default: combination.is_default,
          inventory_quantity: 1,
        }
      })
    const itemId = !edit ? submittedItemId : item.item_id
    if (!itemId) {
      submitItemToStore(postData, storeId, merchantId, edit, null)
    } else {
      submitItemToStore(postData, storeId, merchantId, edit, itemId)
      combinations && submitVariantCombinations(combinations, itemId, storeId, merchantId)
    }
  }
  useEffect(() => {
    if (submissionStatus && redirect) {
      history.push('/app/manage-items')
    }
  })

  useEffect(() => {
    if (selectedCategory && selectedCategory.value === -1) {
      if (!showCreateSubCategoryModal) setShowCategoryModal(true)
    }
    if (selectedCategory && selectedCategory.value === -1) {
      setSelectedCategory({ value: null, label: 'Choose Category' })
    }
    if (selectedSubCategory && selectedSubCategory.value === -1) {
      if (!showCategoryModal) setShowCreateSubCategoryModal(true)
    }
    if (selectedSubCategory && selectedSubCategory.value === -1) {
      setSelectedSubCategory({ value: null, label: 'Choose Subcategory' })
    }
  }, [selectedCategory, selectedSubCategory])
  useEffect(() => {
    !edit ? setSelectedSubCategory({ value: null, label: 'Choose Subcategory' }) : null
  }, [selectedCategory])
  useEffect(() => {
    if (edit) {
      getMoreItemData(item.item_id)
      getItemVariants(item.item_id)
      getItemVariantCombinations(item.item_id)
    } else resetMoreItemData()
    onPageInit(true)
    resetItemImageInForm(true)
    resetSubmittedItemId()
    setVariantWithImages(null)
    showNotification(false, '')
  }, [])

  useEffect(() => {
    setVariantCombinations(itemVariantCombinations)
  }, [itemVariantCombinations])
  useEffect(() => {
    const variantWithImages = itemVariantGroups.find(variantGroup => variantGroup.is_image_available === 'Y')
    if (variantWithImages) setVariantWithImages(variantWithImages.variant_group_id)
    else setVariantWithImages(null)
  }, [itemVariantGroups])

  useEffect(() => {
    if (storeId) {
      getStoreTax({ storeId })
    }
  }, [storeId])

  useEffect(() => {
    if (storeTaxes) {
      const tax = storeTaxes.taxes.map(item => ({ label: item.item_tax_code, value: item.item_tax_code_id }))
      setTaxes([...tax, { label: '+ Create New Tax', value: -1 }])
      if (edit) {
        setSelectTax(edit ? tax.filter(e => e.label === item.item_tax_code)[0] : '')
      }
    }
  }, [storeTaxes, edit, item])
  useEffect(() => {
    resetItemImageFromStore()
    resetItemImage1FromStore()
    resetItemImage2FromStore()
    resetItemImage3FromStore()
    resetItemImage4FromStore()
    resetItemImage5FromStore()
  }, [])
  const setDefaultVariantCombination = variantItemId => {
    const newCombinations = variantCombinations
    for (const variantItem in newCombinations) {
      newCombinations[variantItem].is_default = 'N'
    }
    newCombinations[variantItemId].is_default = 'Y'
    setVariantCombinations(newCombinations)
    setVariantCombinationsUpdated(prev => !prev)
  }
  const variantCombinationsOnChange = (value, key, variantItemId) => {
    const newCombinations = variantCombinations
    newCombinations[variantItemId][key] = value
    setVariantCombinations(newCombinations)
    setVariantCombinationsUpdated(prev => !prev)
    setShowSaveButton(true)
  }
  const onDelete = redirect => {
    setRedirect(redirect)
    deleteItemFromStore(storeId, item.item_id, merchantId)
  }

  const modalCategories = getCategoriesForModal(categories)

  const onChangeTaxHandler = React.useCallback(
    tax => {
      if (tax.value == -1) {
        showTaxModal(true)
        return
      }
      setSelectTax(tax)
    },
    [selectTax],
  )

  const onSubmitTax = React.useCallback(
    tax => {
      updateTax({
        storeId,
        taxCode: tax.taxName,
        taxRate: tax.taxPercentage,
        taxDesc: tax.taxDesc,
        edit: true,
      })

      onCloseTaxModal()
    },
    [storeId],
  )

  const onCloseTaxModal = React.useCallback(() => {
    showTaxModal(false)
  }, [])
  useEffect(() => {
    getSubscribedModules(storeId,roleId)
  }, []);
  const [moreSpecifications, setMoreSpecifications] = useState(-1)
  const [moreInfo, setMoreInfo] = useState(-1)
  const [addAdditionalInfo, setAddAdditionalInfo] = useState(false)

  /* To initially load prod specs and additional info */
  useEffect(() => {
    const prodSpecs = initialProdSpecs.map((spec, id) => ({
      ...spec,
      id,
      specification: spec.attribute_key,
      value: spec.attribute_value,
    }))
    setProductSpecifications(prodSpecs)
    const addInfo = initialAddInfo.map((info, id) => {
      let imgUrl
      let vidUrl
      if (info.media_type === 'VIDEO') {
        const arr = info.media_url.split('=')
        const videoId = arr[arr.length - 1]
        imgUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        vidUrl = info.media_url
      } else {
        imgUrl = info.media_url
        vidUrl = ''
      }
      return {
        ...info,
        TITLE: info.title,
        id,
        type: info.media_type === 'VIDEO' ? 'video' : 'image',
        title: info.title,
        desc: info.description,
        imageUrl: imgUrl,
        videoLink: vidUrl,
        edit: false,
      }
    })
    setAdditionalInfo(addInfo)
  }, [initialProdSpecs, initialAddInfo])

  const deleteProductDetail = useCallback(
    id => {
      let updatedSpecifications = [...productSpecifications]
      updatedSpecifications = updatedSpecifications.filter(specification => specification.id !== id)
      setProductSpecifications(updatedSpecifications)
    },
    [productSpecifications],
  )

  const [showAdditionalInfoModal, setShowAdditionalInfoModal] = useState(null)

  /* For adding additional info data */
  const onAdditionalInfoSave = useCallback(
    updatedItem => {
      const newAddInfo = [...additionalInfo]
      if (updatedItem.edit) {
        const idx = newAddInfo.findIndex(addInfo => addInfo.id === updatedItem.id)
        newAddInfo[idx] = { ...updatedItem, edit: false }
        if (!updatedItem.imageUrl) {
          newAddInfo[idx].imageUrl = PlaceHolderImage
        }
      } else {
        if (!updatedItem.imageUrl) {
          updatedItem.imageUrl = PlaceHolderImage
        }
        newAddInfo.push({ ...updatedItem })
      }
      setAdditionalInfo(newAddInfo)
      setShowAdditionalInfoModal(null)
    },
    [additionalInfo],
  )

  /* For deleting additional info data */
  const onAdditionalInfoDelete = useCallback(
    updatedItem => {
      const newAddInfo = [...additionalInfo]
      const idx = newAddInfo.findIndex(addInfo => addInfo.id === updatedItem.id)
      newAddInfo.splice(idx, 1)
      setAdditionalInfo(newAddInfo)
      setShowAdditionalInfoModal(null)
    },
    [additionalInfo],
  )

  const addAdditionalPopup = (
    <div className="add_additional__info">
      <div
        className="imageUpload"
        onClick={e => {
          e.preventDefault()
          setShowAdditionalInfoModal({
            id: additionalInfo.length > 0 ? additionalInfo[additionalInfo.length - 1].id + 1 : 0,
            type: 'image',
            imageUrl: '',
            videoLink: '',
            title: '',
            desc: '',
            edit: false,
          })
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Add Image</span>
      </div>
      <span style={{ color: '#242424BF' }}>or</span>
      <div
        className="videoUpload"
        onClick={e => {
          e.preventDefault()
          setShowAdditionalInfoModal({
            id: additionalInfo.length > 0 ? additionalInfo[additionalInfo.length - 1].id + 1 : 0,
            type: 'video',
            imageUrl: '',
            videoLink: '',
            title: '',
            desc: '',
            edit: false,
          })
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <span>Embed Video</span>
      </div>
    </div>
  )

  const handleProdSpecsInputChange = (e, idx) => {
    e.preventDefault()
    setProdSpecsError(null)
    const {name,value} = e.target
    let slicedValue 
    if(name==='specification') slicedValue=value.slice(0,50)
    else slicedValue=value.slice(0,100)
    const updatedData = [...productSpecifications]
    updatedData[idx] = {
      ...updatedData[idx],
      [name]: slicedValue,
    }
    setProductSpecifications(updatedData)
    setShowSaveButton(true)
  }
  const menu = variantGroup => (
    <Menu>
      <Menu.Item>
        <div
          className="px-2"
          onClick={e => {
            e.preventDefault()
            setUpdateVariant(true)
            setCurrentVariant(variantGroup)
            setShowVariantModal(!showVariantModal)
          }}
        >
          Edit
        </div>
      </Menu.Item>
    </Menu>
  )

  const [maxImageCount, setMaxImageCount] = useState("");
  useEffect(() => {
    let num = storeModules && Object.keys(storeModules).length;
    setMaxImageCount(num > 0 && storeModules && storeModules[globalEnums.INVENTORY]&& storeModules[globalEnums.INVENTORY].submodules[inventoryEnums.ITEMS].plan_rules.image_count)
  }, [storeModules]);
  return (
    <div>
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4 text-xl">
          <p className="flex mr-4 text-xl font-medium text-heavy">
            <NavLink className="mr-4" to="/app/manage-items">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            {edit ? 'Edit' : 'Add New'} Product
          </p>
          <TopNav />
        </div>
      </div>

      {!subscribedTo.modules[globalEnums.INVENTORY] ? (
        <Redirect to="/app/manage-items" />
      ) : (
        <>
          <FormPage className="px-2 md:my-10 md:px-10 st-form" onSubmit={e => onSubmit(e, true)}>
            <div className="flex justify-between">
              <p className="my-4 text-lg md:text-xl item-label-title">Product Information</p>
            </div>
            <div className="addItemPage-card items-center px-2 py-2 md:px-10 md:py-2 bg-white rounded-lg w-full ">
              <div className="md:flex mx-4 my-6 ">
                <div className="flex gap-2">
                  <CardSubtext text="Product Images" />
                  <small style={{ fontSize: '0.8em' }} className="mt-1 text-muted-light font-medium">
                    ( Upto {maxImageCount} )
                  </small>
                </div>
                <small style={{ fontSize: '0.8em' }} className="mt-1 text-muted-light font-medium">
                  &nbsp;( You can upload jpg, png format of size 1MB or less with a minimum resolution of 512x512 )
                </small>
              </div>
              <div className="md:flex justify-start">
                <div className="my-4 mx-4 md:w-1/3">
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture}
                    setPicture={setPicture}
                    remove={() => setPicture('')}
                    onItemImageUpload={onItemImageUpload}
                    storeId={storeId}
                    imageType="Primary"
                  />
                </div>
                  {maxImageCount>=2&&  <div className={`${picture1 || picture ? 'visible' : 'invisible'} my-4 mx-4 md:w-1/3`}>
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture1}
                    setPicture={setPicture1}
                    remove={() => setPicture1('')}
                    onItemImageUpload={onItemImage1Upload}
                    storeId={storeId}
                    imageType="1st"
                    className="w-1/3"
                  />
                </div>}
                  { maxImageCount>= 3 && <div className={`${picture2 || picture1 ? 'visible' : 'invisible'} my-4 mx-4 md:w-1/3`}>
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture2}
                    setPicture={setPicture2}
                    remove={() => setPicture2('')}
                    onItemImageUpload={onItemImage2Upload}
                    storeId={storeId}
                    imageType="2nd"
                  />
                </div>}
                  {maxImageCount >= 4 && <div className={`${picture3 || picture2 ? 'visible' : 'invisible'} my-4 mx-4 md:w-1/3`}>
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture3}
                    setPicture={setPicture3}
                    remove={() => setPicture3('')}
                    onItemImageUpload={onItemImage3Upload}
                    storeId={storeId}
                    imageType="3rd"
                  />
                </div>}
                  {maxImageCount >= 5 &&   <div className={`${picture4 || picture3 ? 'visible' : 'invisible'} my-4 mx-4 md:w-1/3`}>
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture4}
                    setPicture={setPicture4}
                    remove={() => setPicture4('')}
                    onItemImageUpload={onItemImage4Upload}
                    storeId={storeId}
                    imageType="4th"
                  />
                </div>}
            {maxImageCount >= 6 &&  <div className={`${picture5 || picture4 ? 'visible' : 'invisible'} my-4 mx-4 md:w-1/3`}>
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={picture5}
                    setPicture={setPicture5}
                    remove={() => setPicture5('')}
                    onItemImageUpload={onItemImage5Upload}
                    storeId={storeId}
                    imageType="5th"
                  />
                </div>}
              </div>
            </div>
            {/* Card */}
            <div className="addItemPage-card w-full h-auto px-2 py-4 md:px-10 md:py-8 bg-white rounded-lg">
              <div className="mx-4 mt-4">
                <CardSubtext text="Name *" />
                <input
                  placeholder="Product Name Here"
                  className="block w-full mb-6 mt-2 form-input focus:bg-white focus-outline-none focus:boreder-secondary"
                  id=""
                  type="text"
                  value={itemName}
                  onChange={e => {
                    setShowSaveButton(true)
                    setItemName(e.target.value)
                    setError({...error,name:false})
                  }}
                  name="itemName"
                  required
                />
                {error.name&&<p className='text-red-500 font-semibold'>Please enter the name of Product</p>}
              </div>

              <div className="px-4 mt-8 md:flex md:justify-evenly gap-4">
                <div className="md:w-1/2">
                  <CardSubtext text="Price *" />
                  <input
                    placeholder="Enter Cost Price Here"
                    className="addItemPage-priceInput block w-full mb-4 form-input focus:bg-white"
                    id=""
                    type="number"
                    onKeyDown={e =>numberInputValidation(e)}
                    onChange={e => {
                      setShowSaveButton(true)
                      setPrice(e.target.value)
                      setError({...error,price:false})
                      setShowError(false)
                    }}
                    value={price}
                    name="priceAmt"
                    required
                  />
                    {error.price && <p className='text-red-500 font-semibold'>Please enter the price of Product</p>}
                </div>
                <div className="md:w-1/2">
                  <CardSubtext text="Selling Price *" />
                  <input
                    placeholder="Enter Selling Price Here"
                    className="addItemPage-priceInput block w-full mb-4 form-input focus:bg-white"
                    id=""
                    type="number"
                    onKeyDown={e=>numberInputValidation(e)}
                    onChange={e => {
                      setShowSaveButton(true)
                      setSellingPrice(e.target.value)
                      setError({...error,sellingPrice:false})
                      setShowError(false)
                    }}
                    value={sellingPrice}
                    name="priceAmt"
                    required
                  />
                    {error.sellingPrice && <p className='text-red-500 font-semibold'>Please enter the selling price of Product</p>}
                </div>
              </div>
              <div className="px-4 mt-8 md:flex md:justify-evenly gap-4">
                <div className="md:w-1/2">
                  <CardSubtext text="Category" />
                  <Select
                    className="text-gray-600 mb-4 w-full border border-gray-400 rounded-lg focus:outline-none"
                    styles={customSelect}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    hasValue
                    placeholder="Select Category"
                    defaultValue={selectedCategory}
                    options={categories}
                    onChange={e => {
                      setSelectedCategory(e)
                      setShowSaveButton(true)
                      setSelectedSubCategory({ value: null, label: 'Choose Subcategory' })
                    }}
                    value={selectedCategory}
                  />
                </div>
                <div className="md:w-1/2">
                  <CardSubtext text="Sub Category" />
                  <Select
                    className="text-gray-600 mb-4 w-full border border-gray-400 rounded-lg focus:outline-none"
                    placeholder="Select Sub Category"
                    styles={customSelect}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    hasValue
                    defaultValue={selectedSubCategory}
                    options={subCategoriesForSelectedCategory}
                    onChange={e => {
                      setShowSaveButton(true)
                      setSelectedSubCategory(e)
                    }}
                    value={selectedSubCategory}
                  />
                </div>
              </div>

              <div className="px-4 mt-4 gap-4">
                <CardSubtext text="Item Description (Only 200 chars.)" />
                <textarea
                  value={itemDescription}
                  onChange={e => {
                    setShowSaveButton(true)
                    setItemDescription(e.target.value.slice(0,200))
                  }}
                  className="block w-full h-32 text-gray-700 border rounded focus:outline-none focus:shadow-outline form-input"
                  placeholder="Enter Product Description"
                  rows="4"
                />
              </div>
                  {itemDescription.length > 200 && <p className='text-red-500 font-semibold mx-4 my-2'>Item Description cannot have more than 200 characters</p>}

              <div className="px-4 mt-8 md:flex  gap-4">
                {store && store.store_type === Store_Type.RESTAURANT && (
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <CardSubtext text="Non-Veg / Veg" />
                      <div className="flex gap-4">
                        <BinaryToggle
                          activeColor="#1EAF82"
                          inactiveColor="#F62626"
                          toggle={isVeg}
                          toggleCallback={() => setIsVeg(!isVeg)}
                        />
                        <p
                          style={{ color: isVeg ? '#1EAF82' : '#F62626' }}
                          className="text-base md:text-lg item-label font-normal"
                        >
                          {isVeg ? 'Veg' : 'Non-Veg'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="md:w-1/2">
                  <CardSubtext text="Availability" />
                  <div className="flex gap-4">
                    <BinaryToggle
                      inactiveColor="rgba(36,36,36,0.3)"
                      activeColor="#F64B5D"
                      toggle={isAvailable}
                      toggleCallback={() => {
                        setShowSaveButton(true)
                        setIsAvailable(!isAvailable)
                      }}
                    />
                    <p className="text-base md:text-lg item-label font-normal">{isAvailable ? 'On' : 'Off'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full my-4 flex-col h-auto py-4 md:py-10 bg-white rounded-lg">
              <div className=" mt-4 mb-4 border-gray-300 border-b-2 px-4 md:px-10 ">
                <CardSubtext text="Tax Configuration" />
                <div className="flex flex-row pb-6">
                  {' '}
                  <BinaryToggle
                    inactiveColor="rgba(36,36,36,0.3)"
                    activeColor="#F64B5D"
                    toggle={isTaxInclusive}
                    toggleCallback={() => {
                      setShowSaveButton(true)
                      setTaxInclusive(!isTaxInclusive)
                    }}
                  />
                  <p className="sm:text-sm md:text-base text-muted-med font-normal">
                    &nbsp;&nbsp;Price Inclusive of TAX
                  </p>
                </div>
              </div>

              <div className="ml-2 mt-4 mb-4 px-4 md:px-10">
                <CardSubtext text="Tax Charge *" />
                <Select
                  className=" text-gray-600 w-full md:w-1/2 border border-gray-400 rounded-lg focus:outline-none"
                  hasValue
                  styles={customSelect}
                  components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                  placeholder="Select Tax Charge"
                  defaultValue={selectTax}
                  options={taxes}
                  onChange={e => {
                    setShowSaveButton(true)
                    onChangeTaxHandler(e)
                    setShowError(false)
                  }}
                  value={selectTax}
                />
                  {showError && <div className="text-sm text-secondary font-semibold">{errorMessage}</div>}
              </div>
            </div>
              {storeModules && storeModules[globalEnums.INVENTORY] && storeModules[globalEnums.INVENTORY].submodules[inventoryEnums.ITEM_VARIANTS]? <div className="flex w-full my-4 flex-col h-auto bg-white rounded-lg">
              {/* Heading */}
              <div className="px-4 md:px-10 py-4 md:py-10 border-gray-300 border-b-2">
                <CardSubtext text="Variant Options" />
                <div className="flex flex-row">
                  <p className="text-xs text-muted-med font-medium">
                    Add details of the product that has multiple options, like different sizes or colors
                  </p>
                </div>
              </div>
              <div className="px-4 py-4 md:px-10 border-gray-300 border-b-2">
                {itemVariantGroups.length > 0 ? (
                  <>
                    <div>
                      {itemVariantGroups.map(variantGroup => {
                        let images = []
                        variantGroup.variantValues.map(variant => {
                          if (variant.variant_value_images)
                            images = images.concat(Object.values(variant.variant_value_images))
                        })
                        const variantGroupImages = images.filter(variantImg => variantImg)
                        return (
                          <div className=" pl-2 pr-1 mb-4 flex w-full text-black justify-between py-2">
                            <MediaQuery maxDeviceWidth={426}>
                              <div className="variant-options-list flex">
                                <div>{variantGroup.variant_group_name}</div>
                                <div className="flex items-center flex-wrap">
                                  {variantGroup.variantValues.map((variantValue, index) => (
                                    <span style={{ whiteSpace: 'nowrap' }} className="mr-2 flex items-center">
                                      {variantValue.variant_value_metadata && (
                                        <div
                                          style={{
                                            borderRadius: '50%',
                                            background: variantValue.variant_value_metadata.color_hexcode,
                                            width: '13px',
                                            height: '13px',
                                            marginRight: '5px',
                                          }}
                                        />
                                      )}
                                      {variantValue.variant_value_name}
                                      {variantGroup.variantValues.length - 1 !== index && ','}
                                    </span>
                                  ))}
                                </div>
                                {variantGroupImages.length !== 0 && (
                                  <div
                                    style={{
                                      position: 'relative',
                                      height: '50px',
                                      width: '50px',
                                      borderRadius: '5px',
                                    }}
                                  >
                                    <img
                                      className="variantGroup-image"
                                      src={variantGroupImages[0]}
                                      alt="variant-image"
                                    />

                                    <div className="py-2 variantGroup-image-overlay text-xs flex items-end justify-center">
                                      <div>{variantGroupImages.length - 1 && `+ ${variantGroupImages.length - 1}`}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div>
                                <Dropdown overlay={menu(variantGroup)} trigger={['click']}>
                                  <span style={{ color: '#929292', fontSize: '20px' }}>&#8942;</span>
                                </Dropdown>
                              </div>
                            </MediaQuery>
                            <MediaQuery minDeviceWidth={426}>
                              <div className="w-1/4">{variantGroup.variant_group_name}</div>
                              <div className="w-1/4 flex items-center flex-wrap">
                                {variantGroup.variantValues.map((variantValue, index) => (
                                  <span style={{ whiteSpace: 'nowrap' }} className="mr-2 flex items-center">
                                    {variantValue.variant_value_metadata && (
                                      <div
                                        style={{
                                          borderRadius: '50%',
                                          background: variantValue.variant_value_metadata.color_hexcode,
                                          width: '13px',
                                          height: '13px',
                                          marginRight: '5px',
                                        }}
                                      />
                                    )}
                                    {variantValue.variant_value_name}
                                    {variantGroup.variantValues.length - 1 !== index && ','}
                                  </span>
                                ))}
                              </div>

                              <div
                                className="w-1/4"
                                style={{
                                  position: 'relative',
                                  height: '40px',
                                  width: '40px',
                                  borderRadius: '5px',
                                }}
                              >
                                {variantGroupImages.length !== 0 && (
                                  <>
                                    <img
                                      className="variantGroup-image"
                                      src={variantGroupImages[0]}
                                      alt="variant-image"
                                    />

                                    <div className="variantGroup-image-overlay flex items-center justify-center">
                                      <div>{variantGroupImages.length - 1 && `+ ${variantGroupImages.length - 1}`}</div>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div
                                onClick={() => {
                                  setUpdateVariant(true)
                                  setCurrentVariant(variantGroup)
                                  setShowVariantModal(!showVariantModal)
                                }}
                                className="variant-group-edit-button"
                              >
                                <img src={Edit} style={{ height: '15px', width: '15px', cursor: 'pointer' }} />
                              </div>
                            </MediaQuery>
                          </div>
                        )
                      })}
                    </div>
                    {itemVariantGroups.length < 10 && (
                      <button
                        style={addAnother}
                        onClick={e => {
                          e.preventDefault()
                          setUpdateVariant(false)
                          setCurrentVariant(null)
                          setShowVariantModal(!showVariantModal)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#F64B5D"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Another Option
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-6">
                    <button
                      className="ml-2 mt-4 mb-4"
                      style={buttonStyle}
                      onClick={e => {
                        e.preventDefault()
                        if (!edit) onSubmit(e, false)
                        setUpdateVariant(false)
                        setCurrentVariant(null)
                        selectTax && parseFloat(sellingPrice) <= parseFloat(price)
                          ? setShowVariantModal(!showVariantModal)
                          : null
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#F64B5D"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Options
                    </button>
                    {!apiStatus && (
                      <div className="text-sm font-semibold text-secondary">
                        Something went wrong! Please try again!
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Main Data */}
              {variantCombinations && !Array.isArray(variantCombinations) ? (
                <div>
                  <div className="px-4 py-4 md:px-10">
                    <CardSubtext text="Manage Variants" />
                  </div>
                  <div className="variant-items-table">
                    <table className="w-full text-black">
                      <tr style={{ background: '#1A24551A', whiteSpace: 'nowrap' }}>
                        <th className="variant-table-left-col item-label text-left flex items-center pr-2 py-4">
                          <span>Default</span>
                          <Tooltip
                            title="The selected option will be displayed to your customers as a default variant option on the website (a variant combination with lower price is prefferable)"
                            arrowPointAtCenter
                            color="#242424"
                          >
                            <AiOutlineInfoCircle
                              className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                              size={18}
                            />
                          </Tooltip>{' '}
                        </th>
                        <th className="item-label text-left px-2 py-4">Variants</th>
                        <th className="item-label text-left px-2 py-4">Price</th>
                        <th className="item-label text-left px-2 py-4">Selling Price</th>
                        <th className="item-label text-left px-2 py-4">Status</th>
                        <th className="variant-table-right-col item-label text-left px-2 flex items-center pl-2 py-4 ">
                          <span>Visibility</span>
                          <Tooltip title="Show / Hide this variant from your store." arrowPointAtCenter color="#242424">
                            <AiOutlineInfoCircle
                              className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                              size={18}
                            />
                          </Tooltip>
                        </th>
                      </tr>
                      {Object.values(itemVariantCombinations).map(variantItem => (
                        <tr style={{ borderBottom: '.5px solid #2424243F', whiteSpace: 'nowrap' }}>
                          <td className="variant-table-left-col pr-2 py-4 md:py-6">
                            <Checkbox
                              checked={variantItem.is_default === 'Y'}
                              onChange={() => {
                                setShowSaveButton(true)
                                setDefaultVariantCombination(variantItem.variant_item_id)
                              }}
                            />
                          </td>
                          <td style={{ whiteSpace: 'normal' }} className="px-2 md:px-2 py-4">
                            {`${variantItem.variant_value_1 ? variantItem.variant_value_1.variant_value_name : ''} 
                            ${variantItem.variant_value_1 && variantItem.variant_value_2 ? '| ' : ''}

                            ${variantItem.variant_value_2 ? variantItem.variant_value_2.variant_value_name : ''}
                            ${variantItem.variant_value_2 && variantItem.variant_value_3 ? '| ' : ''}
                            
                            ${variantItem.variant_value_3 ? variantItem.variant_value_3.variant_value_name : ''} 
                            ${variantItem.variant_value_3 && variantItem.variant_value_4 ? '| ' : ''}
                            
                            ${variantItem.variant_value_4 ? variantItem.variant_value_4.variant_value_name : ''} 
                            ${variantItem.variant_value_4 && variantItem.variant_value_5 ? '| ' : ''}
                            
                            ${variantItem.variant_value_5 ? variantItem.variant_value_5.variant_value_name : ''}`}
                          </td>
                          <td className="px-2 md:px-2 py-4">
                            <input
                              required
                              style={{
                                outline: 'none',
                                fontSize: '1rem',
                                padding: '5px 10px',
                                borderRadius: '3px',
                                width: '150px',
                              }}
                              className="border border-gray-400 focus:outline-none focus:border-secondary "
                              value={variantItem.list_price}
                              onChange={e =>
                                variantCombinationsOnChange(e.target.value, 'list_price', variantItem.variant_item_id)
                              }
                            />
                          </td>
                          <td className="px-2 md:px-2 py-4">
                            <input
                              required
                              style={{
                                outline: 'none',
                                fontSize: '1rem',
                                padding: '5px 10px',
                                borderRadius: '3px',
                                width: '150px',
                              }}
                              className="border border-gray-400 focus:outline-none focus:border-secondary "
                              value={variantItem.sale_price}
                              onChange={e =>
                                variantCombinationsOnChange(e.target.value, 'sale_price', variantItem.variant_item_id)
                              }
                            />
                          </td>
                          <td className="px-2 md:px-2 py-4">
                            <div className="flex gap-2">
                              <BinaryToggle
                                inactiveColor="rgba(36,36,36,0.3)"
                                activeColor="#1492E6"
                                toggle={variantItem.variant_item_status === 'AVAILABLE'}
                                toggleCallback={() => {
                                  const value =
                                    variantItem.variant_item_status === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE'
                                  variantCombinationsOnChange(value, 'variant_item_status', variantItem.variant_item_id)
                                }}
                              />
                              <span>
                                {variantItem.variant_item_status === 'AVAILABLE' ? 'In Stock' : 'Out Of Stock'}
                              </span>
                            </div>
                          </td>
                          <td className="variant-table-right-col pl-2 py-4 md:py-6 ">
                            <div className="flex gap-2">
                              <BinaryToggle
                                inactiveColor="rgba(36,36,36,0.3)"
                                activeColor="#1492E6"
                                toggle={variantItem.is_displayable === 'Y'}
                                toggleCallback={() => {
                                  const value = variantItem.is_displayable === 'Y' ? 'N' : 'Y'
                                  variantCombinationsOnChange(value, 'is_displayable', variantItem.variant_item_id)
                                }}
                              />
                              <span>{variantItem.is_displayable === 'Y' ? 'On' : 'Off'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              ) : null}
            </div>:            
                <div className="flex w-full my-4 cursor-not-allowed text-gray-300 bg-white rounded-lg justify-between">   
                  <div className="px-4 md:px-10 py-4 md:py-10">
                    <CardSubtext text="Variant Options" />
                    <div className="flex flex-row">
                      <p className="text-xs text-muted-med font-medium">
                        Add details of the product that has multiple options, like different sizes or colors
                      </p>
            </div>
                  </div>
                 

                  <span className="text-white flex-none my-auto cursor-pointer rounded-lg p-2 px-4 mr-5" style={{ background:"rgba(246, 76, 93)"}} onClick={() => history.push('/app/general/payment-plan')}>
                    Upgrade
                  </span>
                </div>
            }
            {/* Product Specifications */}
            <div className="flex w-full my-4 flex-col h-auto py-4 md:py-10 bg-white rounded-lg">
              <div className="mt-4 mb-4 border-gray-300 border-b-2 px-4 md:px-10">
                <CardSubtext text="Product Specifications" />
                <div className="flex flex-row pb-4">
                  <p className="text-xs text-muted-med font-medium">
                    Add more details or specifications about this product to help the user understand about it
                  </p>
                </div>
              </div>

              <div className="ml-2 mt-4 mb-4 px-4 md:px-10">
                {productSpecifications.length > 0 ? (
                  <>
                    <div className="w-full flex justify-between">
                      <div style={{ width: '45%', marginRight: '10px', flex: 'none' }}>
                        <CardSubtext text="Specification" />
                      </div>
                      <div style={{ width: '45%', flex: 'none' }}>
                        <CardSubtext text="Value" />
                      </div>
                      <div style={{ width: 'auto', flex: 'none' }}>
                        <img
                          src={trash}
                          style={{ height: '22px', width: '22px', visibility: 'hidden' }}
                          onClick={e => {
                            e.preventDefault()
                            let updatedSpecifications = [...productSpecifications]
                            updatedSpecifications = updatedSpecifications.filter(
                              specification => specification.id !== spec.id,
                            )
                            setProductSpecifications(updatedSpecifications)
                          }}
                        />
                      </div>
                    </div>
                    {productSpecifications.map((spec, idx) => (
                      <div className="flex flex-col w-full h-auto flex-none" key={spec.id}>
                        <div className="product__specification">
                          <div className="specification flex-none">
                            <input
                              name="specification"
                              value={spec.specification}
                              onChange={e => handleProdSpecsInputChange(e, idx)}
                              placeholder="e.g., Color"
                            />
                          </div>
                          <div className="value flex-none">
                            <input
                              name="value"
                              value={spec.value}
                              onChange={e => handleProdSpecsInputChange(e, idx)}
                              placeholder="e.g., Red"
                            />
                          </div>
                          <div className="trash flex-none">
                            <MediaQuery minDeviceWidth={426}>
                              <img
                                src={trash}
                                style={{ height: '24px', width: '24px' }}
                                onClick={e => {
                                  e.preventDefault()
                                  deleteProductDetail(spec.id)
                                }}
                              />
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={426}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#242424a4"
                                style={{ height: '24px', width: '24px' }}
                                onClick={e => {
                                  e.preventDefault()
                                  if (moreSpecifications === spec.id) setMoreSpecifications(-1)
                                  else setMoreSpecifications(spec.id)
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                              {moreSpecifications === spec.id && (
                                <span
                                  className="moreOptions"
                                  onClick={e => {
                                    e.preventDefault()
                                    deleteProductDetail(spec.id)
                                    setMoreSpecifications(-1)
                                  }}
                                >
                                  Delete
                                </span>
                              )}
                            </MediaQuery>
                          </div>
                        </div>
                        <div className="product__specification">
                          {spec.specification && spec.specification.length === 50 && <p className='text-red-500 font-semibold my-2'>Max Limit Key cannot have more than 50 characters</p>}
                          {spec.value && spec.value.length === 100 && <p className='text-red-500 font-semibold my-2'>Max Limit Value cannot have more than 100 characters</p>}
                          <span></span>
                        </div>
                        {prodSpecsError && prodSpecsError === spec.id && (
                          <p className="w-full text-red-500">*This field is required.</p>
                        )}
                      </div>
                    ))}
                    {productSpecifications.length < 10 && (
                      <button
                        style={addAnother}
                        onClick={e => {
                          e.preventDefault()
                          setMoreSpecifications(-1)
                          const updatedSpecifications = [...productSpecifications]
                          const new_id = updatedSpecifications[updatedSpecifications.length - 1].id + 1
                          updatedSpecifications.push({ id: new_id, specification: '', value: '' })
                          setProductSpecifications(updatedSpecifications)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#F64B5D"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Another Spec.
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    style={buttonStyle}
                    onClick={e => {
                      e.preventDefault()
                      setProductSpecifications([{ id: 0, specification: '', value: '' }])
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#F64B5D"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Product Details
                  </button>
                )}
              </div>
            </div>
            {/* Additional Info */}
            <div className="flex w-full my-4 flex-col h-auto py-4 md:py-10 bg-white rounded-lg">
              {/* Heading */}
              <div className="mt-4 mb-4 border-gray-300 border-b-2 px-4 md:px-10">
                <CardSubtext text="Additional Info" />
                <div className="flex flex-row pb-4">
                  <p className="text-xs text-muted-med font-medium">
                    Add more info with images or videos to showcase your product in a fancy way
                  </p>
                </div>
              </div>

              {/* Main Data */}
              <div className="ml-2 mt-4 mb-4 px-4 md:px-10">
                {additionalInfo.length > 0 ? (
                  <>
                    {additionalInfo.map(addInfo => (
                      <>
                      <div className="additionalInfo__row" key={addInfo.id}>
                        <div className="left">
                          <div
                            className={`additionalInfo__image ${addInfo.type === 'video' && `additionalInfo__overlay`}`}
                          >
                            <img src={addInfo.imageUrl} alt={addInfo.title} style={{ height: '100%', width: '100%' }} />
                            {addInfo.type === 'video' && (
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="white"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="additionalInfo__title">{addInfo.title}</div>
                          <MediaQuery maxDeviceWidth={426}>
                            <div className="relative ml-auto flex-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-none ml-auto"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#242424a4"
                                style={{ height: '24px', width: '24px' }}
                                onClick={e => {
                                  e.preventDefault()
                                  if (moreInfo === addInfo.id) setMoreInfo(-1)
                                  else setMoreInfo(addInfo.id)
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                              {moreInfo === addInfo.id && (
                                <span
                                  className="moreOptions"
                                  onClick={e => {
                                    e.preventDefault()
                                    setMoreInfo(-1)
                                    setShowAdditionalInfoModal({ ...addInfo, edit: true })
                                  }}
                                >
                                  Edit
                                </span>
                              )}
                            </div>
                          </MediaQuery>
                        </div>
                        <div className="right">
                          <div className="additionalInfo__desc">{addInfo.desc}</div>
                          <MediaQuery minDeviceWidth={426}>
                            <div
                              className="additionalInfo__edit"
                              onClick={e => {
                                e.preventDefault()
                                setShowAdditionalInfoModal({ ...addInfo, edit: true })
                              }}
                            >
                              <img src={Edit} alt="Edit" />
                            </div>
                          </MediaQuery>
                        </div>
                      </div>
                        <div className="product__specification">
                          {addInfo.title && addInfo.title.length > 50 && <p className='text-red-500 font-semibold my-2'>Title cannot have more than 50 characters</p>}
                          {addInfo.desc && addInfo.desc.length > 200 && <p className='text-red-500 font-semibold my-2'>Description cannot have more than 200 characters</p>}
                          <span></span>
                        </div>
                      </>
                    ))}
                    {additionalInfo.length < 6 && (
                      <button
                        style={addAnother}
                        onClick={e => {
                          e.preventDefault()
                          setMoreInfo(-1)
                          setAddAdditionalInfo(!addAdditionalInfo)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="#F64B5D"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add Another Section
                        {addAdditionalInfo && addAdditionalPopup}
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    style={buttonStyle}
                    onClick={e => {
                      e.preventDefault()
                      setAddAdditionalInfo(!addAdditionalInfo)
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#F64B5D"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Additional Details
                    {addAdditionalInfo && addAdditionalPopup}
                  </button>
                )}
              </div>
            </div>
            {!apiStatus && (
              <p className="text-sm font-semibold text-secondary">Something went wrong! Please try again!</p>
            )}
            {showError && <p className="text-sm text-secondary font-semibold">{errorMessage}</p>}
            <div
              style={{ marginBottom: '10rem' }}
              className="editItemPage-buttons-container  md:flex flex-row-reverse justify-between w-full mb-5 "
            >
              <MediaQuery minDeviceWidth={1100}>
                {edit ? (
                  showSaveButton && (
                    <div
                      className="editItemPage-rightButtons-container absolute bottom-0 bg-white p-2"
                      style={{ width: 'calc(100% - 417px)', zIndex: '100' }}
                    >
                      <button
                        type="submit"
                        onClick={()=>{
                          setError({
                            name: itemName ? false : true,
                            price: price ? false : true,
                            sellingPrice: sellingPrice ? false : true
                          })
                        }}
                        className=" desktopVersion editItemPage-save-add-Button w-full  h-auto px-4 py-2text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                      >
                        {edit ? 'Update Product' : 'Add Product'}
                      </button>
                    </div>
                  )
                ) : (
                  <div className="bg-mob">
                    <button
                      type="submit"
                          onClick={() => {
                            setError({
                              name: itemName ? false : true,
                              price: price ? false : true,
                              sellingPrice: sellingPrice ? false : true
                            })
                          }}
                      className=" desktopVersion editItemPage-save-add-Button  h-auto px-4 py-2text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                    >
                      {edit ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                )}
              </MediaQuery>
              {edit && (
                <button
                  type="button"
                  className="editItemPage-deleteButton flex font-semibold hover:border-secondary text-base text-secondary"
                  onClick={() => onDelete(true)}
                >
                  <img src={trash} style={{ height: '25px', width: '25px', marginRight: '4px' }} />
                  &nbsp; Delete Item
                </button>
              )}
            </div>
            <MediaQuery maxDeviceWidth={1100}>
              <div className="bg-white flex justify-between" style={{ paddingBottom: '90px' }}>
                <div
                  className=" w-full bottomButtons bg-white items-center place-items-center text-center"
                  style={{ marginBottom: '0.8rem' }}
                >
                  <button
                    type="submit"
                      onClick={() => {
                        setError({
                          name: itemName ? false : true,
                          price: price ? false : true,
                          sellingPrice: sellingPrice ? false : true
                        })
                      }}
                    className=" editItemPage-save-add-Button w-auto h-auto px-4 text-white rounded-lg hover:bg-red-700 bg-secondary focus:outline-none cta-btn"
                  >
                    {edit ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </div>
            </MediaQuery>
          </FormPage>
          {showAdditionalInfoModal && (
            <AdditionalInfoModal
              item={showAdditionalInfoModal}
              closeModal={e => {
                e.preventDefault()
                setShowAdditionalInfoModal(null)
              }}
              onSave={onAdditionalInfoSave}
              onDelete={onAdditionalInfoDelete}
              storeId={storeId}
              setShowSaveButton={setShowSaveButton}
            />
          )}
          {showCategoryModal && (
            <CreateCategoryModal
              setSelectedCategory={setSelectedCategory}
              setNewCategoryName={setNewCategoryName}
              setShowCreateCategoryModal={setShowCategoryModal}
              submitCategory={createNewCategoryForStore}
              storeId={storeId}
              merchantId={merchantId}
              newCategoryName={newCategoryName}
              categoryImageUpload={uploadNewCategoryImage}
              imgUrl={newCategoryImageUrl}
            />
          )}
          {showVariantModal && (
            <AddVariantsModal
              setShowSaveButton={setShowSaveButton}
              setShowVariantModal={setShowVariantModal}
              submitVariant={createVariantForItem}
              onDeleteVariant={removeVariantForItem}
              onDeleteVariantValue={removeVariantValueForItem}
              variantWithImages={variantWithImages}
              storeId={storeId}
              itemId={edit ? item.item_id : submittedItemId}
              merchantId={merchantId}
              updateVariant={updateVariant}
              currentVariant={currentVariant}
              itemImages={[picture, picture1, picture2, picture3, picture4, picture5]}
            />
          )}
          {taxModal && <CreateTaxModal onClose={onCloseTaxModal} onSubmit={onSubmitTax} />}
          {showCreateSubCategoryModal && (
            <Modal
              closeModal={() => {
                setSubCategoryName('')
                setShowCreateSubCategoryModal(false)
              }}
              title="New SubCategory"
              onCreateAttribute={() => {
                const categoryId = selectedModalCategory.value || selectedCategory.value
                createNewSubCategoryForStore(storeId, merchantId, categoryId, subCategoryName)
                setShowCreateSubCategoryModal(false)
                setSubCategoryName('')
              }}
            >
              <FormPage className="st-form">
                <Select
                  className="font-bold text-gray-600 mb-4 w-full border border-gray-400 rounded-lg focus:outline-none"
                  styles={customSelect}
                  components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                  options={modalCategories}
                  defaultValue={selectedCategory}
                  onChange={setSelectedModalCategory}
                />
                <input
                  className="w-full mt-4 form-input"
                  type="text"
                  placeholder="New Subcategory here"
                  value={subCategoryName}
                  onChange={e => setSubCategoryName(e.target.value)}
                />
              </FormPage>
            </Modal>
          )}
        </>
      )}
      {showUpgradeNotification && openNotification('topRight')}
    </div>
  )
}

const mapStateToProps = state => ({
  merchantId: state.get('global').user.merchantId,
  storeId: state.get('global').store.store_id,
  roleId: state.get('global').user.role_id,
  subscribedTo: state.get('global').subscription_details,
  categories: categorySelector(state),
  subCategories: subCategoriesSelector(state),
  submissionStatus: state.get('inventory').itemSubmitted,
  submittedItemId: state.get('inventory').submittedItemId,
  moreItemData: state.get('inventory').currentItemData,
  itemVariantGroups: state.get('inventory').itemVariantGroups,
  itemVariantCombinations: state.get('inventory').itemVariantCombinations,
  apiStatus: state.get('global').apiStatus,
  itemImageUrl: state.get('addItem') ? state.get('addItem').itemImageUrl : '',
  itemImageUrl1: state.get('addItem') ? state.get('addItem').itemImageUrl1 : '',
  itemImageUrl2: state.get('addItem') ? state.get('addItem').itemImageUrl2 : '',
  itemImageUrl3: state.get('addItem') ? state.get('addItem').itemImageUrl3 : '',
  itemImageUrl4: state.get('addItem') ? state.get('addItem').itemImageUrl4 : '',
  itemImageUrl5: state.get('addItem') ? state.get('addItem').itemImageUrl5 : '',
  showUpgradeNotification: state.get('addItem') ? state.get('addItem').showUpgradeNotification : '',
  text: state.get('addItem') ? state.get('addItem').notificationMessage : '',
  store: state.get('global').store,
  newCategoryImageUrl: state.get('inventory').newCategory.newCategoryImgUrl,
  storeTaxes: state.get('storeTax'),
  storeModules: state.get('storeInfo') && state.get('storeInfo').storeModules,
  selectedCategory: state.get('addItem') && state.get('addItem').SelectedCategory,
})

const mapDispatchToProps = dispatch => ({
  submitItemToStore: (itemData, storeId, merchantId, edit, itemId) =>
    dispatch(submitItem(itemData, storeId, merchantId, edit, itemId)),
  submitVariantCombinations: (combinationData, itemId, storeId, merchantId) => dispatch(submitVariantCombinations(combinationData, itemId, storeId, merchantId)),
  createNewCategoryForStore: (storeId, merchantId, categoryName, imgUrl) =>
    dispatch(submitNewCategory(storeId, merchantId, categoryName, imgUrl)),
  createVariantForItem: (variantDetails, storeId, itemId, variantGroupId) =>
    dispatch(submitNewVariant(variantDetails, storeId, itemId, variantGroupId)),
  removeVariantForItem: (itemId, variantGroupId) => dispatch(removeVariant(itemId, variantGroupId)),
  removeVariantValueForItem: (itemId, variantValueId) => dispatch(removeVariantValue(itemId, variantValueId)),
  createNewSubCategoryForStore: (storeId, merchantId, categoryId, subCategoryName) =>
    dispatch(submitNewSubCategory(storeId, merchantId, categoryId, subCategoryName)),
  onPageInit: value => dispatch(onPageLoad(value)),
  resetItemImageInForm: value => dispatch(resetItemImage(value)),
  resetSubmittedItemId: () => dispatch(resetSubmittedItemId(null)),
  onItemImageUpload: (imgFile, storeId) => dispatch(uploadItemImage(imgFile, storeId)),
  onItemImage1Upload: (imgFile, storeId) => dispatch(uploadItemImage1(imgFile, storeId)),
  onItemImage2Upload: (imgFile, storeId) => dispatch(uploadItemImage2(imgFile, storeId)),
  onItemImage3Upload: (imgFile, storeId) => dispatch(uploadItemImage3(imgFile, storeId)),
  onItemImage4Upload: (imgFile, storeId) => dispatch(uploadItemImage4(imgFile, storeId)),
  onItemImage5Upload: (imgFile, storeId) => dispatch(uploadItemImage5(imgFile, storeId)),
  deleteItemFromStore: (storeId, itemId, merchantId) => dispatch(deleteItem(storeId, itemId, merchantId)),
  showNotification: (boolean, message) => dispatch(showUpgradeNotification(boolean, message)),
  uploadNewCategoryImage: (imgFile, storeId) => dispatch(uploadCategoryImage(imgFile, storeId)),
  getStoreTax: ({ storeId }) => dispatch(getTaxes({ storeId })),
  updateTax: ({ storeId, taxCode, taxRate, taxDesc, edit }) =>
    dispatch(updateTax({ storeId, taxCode, taxRate, taxDesc, edit })),
  getMoreItemData: item_id => dispatch(getItemSpecifications(item_id)),
  getItemVariants: item_id => dispatch(getItemVariants(item_id)),
  getItemVariantCombinations: item_id => dispatch(getItemVariantCombinations(item_id)),
  resetMoreItemData: () => {
    dispatch(updateItemSpecifications([], []))
    dispatch(updateItemVariants([]))
    dispatch(updateItemVariantCombinations([]))
  },
  resetItemImageFromStore: () => dispatch(resetItemImage()),
  resetItemImage1FromStore: () => dispatch(resetItemImage1()),
  resetItemImage2FromStore: () => dispatch(resetItemImage2()),
  resetItemImage3FromStore: () => dispatch(resetItemImage3()),
  resetItemImage4FromStore: () => dispatch(resetItemImage4()),
  resetItemImage5FromStore: () => dispatch(resetItemImage5()),
  getSubscribedModules: (storeId, roleId) => dispatch(getSubscribedModules(storeId, roleId)),
  setSelectedCategory: (value) => dispatch(setSelectedCategory(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItemPage)
