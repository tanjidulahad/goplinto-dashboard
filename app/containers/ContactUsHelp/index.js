import React, { useState, useEffect } from 'react'
import HelpTopBar from 'components/HelpTopBar'
import ContactHelpTopBar from 'components/ContactHelpTopBar'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { notification } from 'antd'
import { useMediaQuery } from 'react-responsive'
import Mail from '../../images/mail.png'
import Call from '../../images/call.png'
import { numberInputValidation, validateEmail } from 'utils/validation'
const FormComponent=({user})=>{
  const [userName, setUserName] = useState(user ? user.full_name : '')
  const [userPhone, setUserPhone] = useState(user.phone != null ? user.phone : '')
  const [userEmail, setUserEmail] = useState(user.email != null ? user.email : '')
  const [messageBody, setMessageBody] = useState('')
  const [error, setError] = useState({
    name:false,
    email:false,
    InvalidEmail:false,
    msg:false
  })
  const isTablet = useMediaQuery({ minWidth: 992 })

  const sendEmail = async (e) => {
    e.preventDefault()
    try {
      setError({
          name:userName?false:true,
          email:userEmail?false:true,
          InvalidEmail: validateEmail(userEmail)?false:true,
          msg:messageBody?false:true})

      if (!userName || !userEmail || !messageBody || !validateEmail(userEmail))  return;

      const templateId = `d-cd7e54f7e6894cfbb6e9d09549f448be`
      const postBody = {
        from: {
          email: userEmail,
          name: userName,
        },
        personalizations: [
          {
            to: [{ email: 'hello@goplinto.com' }],
            dynamic_template_data: {
              userName,
              userPhone,
              userEmail,
              messageBody,
            },
          },
        ],
        template_id: templateId,
      }
      const params = {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: process.env.REACT_APP_SENDGRID_KEY,
        },
      }
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', params)
      if (response.status === 202) {
        notification.info({
          message: `Email Sent Successfully`,
          description: 'Your email has been sent to GoPlinto',
          placement: 'bottomRight',
        })
        setMessageBody('')
      } else {
        notification.error({
          message: `Email Could not be sent`,
          description: 'Invalid Email!',
          placement: 'bottomRight',
        })
      }
    } catch (error) {
      notification.error({
        message: `Email Could not be sent`,
        description: 'Please try again later!',
        placement: 'bottomRight',
      })
      console.error({ error })
    }
  }

  return(
   isTablet?<form>
      <div className="grid grid-cols-2">
        <div className="border-r">
          <div>
            <p
              style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
              className="font-semibold"
            >
              Name*
            </p>
            <input
              type="text"
                          className="border placeholder-opacity-75 focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '0px', fontSize: '20px' }}
                          value={userName}
                          placeholder="Enter your name"
                          onChange={e => setUserName(e.target.value)}
                        />
            {error.name && <p className="text-red-500 font-semibold ml-8">Please enter your name</p>}
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Email Id*
                        </p>
                        <input
                          id="email"
                          className="border placeholder-opacity-75  focus:border-secondary cursor:pointer focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '0px', fontSize: '20px' }}
                          type="email"
                          placeholder="Enter your email"
                          value={userEmail}
                          onChange={e => setUserEmail(e.target.value)}
                        />
            {error.email && <p className="text-red-500 font-semibold ml-8">Please enter your Email Id</p>}
            {error.InvalidEmail && !error.email&&<p className="text-red-500 font-semibold ml-8">Please enter valid Email Id</p>}
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Phone Number
                        </p>
                        <input
                          id="contact"
                          className="border placeholder-opacity-75  focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '0px', fontSize: '20px' }}
                          onChange={e => {
                            setUserPhone(e.target.value)
                          }}
                          placeholder="Enter your phone number"
                           onKeyDown={(e) => numberInputValidation(e)}
                          value={userPhone}
                          type="number"
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Your Message / Issue*
                        </p>
                        <textarea
                          id="message"
                          className="border placeholder-opacity-75 focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '0px', fontSize: '20px' }}
                          type="text"
                          rows="4"
                          cols="6"
                          placeholder="Enter in detail about the problem your facing"
                          onChange={e => setMessageBody(e.target.value)}
                          value={messageBody}
                        />
                      </div>
                    {error.msg && <p className="text-red-500 font-semibold ml-8">Please enter your message/Issue</p>}
                      <button
                        style={{
                          color: 'white',
                          width: '115px',
                          height: '45px',
                          marginTop: '25px',
                          marginRight: '15px',
                          marginLeft: '30px',
                        }}
                        className="bg-secondary rounded-lg p-2 font-semibold"
                        onClick={(e) => sendEmail(e)}
                      >
                        Submit
                      </button>
                    </div>
                    <div>
                      <div className="flex">
                        <img
                          style={{ marginLeft: '70px', width: '30px', height: '30px', marginTop: '30px' }}
                          src={Call}
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Call or WhatsApp
                        </p>
                      </div>
                      <div>
                        <p style={{ marginLeft: '130px', fontSize: '17px' }}>+91-936-090-3798 </p>
                      </div>
                      <div className="flex" style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                        <img
                          style={{ marginLeft: '70px', width: '30px', height: '30px', marginTop: '30px' }}
                          src={Mail}
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Mail
                        </p>
                      </div>
                      <a
                        href="mailto:hello@goplinto.com"
                        rel="noopener"
                        style={{ marginLeft: '130px', marginTop: '0px', fontSize: '17px', color: 'black' }}
                      >
                        hello@goplinto.com
                      </a>
                      <div
                        style={{
                          padding: '1rem',
                          background: '#FEEDEE',
                          marginLeft: '70px',
                          marginRight: '150px',
                          marginTop: '50px',
                        }}
                        className="rounded-lg"
                      >
                        <p style={{ marginLeft: '30px', fontSize: '20px' }} className="font-semibold">
                          Video Tutorials
                        </p>
                        <p style={{ marginLeft: '30px', fontSize: '17px' }}>
                          Watch video demos of how to use the GoPlinto dashboard!
                        </p>
                        <a
                          href="https://youtube.com/playlist?list=PLc8DW6Kg4VqbOzm3uQ_5JhKn-AnfgYru7"
                          className="font-semibold"
                          target="_blank"
                          rel="noopener"
                          style={{ marginLeft: '30px', fontSize: '17px', color: '#F76A78' }}
                        >
                          Watch now!
                        </a>
                      </div>
                      <div
                        style={{
                          padding: '1rem',
                          background: '#FEEDEE',
                          marginLeft: '70px',
                          marginRight: '150px',
                          marginTop: '50px',
                          marginBottom: '20px',
                        }}
                        className="rounded-lg"
                      >
                        <p style={{ marginLeft: '30px', fontSize: '20px' }} className="font-semibold">
                          Help Center
                        </p>
                        <p style={{ marginLeft: '30px', fontSize: '17px' }}>
                          Find more information about using GoPlinto in the Help Center!
                        </p>
                        <NavLink
                          to="/helpcenter"
                          className="font-semibold"
                          style={{ fontSize: '17px', color: '#F76A78' }}
                        >
                          <p
                            className="font-semibold"
                            style={{ marginLeft: '30px', fontSize: '17px', color: '#F76A78' }}
                          >
                            View now!
                          </p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
            </form>
    :
                  <div>
                    <div>
                      <div>
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '18px' }}
                          className="font-semibold"
                        >
                          Name*
                        </p>
                        <input
                          className="border focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '10px', fontSize: '18px' }}
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                          placeholder="Enter your name"
                          type="text"
                        />
            {error.name && <p className="text-red-500 font-semibold ml-8">Please enter your name</p>}

                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '18px' }}
                          className="font-semibold"
                        >
                          Email Id*
                        </p>
                        <input
                          className="border focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '10px', fontSize: '18px' }}
                          type="email"
                          value={userEmail}
                          placeholder="Enter your email"
                          onChange={e => setUserEmail(e.target.value)}
                        />
            {error.email && <p className="text-red-500 font-semibold ml-8">Please enter your Email Id</p>}

                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '18px' }}
                          className="font-semibold"
                        >
                          Phone Number
                        </p>
                        <input
                          className="border focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '10px', fontSize: '18px' }}
                          onChange={e => setUserPhone(e.target.value)}
                          value={userPhone}
                          placeholder="Enter your phone number"
                          onKeyDown={(evt) => numberInputValidation(e)}
                          type="text"
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '18px' }}
                          className="font-semibold"
                        >
                          Your Message / Issue*
                        </p>
                        <textarea
                          className="border focus:border-secondary focus:outline-none p-2 w-3/4 rounded-lg"
                          style={{ marginLeft: '30px', marginTop: '10px', fontSize: '18px' }}
                          type="text"
                          placeholder="Enter in detail about the problem your facing"
                          onChange={e => setMessageBody(e.target.value)}
                          value={messageBody}
                        />
            {error.msg && <p className="text-red-500 font-semibold ml-8">Please enter your message/Issue</p>}
                      </div>
                      <button
                        style={{
                          color: 'white',
                          width: '115px',
                          height: '45px',
                          marginTop: '25px',
                          marginRight: '15px',
                          marginLeft: '30px',
                        }}
                        type="submit"
                        className="bg-secondary rounded-lg p-2 font-semibold"
                        onClick={(e) => sendEmail(e)}
                      >
                        Submit
                      </button>
                    </div>
                    <div style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                      <hr />
                    </div>
                    <div>
                      <div className="flex">
                        <img
                          style={{ marginLeft: '30px', width: '30px', height: '30px', marginTop: '30px' }}
                          src={Call}
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Call or WhatsApp
                        </p>
                      </div>
                      <p style={{ marginLeft: '90px', fontSize: '17px' }}>+91-936-090-3798 </p>
                      <div className="flex">
                        <img
                          style={{ marginLeft: '30px', width: '30px', height: '30px', marginTop: '30px' }}
                          src={Mail}
                        />
                        <p
                          style={{ marginTop: '32px', marginLeft: '30px', fontSize: '20px' }}
                          className="font-semibold"
                        >
                          Mail
                        </p>
                      </div>
                      <a
                        href="mailto:hello@goplinto.com"
                        rel="noopener"
                        style={{ marginLeft: '90px', fontSize: '17px', color: 'black' }}
                      >
                        hello@goplinto.com
                      </a>
                      <div>
                        <div
                          style={{
                            height: '200px',
                            paddingTop: '20px',
                            paddingLeft: '10px',
                            background: '#FEEDEE',
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginTop: '50px',
                            paddingBottom: '40px',
                          }}
                          className="rounded-lg"
                        >
                          <p
                            style={{ marginLeft: '30px', marginRight: '75px', fontSize: '20px' }}
                            className="font-semibold"
                          >
                            Video Tutorials
                          </p>
                          <p style={{ marginLeft: '30px', fontWeight: 500, marginRight: '30px', fontSize: '17px' }}>
                            Watch video demos of how to use the GoPlinto dashboard!
                          </p>
                          <a
                            href="https://youtube.com/playlist?list=PLc8DW6Kg4VqbOzm3uQ_5JhKn-AnfgYru7"
                            className="font-semibold"
                            target="_blank"
                            rel="noopener"
                            style={{
                              marginLeft: '30px',
                              paddingBottom: '20px',
                              marginRight: '90px',
                              fontSize: '17px',
                              color: '#F76A78',
                            }}
                          >
                            Watch now!
                          </a>
                        </div>
                        <div
                          style={{
                            height: '200px',
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            paddingLeft: '10px',
                            background: '#FEEDEE',
                            marginLeft: '20px',
                            marginRight: '20px',
                            marginTop: '30px',
                            marginBottom: '20px',
                          }}
                          className="rounded-lg"
                        >
                          <p
                            style={{ marginLeft: '30px', marginRight: '70px', fontSize: '20px' }}
                            className="font-semibold"
                          >
                            Help Center
                          </p>
                          <p style={{ marginLeft: '30px', fontWeight: 500, marginRight: '30px', fontSize: '17px' }}>
                            Find more information about using GoPlinto in the Help Center!
                          </p>
                          <NavLink
                            to="/helpcenter"
                            className="font-semibold"
                            style={{ fontSize: '17px', color: '#F76A78' }}
                          >
                            <p
                              className="font-semibold"
                              style={{ marginLeft: '30px', marginRight: '90px', fontSize: '17px', color: '#F76A78' }}
                            >
                              View now!
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
  )
}
const ContactUsHelp = ({ user}) => {
  const [showContactUs, setShowContactUs] = useState(false)

  useEffect(() => {
    if (Object.keys(user).length) {
      setShowContactUs(true)
    }
  }, [])

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }


  return (
    <>
      <Desktop>
        <div style={{ background: '#F2F2F2', paddingBottom: '100px' }} className="min-h-screen">
          <ContactHelpTopBar />
          <p
            style={{
              textAlign: 'center',
              marginTop: '30px',
              fontWeight: '550',
              fontSize: '30px',
              marginBottom: '1px',
            }}
          >
            Contact Support
          </p>
          {!showContactUs ? (
            <div style={{ paddingLeft: '4.5rem', paddingRight: '4.5rem', paddingTop: '2rem' }}>
              <div
                style={{ paddingLeft: '4rem', paddingRight: '4rem', paddingTop: '2rem' }}
                className="bg-white rounded-lg"
              >
                <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px', marginTop: '10px' }}>
                  Log in to your GoPlinto account to get support
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NavLink to="/auth">
                    <button
                      style={{ color: 'white', width: '300px', height: '45px', marginTop: '18px' }}
                      className="bg-secondary rounded-lg p-2 font-semibold"
                    >
                      Log In
                    </button>
                  </NavLink>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    style={{
                      color: '#F64C5D',
                      width: '300px',
                      height: '45px',
                      marginTop: '50px',
                      marginBottom: '50px',
                    }}
                    className="bg-white rounded-lg p-2 font-semibold border-2 border-secondary"
                    onClick={() => {
                      setShowContactUs(true)
                    }}
                  >
                    Continue without Login
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ paddingLeft: '4.5rem', paddingRight: '4.5rem', paddingTop: '2rem' }}>
                <div
                  style={{ paddingLeft: '4rem', paddingRight: '4rem', paddingTop: '2rem', marginBottom: '20px' }}
                  className="bg-white rounded-lg"
                >
                  <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px', marginTop: '10px' }}>
                    How can we help you?
                  </p>
                  {<FormComponent user={user} />}
                </div>
              </div>
          )}
        </div>
      </Desktop>
      <Mobile>
        <div style={{ background: '#F2F2F2', paddingBottom: '100px' }} className="min-h-screen">
          <HelpTopBar />
          {showContactUs ? (
            <div>
              <p style={{ textAlign: 'center', marginTop: '30px', fontWeight: '550', fontSize: '25px' }}>
                Contact Support
              </p>

              <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className="bg-white rounded-lg" style={{ paddingBottom: '10px' }}>
                  <p style={{ textAlign: 'center', fontWeight: '100', fontSize: '19px', paddingTop: '20px' }}>
                    How can we help you?
                  </p>
                  {<FormComponent user={user}/>}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}>
                <div className="bg-white rounded-lg" style={{ paddingBottom: '10px', paddingTop: '20px' }}>
                  <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '20px' }}>
                    Log in to your GoPlinto account to get support
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <NavLink to="/auth">
                      <button
                        style={{ color: 'white', width: '200px', height: '45px', marginTop: '18px' }}
                        className="bg-secondary rounded-lg p-2 font-semibold"
                      >
                        Log In
                      </button>
                    </NavLink>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      style={{
                        color: '#F64C5D',
                        width: '200px',
                        height: '45px',
                        marginTop: '50px',
                        marginBottom: '50px',
                      }}
                      className="bg-white rounded-lg p-2 font-semibold border-2 border-secondary"
                      onClick={() => {
                        setShowContactUs(true)
                      }}
                    >
                      Continue without Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Mobile>
    </>
  )
}

function mapStateToProps(state) {
  return {
    user: state.get('global').user,
  }
}

export default connect(
  mapStateToProps,
  null,
)(ContactUsHelp)
