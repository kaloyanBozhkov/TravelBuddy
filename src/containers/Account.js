import React from 'react'

import SignIn from '~/components/Account/SignIn/SignIn'

const signedIn = false
const Account = () => {

    if (signedIn) {
        return <h1>Account</h1>
    }
    
    return <SignIn />
}

export default Account