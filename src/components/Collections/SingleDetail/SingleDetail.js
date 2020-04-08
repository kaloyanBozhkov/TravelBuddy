import React from 'react'
import Label from '~/components/UI/Label/Label'
import styles from './styles.module.scss'

const SingleDetail = ({ label, value }) => {
  return (
    <div className={styles.singleDetail}>
      <Label text={label} />
      <p>{value}</p>
    </div>
  )
}

export default SingleDetail
