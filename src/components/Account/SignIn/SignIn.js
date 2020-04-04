import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInputHandler from '~/hooks/useInputHandler'

import styles from './signin.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

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
const SignIn = () => {
  const dispatch = useDispatch()
  const errorMsg = useSelector(({ loginReducer: { error } }) => error && error.message)
  const providerSigningInPending = useSelector(
    ({ loginReducer: { providerPending } }) => providerPending
  )
  const [accState, onInputChangeHandler] = useInputHandler({ username: '', password: '' })
  const clearError = () => errorMsg && dispatch(clearErrorMsg())

  const { redirectHandler, ...wrapperGenerator } = AccountPageAnimation(styles.exiting)

  const emailProvided = accState.username.length > 0
  const passwordProvided = accState.password.length > 0
  const canProceed = emailProvided && passwordProvided

  // clear erorr msg and show popup
  const googleSignInHandler = () => {
    clearError()
    dispatch(providerSignInPending('google'))
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

  wrapperGenerator.props.children = (
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
            errorMsgHandler={clearError}
            invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
          />
          <Input
            label="Password"
            icon="lock"
            name="password"
            type="password"
            comment="Forgot your password?"
            commentOnClick={() => redirectHandler('recovery')}
            onChange={onInputChangeHandler}
            errorMsgHandler={clearError}
            invalidInputHandler={errorMsg && !!~errorMsg.indexOf('password')}
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
          onClick={providerSigningInPending === 'google' ? undefined : googleSignInHandler}
          isLoading={providerSigningInPending === 'google'}
        />

        <button className={styles.actionLink} onClick={() => redirectHandler('register')}>
          No accout yet? Click here to register!
        </button>
      </div>
    </div>
  )

  return wrapperGenerator.wrapper()
}

export default SignIn
