import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition'

import styles from './header.module.scss'

import useWindowWidth from 'hooks/useWindowWidth'

import { ReactComponent as LogoSvg } from 'assets/logo.svg'
import Icon from 'components/UI/Icon/Icon'
import Button from 'components/UI/Button/Button'

const Header = ({ buttonDefinitions, location: { pathname: pathName }}) => {
    const windowWidth = useWindowWidth()
    const [iconName, setIconName] = useState("menu")
    const toggleIcon = () => setIconName(prevIcon => prevIcon === "menu" ? "times" : "menu")
    const btnArea = (
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
    )
    return (
        <div className={styles.header}>
            <div className={styles.logoArea} onClick={() => window.location.reload() }>
                <LogoSvg />
            </div>
            { windowWidth < 576 && <Icon className={styles.buttonAreaMenuButton} icon={iconName} onClick={toggleIcon} /> }
            {
                windowWidth < 576 &&
                <CSSTransition 
                    mountOnEnter
                    unmountOnExit 
                    in={iconName === "times"} 
                    timeout={400} 
                    classNames={{
                        enterActive: styles.sideMenuIn,
                        exit: styles.sideMenuOut,
                    }}
                >
                    {btnArea}
                </CSSTransition>
            }
            { windowWidth > 575 && btnArea }

        </div>
    )
}

export default withRouter(Header)
