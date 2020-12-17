import { notEmptyString } from '../utils'
import { Space3D } from './space3d'
import { Space4D } from './space4d'

const example = `
.#.
..#
###
`

const input = `
.#.#..##
..#....#
##.####.
...####.
#.##..##
#...##..
...##.##
#...#.#.
`

export type XYZ = [x: number, y: number, z: number]
export type XYZW = [x: number, y: number, z: number, w: number]

export enum Cube {
    ACTIVE = '#',
    INACTIVE = '.',
}

export function findBoundaries(xyzw: Iterable<XYZW | XYZ>): [min: XYZW, max: XYZW] {
    const min: XYZW = [Infinity, Infinity, Infinity, Infinity]
    const max: XYZW = [-Infinity, -Infinity, -Infinity, -Infinity]

    for (const [x, y, z, w = 0] of xyzw) {
        if (x < min[0]) {
            min[0] = x
        }
        if (x > max[0]) {
            max[0] = x
        }

        if (y < min[1]) {
            min[1] = y
        }
        if (y > max[1]) {
            max[1] = y
        }

        if (z < min[2]) {
            min[2] = z
        }
        if (z > max[2]) {
            max[2] = z
        }

        if (w < min[3]) {
            min[3] = w
        }
        if (w > max[3]) {
            max[3] = w
        }
    }
    return [min, max]
}

export function* walkBetweenBoundaries(min: XYZW, max: XYZW): Generator<XYZW> {
    for (let w = min[3]; w <= max[3]; w++) {
        for (let z = min[2]; z <= max[2]; z++) {
            for (let y = min[1]; y <= max[1]; y++) {
                for (let x = min[0]; x <= max[0]; x++) {
                    yield [x, y, z, w]
                }
            }
        }
    }
}

function parse(file: string) {
    return file
        .split('\n')
        .filter(notEmptyString)
        .flatMap((line, y) =>
            line.split('').map((char, x): XYZ | undefined => {
                if (char === Cube.ACTIVE) {
                    return [x, y, 0]
                }
            })
        )
        .filter((cube): cube is XYZ => cube != undefined)
}

export function example1() {
    let space = new Space3D()

    let initial = parse(example)

    for (const xyz of initial) {
        space.setCube(xyz, Cube.ACTIVE)
    }

    for (let cycle = 1; cycle <= 6; cycle++) {
        space = space.cycle()
    }

    return [...space.active()].length
}

export function stage1() {
    let space = new Space3D()
    let initial = parse(input)

    for (const xyz of initial) {
        space.setCube(xyz, Cube.ACTIVE)
    }

    for (let cycle = 1; cycle <= 6; cycle++) {
        space = space.cycle()
    }

    return [...space.active()].length
}

export function example2() {
    let space = new Space4D()

    let initial = parse(example)

    for (const [x, y, z] of initial) {
        space.setCube([x, y, z, 0], Cube.ACTIVE)
    }

    for (let cycle = 1; cycle <= 6; cycle++) {
        space = space.cycle()
    }

    return [...space.active()].length
}

export function stage2() {
    let space = new Space4D()

    let initial = parse(input)

    for (const [x, y, z] of initial) {
        space.setCube([x, y, z, 0], Cube.ACTIVE)
    }

    for (let cycle = 1; cycle <= 6; cycle++) {
        space = space.cycle()
    }

    return [...space.active()].length
}
