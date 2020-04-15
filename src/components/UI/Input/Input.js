import React, { useState, forwardRef, useLayoutEffect } from 'react'
import styles from './input.module.scss'

import Icon from '~/components/UI/Icon/Icon'

import PlacesAutocomplete from 'react-google-autocomplete'
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
    const beginFocused =
      (remainingProps.hasOwnProperty('value') && remainingProps.value.length > 0) ||
      (type === 'date' && remainingProps.hasOwnProperty('selected') && remainingProps.selected) ||
      (type === 'select' &&
        remainingProps.hasOwnProperty('selected') &&
        remainingProps.selected.length > 0)

    const [focused, setFocused] = useState(beginFocused)

    // classes of wrapper
    const classes = [
      styles.input,
      invalidInputHandler ? styles.error : '',
      isOptional ? styles.isOptional : '',
      focused ? (type === 'select' ? styles.selectFocused : styles.inputFocused) : '',
      ...(Array.prototype.isPrototypeOf(classNames) ? classNames : [classNames]),
    ]
      .join(' ')
      .replace(/ +/g, ' ')

    // make sure to change focused whenever beginFocused changes, optimally before paint
    useLayoutEffect(() => {
      setFocused(beginFocused)
    }, [beginFocused])

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
      if (type === 'select') {
        target.parentNode.parentNode.parentNode.querySelector('select').focus()
      } else {
        target.parentNode.parentNode.parentNode.querySelector('input').focus()
      }
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
        case 'googleAutocomplete':
          return (
            <PlacesAutocomplete
              ref={ref}
              // onPlaceSelected={(place) => console.log(place)} => control from parent
              onFocus={focusHandler}
              onBlur={blurHandler}
              types={['(cities)']}
              placeholder=""
              {...remainingProps}
            />
          )
        case 'select': {
          const { options, selected, ...otherProps } = remainingProps

          return (
            <select
              value={selected}
              ref={ref}
              {...otherProps}
              onFocus={focusHandler}
              onBlur={blurHandler}
              onChange={(e) => {
                if (!e.target.value) {
                  blurHandler(e)
                } else {
                  focusHandler(e)
                }

                if (otherProps.onChange) {
                  otherProps.onChange(e)
                }
              }}
            >
              {options.map((option, key) => (
                <option value={option} key={key}>
                  {option}
                </option>
              ))}
            </select>
          )
        }
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
