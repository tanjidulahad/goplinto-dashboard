importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js')

firebase.initializeApp({
  apiKey: '%REACT_APP_FIREBASE_API_KEY%',
  authDomain: '%REACT_APP_FIREBASE_AUTH_DOMAIN%',
  projectId: '%REACT_APP_FIREBASE_PROJECT_ID%',
  storageBucket: '%REACT_APP_FIREBASE_STORAGE_BUCKET%',
  messagingSenderId: '%REACT_APP_FIREBASE_MESSAGING_SENDER_ID%',
  appId: '%REACT_APP_FIREBASE_APP_ID%',
})

const messaging = firebase.messaging()