import React from 'react'

import styles from './styles.module.scss'

import Icon from 'components/UI/Icon/Icon'

const ExpandButton = ({ expanded = false, onClick = f=>f }) => (
    <div className={styles.expandBtn} onClick={onClick} >
        <Icon  icon={expanded ? 'compress' : 'expand'} />
        <p>{ expanded ? 'Collapse' : 'Expand'}</p>
    </div>
)
export default ExpandButton