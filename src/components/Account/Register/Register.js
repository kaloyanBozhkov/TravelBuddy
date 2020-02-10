import React, { createRef, useState, useRef } from 'react'
import { auth, createUserProfileDocument } from '~/firebase/firebase.utils'
import { validateEmail } from '~/helpers/validation'

import styles from './register.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'

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
        }
    },
    {
        name: 'repeatPassword',
        label: 'Repeat password',
        icon: 'lock',
        type: 'password',
        check() {
           return this.ref.current.value === this.fields.password.ref.current.value
        }
    }
]

const Register = ({ googleSignInHandler }) => {
    //setup fields' refs dynamically. Use createRef instead of useRef hook since hooks cannot be invoked in callbacks
    const persistantFields = useRef(inputDefinitions.reduce((acc, field) => {
        acc[field.name] = { 
            ...field, 
            ref: createRef(null), 
            fields: acc //circular ref
        }
        return acc
    }, {}))

    const fields = persistantFields.current

    const [errInputs, setErrInputs] = useState([])

    const {
        redirectHandler,
        ...wrapperGenerator
    } = AccountPageAnimation(styles.exiting)

    const registerHandler = () => {
        //if field is not optional and has no value or has a custom check for it that fails, add field to error fields
        const errFields = Object.values(fields).filter((field) => !field.isOptional && field.ref.current.value.length === 0 || field.check && !field.check())
        
        if (errFields.length) {
            //gotta fill in the missing mandatory fields fam
            setErrInputs(errFields.map(({ name }) => name))

            //do not continue further
            return
        }   

        //auth.createUserWithEmailAndPassword()
    }

    const errorHandler = (fieldName) => setErrInputs(errFields => errFields.filter((name) => name !== fieldName))

    wrapperGenerator.props.children = (
        <div className={styles.register}>
            <div className={styles.container}>
                <UserBall label="Register" />
                <div className={styles.inputArea}>
                    {Object.values(fields).map(({ check, fields, ...props }) => <Input key={props.name} {...props} errorHandler={~errInputs.indexOf(props.name) ? () => errorHandler(props.name) : false} />)}
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