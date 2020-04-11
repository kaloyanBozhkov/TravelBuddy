import React, { useState } from 'react'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'

import { handleDateChange } from '~/helpers/inputHandlers'
import dateDisplay from '~/helpers/date'
import useInputHandler from '~/hooks/useInputHandler'

import styles from './styles.module.scss'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'

const NewTrip = () => {
  const [dates, onDateInputChangeHandler] = useInputHandler({
    startDate: '',
    endDate: '',
  })

  const [destinations, setDestinations] = useState([])
  const updateDestinations = (dests) => setDestinations(dests)

  const onAddToTrip = (destination) => {
    setDestinations([...destinations, destination])
  }

  return (
    <div className={styles.newTrip}>
      <section className={styles.tripSelectContainer}>
        <DroppingContainer label="Pick your travelling dates!">
          <div className={styles.dateWrapper}>
            <Input
              label="Start Date"
              id="startDate"
              name="startDate"
              comment="When should your trip start?"
              icon="calendar"
              onChange={(value) => handleDateChange(onDateInputChangeHandler, value, 'startDate')}
              // errorMsgHandler={clearError}
              // invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
              value={dates.startDate && dateDisplay(dates.startDate).format()}
              type="date"
            />
            <Input
              label="End Date"
              id="endDate"
              name="endDate"
              comment="When should your trip end?"
              icon="calendar"
              onChange={(value) => handleDateChange(onDateInputChangeHandler, value, 'endDate')}
              // errorMsgHandler={clearError}
              // invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
              value={dates.endDate && dateDisplay(dates.endDate).format()}
              type="date"
            />
          </div>
        </DroppingContainer>

        <DroppingContainer label="Choose the citites you want to visit!">
          <div className={styles.citiesWrapper}>
            <DestinationPicker onAddToTrip={onAddToTrip} />
            <DestinationViewer
              destinations={destinations}
              updateDestinations={updateDestinations}
            />
          </div>
        </DroppingContainer>
      </section>

      <section className={styles.googleMapsArea}></section>

      <div className={styles.background}>
        <ScrollingClouds />
      </div>
    </div>
  )
}

export default NewTrip
