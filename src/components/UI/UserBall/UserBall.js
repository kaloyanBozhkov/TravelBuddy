import React from 'react'

import styles from './userball.module.scss'

const UserBall = ({ label = '' }) => {
    return (
        <div className={styles.userHeader}>
            <div className={styles.userBall}>
                <div className={styles.head}></div>
                <div className={styles.body}></div>
            </div>
            {label && <p>{label}</p>}
        </div>
    )
}

export default UserBall