import React, { useState, useLayoutEffect } from 'react'

import Icon from '~/components/UI/Icon/Icon'

import styles from './styles.module.scss'

const DroppingContainer = ({ label, children }) => {
  const [expanded, setExpanded] = useState(true)
  const [expanding, setExpanding] = useState(false)
  const contractExpandToggle = () => setExpanded(!expanded)
  const classes = [
    styles.droppingContainer,
    expanded ? '' : styles.minimized,
    expanding ? styles.expanding : '',
  ]
    .join(' ')
    .trim()

  // control the "expanding" class, which sets overflow to hidden during show. Overflow hidden is then removed for datepicker to overflow properly
  useLayoutEffect(() => {
    if (expanded === true) {
      setExpanding(true)
      setTimeout(() => {
        setExpanding(false)
      }, 400)
    }
  }, [expanded])

  return (
    <div className={classes}>
      <header>
        <h1>{label}</h1>
        <Icon icon={expanded ? 'minus' : 'plus'} onClick={contractExpandToggle} />
      </header>

      <section>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  )
}

export default DroppingContainer
