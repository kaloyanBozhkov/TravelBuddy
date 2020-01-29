import React from 'react'

import styles from './button.module.scss'

import Icon from 'components/UI/Icon/Icon'

const Button = ({ label, active = false, modifier = 'default', className = [], icon = null, hoverable = true }) => {

    const elementClass = [
        styles.button,
        styles['button--'+modifier],
        ...(active ? [styles.active] : []),
        ...(hoverable ? [styles.hoverable] : []),
        ...(typeof className === 'string' ? [className] : className),
    ].join(' ')

    return (
        <div className={elementClass}>
            { icon && <Icon icon={icon} /> }
            <p> {label} </p>
        </div>
    )
}

export default Button