import React, { useState, useEffect } from 'react'

import Globe from 'components/Globe/Globe'
import ExpandButton from 'components/UI/ExpandButton/ExpandButton'

import styles from './worldarea.module.scss'

const WorldArea = () => {
    const [expanded, setExpanded] = useState(null)

    useEffect(() => {
        //when initial animation finished, toggl ethe compressed state
        setTimeout(() => setExpanded(false), 4000)
    }, [])

    const worldAreaClasses = [
        styles.worldArea,
        ...(expanded ? [styles.expanded] : expanded === false ? [styles.compressed] : [])
    ].join(' ')

    return (
        <div className={worldAreaClasses}>
            <ExpandButton expanded={expanded} onClick={() =>  setExpanded(!expanded)} />
            <Globe />
        </div>
    )
}

export default WorldArea