import React, { useState, useEffect } from 'react'

import { CSSTransition } from 'react-transition-group'

import styles from './styles.module.scss'
import Label from '~/components/UI/Label/Label'
import Icon from '~/components/UI/Icon/Icon'

const Card = ({
  title = '',
  onClose = undefined,
  show = true,
  unmountOnExit = false,
  mountOnEnter = false,
  children,
  isError = false,
  withoutDefaultAnimation = false,
  ...otherProps
}) => {
  const [entering, setEntering] = useState(show)
  const cardClasses = [styles.card, isError ? styles.isError : ''].join(' ').trim()
  // if parent's control of show/hide changes, update state
  useEffect(() => {
    setEntering(show)
  }, [show])

  return (
    <CSSTransition
      in={entering}
      timeout={400}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      onExit={onClose}
      classNames={
        withoutDefaultAnimation
          ? undefined
          : {
              exitActive: styles.exiting,
              enterActive: styles.entering,
              appearActive: styles.entering,
            }
      }
    >
      <div className={cardClasses} {...otherProps}>
        {title && <Label text={title} withRibbon />}

        {onClose && (
          <Icon icon="times" onClick={() => setEntering(false)} className={styles.closeBtn} />
        )}

        {children}
      </div>
    </CSSTransition>
  )
}

export default Card
