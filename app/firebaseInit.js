import firebase from 'firebase/app'
import 'firebase/messaging'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

export const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then(firebaseToken => {
        resolve(firebaseToken)
      })
      .catch(err => {
        reject(err)
      })
  })

export const onMessageListener = () =>
  new Promise(resolve => {
    messaging.onMessage(payload => {
      resolve(payload)
    })
  })

export const getFCMToken = () =>
  new Promise(resolve => {
    messaging.getToken(payload => {
      resolve(payload)
    })
  })
