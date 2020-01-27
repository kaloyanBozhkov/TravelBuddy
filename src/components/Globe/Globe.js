import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'

import backgroundWorld from 'assets/world.png'
import WorldJsonData from './worldGeojson.json'

import styles from './globe.module.scss'

//constants for globe
const width = 305
const height = 305
const scale = 152.5

const drawWorld = (ref, geoGenerator) => {
    //draws the paths from the world geoJson
    d3.select(ref.current)
    .select('svg')
    .selectAll('path')
    .data(WorldJsonData.features)
        .enter()
        .append('path')
        .attr('d', geoGenerator)
}

const Globe = () => {
    const svgDiv = useRef(null)
    const [rotating, setRotating] = useState(false)
    const [hovering, setHovering] = useState(false)
    const [rotation, setRotation] = useState([10, -20])

    //calculate projection & generator
    const projection = d3.geoOrthographic()
    .scale(scale)
    .translate([width / 2, height / 2])
    .rotate(rotation);

    const geoGenerator = d3.geoPath()
        .projection(projection)

    //on first load
    useEffect(() => {
        //clear paths and re-draw them
        d3.select(svgDiv.current)
        .select('svg')
        .selectAll('path')
        .remove()

        //draw paths
        drawWorld(svgDiv, geoGenerator)
    }, [rotation])

    //on update ref
    useEffect(() => {
    //create svg for first time
    d3.select(svgDiv.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        
        //draw paths
        drawWorld(svgDiv, geoGenerator)
    }, [svgDiv])

    //on rotation bool change, enable/disable auto rotating
    useEffect(() => {
        if (!rotating && !hovering) {
            setTimeout(() => setRotation([rotation[0] + 2, rotation[1]]), 30)
        }
    }, [rotating, rotation, hovering])

    //set classes of svg div
    const classesSvgDiv = [
        styles.svgDiv,
        ...(rotating ? [styles.dragging] : [])
    ].join(' ')

    return (
        <div className={styles.globe}>
            <div className={classesSvgDiv} ref={svgDiv} 
                onMouseDown={() => setRotating(true)}
                onMouseUp={() => setRotating(false)}
                onMouseMove={(e) => {
                    if (rotating) {
                        setRotation([rotation[0] + e.movementX, rotation[1] - e.movementY])
                    }
                }}

                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >

            </div>

            <img src={backgroundWorld} alt='World' className={hovering ? 'hovering' : ''} />
        </div>
    )
}

export default Globe