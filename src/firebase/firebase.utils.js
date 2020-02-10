import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "travelbuddy-b7272.firebaseapp.com",
    databaseURL: "https://travelbuddy-b7272.firebaseio.com",
    projectId: "travelbuddy-b7272",
    storageBucket: "travelbuddy-b7272.appspot.com",
    messagingSenderId: "545087047453",
    appId: "1:545087047453:web:792d202fd50fa4be62c3f4",
    measurementId: "G-CRCVK79CCN"
}

export const createUserProfileDocument = (userAuth, callbackWithUserData) => {
    if (!userAuth) return
   
    const userDocRef = firestore.doc(`users/${userAuth.uid}`)
    userDocRef.get()
    .then((docSnapshot) => {
        console.log('docSnapshot', docSnapshot)
        console.log('docSnapshot.data()', docSnapshot.data())
        //if user does not exist, create one!
        if (!docSnapshot.exists) {
            const { email, displayName, photoURL, phoneNumber, emailVerified, uid } = userAuth
            const [firstName, lastName] = displayName.split(' ')
            docSnapshot.ref.set({
                dateCreated: new Date(),
                email,
                firstName,
                lastName,
                emailVerified,
                phoneNumber,
                photoURL,
                uid
            })
            .then((data) => console.log('User created successfully', data))
            .catch((error) => console.log('Error creating user', error))
        }
    })
    .catch((err) => console.log('Error getting the DocumentSnapshot for DocumentReferene.', err))

    return userDocRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export const firestore = firebase.firestore()

const googleProvider = new firebase.auth.GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase