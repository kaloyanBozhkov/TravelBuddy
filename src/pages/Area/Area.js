import React from 'react'

import styles from './styles.module.scss'

import { loadTrip } from '~/store/trip/trip.actions'

import PastTrip from '~/components/Collections/PastTrip/PastTrip'
import AccountDetals from '~/components/Collections/AccountDetails/AccountDetails'
import UserBall from '~/components/UI/UserBall/UserBall'

import withPageAnimation from '~/HOCs/withPageAnimation'

const Area = ({ userData, pastTrips, dispatch = (f) => f, history = (f) => f }) => {
  return (
    <div className={styles.area}>
      <div className={styles.container}>
        <div className={styles.header}>
          <UserBall photoURL={userData.photoURL} updatePhotoClick={() => alert('updating!')} />
          <div>
            <h1>{userData.displayName}</h1>
            <p>{userData.email}</p>
          </div>
        </div>
        <div className={styles.tripsContainer}>
          {pastTrips.map((trip, i) => (
            <PastTrip
              index={i + 1}
              onEdit={() => {
                dispatch(loadTrip(trip))
                history.push('/new-trip')
              }}
              {...trip}
            />
          ))}
        </div>
      </div>
      <AccountDetals dispatch={dispatch} userData={userData} />
    </div>
  )
}

export default withPageAnimation(Area)(styles.exiting)
