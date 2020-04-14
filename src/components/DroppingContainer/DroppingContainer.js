import React, { useState, useLayoutEffect, useRef } from 'react'

import Icon from '~/components/UI/Icon/Icon'

import styles from './styles.module.scss'

const DroppingContainer = ({ label, children }) => {
  const [expanded, setExpanded] = useState(true)
  const [expanding, setExpanding] = useState(false)
  const wrapperRef = useRef()
  const sectionRef = useRef()

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

  // make sure to adapt max height dynamically based on content, so the contract/expand overflow works properly with however many elements there are in children
  useLayoutEffect(() => {
    sectionRef.current.style.maxHeight = expanded
      ? `${wrapperRef.current.offsetHeight + 100}px`
      : '0px'
  })

  return (
    <div className={classes}>
      <header>
        <h1>{label}</h1>
        <Icon icon={expanded ? 'minus' : 'plus'} onClick={contractExpandToggle} />
      </header>

      <section ref={sectionRef}>
        <div className={styles.content} ref={wrapperRef}>
          {children}
        </div>
      </section>
    </div>
  )
}

export default DroppingContainer
