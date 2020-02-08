import React, { useRef } from 'react'

import styles from './register.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'


import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'

const Register = () => {
    const name = useRef(null)
    const surname = useRef(null)
    const email = useRef(null)
    const usernameRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const passwordRef = useRef(null)

    const {
        redirectHandler,
        ...wrapperGenerator
    } = AccountPageAnimation(styles.exiting)

    wrapperGenerator.props.children = (
        <div className={styles.register}>
            <div className={styles.container}>
                <UserBall label="Register" />
                <div className={styles.inputArea}>
                    <Input label="Name" icon="userCircle" ref={name} />
                    <Input label="Surename" icon="lock" ref={surname} />
                    <Input label="Username" icon="userCircle" ref={usernameRef} />
                    <Input label="Email" icon="lock" ref={email} />
                    <Input label="Password" icon="userCircle" ref={confirmPasswordRef} />
                    <Input label="Confirm Password" icon="lock" ref={passwordRef} />
                </div>
                <Button label="Register" modifier="filled" className={styles.buttons} />
                <Button label="Continue with Google" modifier="filled" className={[styles.buttons, styles.googleBtn].join(' ')} icon="google" iconOnLeftSide />
                
                <button className={styles.actionLink} onClick={() => redirectHandler('signin')}>Already have an account? Click here to sign in!</button>
            </div>
        </div>
    )

    return wrapperGenerator.wrapper()
}

export default Register