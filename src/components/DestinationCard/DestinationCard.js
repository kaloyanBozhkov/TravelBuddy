import React, { useState } from 'react'

import { CSSTransition } from 'react-transition-group'
import Icon from '~/components/UI/Icon/Icon'

import dateDisplay from '~/helpers/date'

import styles from './styles.module.scss'

const DestinationCard = ({
  location,
  stays,
  beHereOn,
  weatherPref,
  onClose,
  onSelect,
  selected,
}) => {
  const [closing, setClosing] = useState(false)
  const onCloseHandler = () => setClosing(true)
  const onSelectHandler = () => onSelect(location, stays, beHereOn, weatherPref)
  const classes = [styles.destinationCard, selected ? styles.selected : ''].join(' ').trim()

  const card = (
    <div className={classes} onClick={onSelectHandler}>
      <Icon icon="times" className={styles.closeButton} onClick={onCloseHandler} />

      <div>
        <h1>Location</h1>
        <p>{location}</p>
      </div>

      <div>
        <h1>Minimum days to stay</h1>
        <p>{stays || 'Any'}</p>
      </div>

      <div>
        <h1>Exact date to be here on</h1>
        <p>{(beHereOn && dateDisplay(beHereOn).format()) || 'None'}</p>
      </div>

      <div>
        <h1>Desired weather during stay</h1>
        <p>{weatherPref || 'Any'}</p>
      </div>
    </div>
  )

  return (
    <CSSTransition
      in={!closing}
      mountOnEnter
      unmountOnExit
      timeout={400}
      onExited={onClose}
      appear
      classNames={{
        appearActive: styles.entering,
        exitActive: styles.exiting,
      }}
    >
      {card}
    </CSSTransition>
  )
}

export default DestinationCard
