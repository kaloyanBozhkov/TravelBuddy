import React, { useState, forwardRef } from 'react'

import styles from './input.module.scss'

import Icon from '~/components/UI/Icon/Icon'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

      // is it text input or something else?
      type = 'text',

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
    const iconClickHandler = ({ target }) => {
      target.parentNode.parentNode.parentNode.querySelector('input').focus()
    }

    const input = (() => {
      switch (type) {
        case 'date':
          return (
            <div className={styles.dateInput}>
              <DatePicker
                ref={ref}
                onFocus={focusHandler}
                onBlur={blurHandler}
                {...remainingProps}
              />
            </div>
          )
        case 'number':
          return (
            <input
              ref={ref}
              onFocus={focusHandler}
              onBlur={blurHandler}
              {...remainingProps}
              onChange={(e) => {
                let newValue = parseInt(e.target.value)

                if (Number.isNaN(newValue)) {
                  newValue = ''
                }

                e.target.value = newValue

                if (remainingProps.hasOwnProperty('onChange')) {
                  remainingProps.onChange(e)
                }
              }}
            />
          )
        default:
          return <input ref={ref} onFocus={focusHandler} onBlur={blurHandler} {...remainingProps} />
      }
    })()

    return (
      <div className={classes} data-label={label}>
        {input}
        {icon && <Icon icon={icon} onClick={iconClickHandler} />}
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
