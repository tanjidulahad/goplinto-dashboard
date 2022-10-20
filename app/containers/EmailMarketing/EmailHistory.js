import { Dropdown, Menu } from 'antd'
import { StyledTableAlt } from 'components/StyledTableAlt'
import React from 'react'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { UnixTimeStampToDate } from 'utils/UnixTimeStampToDate'
const EmailHistory = ({ EmailNotifications, setSelectedEmail, setShowRemovePopUp, setFormInput,setPageIndex }) => {
  const MenuForEmails = ({ val }) => (
    <Menu>
      <Menu.Item className="font-normal" onClick={() => setSelectedEmail(val)} key={val.batch_id}>  
          View
      </Menu.Item>
      <Desktop>
      <Menu.Item className="font-normal" onClick={() =>{
        setPageIndex(2)
        setFormInput("templateId", val.template_data.template_id )
        }
        } key={val.batch_id}>  
          Reschedule
      </Menu.Item>
      </Desktop>
      {val && val.status === "SCHEDULED" && <Menu.Item key={val.batch_id}
        className="font-normal"
        onClick={() => {
          setSelectedEmail(val)
          setShowRemovePopUp(true)
        }}
      >
        Remove
      </Menu.Item>}
    </Menu>
  )
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  return (
    <div className="bg-white rounded-lg shadow-lg mt-5">
      <Desktop>
        <StyledTableAlt>
          <tbody>
            <tr className="w-full tbl-rounded-top">
              <th className="item-label font-semibold w-1/2">Emails</th>
              <th className="item-label font-semibold">Status</th>
              <th className="item-label font-semibold">Delivery Time</th>
              <th className="item-label font-semibold p-0 m-0" />
            </tr>
            {EmailNotifications.map((component, ind) => (
              <tr key={component.batch_id}>
                <td className="text-base font-semibold">
                  {component.template_data.email_subject}
                  <hr className="mt-5 hr_emails" />
                </td>
                <td>
                  <p
                    className={
                      component.status === 'SCHEDULED'
                        ? 'EmailStatusPending'
                        : component.status === 'SUCCESS'
                        ? 'EmailStatusDelivered'
                        : 'EmailStatusCancelled'
                    }
                  >
                    {component.status === 'SCHEDULED'
                      ? 'Pending'
                      : component.status === 'SUCCESS'
                      ? 'Delivered'
                      : 'Cancelled'}
                  </p>
                </td>
                <td className="text-sm font-semibold">
                  <p>{UnixTimeStampToDate(component.schedule_time)}</p>
                </td>
                <td>
                  <Dropdown overlay={MenuForEmails({ val: component })} trigger={['click']} placement="bottomRight">
                    <AiOutlineEllipsis className="cursor-pointer" size={33} />
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTableAlt>
      </Desktop>
      <Mobile>
        {EmailNotifications.map((val, idx) => (
          <div className="border-b-2 tbl-rounded-top w-full" key={val.batch_id}>
            <table className="w-full tbl-rounded-top">
              <tbody>
                <tr>
                  <td className="mobile_table_title" />
                  <td className="px-4 text-xs font-bold text-right text-secondary">
                    <Dropdown overlay={MenuForEmails({ val: val })} trigger={['click']}>
                      <button className="focus:outline-none text-md gap-2">
                        <AiOutlineEllipsis className="my-auto mr-5 text-black" size={33} />
                      </button>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 mobile_table_title font-medium item-label">Emails</td>
                  <td className="w-2/3 px-1 font-medium item-sublabel">
                    {val.template_data.email_subject}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 mobile_table_title font-medium item-label">Status</td>
                  <td className="w-2/3 px-1 font-medium item-sublabel">
                    <p
                      className={
                        val.status === 'SCHEDULED'
                          ? 'EmailStatusPending'
                          : val.status === 'SUCCESS'
                            ? 'EmailStatusDelivered'
                            : 'EmailStatusCancelled'
                      }
                    >
                      {val.status === 'SCHEDULED'
                        ? 'Pending'
                        : val.status === 'SUCCESS'
                          ? 'Delivered'
                          : 'Cancelled'}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 mobile_table_title font-medium item-label">Delivery Time</td>
                  <td className="w-2/3 px-1 font-medium item-sublabel">
                    <p>{UnixTimeStampToDate(val.schedule_time)}</p>
                          </td>
                      </tr>
                </tbody>
              </table>
            </div>
          ))}
        </Mobile>
    </div>
  )
}
export default EmailHistory
