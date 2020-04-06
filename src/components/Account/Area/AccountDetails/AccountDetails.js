import React from 'react'
import { useDispatch } from 'react-redux'
import { signOutPending } from '~/store/logout/logout.actions'

import styles from './styles.module.scss'
import Button from '~/components/UI/Button/Button'

const AccountDetails = ({ displayName }) => {
  const dispatch = useDispatch()
  const signOutHandler = () => dispatch(signOutPending())

  return (
    <div className={styles.accountDetails}>
      <h1>Account Area</h1>

      <Button
        label="Sign Out"
        modifier="filled"
        className={styles.buttons}
        icon="signout"
        iconOnLeftSide
        onClick={signOutHandler}
      />
    </div>
  )
}

export default AccountDetails
