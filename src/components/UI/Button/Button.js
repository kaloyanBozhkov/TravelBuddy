import React from 'react'

import styles from './button.module.scss'

import Icon from 'components/UI/Icons/Icon'

const Button = ({ label, active = false, className = [], iconName = null, onClick=f=>f}) => {

    const elementClass = [
        styles.button,
        ...(active ? [styles.active] : []),
        ...(typeof className === 'string' ? [className] : className)
    ].join(' ')

    return (
        <div className={elementClass}>
            {
                iconName && <Icon
                iconName={iconName}
            />
            }
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    )
}