import React from 'react'

import styles from './strip.module.scss'

const Strip = ({ label }) => {
    return (
        <div className={styles.strip}>
            <h1>{label}</h1>
        </div>
    )
}

export default Strip