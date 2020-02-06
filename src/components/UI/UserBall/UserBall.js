import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

import styles from './userball.module.scss'

const UserBall = ({ label = '' }) => {
    return (
        <CSSTransition
            in={true}
            classNames={{
                enterActive: 'entering',
                enterDone: 'entered',
                exitActive: 'exiting',
                exitDone: 'exited'
            }}
            
        >
            <div className={styles.userHeader}>
                <div className={styles.userBall}>
                    <div className={styles.head}></div>
                    <div className={styles.body}></div>
                </div>
                {label && <p>{label}</p>}
            </div>
        </CSSTransition>
    )
}

export default UserBall