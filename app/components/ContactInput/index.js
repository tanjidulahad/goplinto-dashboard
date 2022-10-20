import { Dropdown, Menu } from 'antd'
import React from 'react'
import { DownOutlined } from '@ant-design/icons'

import { useMediaQuery } from 'react-responsive'
import { numberInputValidation } from 'utils/validation'

const ContactInput = ({ formInput, contactInfo, setFormInput,isPhone,number,code,flag}) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    const phoneCode_menu = (value) => {
        const countries = Object.keys(contactInfo.allCountryDetails)
        return (
            <Menu className='rounded-lg p-2 w-full code_menu' style={{ boxShadow: '0px 4px 12px #00000029', maxHeight: "95vh", overflow: "auto" }}>
                {countries.map((val) => {
                    const isd_code_List = contactInfo.allCountryDetails && contactInfo.allCountryDetails[val].isd_code;
                    const currCountry = contactInfo.allCountryDetails[val];
                    return isd_code_List.map((item) => {
                        return (
                            <Menu.Item
                                key={val}
                                onClick={() => {
                                    if (formInput.useSameNumber)
                                        setFormInput(prev => ({ ...prev, storePhoneCode: item, storePhoneFlag: currCountry.flag_icons, whatsappNumberCode: item, whatsappNumberFlag: currCountry.flag_icons }))
                                    else if (value === "Phone")
                                        setFormInput(prev => ({ ...prev, storePhoneCode: item, storePhoneFlag: currCountry.flag_icons }))
                                    else
                                        setFormInput(prev => ({ ...prev, whatsappNumberCode: item, whatsappNumberFlag: currCountry.flag_icons }))
                                }}
                            >
                                <span
                                    type="button"
                                    className='flex justify-between  font-semibold text-sm'
                                >
                                    <p className='text-gray-600'>
                                        <img src={currCountry.flag_icons} className='inline-block mr-1 h-5 w-10' />
                                        {currCountry.country_name}</p>
                                    <b>{"+" + item}</b>
                                </span>
                            </Menu.Item>)
                    })
                })
                }

            </Menu>
        )
    }

  return (
      <div className='flex bg-white rounded-lg font-semibold shadow-sm' >        
         
          <Dropdown
              trigger={['click']}
              overlay={phoneCode_menu(isPhone)}
              className="flex justify-between cursor-pointer capitalize focus:outline-none"
              placement="bottomCenter"
              arrow
          >
              <div
                  className="flex font-medium px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary justify-around border-radius-r-0"
                  style={{ border: "1px solid #DDD", width: isTablet ? "28%" : "40%", marginRight: isTablet && !formInput.storePhoneCode ? "-15px" : "" }}
              >
                  {!code && <p className='text-xs my-auto'>ISD Code</p>}
                  {flag && <img src={flag} className={isTablet ? 'h-8 w-10 my-auto' : 'h-5 w-5 my-auto'} />}
                  {code && <p className='my-auto mx-auto'>+{code}</p>}
                  <DownOutlined className='my-auto' style={{ fontSize: '0.6em' }} />
              </div>
          </Dropdown>
          <input
              type="number"
              name="storePhone"
              className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary border-radius-l-0 input_Width"
              placeholder="9876543210"
              required
              autoFocus
              onChange={e => {
                  const value = e.target.value
                  if (formInput.useSameNumber) {
                      setFormInput(prev => ({ ...prev, storePhone: value, whatsappNumber: value }))
                  }
                  else if(isPhone){
                      setFormInput(prev => ({ ...prev, storePhone: value }))
                  } 
                  else {
                      setFormInput(prev => ({ ...prev, whatsappNumber: value }))
                  }
              }}
              onKeyDown={e => numberInputValidation(e)}
              value={number}
              maxLength={10}
          />
      </div>
  )
}

export default ContactInput