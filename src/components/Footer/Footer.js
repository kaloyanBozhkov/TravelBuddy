import React from 'react'

import styles from './footer.module.scss'

import Button from 'components/UI/Button/Button'

const Footer = ({ footerSections = [] }) => {
    return (
        <div className={styles.footer}>
            {
                footerSections.map(({ icon, text, type, href }, i) => {
                    switch (type) {
                        case 'link': 
                            return (
                                <a key={i} href={href}>
                                    <Button label={text} icon={icon} modifier='defaultInverse' />
                                </a>
                            )
                        default: 
                            return (
                                <div key={i}>
                                    <Button label={text} icon={icon} modifier='defaultInverse' hoverable={false} />
                                </div>
                            )
                    }
                })
            }
        </div>
    )
}

export default Footer