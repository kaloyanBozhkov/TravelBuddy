import React from 'react'
import PropTypes from 'prop-types'

import styles from './button.module.scss'

import Icon from 'components/UI/Icon/Icon'

const Button = ({
  label,
  active = false,
  modifier = 'default',
  className = [],
  icon = null,
  notHoverable = false,
  iconOnLeftSide = false,
  iconOnRightSide = false,
  disabled = false,
  isLoading = false,
  ...buttonProps
}) => {
  const elementClass = [
    styles.button,
    styles['button--' + modifier],
    active ? styles.active : '',
    notHoverable ? '' : styles.hoverable,
    iconOnLeftSide ? styles.iconOnLeftSide : '',
    iconOnRightSide ? styles.iconOnRightSide : '',
    disabled ? styles['button--disabled'] : '',
    typeof className === 'string' ? className : '',
  ]
    .join(' ')
    .replace(/ +/g, ' ')

  return (
    <div className={elementClass} {...buttonProps}>
      {icon && <Icon icon={icon} />}
      <p>{label}</p>
      {isLoading && <Icon icon="spinner--cog" />}
    </div>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  active: PropTypes.bool,
  modifier: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  icon: PropTypes.string,
  notHoverable: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default Button
