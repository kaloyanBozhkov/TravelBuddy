import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

const withAnimation = (Component) => (classNames) => ({
  entering,
  onExitedHandler,
  ...otherProps
}) => {
  return (
    <CSSTransition
      in={entering}
      mountOnEnter
      unmountOnExit
      timeout={400}
      onExited={onExitedHandler}
      classNames={classNames}
    >
      <Component {...otherProps} />
    </CSSTransition>
  )
}

export default withAnimation
