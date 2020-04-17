import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { pageSwitchStart } from '~/store/pageSwitch/pageSwitch.actions'
import useInputHandler from '~/hooks/useInputHandler'

import styles from './signin.module.scss'
import withPageAnimation from '~/HOCs/withPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'
import ErrorMsg from '~/components/UI/ErrorMsg/ErrorMsg'

import {
  signInPending,
  clearErrorMsg,
  signInFail,
  providerSignInPending,
} from '~/store/login/login.actions'

// sign in input is controlled, register is uncontrolled. Why? for the fun of it!
const SignIn = ({ dispatch, isSignedInButNotVerifiedEmail }) => {
  const errorMsg = useSelector(({ loginReducer: { error } }) => error && error.message)

  // show error msg for unverified users, instead of letting them continue with the sign in process
  useLayoutEffect(() => {
    if (isSignedInButNotVerifiedEmail) {
      dispatch(
        signInFail({
          message:
            'Your account has been created but not verified yet. A verification email has been sent to you, please confirm your email address and then sign in!',
        })
      )
    }
  }, [isSignedInButNotVerifiedEmail, dispatch])

  const providerSigningInPending = useSelector(
    ({ loginReducer: { providerPending } }) => providerPending
  )
  const [accState, onInputChangeHandler] = useInputHandler({ username: '', password: '' })
  const clearError = () => errorMsg && dispatch(clearErrorMsg())

  const emailProvided = accState.username.length > 0
  const passwordProvided = accState.password.length > 0
  const canProceed = emailProvided && passwordProvided

  // clear erorr msg and show popup
  const providerSignInHandler = (provider) => {
    clearError()
    dispatch(providerSignInPending(provider))
  }
  const signInHandler = () => dispatch(signInPending(accState.username, accState.password))
  const cannotProceedHandler = () =>
    dispatch(
      signInFail({
        message: `Must fill in the ${
          !emailProvided && !passwordProvided
            ? 'fields'
            : emailProvided
            ? 'password field'
            : 'email field'
        } before continuing.`,
      })
    )
  const redirectTo = (path) => dispatch(pageSwitchStart(path))

  return (
    <div className={styles.signIn}>
      <div className={styles.container}>
        <UserBall label="Sign in" />
        <ErrorMsg errorMsg={errorMsg} />
        <div className={styles.inputArea}>
          <Input
            label="Email"
            icon="userCircle"
            name="username"
            onChange={onInputChangeHandler}
            errorMsgHandler={errorMsg && !!~errorMsg.indexOf('email') && clearError}
          />
          <Input
            label="Password"
            icon="lock"
            name="password"
            type="password"
            comment="Forgot your password?"
            commentOnClick={() => redirectTo('/account/recovery')}
            onChange={onInputChangeHandler}
            errorMsgHandler={errorMsg && !!~errorMsg.indexOf('password') && clearError}
          />
        </div>
        <Button
          label="Sign in"
          modifier="filled"
          className={styles.buttons}
          onClick={canProceed ? signInHandler : cannotProceedHandler}
          disabled={!canProceed}
        />
        <Button
          label={
            providerSigningInPending === 'google'
              ? 'Signing in with google...'
              : 'Sign in with Google'
          }
          modifier="filled"
          className={[styles.buttons, styles.googleBtn].join(' ')}
          icon="google"
          iconOnLeftSide
          onClick={
            providerSigningInPending === 'google'
              ? undefined
              : () => providerSignInHandler('google')
          }
          isLoading={providerSigningInPending === 'google'}
        />

        <Button
          label={
            providerSigningInPending === 'facebook' ? 'In Progress...' : 'Signing in with Facebook'
          }
          modifier="filled"
          className={[styles.buttons, styles.facebookBtn].join(' ')}
          icon="facebook"
          iconOnLeftSide
          onClick={
            providerSigningInPending === 'facebook'
              ? undefined
              : () => providerSignInHandler('facebook')
          }
          isLoading={providerSigningInPending === 'facebook'}
        />

        <button className={styles.actionLink} onClick={() => redirectTo('/account/register')}>
          No accout yet? Click here to register!
        </button>
      </div>
    </div>
  )
}

export default withPageAnimation(SignIn)(styles.exiting)
