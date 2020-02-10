import React, { useRef } from 'react'

import styles from './signin.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'


const SignIn = ({ googleSignInHandler }) => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const {
        redirectHandler,
        ...wrapperGenerator
    } = AccountPageAnimation(styles.exiting)

    const signInHandler = () => {
        
    }

    wrapperGenerator.props.children = (
        <div className={styles.signIn}>
            <div className={styles.container}>
                <UserBall label="Sign in" />
                <div className={styles.inputArea}>
                    <Input label="Username" icon="userCircle" ref={usernameRef} />
                    <Input label="Password" icon="lock" comment="Forgot your password?" commentOnClick={() => redirectHandler('recovery')} ref={passwordRef} />
                </div>
                <Button label="Sign in" modifier="filled" className={styles.buttons} onClick={signInHandler}/>
                <Button 
                    label="Sign in with Google" 
                    modifier="filled" 
                    className={[styles.buttons, styles.googleBtn].join(' ')} 
                    icon="google" 
                    iconOnLeftSide 
                    onClick={googleSignInHandler}
                />

                <button className={styles.actionLink} onClick={() => redirectHandler('register')}>No accout yet? Click here to register!</button>
            </div>
        </div>
    )

    return wrapperGenerator.wrapper()
}

export default SignIn