import { notification } from 'antd'

const NotificationMsg = (type, message, placement) => {

    if (type === 'SUCCESS') 
        return notification.success({message,placement})
        
    else if (type === 'ERROR')
        return notification.error({message,placement})
}

export default NotificationMsg