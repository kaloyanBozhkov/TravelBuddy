import React from 'react'

import styles from './styles.module.scss'
import Icon from '../Icon/Icon'

const Loading = ({ msg, absolutelyPositioned = false }) => (
  <div
    className={[styles.loading, absolutelyPositioned ? styles.absolutelyPositioned : '']
      .join(' ')
      .trim()}
  >
    <Icon icon="spinner--cog" />
    {msg && <p>{msg}</p>}
  </div>
)

export default Loading
