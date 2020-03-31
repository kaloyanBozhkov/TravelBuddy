import firebase, { auth } from './firebase.utils'

const googleProvider = new firebase.auth.GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})
console.log(firebase.auth === auth)

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)
