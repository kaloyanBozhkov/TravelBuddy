import React from 'react'
import { ReactComponent as Ribbon } from '~/assets/ribbon.svg'
import styles from './styles.module.scss'

const Label = ({ text, warning, withRibbon = false }) => {
  const label = <h1 className={warning ? styles.warning : styles.label}>{text}</h1>

  if (withRibbon) {
    return (
      <div className={styles.ribbonLabel}>
        <h1>{text}</h1>
        <Ribbon />
      </div>
    )
  }

  return label
}

export default Label
