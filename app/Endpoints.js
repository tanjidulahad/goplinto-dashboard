const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL
const NODE_BASE_URL = process.env.MARKETING_API_BASE_URL
const NOTIFICATION_BASE_URL = process.env.MARKETING_NOTIFICATION_API_BASE_URL

// Dashboard APIs

export const getOnBoardingStatusAPI = storeId => `${BASE_URL}dashboard/get-store-onboarding-status&storeId=${storeId}`

export const getStoreStatusAPI = (level, id, startDate, endDate) => {
  if (!startDate || !endDate) var url = `${BASE_URL}dashboard/get-store-stats&${level}=${id}`
  else var url = `${BASE_URL}dashboard/get-store-stats&${level}=${id}&startDate=${startDate}&endDate=${endDate}`
  return url
}

export const getModulesStatusAPI = storeId => `${BASE_URL}dashboard/get-module-statuses&storeId=${storeId}`

// Store Settings Page APIs

export const setStoreSettingsAPI = (storeId, merchantId) => `${BASE_URL}stores/set-store-settings&storeId=${storeId}&merchantId=${merchantId}`
export const getStoreSettingsAPI = (storeId) => `${BASE_URL}stores/get-store-settings&storeId=${storeId}`

// Store Details API

export const getStoreDetailsAPI = storeId => `${BASE_URL}stores/get-store-details&storeId=${storeId}`
export const setStoreDetailsAPI = (storeId, merchantId, storeName, storeDesc, storeType) => `${BASE_URL}stores/update-store-details&storeId=${storeId}&merchantId=${merchantId}&storeName=${encodeURIComponent(
    storeName,
)}&storeDesc=${storeDesc}&storeType=${encodeURIComponent(storeType.value)}`

// Region and Currency Info API

export const updateRegionSettingsAPI = (storeId, storeCountry, storeCurrencyCode, storeTimezone) => `${BASE_URL}stores/update-region-settings&storeId=${storeId}&currencyCode=${storeCurrencyCode}&timeZone=${storeTimezone}&country=${storeCountry}`
export const getCountryDetailsAPI = () => `${BASE_URL}dashboard/get-country-details`
export const getNewCountryDetailsAPI = () => `${BASE_URL}store-config/get-countries`

//Contact Info API

export const setContactInfoAPI = (storeId, merchantId) => `${BASE_URL}stores/set-contact-details&storeId=${storeId}&merchantId=${merchantId}`

//Bank Details API

export const getBankDetailsAPI = (storeId, merchantId) => `${BASE_URL}stores/get-bank-details&storeId=${storeId}&merchantId=${merchantId}`
export const setBankDetailsAPI = (storeId, merchantId) => `${BASE_URL}stores/set-bank-details&storeId=${storeId}&merchantId=${merchantId}`

//SEO Settings API

export const getStoreSeoAPI = (storeId) => `${BASE_URL}stores/get-seo-details&storeId=${storeId}`
export const setStoreSeoAPI = (storeId, merchantId) => `${BASE_URL}stores/set-seo-details&storeId=${storeId}&merchantId=${merchantId}`

//Social Accounts API

export const getSocialAccountsAPI = (storeId) => `${BASE_URL}stores/get-social-accounts&storeId=${storeId}`
export const setSocialAccountsAPI = (storeId, merchantId) => `${BASE_URL}stores/set-social-accounts&storeId=${storeId}&merchantId=${merchantId}`

//Design Page API

export const getStoreTemplatesAPI = (storeId,planId) =>`${BASE_URL}store-settings/get-store-templates&storeId=${storeId}&planId=${planId}`
export const setStoreTemplatesAPI = (storeId) => `${BASE_URL}store-settings/set-store-template-settings&storeId=${storeId}`

//About Us
export const getAboutUsAPI = (storeId) => `${NODE_BASE_URL}store/get-about-page-details?storeId=${storeId}`
export const setAboutUsAPI = () => `${NODE_BASE_URL}store/set-about-page-details`

//ImageUploadAPI

export const uploadImageAPI = (name,type,storeId) => `${BASE_URL}customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`

export const WidgetStatusAPI = (storeId, WidgetId) => `${NODE_BASE_URL}widgets/get-widget-details-for-store?storeId=${storeId}&widgetId=${WidgetId}`

//Email Marketing APIs

export const getEmailNotificationsAPI = (storeId,status) => `${NOTIFICATION_BASE_URL}store/get-scheduled-marketing-emails?status=${status}&storeId=${storeId}`;
export const sendEmailNotificationAPI = () => `${NOTIFICATION_BASE_URL}store/schedule-email-batch`;
export const removeEmailNotificationAPI = () => `${NOTIFICATION_BASE_URL}store/unschedule-email-batch`;

export const getDefaultEmailTemplatesAPI = () => `${NOTIFICATION_BASE_URL}store/get-default-email-templates`;
export const copyDefaultEmailTemplateAPI = () => `${NOTIFICATION_BASE_URL}store/copy-default-email-templates`;

export const getEmailTemplatesAPI = (storeId) => `${NOTIFICATION_BASE_URL}store/get-store-email-templates?storeId=${storeId}`;
export const getTemplateByIdAPI = (storeId, templateId) => `${NOTIFICATION_BASE_URL}store/get-store-email-templates?storeId=${storeId}&templateId=${templateId}`;
export const createEmailTemplateAPI = () => `${NOTIFICATION_BASE_URL}store/create-store-email-template`;
export const editEmailTemplateAPI = () => `${NOTIFICATION_BASE_URL}store/update-store-email-template`;
export const removeEmailTemplateAPI = () => `${NOTIFICATION_BASE_URL}store/delete-store-email-template`;

export const getVerifiedEmailIDsAPI = (storeId) => `${NOTIFICATION_BASE_URL}store/get-ses-verified-emails?storeId=${storeId}`;
export const verifyEmailIDAPI = () => `${NOTIFICATION_BASE_URL}store/create-ses-verified-identity`;
export const checkEmailIDVerified = () => `${NOTIFICATION_BASE_URL}store/check-email-verification`;
export const removeVerifiedEmail = () => `${NOTIFICATION_BASE_URL}store/delete-ses-verified-identity`;