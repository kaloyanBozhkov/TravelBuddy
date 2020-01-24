import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import styles from './header.module.scss'

import { ReactComponent as LogoSvg } from 'assets/logo.svg'

import Button from 'components/UI/Button/Button'

const Header = ({ buttonDefinitions, location: { pathname: pathName }}) => {
    return (
        <div className={styles.header}>
            <div className={styles.logoArea} onClick={() => window.location.reload() }>
                <LogoSvg />
            </div>
            <div className={styles.buttonArea}>
                {
                    /* using Link instead of NavLink intentionally! withRouter to spot if Button should render witha active styling */
                    buttonDefinitions.map(({ label, icon, path }, i) => (
                        <Link key={i} to={path}>
                            <Button 
                                label={label}
                                icon={icon}
                                active={pathName === path}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default withRouter(Header)
