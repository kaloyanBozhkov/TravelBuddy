import React from 'react'

import dateDisplay from '~/helpers/date'

import styles from './styles.module.scss'

import DestinationCard from '~/components/DestinationCard/DestinationCard'
import Label from '~/components/UI/Label/Label'
import Info from '~/components/UI/Info/Info'
import Button from '~/components/UI/Button/Button'

const PastTrip = ({ startingLocation, destinations, startDate, endDate, index, onEdit = (f) => f }) => {
  return (
    <div className={styles.pastTrip}>
      <div className={styles.header}>
        <Info label="#" text={index} />
        <Button icon="edit" label="Load and edit" modifier="wrapping" onClick={onEdit} />
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

        <div className={styles.destinationsWrapper}>
          {destinations.map(({ location: { label }, beHereOn, stays, weatherPref }) => (
            <div className={styles.cardWrapper}>
              <DestinationCard
                title={label}
                location={label}
                stays={stays}
                beHereOn={beHereOn}
                weatherPref={weatherPref}
                onClose={undefined}
                onSelect={() => undefined}
                selected={false}
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default PastTrip
