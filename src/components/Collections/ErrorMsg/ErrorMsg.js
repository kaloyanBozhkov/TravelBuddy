import React from 'react'

import styles from './styles.module.scss'

import Card from '~/components/Collections/Card/Card'
/**
 * @param  {string or array} {errorMsg => if array, have multiple lines
 * @param  {bool} isCard => if true, wrap error in fancy card
 */
const ErrorMsg = ({ errorMsg, isCard = false, ...otherProps }) => {
  const content = ( //make sure to keep div even if no errorMSG
    <div className={styles.errorMsg}>
      {errorMsg &&
        (typeof errorMsg === 'string' ? (
          <p>{errorMsg}</p>
        ) : (
          errorMsg.map(({ error }, key) => <p key={key}>{error}</p>)
        ))}
    </div>
  )

  if (isCard) {
    return (
      <Card {...otherProps} isError>
        {content}
      </Card>
    )
  }

  return content
}

export default ErrorMsg
