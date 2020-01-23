import React from 'react'

import styles from './header.module.scss'

import { ReactComponent as LogoSvg } from 'assets/logo.svg'

const Header = () => {
    
    const onClick = f => f

    return (
        <div className={styles.header}>
            <div className={styles.logoArea}>
                <LogoSvg
                    onClick={onClick}
                />
            </div>
            <div className={styles.buttonArea}>

            </div>
        </div>
    )
}

export default Header
