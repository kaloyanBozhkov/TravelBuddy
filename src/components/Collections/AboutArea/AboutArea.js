import React from 'react'

// import assets
import laptop from '~/assets/laptop.png'
import laptopAndLine from '~/assets/laptopAndLine.png'
import { ReactComponent as Line } from '~/assets/line.svg'

//improt styles
import styles from './aboutarea.module.scss'

//import components
import InformationSection from '~/components/InformationSection/InformationSection'

//import hooks
import useWindowWidth from '~/hooks/useWindowWidth'

const AboutArea = ({ logos, infoSections }) => {
  const windowWidth = useWindowWidth()

  // alternatively can use CSS media breakpoints
  const isDesktop = windowWidth > 991
  return (
    <div className={styles.aboutArea}>
      {/* Since this is static content, index is enough for React to keep track of the dynamically created components */}
      {infoSections.map((sectionInfo, index) => (
        <InformationSection key={index} {...sectionInfo} />
      ))}
      <div className={styles.laptopArea}>
        {/* lines connecting laptop orange line to images */}
        {isDesktop && (
          <>
            <Line />
            <Line />
            <Line />
            <Line />
          </>
        )}
        {!isDesktop && <img src={laptop} alt="Laptop with Travel Buddy logo" />}
        {isDesktop && <img src={laptopAndLine} alt="Laptop with Travel Buddy logo" />}
      </div>
      <div className={styles.logoArea}>
        {logos.map(({ image, alt }) => (
          <img src={image} alt={alt} />
        ))}
      </div>
    </div>
  )
}

export default AboutArea
