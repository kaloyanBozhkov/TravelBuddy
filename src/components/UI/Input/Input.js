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
        commentOnClick = null 
    } = props

    //classes of wrapper
    const classes = [
        styles.input,
        ...(focused ? [styles.inputFocused] : []),
        ...(Array.prototype.isPrototypeOf(classNames) ? classNames : [classNames])
    ].join(' ')

    //handle state of impout. Does it have content? Then set it to active styles!
    const focusHandler = () => setFocused(true)
    const blurHandler = () => setFocused(ref.current.value !== '')

    return (
        <div className={classes} data-label={label}>
            <input {...props} ref={ref} onFocus={focusHandler} onBlur={blurHandler}/>
            {icon && <Icon icon={icon} />}
            {comment && <span onClick={commentOnClick !== null ? commentOnClick : null} className={commentOnClick !== null ? styles.withAction : ''}>{comment}</span>}
        </div>
    )
})

export default Input