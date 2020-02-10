import {
    SIGN_IN,
    GOOGLE_SIGN_IN,
    REGISTER,
    CONTINUE_WITH_GOOGLE,
    SEND_RECOVERY_EMAIL,
} from '~/store/constants/account'

export const signIn = (accountDetails) => ({
    type: SIGN_IN,
    payload: accountDetails
})

export const googleSignIn = (accountDetails) => ({
    type: GOOGLE_SIGN_IN,
    payload: accountDetails
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