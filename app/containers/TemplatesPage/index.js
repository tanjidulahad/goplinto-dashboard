import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import saga from './saga'
import reducer from './reducer'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import BottomLineDiv from 'components/BottomLineDiv'
import ImagesSlider from 'components/ImagesSlider'
import { getTemplates, setTemplate } from './actions'
import { makeSelectPlanId, makeSelectStoreId, makeSelectStoreTemplates } from './selectors'
import { Helmet } from 'react-helmet'
import NewFooter from 'components/Footer/newFooter'
import '../../assets/DesignPage.css'

const TemplatesPage = ({ getTemplates, storeId, planId, Templates, setTemplate }) => {
  useInjectSaga({ key: 'templatesPage', saga })
  useInjectReducer({ key: 'templatesPage', reducer })

  const history = useHistory()
  const [ShowFullTemplate, setShowFullTemplate] = useState(false)
  const [selectedTemplateId, setselectedTemplateId] = useState(0)
  const [selectedTemplate, setselectedTemplate] = useState(Templates[0])
  const [currTemplate, setCurrTemplate] = useState(0)

  useEffect(() => {
    getTemplates(storeId, planId)
  }, [])
  useEffect(() => {
    const Arr = Templates
    for (let item of Arr) {
      if (item.isApplied === true) setselectedTemplateId(item.template_id)
    }
  }, [Templates])

  const OnSelectTemplate = template => {
    setselectedTemplateId(currTemplate)
    setShowFullTemplate(false)
    setTemplate(storeId, template)
  }

  const TemplateCard = ({ val, selected }) => {
    return (
      <div className="template_image_div">
        <img
          src={val.defaultAttributes && val.defaultAttributes.template_images[0]}
          className="h-2/3 w-2/3 mx-auto rounded-lg mb-4"
          onClick={() => {
            setCurrTemplate(val.template_id)
            setShowFullTemplate(true)
            setselectedTemplate(val)
          }}
          style={{ border: selected && '3px solid #FF4B4B' }}
        />
        <p className="text-center font-semibold item-label" style={{ color: selected && '#FF4B4B' }}>
          {val.defaultAttributes && val.defaultAttributes.template_name}
        </p>
      </div>
    )
  }

  const FullTemplateCard = () => {
    const Array = selectedTemplate.defaultAttributes && selectedTemplate.defaultAttributes.template_images
    const ImagesArray = Array && Array.map(val => val && val.replaceAll(` `, '%20'))

    return (
      <div>
        <div className="full_template_div" onClick={() => setShowFullTemplate(false)}>
          <div className="ImgSliderDiv mx-auto px-auto mt-4" onClick={e => e.stopPropagation()}>
            <ImagesSlider Array={ImagesArray} />
          </div>
          <div className="full_template_bottom_div">
            <h1 className="text-white font-bold capitalize mt-1">{selectedTemplate.defaultAttributes.template_name}</h1>
            <div className="selectBtnDiv">
              {currTemplate === selectedTemplateId ? (
                <button onClick={() => setShowFullTemplate(false)} className="bg-white text-secondary selectBtn">
                  Selected
                </button>
              ) : (
                <button
                  onClick={() => OnSelectTemplate(selectedTemplate)}
                  className="bg-secondary text-white selectBtn border-none"
                >
                  Select
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div>
        <Helmet>
          <title>Free Templates</title>
          <meta name="description" content="Free Templates page" />
        </Helmet>
        <ExtendedNavBar text={'Free Templates'} onBack={() => history.push('/app/design')} noHelp />

        <div className="TemplatePageDiv">
          <div className="mx-4 mt-10 items-center px-2 py-5">
            <p className="font-semibold">
              Free Templates
              <span className="text-grey-400 font-medium text-xs">
                {' '}
                ( You can see preview of the selected template before you apply )
              </span>
            </p>
            <div className="flex">
              {Templates &&
                Templates.map(val => {
                  return (
                    <TemplateCard val={val} key={val.template_id} selected={val.template_id === selectedTemplateId} />
                  )
                })}
            </div>
          </div>
          <BottomLineDiv text="Select a perfect template for your website." />
        </div>
        {ShowFullTemplate && <FullTemplateCard />}
      </div>
      <NewFooter />
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  planId: makeSelectPlanId(),
  Templates: makeSelectStoreTemplates(),
})
const mapDispatchToProps = dispatch => ({
  getTemplates: (storeId, planId) => dispatch(getTemplates({ storeId, planId })),
  setTemplate: (storeId, template) => dispatch(setTemplate({ storeId, template })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemplatesPage)
