import React from 'react'

import styles from './styles.module.scss'

const DistanceDisplay = ({ distance, duration }) => {
  return (
    <div className={styles.distance}>
      <div>
        <p>{distance}</p>
        <p>({duration})</p>
      </div>
    </div>
  )
}

export default DistanceDisplay
