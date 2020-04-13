import React, { useState, useEffect, useRef } from 'react'
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

const animateCloud = (setClouds, requestAnimRef) => {
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
  requestAnimRef.current = window.requestAnimationFrame(() =>
    animateCloud(setClouds, requestAnimRef)
  )
}
const addCloud = (setClouds, activeTimeouts, requestAnimRef) => {
  // add 3 clouds each second

  const id = setTimeout(() => {
    setClouds((pastClouds) => [...pastClouds, cloudGenerator(), cloudGenerator(), cloudGenerator()])

    // after runing callback, clear timeout id from the tracker variable
    activeTimeouts.current = activeTimeouts.current.filter((timeoutId) => timeoutId !== id)
    requestAnimRef.current = window.requestAnimationFrame(() =>
      addCloud(setClouds, activeTimeouts, requestAnimRef)
    )
  }, 1000)

  activeTimeouts.current.push(id)
}

const ScrollingClouds = ({ reverseCounter }) => {
  const [clouds, setClouds] = useState([])
  const [cloudsKilled, setCloudsKilled] = useState(0)

  // render persist obj
  const requestAnimRef = useRef()
  const addCloudReqAnimRef = useRef()
  const activeTimeouts = useRef([])

  const removeCloud = (removeId, target) => {
    target.classList.add(styles.cloudExiting)
    setCloudsKilled((killed) => killed + 1)

    // wait for the animation to finish
    const id = setTimeout(() => {
      // after runing callback, clear timeout id from the tracker variable
      setClouds((prevClouds) => prevClouds.filter(({ cloudId }) => cloudId !== removeId))
      activeTimeouts.current = activeTimeouts.current.filter((timeoutId) => timeoutId !== id)
    }, 400)

    activeTimeouts.current.push(id)
  }

  // handle animating new clouds
  useEffect(() => {
    requestAnimRef.current = window.requestAnimationFrame(() =>
      animateCloud(setClouds, requestAnimRef)
    )

    return () => window.cancelAnimationFrame(requestAnimRef.current)
  }, [])

  // handle adding new clouds each second
  useEffect(() => {
    addCloudReqAnimRef.current = window.requestAnimationFrame(() =>
      addCloud(setClouds, activeTimeouts, requestAnimRef)
    )

    return () => window.cancelAnimationFrame(addCloudReqAnimRef.current)
  }, [])

  // clear all setTimeouts not yet ran, that will run after unmount and set state
  useEffect(() => {
    return () => activeTimeouts.current.forEach((id) => window.clearTimeout(id))
  }, [])

  return (
    <div className={styles.backgroundClouds}>
      {cloudsKilled > 0 && (
        <p
          className={[styles.counter, reverseCounter ? styles.reverseCounter : ''].join(' ').trim()}
        >
          {cloudsKilled}
        </p>
      )}
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
