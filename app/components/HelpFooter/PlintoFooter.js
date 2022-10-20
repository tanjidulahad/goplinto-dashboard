import React, { PureComponent } from 'react'
import './style.css'
import PlintoLogo from '../../assets/Plinto Logo white.png'
import emailLogo from '../../assets/logos/emailLogo.svg'
import phoneLogo from '../../assets/logos/phoneLogo.svg'
import locationLogo from '../../assets/logos/locationLogo.svg'

import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { message } from 'antd'
import 'boxicons'
import { getLoggedInStatus } from '../../selectors'
import { fetchStoreSocialLinks } from '../../services/pickytoClient'
const mapStateToProps = (state, ownProps) => ({
  storeDisplaySettings: state.storeDisplaySettings.storeDisplaySetting,
  restaurantDetails: state.currentRestaurant,
  isLoggedIn: getLoggedInStatus(state),
  purchaseDetails: state.purchase.purchaseDetails,
  storeSettings: state.storeSettings.storeSetting,
})

class PlintoFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      socialLinks: null,
    }
  }
  async componentDidUpdate() {
    const { restaurantDetails } = this.props
    const { socialLinks } = this.state
    if (restaurantDetails.restaurantId && socialLinks === null) {
      const storeId = restaurantDetails.restaurantId
      const socialLinks = await fetchStoreSocialLinks(storeId)
      this.setState({ socialLinks: socialLinks.response })
    }
  }
  render() {
    const { storeDisplaySettings, storeSettings, restaurantDetails, isLoggedIn, purchaseDetails } = this.props
    const { socialLinks } = this.state
    const socialIcons = {
      FACEBOOK: 'facebook',
      TWITTER: 'twitter',
      INSTAGRAM: 'instagram',
      LINKEDIN: 'linkedin',
      PINTEREST: 'pinterest',
      MEDIUM: 'medium',
      WORDPRESS: 'wordpress',
      YOUTUBE: 'youtube',
    }
    const renderSocialAccounts = socialLinks => {
      const links = socialLinks.filter(socialLink => socialLink.socialAccountLink)
      const render = links.map(link => {
        return (
          <div>
            <a
              target="_blank"
              href={
                link.socialAccountLink.includes('http') ? link.socialAccountLink : `http://${link.socialAccountLink}`
              }
            >
              <div className="social-icons" style={{ borderColor: storeDisplaySettings.primaryColor }}>
                <box-icon color="white" size="md" type="logo" name={socialIcons[link.socialAccountName]} />
              </div>
            </a>
          </div>
        )
      })
      return render
    }
    return (
      <>
        <MediaQuery minDeviceWidth={1280}>
          <div
            style={{
              flex: '0 0 auto',
              clear: 'both',
              backgroundColor: 'black',
              height: '300px',
              padding: '50px 50px 0 50px',
              width: '100%',
              color: '#FFFFFFBF',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <a
                className="flex-item"
                href={`/${restaurantDetails.restaurantName}/${restaurantDetails.restaurantId}`}
                aria-label="store home"
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  flexBasis:
                    storeSettings.isAddressAvailable === 'N'
                      ? socialLinks && socialLinks.length === 0
                        ? '50%'
                        : '33.33%'
                      : '25%',
                }}
              >
                <img
                  src={restaurantDetails.logoImgUrl}
                  style={{
                    width: '100px',
                    margin: '0 50px',
                  }}
                  alt=""
                />
              </a>
              {storeSettings.isAddressAvailable === 'Y' ? (
                <div
                  className="flex-item"
                  style={{
                    flexBasis: socialLinks && socialLinks.length === 0 ? '33.33%' : '25%',
                  }}
                >
                  <div style={{ fontWeight: '600', marginBottom: '15px' }}>Address</div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <img className="footer-logo" src={locationLogo} />
                    {restaurantDetails.address
                      ? `${restaurantDetails.address}, ${restaurantDetails.city}, ${restaurantDetails.state}, ${
                          restaurantDetails.country
                        }, ${restaurantDetails.pincode}`
                      : 'Store Address Not Available'}
                  </div>
                </div>
              ) : null}
              <div
                className="policies-services flex-item"
                style={{
                  borderRight: socialLinks && socialLinks.length === 0 && 'none',
                  flexBasis:
                    storeSettings.isAddressAvailable === 'N'
                      ? socialLinks && socialLinks.length === 0
                        ? '50%'
                        : '33.33%'
                      : '25%',
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '5px' }}>Contact Us</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img className="footer-logo" src={phoneLogo} />
                  {restaurantDetails.storePhone}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img className="footer-logo" src={emailLogo} />
                  {restaurantDetails.storeEmail}
                </div>
              </div>
              {socialLinks && socialLinks.length !== 0 ? (
                <div
                  className="socials nav-items"
                  style={{
                    flexBasis: storeSettings.isAddressAvailable === 'N' ? '33.33%' : '25%',
                  }}
                >
                  Follow Us
                  <div className="social-accounts">{renderSocialAccounts(socialLinks)}</div>
                </div>
              ) : null}
            </div>
            <div
              style={{
                padding: '50px',
                wdisplay: 'flex',
                justifyContent: 'center',
              }}
            >
              <div>
                <a
                  href="http://goplinto.com/"
                  target="_blank"
                  aria-label="Goplinto"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                  }}
                >
                  <div>Powered By</div>
                  <img
                    src={PlintoLogo}
                    style={{
                      height: '35px',
                    }}
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </MediaQuery>
      </>
    )
  }
}

export default connect(
  mapStateToProps,
  {},
)(PlintoFooter)
