import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'

import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'


const ContactInfoX = ({data, handleButtonClick}) => {

    const {
        email,
        phone,
        phoneCode,
        hasPhysicalAddress,
        address,
        city,
        state,
        pincode,
        country,
        whatsappNumberCode,
        whatsappNumber,
    } = data

    const Desktop = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 992 })
        return isTablet ? children : null
    }
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 991 })
        return isMobile ? children : null
    }

  return (
    <div className="h-full px-4 py-4 md:px-10 md:py-8">
        <div className="flex justify-between">
            <p className="my-4 text-lg md:text-xl item-label-title">Contact Details</p>
            <EditButton style={{ margin: '0.8rem 0px' }} onClick={handleButtonClick} className="edit-btn">
                Edit
            </EditButton>
        </div>
        <Desktop>
            <StyledTable className="w-full overflow-hidden text-black bg-white shadow-lg tbl-rounded-top">
                <tbody>
                <tr>
                    <td className="px-8 py-4 font-semibold border item-label">Email Id</td>
                    <td className="px-8 py-4 font-normal border item-sublabel">{email}</td>
                </tr>
                <tr>
                    <td className="px-8 py-4 font-semibold border item-label">Phone Number</td>
                    <td className="px-8 py-4 font-normal border item-sublabel">+{phoneCode} - {phone}</td>
                </tr>
                {whatsappNumber && (
                    <tr>
                    <td className="px-8 py-4 font-semibold border item-label">Whatsapp Number</td>
                    <td className="px-8 py-4 font-normal border item-sublabel">+{whatsappNumberCode} - {whatsappNumber}</td>
                    </tr>
                )}
                {hasPhysicalAddress && (
                    <>
                    {address && (
                        <tr>
                        <td className="px-8 py-4 font-semibold border item-label">Store Address</td>
                        <td className="px-8 py-4 font-normal border item-sublabel">{address}</td>
                        </tr>
                    )}
                    {city && (
                        <tr>
                        <td className="px-8 py-4 font-semibold border item-label">City</td>
                        <td className="px-8 py-4 font-normal border item-sublabel">{city}</td>
                        </tr>
                    )}
                    {pincode && (
                        <tr>
                        <td className="px-8 py-4 font-semibold border item-label">Pincode</td>
                        <td className="px-8 py-4 font-normal border item-sublabel">{pincode}</td>
                        </tr>
                    )}
                    {state && (
                        <tr>
                        <td className="px-8 py-4 font-semibold border item-label">State</td>
                        <td className="px-8 py-4 font-normal border item-sublabel">{state}</td>
                        </tr>
                    )}
                    {country && (
                        <tr>
                        <td className="px-8 py-4 font-semibold border item-label">Country</td>
                        <td className="px-8 py-4 font-normal border item-sublabel">{country}</td>
                        </tr>
                    )}
                    </>
                )}
                </tbody>
            </StyledTable>
            <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                <span className="text-xs font-normal text-muted-light">
                Goplinto and your customers will use this information to contact you.
                </span>
            </div>
        </Desktop>
        <Mobile>
            <div>
                <div>
                <div className="px-4 py-4 bg-white tbl-rounded-top">
                    <div className="flex flex-col py-2">
                    <label className="mb-1 text-sm item-label">Email Id</label>
                    <span className="text-sm font-semibold item-sublabel">{email}</span>
                    </div>

                    <div className="flex flex-col py-2">
                    <label className="mb-1 text-sm item-label">Phone Number</label>
                    <span className="text-sm font-semibold item-sublabel">+{phoneCode} - {phone}</span>
                    </div>

                    {whatsappNumber && (
                    <div className="flex flex-col py-2">
                        <label className="mb-1 text-sm item-label">Whatsapp Number</label>
                        <span className="text-sm font-semibold item-sublabel">+{whatsappNumberCode} - {whatsappNumber}</span>
                    </div>
                    )}
                </div>
                <div className="flex flex-row justify-start px-4 py-4 bg-white border tbl-rounded-bottom align-center">
                    <AiOutlineInfoCircle className="mr-2" size={18} />
                    <span className="self-center text-xs font-semibold text-muted-light">
                    Goplinto and your customers will use this information to contact you.
                    </span>
                </div>
                </div>
                {hasPhysicalAddress && (
                <div className="mt-4">
                    <div className="flex justify-between">
                    <p className="my-4 text-lg md:text-xl sub-heading">Address</p>
                    <EditButton
                        style={{ margin: '0.8rem 0px' }}
                        className="edit-btn"
                        onClick={handleButtonClick}
                    >
                        Edit
                    </EditButton>
                    </div>

                    <div className="px-4 py-4 bg-white rounded-lg tbl-rounded-top">
                    <div className="flex flex-col py-2">
                        <label className="font-medium mb-1 text-sm item-label">Store Address</label>
                        <span className="text-sm font-normal  item-sublabel ">{address}</span>
                    </div>

                    <div className="flex flex-col py-2">
                        <label className="font-medium mb-1 text-sm item-label">City</label>
                        <span className="text-sm font-normal  item-sublabel ">{city}</span>
                    </div>

                    <div className="flex flex-col py-2">
                        <label className="font-medium mb-1 text-sm item-label">State</label>
                        <span className="text-sm font-normal  item-sublabel ">{state}</span>
                    </div>

                    <div className="flex flex-col py-2">
                        <label className="font-medium mb-1 text-sm item-label">Pincode</label>
                        <span className="text-sm font-normal  item-sublabel ">{pincode}</span>
                    </div>

                    <div className="flex flex-col py-2">
                        <label className="font-medium mb-1 text-sm item-label">Country</label>
                        <span className="text-sm font-normal  item-sublabel ">{country}</span>
                    </div>
                    </div>

                    <div className="flex flex-row justify-start px-4 py-4 bg-white border tbl-rounded-bottom align-center">
                    <AiOutlineInfoCircle className="mr-2" size={18} />
                    <span className="self-center text-xs font-semibold text-muted-med">
                        Enter your location, like a store or office, so people can find you.
                    </span>
                    </div>
                </div>
                )}
            </div>
        </Mobile>
    </div>
  )
}

export default ContactInfoX