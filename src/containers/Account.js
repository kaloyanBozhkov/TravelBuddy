import React from 'react'

import SignIn from '~/components/Account/SignIn/SignIn'
import Register from '~/components/Account/Register/Register'
import Recovery from '~/components/Account/Recovery/Recovery'
import { Redirect } from 'react-router'

import { signInWithGoogle } from '~/firebase/firebase.utils'
const signedIn = false

const Account = ({ page }) => {
    const googleSignInHandler = () => signInWithGoogle().catch(({ message }) => console.log('Sign in with google aborted', message))

    switch (page) {
        case 'signin':
            return <SignIn googleSignInHandler={googleSignInHandler}  />
        case 'register':
            return <Register googleSignInHandler={googleSignInHandler} />
        case 'recovery':
            return <Recovery />
        default: 
            return signedIn ? null : <Redirect to="/account/signin" />
    }
}

export default Account