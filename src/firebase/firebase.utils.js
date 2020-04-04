import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'travelbuddy-b7272.firebaseapp.com',
  databaseURL: 'https://travelbuddy-b7272.firebaseio.com',
  projectId: 'travelbuddy-b7272',
  storageBucket: 'travelbuddy-b7272.appspot.com',
  messagingSenderId: '545087047453',
  appId: '1:545087047453:web:792d202fd50fa4be62c3f4',
  measurementId: 'G-CRCVK79CCN',
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export const firestore = firebase.firestore()

export default firebase
