// @flow

import React from 'react'
import type { StatelessFunctionalComponent } from 'react'
import styled, { keyframes } from 'styled-components'

type Props = {
    radius: number,
    npoints: number,
    animate: boolean
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

export type LineProps = {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

const createLine = (pointA: Point, pointB: Point): LineProps => {
    return {
        x1: pointA.x,
        y1: pointA.y,
        x2: pointB.x,
        y2: pointB.y
    }
}

const almostEqual = (numA: number, numB: number): boolean => Math.abs(numA - numB) < Number.EPSILON

const linesEqual = (lineA: LineProps, lineB: LineProps): boolean =>
    (almostEqual(lineA.x1, lineB.x1) && almostEqual(lineA.y1, lineB.y1) && almostEqual(lineA.x2, lineB.x2) && almostEqual(lineA.y2, lineB.y2)) ||
    (almostEqual(lineA.x1, lineB.x2) && almostEqual(lineA.y1, lineB.y2) && almostEqual(lineA.x2, lineB.x1) && almostEqual(lineA.y2, lineB.y1))

const getLines = (radius: number, npoints: number): Array<LineProps> => {
    const points = getPoints(radius, npoints)
    const lines = []
    points.forEach(a => {
        points.forEach(b => {
            if (a !== b) {
                const line = createLine(a, b)
                if (!lines.find(l => linesEqual(line, l))) lines.push(line)
            }
        })
    })
    return lines
}

const square = (x: number): number => x*x
const distance = (x1: number, y1: number, x2: number, y2: number): number => Math.sqrt(square(x1-x2)+square(y1-y2))

const dash = keyframes`
  to {
      stroke-dashoffset: 0;
  }
`

const Line = styled.line.attrs({
    style: ({ x1, y1, x2, y2, delay, animate }) => ({
        strokeDasharray: distance(x1, y1, x2, y2),
        strokeDashoffset: animate ? distance(x1, y1, x2, y2) : 0,
        animationDelay: animate ? `${delay}s` : undefined
    }),
    stroke: "black",
    strokeWidth: 1
})`
    ${({ animate }) => animate ? `animation: ${dash} 0.5s linear forwards;` : ``}
`

const LineArt: StatelessFunctionalComponent<Props> = ({ radius, npoints, animate }) => (
    <svg viewBox={`${-radius} ${-radius} ${2*radius} ${2*radius}`} width={radius*2} height={radius*2}>
        <circle cx={0} cy={0} r={radius} stroke="black" fill="none" />
        {getLines(radius, npoints).map((l, i) => (
            <Line {...l} animate={animate} delay={i*0.05} key={JSON.stringify(l)} />
        ))}
    </svg>
)

export default LineArt