import React, { useState, useEffect, useRef } from 'react'
import MediaQuery from 'react-responsive'

import { Modal, Dropdown, AutoComplete } from 'antd'
import Form from 'containers/HomePage/Form'
import VariantImageUpload from 'components/VariantImageUpload'
import VariantColorPicker from 'components/VariantColorPicker'
import RemoveVariantModal from 'components/RemoveVariantModal'
import BinaryToggle from 'components/BinaryToggle'
import { connect } from 'react-redux'
import trash from '../../images/icons/trash-2.svg'
import ErrorLine from 'components/ErrorLine'
const colorVaiantNames = ['color', 'colors', 'colour', 'colours', 'shade', 'shades']
const AddVariantModal = ({
  setShowSaveButton,
  submitVariant,
  onDeleteVariant,
  onDeleteVariantValue,
  variantWithImages,
  setShowVariantModal,
  storeId,
  itemId,
  merchantId,
  updateVariant,
  currentVariant,
  itemImages,
}) => {
  const [newVariantGroupName, setNewVariantGroupName] = useState('')
  const [variantGroupNameError, setVariantGroupNameError] = useState('')
  const [variantValuesError, setVariantValuesError] = useState('')
  const [variantIndexToRemove, setVariantIndexToRemove] = useState(null)
  const [newVariantValues, setNewVariantValues] = useState([])
  const [variantValuesWithImages, setVariantValuesWithImages] = useState([])
  const [variantGroupId, setVariantGroupId] = useState(null)
  const [imageAllowed, setImageAllowed] = useState(true)

  const [defaultValue, setDefaultValue] = useState('')
  const [connectImages, setConnectImages] = useState(false)
  const [showColorPalateFor, setShowColorPalateFor] = useState('')
  const variantValueInput = useRef(null)
  useEffect(() => {
    if (currentVariant) {
      setNewVariantGroupName(currentVariant.variant_group_name)
      setVariantGroupId(currentVariant.variant_group_id)
      setConnectImages(currentVariant.is_image_available === 'Y')
      if (variantWithImages && currentVariant.variant_group_id !== variantWithImages) {
        setImageAllowed(false)
      }
      currentVariant.variantValues.map(variantValue => {
        setVariantValuesWithImages(prev => [
          ...prev,
          {
            variantValueId: variantValue.variant_value_id,
            variantValue: variantValue.variant_value_name,
            variantValueMetadata: variantValue.variant_value_metadata
              ? { hexCode: variantValue.variant_value_metadata.color_hexcode }
              : null,
            imgUrl1:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_1
                ? variantValue.variant_value_images.img_url_1
                : null,
            imgUrl2:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_2
                ? variantValue.variant_value_images.img_url_2
                : null,
            imgUrl3:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_3
                ? variantValue.variant_value_images.img_url_3
                : null,
            imgUrl4:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_4
                ? variantValue.variant_value_images.img_url_4
                : null,
            imgUrl5:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_5
                ? variantValue.variant_value_images.img_url_5
                : null,
            imgUrl6:
              variantValue.variant_value_images && variantValue.variant_value_images.img_url_6
                ? variantValue.variant_value_images.img_url_6
                : null,
          },
        ])
        setNewVariantValues(prev => [...prev, variantValue.variant_value_name])
      })
    } else {
      if (variantWithImages) {
        setImageAllowed(false)
      }
    }
  }, [currentVariant])
  function onSubmitVariantDetails() {
    var variantValuesArray = []
    variantValuesWithImages.map(variant => {
      variantValuesArray.push({
        variant_value_id: variant.variantValueId ? variant.variantValueId : null,
        variant_value_name: variant.variantValue,
        variant_value_metadata: variant.variantValueMetadata
          ? { color_hexcode: variant.variantValueMetadata.hexCode }
          : null,
        img_url: variant.imgUrl1
          ? {
            img_url_1: variant.imgUrl1 ? variant.imgUrl1 : null,
            img_url_2: variant.imgUrl2 ? variant.imgUrl2 : null,
            img_url_3: variant.imgUrl3 ? variant.imgUrl3 : null,
            img_url_4: variant.imgUrl4 ? variant.imgUrl4 : null,
            img_url_5: variant.imgUrl5 ? variant.imgUrl5 : null,
            img_url_6: variant.imgUrl6 ? variant.imgUrl6 : null,
          }
          : null,
      })
    })
    const variantDetails = {
      variant_group_name: newVariantGroupName,
      variant_values: variantValuesArray,
      is_image_available: connectImages ? 'Y' : 'N',
    }
    submitVariant(variantDetails, storeId, itemId, variantGroupId)
    setShowSaveButton(true)
    setShowVariantModal(false)
  }
  function onSubmitColorVariant(hex) {
    setVariantValuesWithImages(prev => [
      ...prev,
      {
        variantValueId: null,
        variantValue: showColorPalateFor,
        variantValueMetadata: { hexCode: hex },
        imgUrl1: null,
        imgUrl2: null,
        imgUrl3: null,
        imgUrl4: null,
        imgUrl5: null,
        imgUrl6: null,
      },
    ])
    setShowColorPalateFor('')
  }
  function handleKeyDown(e) {
    if (e.keyCode === 13 || e.keyCode === 188) {
      if (defaultValue !== '') {
        if (defaultValue.charAt(defaultValue.length - 1) == ',') {
          defaultValue = defaultValue.substring(0, defaultValue.length - 1)
        }
        setNewVariantValues(prev => [...prev, defaultValue])
        if (colorVaiantNames.includes(newVariantGroupName.toLowerCase())) setShowColorPalateFor(defaultValue)
        else
          setVariantValuesWithImages(prev => [
            ...prev,
            {
              variantValueId: null,
              variantValue: defaultValue,
              variantValueMetadata: null,
              imgUrl1: null,
              imgUrl2: null,
              imgUrl3: null,
              imgUrl4: null,
              imgUrl5: null,
              imgUrl6: null,
            },
          ])
        setDefaultValue('')
      }
    } else if (e.keyCode === 8) {
      if (defaultValue === '') {
        if (newVariantValues.length >= 1) {
          setNewVariantValues(newVariantValues.slice(0, newVariantValues.length - 1))
          setVariantValuesWithImages(variantValuesWithImages.slice(0, variantValuesWithImages.length - 1))

          setDefaultValue(newVariantValues[newVariantValues.length - 1])
        }
      }
    }
  }
  function handleKeywords(e) {
    if (newVariantValues.length === 10) {
      setDefaultValue('')
    } else {
      const enteredValue = e.target.value.replace(',', '')
      setDefaultValue(enteredValue)
    }
  }
  function setImage(variantValue, imgUrls) {
    setVariantValuesWithImages(prev => {
      let toReturn = []
      prev.map(variant => {
        if (variant.variantValue === variantValue) {
          if (!variant.imgUrl1) {
            if (imgUrls[0]) variant.imgUrl1 = imgUrls[0]
            if (imgUrls[1]) variant.imgUrl2 = imgUrls[1]
            if (imgUrls[2]) variant.imgUrl3 = imgUrls[2]
            if (imgUrls[3]) variant.imgUrl4 = imgUrls[3]
            if (imgUrls[4]) variant.imgUrl5 = imgUrls[4]
            if (imgUrls[5]) variant.imgUrl6 = imgUrls[5]
          } else if (!variant.imgUrl2) {
            if (imgUrls[0]) variant.imgUrl2 = imgUrls[0]
            if (imgUrls[1]) variant.imgUrl3 = imgUrls[1]
            if (imgUrls[2]) variant.imgUrl4 = imgUrls[2]
            if (imgUrls[3]) variant.imgUrl5 = imgUrls[3]
            if (imgUrls[4]) variant.imgUrl6 = imgUrls[4]
          } else if (!variant.imgUrl3) {
            if (imgUrls[0]) variant.imgUrl3 = imgUrls[0]
            if (imgUrls[1]) variant.imgUrl4 = imgUrls[1]
            if (imgUrls[2]) variant.imgUrl5 = imgUrls[2]
            if (imgUrls[3]) variant.imgUrl6 = imgUrls[3]
          } else if (!variant.imgUrl4) {
            if (imgUrls[0]) variant.imgUrl4 = imgUrls[0]
            if (imgUrls[1]) variant.imgUrl5 = imgUrls[1]
            if (imgUrls[2]) variant.imgUrl6 = imgUrls[2]
          } else if (!variant.imgUrl5) {
            if (imgUrls[0]) variant.imgUrl5 = imgUrls[0]
            if (imgUrls[1]) variant.imgUrl6 = imgUrls[1]
          } else {
            if (imgUrls[0]) variant.imgUrl6 = imgUrls[0]
          }
        }

        toReturn.push(variant)
      })
      return toReturn
    })
  }
  function removeImage(variantValue, imgIndex) {
    setVariantValuesWithImages(prev => {
      let toReturn = []
      prev.map(variant => {
        if (variant.variantValue === variantValue) {
          variant[imgIndex] = null
        }
        toReturn.push(variant)
      })
      return toReturn
    })
  }
  function renderVariantImages() {
    let toRender = []
    variantValuesWithImages.map(variant => {
      toRender.push(
        <div className="flex items-center border-b-2 border-gray-300">
          <div className="variant-value-col text-black text-lg font">{variant.variantValue}</div>
          <div className="variant-images-col text-black">
            <div className="flex justify-start">
              <div className="my-4 w-1/4">
                <VariantImageUpload
                  picture={variant.imgUrl1}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl1')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
              <div className={`${variant.imgUrl1 || variant.imgUrl2 ? 'visible' : 'invisible'} my-4 w-1/4`}>
                <VariantImageUpload
                  picture={variant.imgUrl2}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl2')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
              <div className={`${variant.imgUrl2 || variant.imgUrl3 ? 'visible' : 'invisible'} my-4 w-1/4`}>
                <VariantImageUpload
                  picture={variant.imgUrl3}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl3')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
              <div className={`${variant.imgUrl3 || variant.imgUrl4 ? 'visible' : 'invisible'} my-4 w-1/4`}>
                <VariantImageUpload
                  picture={variant.imgUrl4}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl4')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
              <div className={`${variant.imgUrl4 || variant.imgUrl5 ? 'visible' : 'invisible'} my-4 w-1/4`}>
                <VariantImageUpload
                  picture={variant.imgUrl5}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl5')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
              <div className={`${variant.imgUrl5 || variant.imgUrl6 ? 'visible' : 'invisible'} my-4 w-1/4`}>
                <VariantImageUpload
                  picture={variant.imgUrl6}
                  setPicture={imgUrls => setImage(variant.variantValue, imgUrls)}
                  remove={() => removeImage(variant.variantValue, 'imgUrl6')}
                  storeId={storeId}
                  itemImages={itemImages}
                  variant={variant}
                />
              </div>
            </div>
          </div>
        </div>,
      )
    })
    return toRender
  }
  const menu = () => <VariantColorPicker color={showColorPalateFor} onSubmitColorVariant={onSubmitColorVariant} />
  return (
    <>
      <Modal
        className="variant-modal"
        visible
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-5 flex-none cursor-pointer"
            viewBox="0 0 20 20"
            fill="#242424BF"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
        onCancel={() => {
          setShowVariantModal(false)
        }}
        title={updateVariant ? 'Edit Variant Option' : 'Add Variant Option'}
        footer={
          <>
            <MediaQuery minDeviceWidth={1024}>
              {updateVariant && (
                <button
                  type="button"
                  className=" flex items-center font-semibold hover:border-secondary text-base text-secondary"
                  onClick={() => {
                    onDeleteVariant(itemId, variantGroupId)
                    setShowVariantModal(false)
                  }}
                >
                  <img src={trash} style={{ height: '20px', width: '20px', marginRight: '4px' }} />
                  &nbsp; Delete Option
                </button>
              )}
            </MediaQuery>
            <button
              className="variant-modal-footer-button cta-btn rounded-lg text-white focus:outline-none"
              key="submit"
              type="primary"
              style={{ transition: 'all .15s ease', whiteSpace: 'nowrap' }}
              onClick={() => {
                if (newVariantGroupName) {
                  if (newVariantValues.length !== 0) {
                    setVariantValuesError('')
                    setVariantGroupNameError('')
                    onSubmitVariantDetails()
                  } else setVariantValuesError('Please enter a variant choice!')
                } else setVariantGroupNameError('Please enter a variant name!')
              }}
            >
              {updateVariant ? 'Save Changes' : 'Add Variant'}
            </button>
          </>
        }
      >
        <Form className="variant-modal-content st-form">
          <div className="p-6">
            <p className="text-base item-label">Variant Name *</p>
            <AutoComplete
              value={newVariantGroupName}
              options={[{ value: 'Size' }, { value: 'Color' }, { value: 'Material' }]}
              style={{ border: variantGroupNameError ? '1px solid red' : '' }}
              className="variant-modal-input w-full h-9 border border-gray-500 rounded-md focus:outline-none focus:border-secondary"
              onSelect={value => {
                setVariantGroupNameError('')
                setNewVariantGroupName(value)
              }}
              onChange={value => {
                setVariantGroupNameError('')
                setNewVariantGroupName(value)
              }}
              placeholder={variantGroupNameError ? variantGroupNameError : 'e.g., Color, Size or Material'}
            />
            {<ErrorLine type={variantGroupNameError} value={variantGroupNameError} />}
            <p className="text-base item-label">
              Variant Choices *{' '}
              <span className="text-xs font-semibold text-muted-light">
                ( Enter words Separated by comma or enter )
              </span>
            </p>
            <div
              className="w-full h-9 p-2 mb-4 border border-gray-500 rounded-md focus:outline-none focus:border-secondary"
              onClick={() => variantValueInput.current.focus()}
              style={{
                display: 'flex',
                flexFlow: 'wrap',
                alignItems: 'center',
                border: variantValuesError ? '1px solid red' : '',
              }}
            >
              <div style={{ display: 'flex', flexFlow: 'wrap', alignItems: 'center' }}>
                {newVariantValues.map((val, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#F64B5D1A',
                      color: 'black',
                      marginRight: 16,
                      marginTop: 8,
                      marginBottom: 8,
                      padding: '5px 16px',
                      borderRadius: 10,
                      display: 'flex',
                      flexFlow: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {colorVaiantNames.includes(newVariantGroupName.toLowerCase()) &&
                      variantValuesWithImages[index] &&
                      variantValuesWithImages[index].variantValueMetadata ? (
                      <span
                        style={{
                          borderRadius: '50%',
                          background: variantValuesWithImages[index].variantValueMetadata.hexCode,
                          width: '13px',
                          height: '13px',
                          marginRight: '10px',
                        }}
                      />
                    ) : null}
                    {val}
                    <Dropdown
                      visible={showColorPalateFor === val && index === newVariantValues.length - 1 ? true : false}
                      overlay={menu()}
                      placement="topCenter"
                      arrow
                    >
                      <span
                        id={index}
                        onClick={() => {
                          if (variantValuesWithImages.find(variant => variant.variantValue === val).imgUrl1) {
                            setVariantIndexToRemove(index)
                          } else {
                            setShowColorPalateFor('')
                            variantValuesWithImages[index].variantValueId &&
                              onDeleteVariantValue(itemId, variantValuesWithImages[index].variantValueId)
                            const result = newVariantValues.filter((word, indx) => indx !== index)
                            const newVariantValuesWithImages = variantValuesWithImages.filter(
                              (word, indx) => indx !== index,
                            )
                            setNewVariantValues(result)
                            setVariantValuesWithImages(newVariantValuesWithImages)
                          }
                        }}
                        style={{ marginLeft: 13, color: '#F64B5D', cursor: 'pointer' }}
                      >
                        &#10006;
                      </span>
                    </Dropdown>
                  </div>
                ))}
              </div>

              <div className={`${newVariantValues.length === 0 && 'w-full'}`}>
                <input
                  ref={variantValueInput}
                  disabled={showColorPalateFor}
                  style={{ border: 'transparent', padding: '2px' }}
                  type="text"
                  placeholder={
                    newVariantValues.length === 0
                      ? variantValuesError
                        ? variantValuesError
                        : 'Separate options with comma or enter e.g., Small, Medium, Large'
                      : ''
                  }
                  className="variant-modal-input w-full border border-gray-400 rounded-lg focus:outline-none focus:border-secondary "
                  value={defaultValue}
                  onChange={e => {
                    setVariantValuesError('')
                    handleKeywords(e)
                  }}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
              {<ErrorLine type={variantValuesError} value={variantValuesError} />}
            <p className="text-base item-label">
              Connect Images
              <br />
              <small className="text-muted-med font-semibold text-xs md:text-sm">
                Connect images to a particular variant option you want your customers to see when they click on that
                option's choices.
              </small>
            </p>
            <div className="flex items-center gap-6 mb-4">
              <div style={{ opacity: imageAllowed ? '1' : '.5' }}>
                <BinaryToggle
                  inactiveColor="rgba(36,36,36,0.3)"
                  activeColor="#1492E6"
                  toggle={imageAllowed ? connectImages : true}
                  toggleCallback={() => {
                    if (imageAllowed) setConnectImages(!connectImages)
                  }}
                />
              </div>
              {!imageAllowed && (
                <div className="text-sm font-semibold text-secondary">
                  You have already connected images for one variant option
                </div>
              )}
            </div>
            <small className="text-muted-med font-semibold text-sm">
              Note : you can connect images to only one Variant option
            </small>
          </div>
          {connectImages && newVariantValues.length !== 0 ? (
            <div>
              <div className="px-6 flex justify-between py-3 text-black item-label" style={{ background: '#1A24551A' }}>
                <div className=" w-2/5 md:w-1/2 ">Variant Choices</div>
                <div className="px-1 md:px-2 w-3/5 md:w-1/2">Images</div>
              </div>
              <div className="px-6">{renderVariantImages()}</div>
            </div>
          ) : null}
        </Form>
        {variantIndexToRemove !== null && (
          <RemoveVariantModal
            close={() => setVariantIndexToRemove(null)}
            confirm={() => {
              setShowColorPalateFor('')
              variantValuesWithImages[variantIndexToRemove].variantValueId &&
                onDeleteVariantValue(itemId, variantValuesWithImages[variantIndexToRemove].variantValueId)
              const result = newVariantValues.filter((word, indx) => indx !== variantIndexToRemove)
              const newVariantValuesWithImages = variantValuesWithImages.filter(
                (word, indx) => indx !== variantIndexToRemove,
              )
              setNewVariantValues(result)
              setVariantValuesWithImages(newVariantValuesWithImages)
            }}
          />
        )}
      </Modal>
    </>
  )
}

export default connect(null)(AddVariantModal)
