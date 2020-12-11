import input from './input.txt'
import exampleFile1 from './example1.txt'

import { notEmptyString } from '../utils'

enum Place {
    FLOOR = '.',
    EMPTY = 'L',
    OCCUPIED = '#',
}

type Map = Place[][]

type YX = [y: number, x: number]

const ALL_DIRECTIONS: YX[] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],

    [0, -1],
    [0, 1],

    [1, -1],
    [1, 0],
    [1, 1],
]

const getPlace = (map: Map, [y, x]: YX): Place | undefined => map[y]?.[x]

function parse(file: string) {
    return file
        .split('\n')
        .filter(notEmptyString)
        .map((line) => Array.from<Place>(line as any))
}

function* getNearestAdjacent(map: Map, [y, x]: YX) {
    for (const [dy, dx] of ALL_DIRECTIONS) {
        yield getPlace(map, [y + dy, x + dx])
    }
}

function* getVisibleAdjacent(map: Map, current: YX) {
    for (const [dy, dx] of ALL_DIRECTIONS) {
        let [y, x] = current

        for (;;) {
            y += dy
            x += dx

            const item = getPlace(map, [y, x])
            if (item !== Place.FLOOR) {
                yield item
                break
            }
        }
    }
}

const mapMap = (map: Map, mapper: (inputMap: Map, position: YX) => Place): Map => {
    const copy = JSON.parse(JSON.stringify(map))

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            copy[y][x] = mapper(map, [y, x])
        }
    }

    return copy
}

const isMapEqual = (m1: Map, m2: Map) => JSON.stringify(m1) === JSON.stringify(m2)

function nextNearestSeat(map: Map, currentPosition: YX) {
    const adj = [...getNearestAdjacent(map, currentPosition)]

    const currentPlace = getPlace(map, currentPosition)!

    if (currentPlace === Place.EMPTY && adj.every((a) => a !== Place.OCCUPIED)) {
        return Place.OCCUPIED
    } else if (currentPlace === Place.OCCUPIED && adj.filter((a) => a === Place.OCCUPIED).length >= 4) {
        return Place.EMPTY
    } else {
        return currentPlace
    }
}

function nextVisibleSeat(map: Map, currentPosition: YX) {
    const adj = [...getVisibleAdjacent(map, currentPosition)]

    const currentPlace = getPlace(map, currentPosition)!

    if (currentPlace === Place.EMPTY && adj.every((a) => a !== Place.OCCUPIED)) {
        return Place.OCCUPIED
    } else if (currentPlace === Place.OCCUPIED && adj.filter((a) => a === Place.OCCUPIED).length >= 5) {
        return Place.EMPTY
    } else {
        return currentPlace
    }
}

function countOccupied(map: Map) {
    return map
        .map((line) => line.reduce((prev, curr) => prev + (curr === Place.OCCUPIED ? 1 : 0), 0))
        .reduce((a, b) => a + b)
}

export function example1() {
    let map = parse(exampleFile1)

    for (;;) {
        const next = mapMap(map, nextNearestSeat)

        if (isMapEqual(map, next)) {
            map = next
            break
        }

        map = next
    }

    return countOccupied(map)
}

export function stage1() {
    let map = parse(input)

    for (;;) {
        const next = mapMap(map, nextNearestSeat)

        if (isMapEqual(map, next)) {
            map = next
            break
        }

        map = next
    }

    return countOccupied(map)
}

export function stage2() {
    let map = parse(input)

    for (;;) {
        const next = mapMap(map, nextVisibleSeat)

        if (isMapEqual(map, next)) {
            map = next
            break
        }

        map = next
    }

    return countOccupied(map)
}
