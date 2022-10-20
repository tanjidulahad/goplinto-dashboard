import React from 'react'
import 'assets/EmailMarketing.css'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import SelectedIcon from "images/icons/check_blue_circle.svg"
const CreateEmailPage = ({ setSelectedEmail, DefaultEmailTemplates, EmailTemplates, storeId, removeEmailTemplate, setCreateNew, setEmailSubject, setTemplateBody, setTemplateName, setTemplateId, FormInput, setFormInput, setErrors }) => {

  const menu = (value, isDefault) => {
    return (
      <Menu className="rounded-lg p-2 w-full">
          <Menu.Item key={1}
            onClick={() => {
              setEmailSubject(value.email_subject)
              setTemplateName(value.template_name)
              setTemplateBody(value.email_body)
              setTemplateId(value.template_id)
              !isDefault ? setCreateNew("EDIT") : setCreateNew("NEW")
            }}
          >Edit</Menu.Item>
        {!isDefault && <Menu.Item key={2} onClick={() => removeEmailTemplate(value.template_id, storeId)}>Delete</Menu.Item>}
      </Menu>
    )
  }
  const Template = ({ val, isDefault }) => {
    return <div key={val.template_id} className="template_box w-1/5 mr-8 mt-5">
      <p className="font-semibold text-base mb-2 h-8">{val.template_name.slice(0,22)}{val.template_name.length>22&&"..."}</p>
      <div className="template_box_border">
        <div
          onClick={() => setSelectedEmail(val)}
          className="cursor-pointer invisible-scrollbar overflow-auto template_box_content"
          dangerouslySetInnerHTML={{
            __html: val.email_body,
          }}
        />
        <div className='template_box_outer_btn_border'>

          <div className="flex template_box_btn_border">
            {val.template_id === FormInput.templateId ? (
              <button className="w-3/4 p-2 flex px-4 bg-white focus:outline-none text-blue-500 text-sm font-semibold selected_btn">
                Selected
                <img src={SelectedIcon} className="h-5 w-4 mx-2" />
              </button>
            ) : (
              <button
                className="p-2 px-8 w-3/4 borde-radius-r-0 select_btn  focus:outline-none text-white"
                onClick={e => {
                  setFormInput("templateId", val.template_id);
                  setFormInput("templateData", val.email_body);
                  setErrors(prev => ({ ...prev, selectedTemplate: false }))
                }}
              >
                Select
              </button>
            )}
            <Dropdown
              trigger={['click']}
              overlay={menu(val, isDefault)}
              className="cursor-pointer capitalize focus:outline-none"
              placement="bottomRight"
            >
              <div className="flex mx-auto font-medium px-2 rounded-lg focus:outline-none focus:border-secondary justify-around border-radius-r-0">
                <DownOutlined className="my-auto text-sm" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  }
  return (
    <div className="main_content_divs">
      <p className="inside_headings">
        Select Template
        <span className="font-normal text-sm item-label">
          {' '}
          ( Select a pre built templet or you can create a new one. )
        </span>
      </p>
      <div className="flex flex-wrap items-center">
        <button className="createNewBtn w-1/5 mr-8 focus:outline-none " onClick={() => {
          setEmailSubject("")
          setTemplateName("")
          setTemplateBody("")
          setTemplateId("")
          setCreateNew("NEW")
          }}>
          + Create New
        </button>


        {DefaultEmailTemplates && DefaultEmailTemplates.map((val) => {
          return Template({ val, isDefault: true })
        })}
        {EmailTemplates && EmailTemplates.map((val, ind) => {
          return Template({ val })
        })}
      </div>
    </div>
  )
}

export default CreateEmailPage
