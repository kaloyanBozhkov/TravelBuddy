import React from 'react'

import styles from './button.module.scss'

import Icon from 'components/UI/Icon/Icon'

const Button = ({ label, active = false, className = [], icon = null }) => {

    const elementClass = [
        styles.button,
        ...(active ? [styles.active] : []),
        ...(typeof className === 'string' ? [className] : className)
    ].join(' ')

    return (
        <div className={elementClass}>
            { icon && <Icon icon={icon} /> }
            <p> {label} </p>
        </div>
    )
}

export default Button