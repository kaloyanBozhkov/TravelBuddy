import React, { useRef } from 'react'

import styles from './recovery.module.scss'
import AccountPageAnimation from '~/components/HOCs/AccountPageAnimation'

import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import UserBall from '~/components/UI/UserBall/UserBall'

const Recovery = () => {
    const emailRef = useRef(null)

    const {
        redirectHandler,
        ...wrapperGenerator
    } = AccountPageAnimation(styles.exiting)

    wrapperGenerator.props.children = (
        <div className={styles.recovery}>
            <div className={styles.container}>
                <UserBall label="Recovery" />
                <div className={styles.inputArea}>
                    <Input label="Email" icon="userCircle" ref={emailRef} />
                </div>
                <Button label="Send recovery email " modifier="filled" className={styles.buttons} />
                <button className={styles.actionLink} onClick={() => redirectHandler('signin')}>Know your account details? Click here to sign in!</button>
                <button className={styles.actionLink} onClick={() => redirectHandler('register')}>No accout yet? Click here to register!</button>
            </div>
        </div>
    )

    return wrapperGenerator.wrapper()
}

export default Recovery