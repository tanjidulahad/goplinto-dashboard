import produce from 'immer'
import { SET_CREATE_NEW, SET_DEFAULT_EMAIL_TEMPLATES, SET_EMAIL_NOTIFICATION, SET_EMAIL_TEMPLATE, SET_ERRORS, SET_FORMINPUT, SET_PAGE_INDEX, SET_SCHEDULE_TIME, SET_VERIFIED_EMAILS} from './constants'

export const initialState = {
    PageIndex: 0,
    EmailNotifications:[],
    VerifiedEmails: [],
    EmailNotificationData:"",
    DefaultEmailTemplates:[],
    CustomEmailTemplates:[],
    ScheduledTime:"",
    FormInput : {
        templateId: "",
        templateData:"",
        fileUrl: "",
        scheduleTime: "",
        verfiedEmailRecordId: "",
    },
    createNew:false,
    responseErrors:{
        checkVerifiedEmail:false,
    }
}

const EmailMarketingReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_PAGE_INDEX:
                draft.PageIndex = action.value
                break 
            case SET_EMAIL_NOTIFICATION:
                draft.EmailNotifications = action.value        
                break
            case SET_DEFAULT_EMAIL_TEMPLATES:
                draft.DefaultEmailTemplates = action.value        
                break
            case SET_EMAIL_TEMPLATE:
                draft.CustomEmailTemplates = action.value        
                break
            case SET_VERIFIED_EMAILS:
                draft.VerifiedEmails = action.value          
                break
            case SET_SCHEDULE_TIME:
                draft.ScheduledTime = action.value          
                break
            case SET_FORMINPUT:
                draft.FormInput[action.property] = action.value     
                break
            case SET_CREATE_NEW:
                draft.createNew = action.value     
                break
            case SET_ERRORS:
                draft.responseErrors[action.property] = action.value     
                break

            default:
        }
    })
export default EmailMarketingReducer