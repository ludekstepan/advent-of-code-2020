import { permutationWithRepeat } from '../combinate'
import { Cube, findBoundaries, walkBetweenBoundaries, XYZ, XYZW } from './index'

function* getNeighbors4D([x, y, z, w]: XYZW): Generator<XYZW> {
    for (const [nx, ny, nz, nw] of permutationWithRepeat([-1, 0, 1], 4)) {
        if (nx === 0 && ny === 0 && nz === 0 && nw === 0) {
            continue // skip current
        }
        yield [x + nx, y + ny, z + nz, w + nw]
    }
}

export class Space4D {
    map = new Map<string, Cube>()

    getKey(xyzw: XYZW) {
        return xyzw.join(',')
    }

    parseKey(key: string): XYZW {
        let [x, y, z, w] = key.split(',').map(Number)
        return [x, y, z, w]
    }

    getCube([x, y, z, w]: XYZW): Cube {
        const key = this.getKey([x, y, z, w])
        return this.map.get(key) ?? Cube.INACTIVE
    }

    setCube([x, y, z, w]: XYZW, cube: Cube) {
        const key = this.getKey([x, y, z, w])

        if (cube === Cube.ACTIVE) {
            this.map.set(key, cube)
        } else {
            this.map.delete(key)
        }
    }

    active = function* (this: Space4D): Generator<XYZW> {
        for (const [key, cube] of this.map) {
            if (cube === Cube.ACTIVE) {
                yield this.parseKey(key)
            }
        }
    }

    cycle() {
        const [min, max] = findBoundaries(this.active())

        // expand boundaries
        min[0]--
        min[1]--
        min[2]--
        min[3]--
        max[0]++
        max[1]++
        max[2]++
        max[3]++

        const newSpace = new Space4D()

        for (const xyzw of walkBetweenBoundaries(min, max)) {
            const cube = this.getCube(xyzw)

            const neighbors = [...getNeighbors4D(xyzw)]
                .map((n) => this.getCube(n))
                .reduce((prev, cube) => (cube === Cube.ACTIVE ? prev + 1 : prev), 0)

            if (cube === Cube.ACTIVE && (neighbors === 2 || neighbors === 3)) {
                newSpace.setCube(xyzw, Cube.ACTIVE)
            }

            if (cube === Cube.INACTIVE && neighbors === 3) {
                newSpace.setCube(xyzw, Cube.ACTIVE)
            }
        }

        return newSpace
    }
}
