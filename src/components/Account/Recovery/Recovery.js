import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordPending } from '~/store/reset/reset.actions'

import styles from './recovery.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'

import useInputHandler from '~/hooks/useInputHandler'

const Recovery = () => {
  const [email, onInputChangeHandler] = useInputHandler({ email: '' })
  const dispatch = useDispatch()
  const sendResetEmail = useCallback((email) => dispatch(resetPasswordPending(email)), [dispatch])
  const errorMsg = useSelector(({ signUpReducer: { error } }) => error && error.message)
  const { redirectHandler, ...wrapperGenerator } = AccountPageAnimation(styles.exiting)

  wrapperGenerator.props.children = (
    <div className={styles.recovery}>
      <div className={styles.container}>
        <UserBall label="Recovery" />
        {errorMsg && <p>{errorMsg}</p>}
        <div className={styles.inputArea}>
          <Input
            label="Email"
            icon="userCircle"
            name="email"
            id="email"
            onChange={onInputChangeHandler}
          />
        </div>
        <Button
          label="Send recovery email"
          modifier="filled"
          className={styles.buttons}
          onClick={() => sendResetEmail(email.email)}
          disabled={email.length > 0}
        />
        <button className={styles.actionLink} onClick={() => redirectHandler('signin')}>
          Know your account details? Click here to sign in!
        </button>
        <button className={styles.actionLink} onClick={() => redirectHandler('register')}>
          No accout yet? Click here to register!
        </button>
      </div>
    </div>
  )

  return wrapperGenerator.wrapper()
}

export default Recovery
