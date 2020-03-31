import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth, createUserProfileDocument } from '~/firebase/firebase.utils'

// import actions
import { googleSignInPending, signOut } from '~/store/login/login.actions'
import { useSelector } from 'react-redux'

const useResumeSession = () => {
  return null
  // const dispatch = useDispatch()
  // const currentUser = useSelector(({ loginReducer: { currentUser } }) => currentUser)
  // console.log('ran')
  // // if signed in already, resume session
  // useEffect(() => {
  //   const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
  //     console.log('userAuth', userAuth)
  //     console.log('currentUser', currentUser)

  //     if (!userAuth) {
  //       return
  //     }

  //     const userAuthFromEmailAndPasswordCreation =
  //       userAuth.hasOwnProperty('additionalUserInfo') &&
  //       userAuth.additionalUserInfo.isNewUser &&
  //       userAuth.hasOwnProperty('additionalUserInfo') &&
  //       userAuth.operationType === 'signIn'
  //     const currentSignedInUser = userAuthFromEmailAndPasswordCreation ? currentUser : userAuth

  //     // make sure there is already a document for that user on firestore
  //     const userDocRef = createUserProfileDocument(currentSignedInUser)

  //     if (userDocRef) {
  //       userDocRef.onSnapshot((snapshot) => {
  //         if (snapshot.exists) {
  //           console.log('snapshot', snapshot)

  //           // signed up and sign in with google, store still does not have user settings
  //           if (!userAuthFromEmailAndPasswordCreation) {
  //             const {
  //               email,
  //               displayName,
  //               photoURL,
  //               phoneNumber,
  //               emailVerified,
  //               uid,
  //             } = snapshot.data()

  //             //   dispatch(
  //             //     googleSignIn({ uid, email, displayName, photoURL, phoneNumber, emailVerified })
  //             //   )
  //           }
  //         } else {
  //           dispatch(signOut())
  //         }
  //       })
  //     } else {
  //       // user null so userDocRef is undefined, sign out if signed in
  //       dispatch(signOut())
  //     }
  //   })

  //   // on unmount unsubscribe from firebase's auth service
  //   return () => unsubscribeFromAuth()
  // }, [dispatch])
}

export default useResumeSession
