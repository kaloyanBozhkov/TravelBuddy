import React, { useState } from 'react'
import styles from './register.module.scss'

//Hooks
import usePersistantFields from '~/hooks/usePersistantFields'

//redux
import { useDispatch, useSelector } from 'react-redux'

import {
  signUpPending,
  signUpClearErrorMsg,
  signUpProviderPending,
} from '~/store/signup/signup.actions'
import { pageSwitchStart } from '~/store/pageSwitch/pageSwitch.actions'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'
import ErrorMsg from '~/components/UI/ErrorMsg/ErrorMsg'

import { validateEmail } from '~/helpers/validation'
import withPageAnimation from '~/components/HOCs/withPageAnimation'
/*
    check: custom check for validation besides empty
    onErrorClear: what other field to remove from errors state when this one is cleared? (password & repeatPassword will both clear error state on click of either one)
    isOptional: do we care for this field being filled in?
*/
const inputDefinitions = [
  {
    name: 'firstName',
    label: 'First name',
    icon: 'signature',
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last name',
    icon: 'signature',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    icon: 'at',
    type: 'email',
    check: function () {
      return validateEmail(this.ref.current.value)
    },
  },
  {
    name: 'phone',
    label: 'Phone',
    icon: 'phone',
    type: 'tel',
    isOptional: true,
  },
  {
    name: 'password',
    label: 'Password',
    icon: 'lock',
    type: 'password',
    check() {
      return this.ref.current.value === this.fields.repeatPassword.ref.current.value
    },
    onErrorClear: 'repeatPassword',
  },
  {
    name: 'repeatPassword',
    label: 'Repeat password',
    icon: 'lock',
    type: 'password',
    check() {
      return this.ref.current.value === this.fields.password.ref.current.value
    },
    onErrorClear: 'password',
  },
]

const register = (fields, setInvalidInputs, dispatch) => {
  //if field is not optional and has no value or has a custom check for it that fails, add field to error fields
  const invalidInput = fields
    .getFields()
    .filter(
      (field) =>
        (!field.isOptional && field.ref.current.value.length === 0) ||
        (field.check && !field.check())
    )

  if (invalidInput.length) {
    //gotta fill in the missing mandatory fields fam
    setInvalidInputs(invalidInput.map(({ name }) => name))

    //do not continue further
    return
  }

  dispatch(
    signUpPending(
      fields.email.ref.current.value,
      fields.password.ref.current.value,
      fields.firstName.ref.current.value,
      fields.lastName.ref.current.value,
      fields.phone.ref.current.value
    )
  )
}

// sign in input is controlled, register is uncontrolled. Why? for the fun of it!
const Register = () => {
  const dispatch = useDispatch()
  //setup fields' refs dynamically. Use createRef instead of useRef hook since hooks cannot be invoked in callbacks
  const persistantFields = usePersistantFields(inputDefinitions)

  const fields = persistantFields.current

  const [errInputs, setInvalidInputs] = useState([])
  const errorMsg = useSelector(({ signUpReducer: { error } }) => error && error.message)
  const providerSignUpPending = useSelector(
    ({ signUpReducer: { providerPending } }) => providerPending
  )

  const redirectTo = (path) => dispatch(pageSwitchStart(path))
  const registerHandler = () => register(fields, setInvalidInputs, dispatch)

  const invalidInputHandler = (fieldName) =>
    setInvalidInputs((invalidInput) =>
      invalidInput.filter(
        (name) =>
          !(
            name === fieldName ||
            (fields[fieldName].onErrorClear && fields[fieldName].onErrorClear === name)
          )
      )
    )

  const errorMsgHandler = () => dispatch(signUpClearErrorMsg())

  const googleRegisterHandler = () => dispatch(signUpProviderPending('google'))
  const facebookRegisterHandler = () => dispatch(signUpProviderPending('facebook'))

  return (
    <div className={styles.register}>
      <div className={styles.container}>
        <UserBall label="Register" />
        <ErrorMsg errorMsg={errorMsg} />

        <div className={styles.inputArea}>
          {fields.getFormatted().map((fieldAttributes) => (
            <Input
              key={fieldAttributes.name}
              {...fieldAttributes}
              invalidInputHandler={
                ~errInputs.indexOf(fieldAttributes.name)
                  ? () => invalidInputHandler(fieldAttributes.name)
                  : false
              }
              errorMsgHandler={errorMsg ? errorMsgHandler : null}
            />
          ))}
        </div>

        <Button
          label="Register"
          modifier="filled"
          className={styles.buttons}
          onClick={registerHandler}
        />

        <Button
          label={providerSignUpPending === 'google' ? 'In Progress...' : 'Continue with Google'}
          modifier="filled"
          className={[styles.buttons, styles.googleBtn].join(' ')}
          icon="google"
          iconOnLeftSide
          onClick={googleRegisterHandler}
          isLoading={providerSignUpPending === 'google'}
        />

        <Button
          label={providerSignUpPending === 'facebook' ? 'In Progress...' : 'Continue with Facebook'}
          modifier="filled"
          className={[styles.buttons, styles.facebookBtn].join(' ')}
          icon="facebook"
          iconOnLeftSide
          onClick={facebookRegisterHandler}
          isLoading={providerSignUpPending === 'facebook'}
        />

        <button className={styles.actionLink} onClick={() => redirectTo('/account/signin')}>
          Already have an account? Click here to sign in!
        </button>
      </div>
    </div>
  )
}

export default withPageAnimation(Register)(styles.exiting)
