import React from 'react'
import { Link } from 'react-router-dom'

//import styles
import styles from './welcomearea.module.scss'

//import components
import Button from '~/components/UI/Button/Button'

const WelcomeArea = () => {
  return (
    <div className={styles.welcomeArea}>
      <div className={styles.container}>
        <p>
          Whether you're a wanderlust enthusiast or a seasoned explorer, let Travel Buddy pave the
          way for efficient, unforgettable journeys. Your next adventure starts here! Seamlessly
          plan new trips and optimize your routes, all while enjoying the convenience of managing
          your account effortlessly.
        </p>
        <Link to="/new-trip" modifier="filled">
          <Button label="Plan a New Trip!" modifier="filled" />
        </Link>
        <Link to="/account/area" modifier="emptied">
          <Button label="My Account" modifier="emptied" />
        </Link>
      </div>
    </div>
  )
}

export default WelcomeArea
