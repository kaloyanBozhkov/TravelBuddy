import React from 'react'

import { CSSTransition } from 'react-transition-group'

import styles from './styles.module.scss'

const ErrorMsg = ({ errorMsg }) => {
  return (
    <CSSTransition
      in={!!errorMsg}
      classNames={{
        exit: styles.exiting,
      }}
      timeout={400}
    >
      <div className={styles.errorMsg}>{errorMsg && <p>{errorMsg}</p>}</div>
    </CSSTransition>
  )
}

export default ErrorMsg
