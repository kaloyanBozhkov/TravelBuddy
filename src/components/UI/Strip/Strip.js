import React from 'react'

import styles from './strip.module.scss'

const Strip = ({ label }) => {
    return (
        <div className={styles.strip}>
            {label && <h1>{label}</h1>}
        </div>
    )
}

export default Strip