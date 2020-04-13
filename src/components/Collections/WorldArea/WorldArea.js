import React, { useState, useEffect } from 'react'

import Globe from '~/components/Globe/Globe'
import ExpandButton from '~/components/UI/ExpandButton/ExpandButton'

import styles from './worldarea.module.scss'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'

const WorldArea = () => {
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    //when initial animation finished, toggl ethe compressed state
    const timeoutId = window.setTimeout(() => setExpanded(false), 4000)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const worldAreaClasses = [
    styles.worldArea,
    ...(expanded ? [styles.expanded] : expanded === false ? [styles.compressed] : []),
  ].join(' ')

  return (
    <div className={worldAreaClasses}>
      <div className={styles.content}>
        {/* if still animating entrance (expanded === null), do now show expanded button */}
        {expanded !== null && (
          <ExpandButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
        )}
        <Globe />
      </div>
      <ScrollingClouds />
    </div>
  )
}

export default WorldArea