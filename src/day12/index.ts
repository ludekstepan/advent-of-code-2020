import input from './input.txt'
import exampleFile1 from './example1.txt'

import { notEmptyString } from '../utils'
import { manhatanDistance } from '../maps'

type XY = [x: number, y: number]

type Code = 'N' | 'S' | 'E' | 'W' | 'L' | 'R' | 'F'

type Action = [code: Code, value: number]

type Ship = {
    heading: number // 0 -> E, 90 -> S
    x: number // + east
    y: number // + south
}

const fixHeading = (heading: number) => {
    const h = heading % 360

    return h < 0 ? h + 360 : h
}

const shipReducer = ({ heading, x, y }: Ship, [code, value]: Action): Ship => {
    switch (code) {
        case 'N':
            return { heading, x, y: y - value }
        case 'S':
            return { heading, x, y: y + value }
        case 'E':
            return { heading, y, x: x + value }
        case 'W':
            return { heading, y, x: x - value }
        case 'L':
            return { heading: fixHeading(heading - value), x, y }
        case 'R':
            return { heading: fixHeading(heading + value), x, y }
        case 'F':
            switch (heading) {
                case 0: // E
                    return { heading, x: x + value, y }
                case 90: // S
                    return { heading, x, y: y + value }
                case 180: // W
                    return { heading, y, x: x - value }
                case 270: // N
                    return { heading, x, y: y - value }
                default:
                    throw new Error(`Invalid heading ${heading}`)
            }
    }
}

type ShipWithWaypoint = {
    ship: XY
    waypoint: XY
}

const waypointReducer = ({ ship, waypoint }: ShipWithWaypoint, [code, value]: Action): ShipWithWaypoint => {
    const [wx, wy] = waypoint

    switch (code) {
        case 'N':
            return { ship, waypoint: [wx, wy - value] }
        case 'S':
            return { ship, waypoint: [wx, wy + value] }
        case 'E':
            return { ship, waypoint: [wx + value, wy] }
        case 'W':
            return { ship, waypoint: [wx - value, wy] }

        case 'F':
            const [sx, sy] = ship

            return { ship: [sx + wx * value, sy + wy * value], waypoint }

        case 'L':
            switch (value) {
                // case 0: // E
                case 90: // S
                    return { ship, waypoint: [wy, -wx] }
                case 180: // W
                    return { ship, waypoint: [-wx, -wy] }
                case 270: // N
                    return { ship, waypoint: [-wy, wx] }
                default:
                    throw new Error(`Invalid angle ${value}`)
            }

        case 'R':
            switch (value) {
                // case 0: // E
                case 90: // S
                    return { ship, waypoint: [-wy, wx] }
                case 180: // W
                    return { ship, waypoint: [-wx, -wy] }
                case 270: // N
                    return { ship, waypoint: [wy, -wx] }
                default:
                    throw new Error(`Invalid angle ${value}`)
            }
    }
}

function parse(file: string) {
    return file
        .split('\n')
        .filter(notEmptyString)
        .map(
            (line): Action => {
                const [, code, value] = line.match(/^([NSEWLRF])([0-9]+)$/) ?? []

                if (!code) {
                    throw new Error(`Unable to parse line ${line}`)
                }

                return [code as Code, Number(value)]
            }
        )
}

export function example1() {
    let map = parse(exampleFile1)

    const { x, y } = map.reduce(shipReducer, { heading: 0, x: 0, y: 0 })

    return manhatanDistance([x, y])
}

export function stage1() {
    let map = parse(input)

    const { x, y } = map.reduce(shipReducer, { heading: 0, x: 0, y: 0 })

    return manhatanDistance([x, y])
}

export function example2() {
    let map = parse(exampleFile1)

    const {
        ship: [x, y],
    } = map.reduce(waypointReducer, { ship: [0, 0], waypoint: [10, -1] })

    return manhatanDistance([x, y])
}
export function stage2() {
    let map = parse(input)

    const {
        ship: [x, y],
    } = map.reduce(waypointReducer, { ship: [0, 0], waypoint: [10, -1] })

    return manhatanDistance([x, y])
}
