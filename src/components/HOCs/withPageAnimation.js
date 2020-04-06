import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

// this HOC is used for neatly animating out the account area pages ;)

// pass in only the dynamic class name for exiting styles
const withPageAnimation = (PageComponent) => (exitActiveStyle) => ({
  isSwitching,
  onExitedHandler,
  ...otherProps
}) => {
  return (
    <CSSTransition
      in={!isSwitching}
      mountOnEnter
      unmountOnExit
      timeout={400}
      onExited={onExitedHandler}
      classNames={{ exitActive: exitActiveStyle }}
    >
      <PageComponent {...otherProps} />
    </CSSTransition>
  )
}

export default withPageAnimation
