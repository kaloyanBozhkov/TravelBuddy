import React from 'react'

import SignIn from '~/components/Account/SignIn/SignIn'
import Register from '~/components/Account/Register/Register'
import Recovery from '~/components/Account/Recovery/Recovery'
import { Redirect } from 'react-router'


const signedIn = false

const Account = ({ page }) => {
    
    switch (page) {
        case 'signin':
            return <SignIn />
        case 'register':
            return <Register />
        case 'recovery':
            return <Recovery />
        default: 
            return signedIn ? null : <Redirect to="/account/signin" />
    }
}

export default Account