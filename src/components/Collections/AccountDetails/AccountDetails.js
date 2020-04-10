import React from 'react'
import { signOutPending } from '~/store/logout/logout.actions'

import styles from './styles.module.scss'
import Button from '~/components/UI/Button/Button'
import dateDisplay from '~/helpers/date'
import SingleDetail from '~/components/Collections/SingleDetail/SingleDetail'

const AccountDetails = ({
  dispatch,
  userData: {
    displayName,
    email,
    photoURL,
    dateCreated,
    dateLastSignedIn,
    phoneNumber,
    emailVerified,
  },
}) => {
  const signOutHandler = () => dispatch(signOutPending())
  const singleDetails = [
    { label: 'Name', value: displayName },
    { label: 'Email', value: email },
    { label: 'Email verified', value: emailVerified ? 'Yes' : 'No' },
    { label: 'Phone Number', value: phoneNumber || 'None set yet' },
    {
      label: 'Last signed in',
      value: dateDisplay(dateLastSignedIn).withShortMonths().withComa().withHours().format(),
    },
    {
      label: 'Created',
      value: dateDisplay(dateCreated).withShortMonths().withComa().withHours().format(),
    },
  ]
  return (
    <div className={styles.accountDetails}>
      <h1>Account Area</h1>
      <section className={styles.personalDetails}>
        {singleDetails.map((item, key) => (
          <SingleDetail key={key} {...item} />
        ))}
      </section>
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
