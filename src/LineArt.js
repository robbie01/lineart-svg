import React, { PureComponent } from 'react'

export default class LineArt extends PureComponent {
    render() {
        const { radius } = this.props
        return (
            <svg viewBox={`${-radius} ${-radius} ${2*radius} ${2*radius}`} width={radius*2} height={radius*2}>
                <circle cx={0} cy={0} r={radius} stroke="black" fill="none" />
                {this.points.map(a =>
                    this.points.map(b => (
                        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="black" strokeWidth={1} />
                    ))
                )}
            </svg>
        )
    }

    get points() {
        const { radius, npoints } = this.props
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
}