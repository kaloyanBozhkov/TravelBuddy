import React from 'react'

import styles from './styles.module.scss'

const LocationDisplay = ({ number, stopName }) => {
  return (
    <div className={styles.location}>
      <p>{number}</p>
      <p>{stopName}</p>
    </div>
  )
}

export default LocationDisplay
