import firebase, { auth } from './firebase.utils'

const googleProvider = new firebase.auth.GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

const facebookProvider = new firebase.auth.FacebookAuthProvider()

facebookProvider.setCustomParameters({
  display: 'popup',
})

// @TODO add scopes?
// facebookProvider.addScope('user_birthday');

export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider)
