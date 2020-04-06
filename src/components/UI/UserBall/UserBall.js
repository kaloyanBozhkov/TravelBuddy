import React from 'react'

import styles from './userball.module.scss'
import Icon from '~/components/UI/Icon/Icon'

const UserBall = ({ label = '', photoURL = '', updatePhotoClick = null }) => {
  return (
    <div className={styles.userHeader}>
      <div className={[styles.userBall, photoURL ? styles.withPhoto : ''].join(' ')}>
        {photoURL ? (
          <img src={photoURL} alt="Profile Picture" />
        ) : (
          <>
            <div className={styles.head}></div>
            <div className={styles.body}></div>
          </>
        )}

        {updatePhotoClick && (
          <div className={styles.overlay} onClick={updatePhotoClick}>
            <Icon icon="camera" />
          </div>
        )}
      </div>
      {label && <p>{label}</p>}
    </div>
  )
}

export default UserBall
