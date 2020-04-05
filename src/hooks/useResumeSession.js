import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '~/firebase/firebase.utils'

// import actions
import { signInSuccess } from '~/store/login/login.actions'
import { setUser } from '~/store/user/user.actions'
import User from '~/classes/user'

const useResumeSession = () => {
  const dispatch = useDispatch()

  // if signed in already, resume session
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInSuccess())
        dispatch(setUser(new User(user)))
      }
    })

    // on unmount unsubscribe from firebase's auth service
    return () => unsubscribeFromAuth()
  }, [dispatch])
}

export default useResumeSession
