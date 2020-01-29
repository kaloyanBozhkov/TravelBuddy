import React from 'react'

//import styles
import styles from './bottomarea.module.scss'

//import components
import Button from 'components/UI/Button/Button'

const BottomArea = () => {
    return ( 
        <div className={styles.bottomArea}>
            <div className={styles.container}>
                <p>
                For norland produce age wishing. To figure on it spring season up. Her provision acuteness had excellent two why intention. As called mr needed praise at. Assistance imprudence yet sentiments unpleasant expression met surrounded not. Be at talked ye though secure nearer. 
                </p>
                <Button label='Plan a New Trip!' modifier='filled' />
                <Button label='My Account' modifier='emptied' />
            </div>
        </div>
    )
}

export default BottomArea