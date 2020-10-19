import React from 'react'
import Label from 'components/UI/Label/Label'

import styles from './styles.module.scss'

const Info = ({ text, label }) => (
  <div className={styles.info}>
    <Label text={label} />
    <p>{text}</p>
  </div>
)

export default Info