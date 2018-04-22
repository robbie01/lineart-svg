// @flow

import React from 'react'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
    radius: number,
    npoints: number
}

const points = (radius, npoints) => {
    const points = []
    const theta = 2 * Math.PI / npoints
    for (let i = 0; i < npoints; ++i) {
        const point = {}
        point.x = radius * Math.cos(theta * i)
        point.y = radius * Math.sin(theta * i)
        points.push(point)
    }
    return points
}

const LineArt: StatelessFunctionalComponent<Props> = ({ radius, npoints }) => (
    <svg viewBox={`${-radius} ${-radius} ${2*radius} ${2*radius}`} width={radius*2} height={radius*2}>
        <circle cx={0} cy={0} r={radius} stroke="black" fill="none" />
        {points(radius, npoints).map(a =>
            points(radius, npoints).map(b => (
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="black" strokeWidth={1} />
            ))
        )}
    </svg>
)

export default LineArt