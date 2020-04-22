import React, { useState, useEffect, useLayoutEffect } from 'react'

import styles from './styles.module.scss'
import Label from '~/components/UI/Label/Label'
import OperationStatusMsg from './OperationStatusMsg/OperationStatusMsg'
import LocationDisplay from './LocationDisplay/OptimalTripDisplayContainer'
import DistanceDisplay from './DistanceDisplay/DistanceDisplay'

const OptimalTripDisplayContainer = ({ optimalTrip, onClose, onEdit, onShare }) => {
  return (
    <section className={styles.optimalTripDisplayContainer}>
      <OperationStatusMsg onClose={onClose} onEdit={onEdit} onShare={onShare} />

      <section className={styles.contents}>
        <div className={styles.optimalTripLabel}>
          <Label text="Your Optimal Trip" withRibbon />
        </div>

        <div className={styles.stopsWrapper}>
          {optimalTrip.map((stop, index) => (
            <React.Fragment key={stop.uid + index}>
              <LocationDisplay stopName={stop.label} number={index === 0 ? 'START' : `#${index}`} />
              {index < optimalTrip.length - 1 ? (
                <DistanceDisplay
                  distance={stop.infoTripTillNextStop.distance.text}
                  duration={stop.infoTripTillNextStop.duration.text}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </section>
    </section>
  )
}

export default OptimalTripDisplayContainer
