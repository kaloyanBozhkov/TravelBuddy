import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useInputHandler from '~/hooks/useInputHandler'

import styles from './signin.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'

import { signInPending } from '~/store/login/login.actions'

// sign in input is controlled, register is uncontrolled. Why? for the fun of it!
const SignIn = ({ googleSignInHandler }) => {
  const dispatch = useDispatch()
  const errorMsg = useSelector(({ loginReducer: { error } }) => error && error.message)
  const [accState, onInputChangeHandler] = useInputHandler({ username: '', password: '' })
  const { redirectHandler, ...wrapperGenerator } = AccountPageAnimation(styles.exiting)
  const canProceed = accState.username.length > 0 && accState.password.length > 0

  const signInHandler = () => dispatch(signInPending(accState.username, accState.password))

  wrapperGenerator.props.children = (
    <div className={styles.signIn}>
      <div className={styles.container}>
        <UserBall label="Sign in" />

        {errorMsg && <p>{errorMsg}</p>}

        <div className={styles.inputArea}>
          <Input
            label="Username"
            icon="userCircle"
            name="username"
            onChange={onInputChangeHandler}
          />
          <Input
            label="Password"
            icon="lock"
            name="password"
            type="password"
            comment="Forgot your password?"
            commentOnClick={() => redirectHandler('recovery')}
            onChange={onInputChangeHandler}
          />
        </div>
        <Button
          label="Sign in"
          modifier="filled"
          className={styles.buttons}
          onClick={canProceed ? signInHandler : undefined}
          disabled={!canProceed}
        />
        <Button
          label="Sign in with Google"
          modifier="filled"
          className={[styles.buttons, styles.googleBtn].join(' ')}
          icon="google"
          iconOnLeftSide
          onClick={googleSignInHandler}
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
