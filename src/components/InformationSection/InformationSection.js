import React from 'react'

import styles from './informationsection.module.scss'

const InformationSection = ({
  title,
  text,
  image,
  imageAlt,
  imgFirst = true,
  imageWhiteBackground = false,
}) => {
  const wrapperClasses = [
    styles.informationSection,
    imgFirst ? '' : styles.reverseOrder,
    imageWhiteBackground ? styles.imageWhiteBackground : '',
  ]
    .join(' ')
    .trim()

  return (
    <div className={wrapperClasses}>
      <img src={image} alt={imageAlt} />
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default InformationSection

/*

alternative reverse approach, instead of making use of css flexbox powers:

const InformationSection = ({ title, text, image, imageAlt, imgFirst = true }) => {

    const contentDivs = [
        (<img src={image} alt={imageAlt} />),
        (<div>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>)
    ]

    return (
        <div className={styles.informationSection}>
            {imgFirst ? contentDivs : contentDivs.reverse()}
        </div>
    )
}

*/
