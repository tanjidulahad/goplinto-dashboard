import React, { useState, useEffect } from 'react'
import TopNav from 'components/TopNav'
import { makeSelectMerchantId, makePageState } from 'containers/Integrations/selectors'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import backImg from '../../images/icons/back.svg'
import { setStoreIntegration } from 'containers/Integrations/actions'
import { AiOutlineInfoCircle } from 'react-icons/ai'

import 'assets/Integrations.css'
import MediaQuery from 'react-responsive'
import { validateAlphaNumeric } from "../../utils/validation"
const constructInitialInputObject = (components, requiredAttributes) => {
  const giveRequiredObject = {}
  if (!components.integration_attributes) {
    requiredAttributes.map((element) => {
      giveRequiredObject[element.attribute_value] = ''
    })
  } else {
    for (const attribute in components.integration_attributes) {
      giveRequiredObject[attribute] = components.integration_attributes[attribute]
    }
  }
  return giveRequiredObject
}

const IntegrationEdit = ({ setStoreIntegration, merchantId, pageState }) => {
  const history = useHistory()
  const location = useLocation()
  const [isAllFilled, setIsAllFilled] = useState(false)
  const { components, storeId } = location.state
  const [formData, setFormData] = useState(
    constructInitialInputObject(components, components.required_widget_attributes),
  )
  const[errors,setErrors]=useState({
    merchantId:false,
    trackingId:false,
    RZPAccessKey: false,
    RZPSecretKey: false,
      })
  const onInputChangeHandler = (e) => {
    const { value } = e.target
    return setFormData({ ...formData, [e.target.name]: value })
  }
  const onSubmit = () => {
    setErrors({
      merchantId: false,
      trackingId: false,
      RZPAccessKey: false,
      RZPSecretKey: false,
    })

    setErrors(prev => ({ ...prev, merchantId: validateAlphaNumeric(formData["merchantId"]) ? false : true }))
    setErrors(prev => ({ ...prev, trackingId: validateAlphaNumeric(formData["trackingId"]) ? false : true }))
    setErrors(prev => ({ ...prev, RZPAccessKey: validateAlphaNumeric(formData["RZPAccessKey"]) ? false : true }))
    setErrors(prev => ({ ...prev, RZPSecretKey: validateAlphaNumeric(formData["RZPSecretKey"]) ? false : true }))

    if (!validateAlphaNumeric(formData["merchantId"]) || !validateAlphaNumeric(formData["trackingId"]) || !validateAlphaNumeric(formData["RZPAccessKey"]) || !validateAlphaNumeric(formData["RZPSecretKey"])) return;
    setStoreIntegration(storeId, merchantId, components.integration_widget_domain, formData)
  }
  const { error, flag } = pageState
  useEffect(() => {
    if (flag) history.push('/app/integrations')
  }, [flag])
  useEffect(() => {
    for (const key in formData) {
      if (!formData[key]) return setIsAllFilled(false)
    }
    setIsAllFilled(true)
  }, [formData])

  return (
    <div>
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4">
          <p className="flex text-xl text-black font-semibold text-muted-med">
            <NavLink  to="/app/integrations">
              <img
                src={backImg}
                style={{ height: '24px', width: '24px', cursor: 'pointer' }}
                className="ml-2 mr-4 my-1"
              />
            </NavLink>
            {components.widget_display_name}
          </p>
          <TopNav />
        </div>
      </div>
      <div className="integrations-edit__outer">
        <h1 className="font-sans text-base md:text-xl font-bold text-black-700  break-normal lg:mt-0 ">
          Add your {components.widget_display_name} Code
        </h1>
        <div className="integrations-edit__inner">
          <div className="bg-white rounded-lg">
            {components.required_widget_attributes &&
              components.required_widget_attributes.map((attribute) => (
                <div className="w-full border-box px-2" key={attribute.attribute_value}>
                  <div className="display-in-view">
                    <h1 className="py-4 ml-2 font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 ">
                      {attribute.attribute_name}
                    </h1>
                  </div>
                  <div>
                    {!attribute.is_long_text ? (
                      <>
                      <input
                        value={formData[attribute.attribute_value]}
                        name={attribute.attribute_value}
                        onChange={onInputChangeHandler}
                        onKeyDown={e=>e.key===" "&&e.preventDefault()}
                        placeholder={attribute.attribute_placeholder}
                        type="text"
                        className="w-full text-black text-base px-2 py-2 border-box border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                      />
                        {errors[attribute.attribute_value]&&<p className='font-semibold text-secondary'>Invalid data given</p>}
                        </>
                    ) : (
                      <textarea
                        value={formData[attribute.attribute_value]}
                        name={attribute.attribute_value}
                        onChange={onInputChangeHandler}
                        placeholder={attribute.attribute_placeholder}
                        type="text"
                        rows="15"
                        className="w-full text-black text-base px-2 py-2 border-box border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                      />
                    )}
                  </div>
                </div>
              ))}
            <div className="mt-10">
              <div className="flex flex-row  justify-start border-t py-4">
                <AiOutlineInfoCircle className="mx-2 text-black" size={23} />
                <span className="text-md self-center font-normal text-gray-600">
                  Make sure you're adding the {components.required_widget_attributes[0].attribute_name}, which starts
                  with "UA".
                </span>
              </div>
            </div>
            {error && (
              <p className="font-semibold" style={{ color: '#F64B5D', marginTop: '1rem' }}>
                * Could not connect, try again later!
              </p>
            )}
          </div>
          <MediaQuery minDeviceWidth={1025}>
            <div className="flex justify-end mt-10 py-2">
              <button
                onClick={onSubmit}
                disabled={!isAllFilled}
                type="submit"
                className="focus:outline-none px-4 py-2 text-white rounded-lg bg-secondary cta-btn"
                style={{ opacity: !isAllFilled ? 0.5 : 1 }}
              >
                Connect
              </button>
            </div>
          </MediaQuery>

          <MediaQuery maxDeviceWidth={1025}>
            <div className="integration-edit__submit_btn">
              <button
                onClick={onSubmit}
                type="submit"
                className="focus:outline-none px-4 py-2 text-white rounded-lg bg-secondary cta-btn"
              >
                Connect
              </button>
            </div>
          </MediaQuery>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => ({
  setStoreIntegration: (storeId, merchantId, domain, integrationData) =>
    dispatch(setStoreIntegration(storeId, merchantId, domain, integrationData)),
})
const mapStateToProps = createStructuredSelector({ merchantId: makeSelectMerchantId(), pageState: makePageState() })
export default connect(mapStateToProps, mapDispatchToProps)(IntegrationEdit)
