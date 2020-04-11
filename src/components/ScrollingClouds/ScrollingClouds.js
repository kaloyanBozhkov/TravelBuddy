import React, { useState, useEffect, useLayoutEffect, useRef, createRef } from 'react'
import styles from './styles.module.scss'
import { ReactComponent as Cloud1 } from '~/assets/cloud1.svg'
import { ReactComponent as Cloud2 } from '~/assets/cloud2.svg'
import uid from '~/thirdPartyHelpers/uid'

const cloudGenerator = () => {
  const isFlipped = Math.floor(Math.random() * 2)

  const cloudConfig = {
    cloudId: uid(),
    cloudType: Math.floor(Math.random() * 2) + 1, // 1 or 2
    right: '0%',
    top: `${Math.floor(Math.random() * 90) + 5}%`, // 5 to 95
    opacity: (Math.floor(Math.random() * 7) + 3) / 10,
    transform: `scale(${(Math.floor(Math.random() * 6) + 10) / 10})${
      isFlipped ? ' rotateY(180deg)' : ''
    } translateX(${isFlipped ? '-' : ''}100%)`,
    exiting: false,
  }

  return cloudConfig
}

const ScrollingClouds = () => {
  const [clouds, setClouds] = useState([])
  const [cloudsKilled, setCloudsKilled] = useState(0)

  // render persist obj
  const requestAnimRef = useRef()
  const addCloudReqAnimRef = useRef()

  const animateCloud = () => {
    setClouds((pastClouds) => {
      const cloudsToKeep = []

      pastClouds.forEach((cloudConfig) => {
        const currentRight = parseFloat(cloudConfig.right)

        // if out of screeen, gotta remove these ones so dont consider them!
        if (currentRight < 120) {
          cloudConfig.right = `${currentRight + 0.25}%`

          cloudsToKeep.push(cloudConfig)
        }
      })

      return cloudsToKeep
    })

    // call next aniamtion frame, only if deleting
    requestAnimRef.current = window.requestAnimationFrame(animateCloud)
  }

  const addCloud = () => {
    // add 3 clouds each second
    setClouds((pastClouds) => [...pastClouds, cloudGenerator(), cloudGenerator(), cloudGenerator()])

    setTimeout(() => {
      requestAnimRef.current = window.requestAnimationFrame(addCloud)
    }, 1000)
  }
  const removeCloud = (removeId, target) => {
    target.classList.add(styles.cloudExiting)
    setCloudsKilled((killed) => killed + 1)

    // wait for the animation to finish
    setTimeout(() => {
      setClouds((prevClouds) => prevClouds.filter(({ cloudId }) => cloudId !== removeId))
    }, 400)
  }

  // handle animating new clouds
  useEffect(() => {
    requestAnimRef.current = window.requestAnimationFrame(animateCloud)

    return () => window.cancelAnimationFrame(requestAnimRef)
  }, [])

  // handle adding new clouds each second
  useEffect(() => {
    addCloudReqAnimRef.current = window.requestAnimationFrame(addCloud)

    return () => window.cancelAnimationFrame(addCloudReqAnimRef.current)
  }, [])

  return (
    <div className={styles.backgroundClouds}>
      {cloudsKilled > 0 && <p className={styles.counter}>{cloudsKilled}</p>}
      {clouds.map(({ cloudType, cloudId, exiting, ...styles }) => {
        const config = {
          key: cloudId,
          style: styles,
          onClick: ({ target }) => removeCloud(cloudId, target),
          className: exiting ? styles.cloudExiting : undefined,
        }
        if (cloudType === 1) {
          return <Cloud1 {...config} />
        }

        return <Cloud2 {...config} />
      })}
    </div>
  )
}

export default ScrollingClouds
