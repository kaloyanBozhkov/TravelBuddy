import React, { useState, useLayoutEffect } from 'react'

import { CSSTransition } from 'react-transition-group'

import styles from './styles.module.scss'
import Label from '~/components/UI/Label/Label'
import Icon from '~/components/UI/Icon/Icon'
/**
 * @param  {string or array} {errorMsg => if array, have multiple lines
 * @param  {bool} isCard => if true, wrap error in fancy card
 */
const ErrorMsg = ({
  errorMsg,
  isCard = false,
  title = '',
  onClose = undefined,
  show = true,
  unmountOnExit = false,
  mountOnEnter = false,
  ...otherProps
}) => {
  const [entering, setEntering] = useState(show)

  const classNames = [styles.errorMsg, isCard ? styles.isCard : ''].join(' ').trim()

  // if parent's control of show/hide changes, update state
  useLayoutEffect(() => {
    if (entering !== show) {
      setEntering(show)
    }
  }, [show])

  return (
    <CSSTransition
      in={entering}
      timeout={400}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onExit={onClose}
      classNames={{
        exitActive: styles.exiting,
        enterActive: styles.entering,
        appearActive: styles.entering,
      }}
    >
      <div className={classNames} {...otherProps}>
        {title && <Label text={title} withRibbon />}

        {onClose && (
          <Icon icon="times" onClick={() => setEntering(false)} className={styles.closeBtn} />
        )}

        {errorMsg &&
          (typeof errorMsg === 'string' ? (
            <p>{errorMsg}</p>
          ) : (
            errorMsg.map(({ error }, key) => <p key={key}>{error}</p>)
          ))}
      </div>
    </CSSTransition>
  )
}

export default ErrorMsg
