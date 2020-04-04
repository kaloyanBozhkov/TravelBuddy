import React, { useState, forwardRef } from 'react'

import styles from './input.module.scss'

import Icon from '~/components/UI/Icon/Icon'

const Input = forwardRef(
  (
    {
      classNames = [],
      label,
      icon,
      comment,
      commentOnClick = null,

      // function to invoke to clear the error state, if any
      invalidInputHandler = null,
      // function to call when an error is displayed (e.g. short password msg) and we want to remove it on click of input
      errorMsgHandler = null,
      isOptional = false,

      // props to spread on input element
      ...remainingProps
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false)

    // classes of wrapper
    const classes = [
      styles.input,
      invalidInputHandler ? styles.error : '',
      isOptional ? styles.isOptional : '',
      focused ? styles.inputFocused : '',
      ...(Array.prototype.isPrototypeOf(classNames) ? classNames : [classNames]),
    ]
      .join(' ')
      .replace(/ +/g, ' ')

    // handle state of input. Does it have content? Then set it to active styles!
    const focusHandler = () => {
      setFocused(true)

      // clear error style if any set
      if (invalidInputHandler && typeof invalidInputHandler === 'function') {
        invalidInputHandler()
      }

      // clear any error msg
      if (errorMsgHandler) {
        errorMsgHandler()
      }
    }
    const blurHandler = ({ target: { value } }) => setFocused(value !== '')

    return (
      <div className={classes} data-label={label}>
        <input {...remainingProps} ref={ref} onFocus={focusHandler} onBlur={blurHandler} />
        {icon && <Icon icon={icon} />}
        {comment && (
          <span
            onClick={commentOnClick}
            className={commentOnClick !== null ? styles.withAction : ''}
          >
            {comment}
          </span>
        )}
      </div>
    )
  }
)

export default Input
