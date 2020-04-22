import React from 'react'
import { ReactComponent as Logo } from 'assets/logo.svg'

import styles from './styles.module.scss'
import Icon from '~/components/UI/Icon/Icon'

const OperationStatusMsg = ({ onClose, onEdit, onShare }) => {
  return (
    <section className={styles.operationStatusMsg}>
      <Logo />
      <h1>Optimal Trip</h1>
      <h2>Successfuly Calculated</h2>

      <div className={styles.btnArea}>
        <div onClick={onShare}>
          <Icon icon="share" />
        </div>
        <div onClick={onEdit}>
          <Icon icon="edit" />
        </div>
        <div onClick={onClose}>
          <Icon icon="times" />
        </div>
      </div>
    </section>
  )
}

export default OperationStatusMsg
