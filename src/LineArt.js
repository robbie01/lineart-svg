// @flow

import React from 'react'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
    radius: number,
    npoints: number
}

type Point = {
    x: number,
    y: number
}

const getPoints = (radius: number, npoints: number): Array<Point> => {
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

type Line = {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

const almostEqual = (numA: number, numB: number): boolean => Math.abs(numA - numB) < Number.EPSILON

const isLineEqual = (lineA: Line, lineB: Line): boolean =>
    (almostEqual(lineA.x1, lineB.x1) && almostEqual(lineA.y1, lineB.y1) && almostEqual(lineA.x2, lineB.x2) && almostEqual(lineA.y2, lineB.y2)) ||
    (almostEqual(lineA.x1, lineB.x2) && almostEqual(lineA.y1, lineB.y2) && almostEqual(lineA.x2, lineB.x1) && almostEqual(lineA.y2, lineB.y1))

const createLine = (pointA: Point, pointB: Point): Line => {
    return {
        x1: pointA.x,
        y1: pointA.y,
        x2: pointB.x,
        y2: pointB.y
    }
}

const getLines = (radius: number, npoints: number): Array<Line> => {
    const points = getPoints(radius, npoints)
    const lines = []
    points.forEach(a => {
        points.forEach(b => {
            if (a !== b) {
                const line = createLine(a, b)
                if (!lines.find(l => isLineEqual(line, l))) lines.push(line)
            }
        })
    })
    return lines
}

const LineArt: StatelessFunctionalComponent<Props> = ({ radius, npoints }) => (
    <svg viewBox={`${-radius} ${-radius} ${2*radius} ${2*radius}`} width={radius*2} height={radius*2}>
        <circle cx={0} cy={0} r={radius} stroke="black" fill="none" />
        {getLines(radius, npoints).map(({ x1, y1, x2, y2 }) => (
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={1} />
        ))}
    </svg>
)

export default LineArt