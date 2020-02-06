import React, { useRef } from 'react'
import CSSTransitioin from 'react-transition-group/CSSTransition'

import styles from './signin.module.scss'

import Input from '~/components/UI/Input/Input'
import UserBall from '~/components/UI/UserBall/UserBall'

const SignIn = (withBackground = false) => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    return (
            <div className={styles.signIn}>
                <div className={styles.container}>
                    <UserBall label="Sign in" />
                    <Input label="Username" icon="userCircle" ref={usernameRef} />
                    <Input label="Password" icon="lock" comment="Forgot your password?" commentOnClick={() => alert('dome')} ref={passwordRef} />
                </div>
            </div>
    )
}

export default SignIn