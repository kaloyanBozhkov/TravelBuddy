import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth, createUserProfileDocument } from '~/firebase/firebase.utils'

// import actions
import { googleSignInPending, signOut } from '~/store/login/login.actions'
import { useSelector } from 'react-redux'

const useResumeSession = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ userReducer: { userData } }) => userData)

  // if signed in already, resume session
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('user signed in', user, currentUser)
      } else {
        console.log('user not signed in', user, currentUser)
      }
    })

    // on unmount unsubscribe from firebase's auth service
    return () => unsubscribeFromAuth()
  }, [dispatch])
}

export default useResumeSession
