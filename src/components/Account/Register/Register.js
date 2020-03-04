import React, { useState } from 'react'
import { auth, createUserProfileDocument } from '~/firebase/firebase.utils'
import { validateEmail } from '~/helpers/validation'

import styles from './register.module.scss'

//HOCs
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

//Hooks
import usePersistantFields from '~/hooks/usePersistantFields'

//redux
import { useDispatch } from 'react-redux'
import { signIn } from '~/store/actions/account'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'
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
        type: 'text'
    },
    {
        name: 'lastName',
        label: 'Last name',
        icon: 'signature',
        type: 'text'
    },
    {
        name: 'email',
        label: 'Email',
        icon: 'at',
        type: 'email',
        check: function() {
           return validateEmail(this.ref.current.value)
        }
    },
    {
        name: 'phone',
        label: 'Phone',
        icon: 'phone',
        type: 'tel',
        isOptional: true
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
        onErrorClear: 'password'
    }
]

const Register = ({ googleSignInHandler }) => {
    const dispatch = useDispatch()
    //setup fields' refs dynamically. Use createRef instead of useRef hook since hooks cannot be invoked in callbacks
    const persistantFields = usePersistantFields(inputDefinitions)

    const fields = persistantFields.current

    const [errInputs, setInvalidInputs] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)

    const {
        redirectHandler,
        ...wrapperGenerator
    } = AccountPageAnimation(styles.exiting)

    const registerHandler = () => {
        //if field is not optional and has no value or has a custom check for it that fails, add field to error fields
        const invalidInput = fields.getFields().filter((field) => !field.isOptional && field.ref.current.value.length === 0 || field.check && !field.check())
        
        if (invalidInput.length) {
            //gotta fill in the missing mandatory fields fam
            setInvalidInputs(invalidInput.map(({ name }) => name))

            //do not continue further
            return
        }   

        auth.createUserWithEmailAndPassword(fields.email.ref.current.value, fields.password.ref.current.value)
        .then(({ user: { email, photoURL, uid, emailVerified } }) => {
            const userData = {
                //set the two fields which createUserWithEmailAndPassword does not set
                displayName: `${fields.firstName.ref.current.value} ${fields.lastName.ref.current.value}`,
                phoneNumber: fields.phone.ref.current.value,
                email,
                photoURL,
                uid,
                emailVerified
            }

            //store user data in redux store
            dispatch(signIn(userData))
        })
        .catch((error) => setErrorMsg(error.message))
    }

    const invalidInputHandler = (fieldName) => setInvalidInputs(invalidInput => invalidInput.filter((name) => !(name === fieldName || fields[fieldName].onErrorClear && fields[fieldName].onErrorClear === name)))

    const errorMsgHandler = () => setErrorMsg(null)

    wrapperGenerator.props.children = (
        <div className={styles.register}>
            <div className={styles.container}>
                <UserBall label="Register" />
                {errorMsg && <p>{errorMsg}</p>}
                <div className={styles.inputArea}>
                    {fields.getFormatted().map((fieldAttributes) => (
                        <Input key={fieldAttributes.name} 
                            {...fieldAttributes} 
                            invalidInputHandler={~errInputs.indexOf(fieldAttributes.name) ? () => invalidInputHandler(fieldAttributes.name) : false} 
                            errorMsgHandler={errorMsg ? errorMsgHandler : null}
                        />)
                    )}
                </div>
                <Button label="Register" modifier="filled" className={styles.buttons}  onClick={registerHandler}/>
                <Button 
                    label="Continue with Google" 
                    modifier="filled" 
                    className={[styles.buttons, styles.googleBtn].join(' ')} 
                    icon="google" 
                    iconOnLeftSide 
                    onClick={googleSignInHandler}
                />
                <button className={styles.actionLink} onClick={() => redirectHandler('signin')}>Already have an account? Click here to sign in!</button>
            </div>
        </div>
    )

    return wrapperGenerator.wrapper()
}

export default Register