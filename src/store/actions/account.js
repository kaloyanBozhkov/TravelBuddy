import {
    SIGN_IN,
    GOOGLE_SIGN_IN,
    SIGN_OUT,
    REGISTER,
    CONTINUE_WITH_GOOGLE,
    SEND_RECOVERY_EMAIL,
} from '~/store/constants/account'

export const signIn = (user) => ({
    type: SIGN_IN,
    payload: user
})

export const googleSignIn = (user) => ({
    type: GOOGLE_SIGN_IN,
    payload: user
})

export const signOut = () => ({
    type: SIGN_OUT
})

// export const signIn = (accountDetails) => ({
//     type: SIGN_IN,
//     payload: accountDetails
// })
// export const signIn = (accountDetails) => ({
//     type: SIGN_IN,
//     payload: accountDetails
// })
// export const signIn = (accountDetails) => ({
//     type: SIGN_IN,
//     payload: accountDetails
// })