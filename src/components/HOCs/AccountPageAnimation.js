import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CSSTransition from 'react-transition-group/CSSTransition'

import scrollIt from '~/thirdPartyHelpers/scrollIt'

//this HOC is used for neatly animating out the account area pages ;)

//pass in only the dynamic class name for exiting styles
const AccountPageAnimation = (exitActive) => {
    const history = useHistory()
    const [exiting, setExiting] = useState(false)
    const [redirectPath, setRedirectPath] = useState('')

    const redirectHandler = (path) => {
        setRedirectPath(path)
        setExiting(exiting => true)
    }

    const onExitedHandler = () => {
        //scroll to top
        scrollIt(0, 400, 'easeInOutQuad')

        history.push('/account/' + redirectPath)
    }

    return {
        
        //used by buttons to trigger exiting stage + page to redirect to afer exit animation
        redirectHandler,

        //will contain wrapped components
        props: {
            children: null
        },
        wrapper: function () {
            return (
                <CSSTransition
                    in={!exiting}
                    mountOnEnter
                    unmountOnExit
                    timeout={400}
                    onExited={onExitedHandler}
                    classNames={{ exitActive }}
                >
                    {this.props.children}
                </CSSTransition>
            )
        }
    }
}

export default AccountPageAnimation