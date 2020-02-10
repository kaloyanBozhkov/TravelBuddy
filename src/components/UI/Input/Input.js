import React, { useState, forwardRef } from 'react'

import styles from './input.module.scss'

import Icon from '~/components/UI/Icon/Icon'

const Input = forwardRef((props, ref) => {
    const [focused, setFocused] = useState(false)

    const { 
        classNames = [], 
        label, 
        icon,
        comment, 
        commentOnClick = null,

        //function to invoke to clear the error state, if any
        errorHandler = null, 
        isOptional = false,

        //props to spread on input element
        ...remainingProps
    } = props

    //classes of wrapper
    const classes = [
        styles.input,
        errorHandler ? styles.error : '',
        isOptional ? styles.isOptional : '',
        focused ? styles.inputFocused : '',
        ...(Array.prototype.isPrototypeOf(classNames) ? classNames : [classNames])
    ].join(' ').replace(/ +/g, ' ')

    //handle state of impout. Does it have content? Then set it to active styles!
    const focusHandler = () => {
        setFocused(true)

        //clear error style if any set
        if (errorHandler) {
            errorHandler()
        }
    }
    const blurHandler = () => setFocused(ref.current.value !== '')
    
    return (
        <div className={classes} data-label={label}>
            <input {...remainingProps} ref={ref} onFocus={focusHandler} onBlur={blurHandler}/>
            {icon && <Icon icon={icon} />}
            {comment && <span onClick={commentOnClick} className={commentOnClick !== null ? styles.withAction : ''}>{comment}</span>}
        </div>
    )
})

export default Input