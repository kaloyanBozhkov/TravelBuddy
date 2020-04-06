import React from 'react'
import styles from './styles.module.scss'

import AccountDetals from './AccountDetails/AccountDetails'
import UserBall from '~/components/UI/UserBall/UserBall'

import withPageAnimation from '~/components/HOCs/withPageAnimation'

const Area = ({ userData: { displayName, email, photoURL } }) => {
  return (
    <div className={styles.area}>
      <div className={styles.container}>
        <div className={styles.header}>
          <UserBall photoURL={photoURL} updatePhotoClick={() => alert('updating!')} />
          <h1>{displayName}</h1>
        </div>
        <div className={styles.trip}></div>
      </div>
      <AccountDetals />
    </div>
  )
}

export default withPageAnimation(Area)(styles.exiting)
