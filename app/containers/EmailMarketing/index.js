import { DatePicker, Radio, TimePicker } from 'antd'
import NewFooter from 'components/Footer/newFooter'
import NoDataContainer from 'components/NoDataContainer'
import RichTextEditor from 'components/RichTextEditor'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import React, { useEffect, useState } from 'react'
import 'assets/EmailMarketing.css'
import CreateEmailPage from './CreateEmailPage'
import {
  setPageIndex,
  getEmailNotifications,
  getDefaultTemplates,
  getVerifiedEmails,
  verifyEmailID,
  checkEmailIDVerified,
  removeEmailIDVerified,
  UploadCsvToS3,
  removeEmailNotifications,
  setScheduledTime,
  setFormInput,
  getEmailTemplates,
  createEmailTemplate,
  copyDefaultTemplate,
  removeEmailTemplate,
  editEmailTemplate,
  sendEmailNotification,
  getTemplatesById,
  setCreateNew,
} from './actions'
import { connect } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer'
import reducer from './reducer'
import saga from './saga'
import EmailHistory from './EmailHistory'
import PopUpBG from 'components/PopUpBG'
import CustomizedModal from 'components/CustomizedModal'
import moment from 'moment'
import {
  makeSelectCreateNew,
  makeSelectCustomEmailTemplates,
  makeSelectDefaultEmailTemplates,
  makeSelectEmailNotifications,
  makeSelectFormInput,
  makeSelectPageIndex,
  makeSelectResponseErrors,
  makeSelectScheduledTime,
  makeSelectStoreId,
  makeSelectVerifiedEmails,
} from './selectors'
import { useInjectSaga } from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import { validateEmail } from 'utils/validation'
import ErrorLine from 'components/ErrorLine'
import { UnixTimeStampToDate } from 'utils/UnixTimeStampToDate'
import ReactQuill from 'react-quill'

const EmailMarketing = ({
  PageIndex,
  setPageIndex,
  VerifiedEmails,
  getEmailNotifications,
  storeId,
  EmailNotifications,
  getDefaultTemplates,
  DefaultEmailTemplates,
  EmailTemplates,
  FormInput,
  getVerifiedEmails,
  verifyEmailID,
  checkEmailIDVerified,
  removeEmailIDVerified,
  UploadCsvToS3,
  removeEmailNotifications,
  setScheduledTime,
  setFormInput,
  getEmailTemplates,
  createEmailTemplate,
  copyDefaultTemplate,
  removeEmailTemplate,
  editEmailTemplate,
  sendEmailNotification,
  getTemplatesById,
  ScheduledTime,
  setCreateNew,
  CreateNew,
  ResponseErrors,
}) => {
  useInjectReducer({ key: 'EmailMarketing', reducer })
  useInjectSaga({ key: 'EmailMarketing', saga })
  const [selectedStartDate, setSelectedStartDate] = useState(moment(new Date()).format('DD MMM YYYY'))
  const [selectedStartTime, setSelectedStartTime] = useState(null)
  const [typedMail, setTypedMail] = useState('')
  const [SelectedEmail, setSelectedEmail] = useState('')
  const [ShowPaymentPopUp, setShowPaymentPopUp] = useState(false)
  const [ShowRemovePopUp, setShowRemovePopUp] = useState(false)
  const [EmailSubject, setEmailSubject] = useState('')
  const [TemplateName, setTemplateName] = useState('')
  const [TemplateId, setTemplateId] = useState('')
  const [TemplateBody, setTemplateBody] = useState('')
  const [VerifyMailPopUp, setVerifyMailPopUp] = useState(false)
  const [Errors, setErrors] = useState({
  selectedTemplate:false,
  verifiedEmail:false,
  CsvUpload:false,
  ScheduledTime:false,
})

  useEffect(() => {
    setSelectedStartTime(moment(new Date()).format('hh:mm a'))
    getEmailNotifications(storeId, '')
    setCreateNew(false)
    if(PageIndex>4)
    {
      setPageIndex(4)
    }
  }, [])

  useEffect(() => {
    if (PageIndex === 1) {
      getDefaultTemplates()
      getEmailTemplates(storeId)
    }
    if (PageIndex === 2) getVerifiedEmails(storeId)
    if (PageIndex === 5) getTemplatesById(storeId, FormInput.templateId)
  }, [PageIndex])
  const AllPage = ({ children, heading }) => {
    return (
      <div className="p-10 mx-10">
        <h1 className="font-bold text-lg">
          {heading} <span className="font-normal text-lg item-label">( Step {PageIndex} out 0f 5 )</span>
        </h1>
        {children}
      </div>
    )
  }
  const PaymentPopUp = () => {
    return (
      <PopUpBG>
        <div className="bg-white w-1/4 px-5 border-radius-3">
          <div className="flex justify-between">
            <h1 className="inside_headings">Wallet </h1>
            <span className="inside_headings">X</span>
          </div>
          <hr className="my-4" />
          {/* <p className="font-semibold text-sm">
            {' '}
            <span className="text-green-500"> 200 Email Credit</span> requested by marketing and branding.
          </p>
          <h2 className="inside_headings">Details</h2>
          <div className="flex justify-between  font-medium">
            <p>Total Customers</p>
            <p className="font-semibold">500</p>
          </div>
          <div className="flex justify-between  font-medium">
            <p>Total Credits</p>
            <p className="font-semibold">500</p>
          </div>
          <p className="text-center font-semibold text-red-500">Oops!</p>
          <p className="font-semibold">It looks like you don't have enough credits in your wallet.</p> */}
          <p className="font-semibold">Proceed To Pay</p>
          <button
            className="cta-btn px-5 my-4 w-full"
            onClick={() => {
              setShowPaymentPopUp(false)
              setPageIndex(0)
              sendEmailNotification(FormInput,storeId)
            }}
          >
            Approve
          </button>
        </div>
      </PopUpBG>
    )
  }
  const RemovePopUp = () => {
    return (
      <PopUpBG>
        <CustomizedModal
          closeModal={() => {
            setSelectedEmail('')
            setShowRemovePopUp(false)
          }}
          title={<h3 className="text-lg font-semibold text-red-600 my-auto">Remove Notification</h3>}
          onCreateAttribute={() => {
            removeEmailNotifications(SelectedEmail.batch_id)
            setSelectedEmail('')
          }}
          onCancel={() => {
            setSelectedEmail('')
            setShowRemovePopUp(false)
          }}
          cancel
          DoneBtnText={'Remove'}
        >
          <h2 className="item-label text-base">Are you sure you want to remove this message?</h2>
          <p className="item-label">{SelectedEmail.template_data.email_subject}
          </p>
        </CustomizedModal>
      </PopUpBG>
    )
  }

  const VerifyMail = () => {
    return (
      <PopUpBG>
        <div className="bg-white w-1/2  font-medium px-10 py-10 border-radius-3">
          <span
            className="absolute font-bold cursor-pointer addEmailCrossBtn"
            onClick={() => setVerifyMailPopUp(false)}
          >
            X
          </span>
          <h1 className="text-center font-bold text-lg mb-5">Check Your Mail</h1>
          <p>
            An email has been sent on {typedMail} with a verification link. Please click on that link to 
            verify your account.
          </p>
          <p>
            Didn't got the mail?{' '}
            <span className="text-secondary-400 cursor-pointer" onClick={() => setVerifyMailPopUp(false)}>
              Resend
            </span>
            <br />
            <button
              className="text-red-500 font-semibold mt-2"
              onClick={() => { checkEmailIDVerified(typedMail, storeId);}}
            >
              Click here to check if email is verified.
            </button>
          </p>
          <ErrorLine type={ResponseErrors.checkVerifiedEmail} value={"Your email is not verified yet,Please try again!"} />
        </div>
      </PopUpBG>
    )
  }
  const ViewEmail = () => {
    return (
      <PopUpBG>
        <div className="w-1/2 px-10">
          <h1 className="text-white">{SelectedEmail.template_data ? SelectedEmail.template_data.email_subject : SelectedEmail.template_name}

          <span
            className="viewEmailCross"
            onClick={() => setSelectedEmail('')}
          >
            X
          </span>
            </h1>
          <ReactQuill
            modules={{toolbar: ""}}
            onKeyDown={(e)=>e.preventDefault()}   
            value={SelectedEmail.template_data ? SelectedEmail.template_data.email_body : SelectedEmail.email_body}
          />
        </div>
      </PopUpBG>
    )
  }
const onCreateEmailBtn=()=>{
  setPageIndex(1)
   setFormInput("templateId", "")
   setFormInput("templateData", "")
   setFormInput("fileUrl", "")
   setFormInput("scheduleTime", "")
   setFormInput("verfiedEmailRecordId", "")
}
  return (
    <div className="h-full relative">
      <ExtendedNavBar text={'Email Marketing'} />
      {!EmailNotifications.length && PageIndex === 0 ? (
        <NoDataContainer
          heading={'Email Notifications'}
          desc={' Send email notifications to your customers.'}
          btnText={'Create New Email'}
          bottomText={'Sending email notifications can be useful to tell about your product more briefly.'}
          onBtnClick={() => onCreateEmailBtn()}
        />
      ) : (
        PageIndex === 0 && (
          <div className="mx-5 p-2 pt-4 pb-10">
            <div className="flex justify-between">
              <p className=" font-bold text-lg">Email History</p>
                <button className="createEmailBtn" onClick={() => onCreateEmailBtn()}>
                {' '}
                + Create New Email
              </button>
            </div>
            <EmailHistory
            setFormInput={setFormInput} setPageIndex={setPageIndex}
            EmailNotifications={EmailNotifications} setSelectedEmail={setSelectedEmail} setShowRemovePopUp={setShowRemovePopUp} />
          </div>
        )
      )}
      {CreateNew && (
        <div className="p-10 mx-10">
          <h1 className="font-bold text-lg">
            Create Template <span className="font-normal text-lg item-label">( Step {PageIndex} out 0f 5 )</span>
          </h1>
          <div className="main_content_divs">
            <p className="inside_headings">
              Subject
              <span className="font-normal text-sm item-label">
                {' '}
                ( Enter your email subject. Try making it more attractive for your customers. )
              </span>
            </p>
            <input
              className="form-input border-2 subjectInput mb-4"
              type="text"
              value={EmailSubject}
              onChange={e => {
                setEmailSubject(e.target.value)
              }}
              placeholder="Enter Email Subject"
            />
            <p className="font-bold">Template Title</p>
            <input
              type="email"
              className="form-input w-full"
              value={TemplateName}
              onChange={e => {
                setTemplateName(e.target.value)
              }}
              placeholder="Enter Template Title"
            />
            <div className="mt-4">
              <RichTextEditor setTemplateBody={setTemplateBody} TemplateBody={TemplateBody} />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="cta-btn-next"
              onClick={() => {
                setPageIndex(1)
                if(CreateNew==="EDIT")
                {
                  editEmailTemplate(TemplateId, TemplateName, TemplateBody, EmailSubject, storeId)
                }
                else if (CreateNew === "NEW")
                {
                  createEmailTemplate(storeId, TemplateName, TemplateBody,EmailSubject);
                }
                setCreateNew(false)
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {PageIndex === 1 && !CreateNew &&(
        <AllPage heading="Create Email">
          <CreateEmailPage
            DefaultEmailTemplates={DefaultEmailTemplates}
            EmailTemplates={EmailTemplates}
            copyDefaultTemplate={copyDefaultTemplate}
            removeEmailTemplate={removeEmailTemplate}
            setCreateNew={setCreateNew}
            pageIndex={PageIndex}
            setEmailSubject={setEmailSubject}
            setTemplateName={setTemplateName}
            setTemplateId={setTemplateId}
            setTemplateBody={setTemplateBody}
            editEmailTemplate={editEmailTemplate}
            storeId={storeId}
            FormInput={FormInput}
            setFormInput={setFormInput}
            setSelectedEmail={setSelectedEmail}
            Errors={Errors}
            setErrors={setErrors}
          />
          <div className="flex justify-between">
            <button className="prev-btn" onClick={() => setPageIndex(PageIndex - 1)}>{'<'}&nbsp; Previous</button>
   
            <div className='ForError'>
            <ErrorLine value={"Please Select a Template!!"} type={Errors.selectedTemplate} />
           </div>
            <button className="cta-btn-next" onClick={() => {
              if (!FormInput.templateId) setErrors(prev => ({ ...prev, selectedTemplate: true }))
              else setPageIndex(PageIndex + 1)
              }}>Next</button>
          </div>
        </AllPage>
      )}

      {PageIndex === 2 && (
        <AllPage heading="Your Email">
          <div className="main_content_divs">
            <p className="inside_headings">
              Add New Email{' '}
              <span className="font-normal text-item item-label">
                ( Your customers will get email from this email ID){' '}
              </span>
            </p>
            <div className="flex justify-between h-10 mb-5">
              <input
                type="email"
                className="form-input w-5/6"
                placeholder="Enter Email ID"
                value={typedMail}
                autoFocus
                onChange={e => setTypedMail(e.target.value)}
              />
              <button
                className="cta-btn"
                onClick={() => {
                  verifyEmailID(typedMail,storeId)
                  setVerifyMailPopUp(true)
                }}
                disabled={typedMail.length < 1 || !validateEmail(typedMail)}
              >
                Add
              </button>
            </div>
            <Radio.Group
              value={FormInput.verfiedEmailRecordId}
              className="Radio-Group"
            >
              {VerifiedEmails.map((val, ind) => {
                return (
                    <Radio 
                    onClick={() => {
                      setFormInput('verfiedEmailRecordId', val.entry_id)
                      setErrors((prev => ({ ...prev, verifiedEmail: false })));
                    }}
                    key={val.entry_id} className="font-medium w-full" value={val.entry_id} id={val.entry_id}>
                      <div
                      
                        className="flex justify-between w-60vw"
                      >
                        <p>{val.email_id}</p>
                        <p
                          className="text-gray-400 hover:text-secondary"
                          onClick={() => {
                            removeEmailIDVerified(val.entry_id)
                          
                          }}
                        >
                          Remove
                        </p>
                      </div>
                    </Radio>
                )
              })}
            </Radio.Group>
            <ErrorLine value={"Please Select an Email!!"} type={Errors.verifiedEmail} />
          </div>
          <div className='flex justify-between'>
            <button className="prev-btn" onClick={() => setPageIndex(PageIndex - 1)}>{'< '} Previous</button>
          <button className="cta-btn-next" onClick={() =>{
              if (!FormInput.verfiedEmailRecordId) setErrors((prev => ({ ...prev, verifiedEmail :true})))
              else { setErrors((prev => ({ ...prev, verifiedEmail: false })));setPageIndex(PageIndex + 1)}
            }}>Next</button>
          </div>
        </AllPage>
      )}
      {PageIndex === 3 && (
        <AllPage heading="Customer Email">
          <div className="main_content_divs">
            <p className="inside_headings">
              Customer Details{' '}
              <span className="font-normal text-sm item-label">
                ( You can upload the excel sheet with customer details )
              </span>{' '}
            </p>
            <div className="button-wrap mb-10 mt-5">
              <label htmlFor="upload" className={FormInput.fileUrl ? 'UploadedCSVBtn' : 'NotUploadedCSVBtn'}>
                {FormInput.fileUrl ? 'Uploaded' : 'Upload File'}
              </label>
              <input
                id="upload"
                className="hidden"
                type="file"
                disabled={FormInput.fileUrl.length > 0 ? true : false}               
                onChange={e => {
                  setErrors((prev => ({ ...prev, CsvUpload: false }))) 
                  UploadCsvToS3(e.target.files[0], storeId)
                }}
              />
            </div>
            <ErrorLine value={"Please Upload a File!!"} type={Errors.CsvUpload} />
          </div>
          <div className='flex justify-between'>
            <button className="prev-btn" onClick={() => setPageIndex(PageIndex - 1)}>{'< '} Previous</button>
            <button className="cta-btn-next" onClick={() => { 
              if(FormInput.fileUrl) setPageIndex(PageIndex + 1); 
              else setErrors((prev => ({ ...prev, CsvUpload: true }))) }}> Next</button>
          </div>
        </AllPage>
      )}
      {PageIndex === 4 && (
        <AllPage heading="Delivery Schedule">
          <div className="main_content_divs">
            <p className="font-semibold text-base">When should the notification be sent?</p>
            <Radio.Group value={FormInput.scheduleTime} className="Radio-Group">
              <Radio className="font-medium" value={moment().unix()} id={1}>
                <p
                  onClick={() => {
                    setFormInput('scheduleTime', moment().unix());
                    setScheduledTime("NOW")
                  }}
                  className="text-base mx-2 mt-2"
                >
                  {' '}
                  Immediately
                </p>
              </Radio>
              <Radio
                className="font-medium"
                value={moment(`${selectedStartDate} ${selectedStartTime}`, 'DD MMM YYYY hh:mm a').format('X')}
                id={2}
              >
                <p
                  onClick={() => {
                    setFormInput(
                      'scheduleTime',
                      moment(`${selectedStartDate} ${selectedStartTime}`, 'DD MMM YYYY hh:mm a').format('X'),
                    )
                    setScheduledTime("LATER")
                  }}
                  className=" text-base mx-2"
                >
                  Schedule a Time
                </p>
              </Radio>
            </Radio.Group>
           {ScheduledTime==="LATER" && <>
            <DatePicker
              allowClear={false}
              disabledDate={current => {
                const customDate = moment().format('DD MMM YYYY')
                return current && current < moment(customDate, 'DD MMM YYYY')
              }}
              defaultValue={() => moment(selectedStartDate, 'DD MMM YYYY')}
              onChange={(date, dateString) => setSelectedStartDate(dateString)}
              format="DD MMM YYYY"
              className="date_time_input"
              value={moment(selectedStartDate, 'DD MMM YYYY')}
            />
            <TimePicker
              defaultValue={() => moment(selectedStartTime, 'YYYY-MM-DD')}
              use12Hours
              format="hh:mm a"
              value={moment(selectedStartTime, 'hh:mm a')}
              onSelect={time => {setSelectedStartTime(moment(time).format('hh:mm a'))}}
              allowClear
              className="date_time_input"
              popupStyle={{ backgroundColor: '#f64b5d' }}
            />
              </>}
            <ErrorLine value={"Please Schedule a Time!!"} type={Errors.ScheduledTime} />
          </div>
          <div className='flex justify-between'>
          <button className="prev-btn" onClick={() => setPageIndex(PageIndex - 1)}> {'< '} Previous</button>
          <button className="cta-btn-next" onClick={() =>
           { if(FormInput.scheduleTime) setPageIndex(PageIndex + 1)
            else setErrors(prev => ({ ...prev, ScheduledTime: true }))
          }}> Next</button>
          </div>
        </AllPage>
      )}
      {PageIndex === 5 && (
        <div className="mx-10 px-10">
          <AllPage heading="Review & Payment">
            <div>
              <div className="main_content_divs">
                <ReactQuill
                  modules={{ toolbar: "" }}
                  onKeyDown={(e) => e.preventDefault()}
                value={FormInput.templateData}
                />
              </div>
              <div className="main_content_divs">
                <p className="inside_headings">Delivery</p>
                <p className="item-label">Emails will be send {ScheduledTime === "NOW" ? "Immediately" : " on "+ UnixTimeStampToDate(FormInput.scheduleTime)}</p>
              </div>
              <div className="main_content_divs">
                <p className="inside_headings mt-0">Total Credits</p>
                <span className="item-label">Will be calculated according to number of emails</span>
              </div>
            </div>
            <div className='flex justify-between mb-20'>
            <button className="prev-btn" onClick={() => setPageIndex(PageIndex - 1)}> {'< '} &nbsp;Previous</button>
            <button className="cta-btn-next" onClick={() =>  setShowPaymentPopUp(true)}>Proceed to Pay</button>
            </div>
          </AllPage>
        </div>
      )}
      {ShowPaymentPopUp && <PaymentPopUp />}
      {SelectedEmail && (!ShowRemovePopUp ? <ViewEmail /> : <RemovePopUp />)}
      {VerifyMailPopUp && <VerifyMail />}
      <NewFooter />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  VerifiedEmails: makeSelectVerifiedEmails(),
  PageIndex: makeSelectPageIndex(),
  EmailNotifications: makeSelectEmailNotifications(),
  DefaultEmailTemplates: makeSelectDefaultEmailTemplates(),
  EmailTemplates: makeSelectCustomEmailTemplates(),
  FormInput: makeSelectFormInput(),
  ScheduledTime:makeSelectScheduledTime(),
  CreateNew: makeSelectCreateNew(),
  ResponseErrors: makeSelectResponseErrors(),
})

const mapDispatchToProps = dispatch => ({
  setPageIndex: value => dispatch(setPageIndex({ value })),
  getEmailNotifications: (storeId, status) => dispatch(getEmailNotifications({ storeId, status })),
  getDefaultTemplates: () => dispatch(getDefaultTemplates()),
  copyDefaultTemplate: (value, templateId) => dispatch(copyDefaultTemplate(value, templateId)),
  getEmailTemplates: storeId => dispatch(getEmailTemplates(storeId)),
  createEmailTemplate: (storeId, templateName, emailBody, emailSubject) =>
    dispatch(createEmailTemplate(storeId, templateName, emailBody, emailSubject)),
  editEmailTemplate: (templateId, templateName, emailBody, emailSubject, storeId) =>
    dispatch(editEmailTemplate(templateId, templateName, emailBody, emailSubject, storeId)),
  removeEmailTemplate: (templateId, storeId) => dispatch(removeEmailTemplate(templateId, storeId)),
  getVerifiedEmails: storeId => dispatch(getVerifiedEmails(storeId)),
  verifyEmailID: (emailId,storeId) => dispatch(verifyEmailID(emailId,storeId)),
  checkEmailIDVerified: (email, storeId) => dispatch(checkEmailIDVerified(email, storeId)),
  removeEmailIDVerified: recordId => dispatch(removeEmailIDVerified(recordId)),
  UploadCsvToS3: (imgFile, storeId) => dispatch(UploadCsvToS3(imgFile, storeId)),
  removeEmailNotifications: recordId => dispatch(removeEmailNotifications(recordId)),
  setScheduledTime: value => dispatch(setScheduledTime(value)),
  setFormInput: (property, value) => dispatch(setFormInput(property, value)),
  sendEmailNotification: (FormInput, storeId) => dispatch(sendEmailNotification(FormInput, storeId)),
  getTemplatesById: (storeId, TemplateId) => dispatch(getTemplatesById(storeId, TemplateId)),
  setCreateNew: (value) => dispatch(setCreateNew(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailMarketing)
