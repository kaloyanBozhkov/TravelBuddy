import React from 'react'
import styles from './styles.module.scss'

import AccountDetals from './AccountDetails/AccountDetails'
import UserBall from '~/components/UI/UserBall/UserBall'

import withPageAnimation from '~/components/HOCs/withPageAnimation'

const Area = ({ userData, dispatch }) => {
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
        <div className={styles.tripsContainer}></div>
      </div>
      <AccountDetals dispatch={dispatch} userData={userData} />
    </div>
  )
}

export default withPageAnimation(Area)(styles.exiting)
