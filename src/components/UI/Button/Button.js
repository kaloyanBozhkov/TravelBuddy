import React from 'react'
import PropTypes from 'prop-types'

import styles from './button.module.scss'

import Icon from 'components/UI/Icon/Icon'

const Button = (props) => {
    const { label, active = false, modifier = 'default', className = [], icon = null, notHoverable = false } = props
    const elementClass = [
        styles.button,
        styles['button--'+modifier],
        ...(active ? [styles.active] : []),
        ...(notHoverable ? [] : [styles.hoverable]),
        ...(typeof className === 'string' ? [className] : className),
    ].join(' ')

    return (
        <div className={elementClass}>
            { icon && <Icon icon={icon} /> }
            <p> {label} </p>
        </div>
    )
}

Button.propTypes = {
    label: PropTypes.string,
    active: PropTypes.bool,
    modifier: PropTypes.string,
    className: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string
    ]),
    icon: PropTypes.string,
    notHoverable: PropTypes.bool
}

export default Button