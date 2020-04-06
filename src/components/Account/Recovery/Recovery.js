import React, { useCallback } from 'react'
import styles from './recovery.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordPending, clearErrorMsg, resetPasswordFail } from '~/store/reset/reset.actions'
import { pageSwitchStart } from '~/store/pageSwitch/pageSwitch.actions'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'
import ErrorMsg from '~/components/UI/ErrorMsg/ErrorMsg'

import useInputHandler from '~/hooks/useInputHandler'
import { validateEmail } from '~/helpers/validation'
import withPageAnimation from '~/components/HOCs/withPageAnimation'

const Recovery = () => {
  const [email, onInputChangeHandler] = useInputHandler({ email: '' })
  const dispatch = useDispatch()
  const sendResetEmail = useCallback((email) => dispatch(resetPasswordPending(email)), [dispatch])
  const errorMsg = useSelector(({ resetPasswordReducer: { error } }) => error && error.message)
  const clearError = () => errorMsg && dispatch(clearErrorMsg())
  const canProceed = validateEmail(email.email)
  const cannotProceedHandler = () =>
    dispatch(
      resetPasswordFail({
        message: 'Must provide a valid email before continuing.',
      })
    )
  const redirectTo = (path) => dispatch(pageSwitchStart(path))

  return (
    <div className={styles.recovery}>
      <div className={styles.container}>
        <UserBall label="Recovery" />
        <ErrorMsg errorMsg={errorMsg} />
        <div className={styles.inputArea}>
          <Input
            label="Email"
            icon="userCircle"
            name="email"
            id="email"
            onChange={onInputChangeHandler}
            errorMsgHandler={clearError}
          />
        </div>
        <Button
          label="Send recovery email"
          modifier="filled"
          className={styles.buttons}
          onClick={canProceed ? () => sendResetEmail(email.email) : cannotProceedHandler}
          disabled={!canProceed}
        />
        <button className={styles.actionLink} onClick={() => redirectTo('/account/signin')}>
          Know your account details? Click here to sign in!
        </button>
        <button className={styles.actionLink} onClick={() => redirectTo('/account/register')}>
          No accout yet? Click here to register!
        </button>
      </div>
    </div>
  )
}

export default withPageAnimation(Recovery)(styles.exiting)
