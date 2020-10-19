import React from 'react'

import dateDisplay from '~/helpers/date'

import Card from 'components/Collections/Card/Card'

import styles from './styles.module.scss'
import DestinationCard from '~/components/DestinationCard/DestinationCard'
import Label from '~/components/UI/Label/Label'
import Info from '~/components/UI/Info/Info'

const PastTrip = ({ startingLocation, destinations, startDate, endDate, index }) => {
  return (
    <div className={styles.pastTrip}>
      <div className={styles.header}>
        <Info label="#" text={index} />
      </div>
      <div className={styles.summary}>
        <div className={styles.infoWrapper}>
          <Info label="From" text={startingLocation.label} />
          <Info label="Stops" text={destinations.length} />
        </div>
        <div className={styles.infoWrapper}>
          <Info label="Start" text={dateDisplay(startDate).format()} />
          <Info label="End" text={dateDisplay(endDate).format()} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerHead}>
          <Label text="Optimal Trip" withRibbon />
        </div>

        {destinations.map(({ location: { label }, beHereOn, stays, weatherPref }) => (
          <div className={styles.cardWrapper}>
            <DestinationCard
              title={label}
              location={label}
              stays={stays}
              beHereOn={beHereOn}
              weatherPref={weatherPref}
              // onClose
              // onSelect
              // selected
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PastTrip
