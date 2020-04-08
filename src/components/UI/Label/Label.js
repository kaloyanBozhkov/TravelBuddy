import React from 'react'
import styles from './styles.module.scss'

const Label = ({ text, warning }) => {
  return <h1 className={warning ? styles.warning : styles.label}>{text}</h1>
}

export default Label
