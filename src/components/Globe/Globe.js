import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

import backgroundWorld from 'assets/world.png'
import WorldJsonData from './worldGeojson.json'

import styles from './globe.module.scss'

// constants for globe
const width = 305
const height = 305
const scale = 152.5

const countryClicked = ({ properties: { name } }) => {
  // on click set country in redux store to trigger trip menu etc..?
  // console.log(data) //country data
}

const drawWorld = (div, geoGenerator) => {
  // draws the paths from the world geoJson
  d3.select(div)
    .select('svg')
    .selectAll('path')
    .data(WorldJsonData.features)
    .enter()
    .append('path')
    .attr('d', geoGenerator)
    .on('click', countryClicked)
}

const Globe = () => {
  const svgDiv = useRef(null)
  const [rotating, setRotating] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [rotation, setRotation] = useState([10, -20])
  const [scaleZoom, setScaleZoom] = useState(1)

  // persistant objects, that should not cause re-render if changed
  const projection = useRef()
  const geoGenerator = useRef()

  // calculate projection & geoGenerator when rotation changes
  useEffect(() => {
    projection.current = d3
      .geoOrthographic()
      .scale(scale)
      .translate([width / 2, height / 2])
      .rotate(rotation)

    geoGenerator.current = d3.geoPath().projection(projection.current)
  }, [rotation])

  // on first render
  useEffect(() => {
    //create svg for first time
    d3.select(svgDiv.current).append('svg').attr('width', width).attr('height', height)

    //draw paths
    drawWorld(svgDiv.current, geoGenerator.current)
  }, [])

  // on rotation update
  useEffect(() => {
    //clear paths and re-draw them
    d3.select(svgDiv.current).select('svg').selectAll('path').remove()

    //draw paths
    drawWorld(svgDiv.current, geoGenerator.current)
  }, [rotation])

  // on rotation bool change, enable/disable auto rotating
  useEffect(() => {
    if (!rotating && !hovering) {
      const interval = window.setInterval(
        () =>
          // make sure once the callback runs, that the gates stop state from updating if it should not (sneaky memory leak fix!)
          !rotating &&
          !hovering &&
          setRotation((pastRotation) => [pastRotation[0] + 2, pastRotation[1]]),
        50
      )

      return () => window.clearInterval(interval)
    }
  }, [rotating, hovering])

  useEffect(() => {
    d3.select(svgDiv.current).select('svg').attr('transform', `scale(${scaleZoom})`)
  }, [scaleZoom])

  // set classes of svg div
  const classesSvgDiv = [styles.svgDiv, rotating ? styles.dragging : ''].join(' ').trim()

  return (
    <div className={styles.globe}>
      {/* The globe generated by D3 */}
      <div
        className={classesSvgDiv}
        ref={svgDiv}
        /* Is user dragging the globe? */
        onMouseDown={() => setRotating(true)}
        onMouseUp={() => setRotating(false)}
        /* If dragging the globe, rotate it! */
        onMouseMove={(e) => {
          if (rotating) {
            // rotate based on mouse movement, slowed down based on what the current zoom is on the globe
            setRotation([
              rotation[0] + (e.movementX * 0.5) / (scaleZoom > 1 ? scaleZoom : 1),
              rotation[1] - (e.movementY * 0.5) / (scaleZoom > 1 ? scaleZoom : 1),
            ])
          }
        }}
        /* Stop world from rotating when hovering it */
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false)

          //reset any zoom when mouse leaves globe
          if (scaleZoom > 1) {
            setScaleZoom(1)
          }
        }}
        /* If scrolling on globe, zoom in/out! */
        onWheel={(e) => {
          // deltaY is -100 for scroll down and +100 for scroll up, make it 1 for down and -1 for up
          const wheelDirection = e.deltaY * -0.01

          // calculate new value for transform scale of svg element. min scale 1 max
          const newScale = scaleZoom + 0.5 * wheelDirection

          setScaleZoom(newScale < 1 ? 1 : newScale)
        }}
      />

      {/* The rotating decoration behind the globe */}
      <img src={backgroundWorld} alt="World" className={hovering ? 'hovering' : ''} />
    </div>
  )
}

export default Globe
