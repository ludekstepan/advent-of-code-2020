import { permutationWithRepeat } from '../combinate'
import { Cube, findBoundaries, walkBetweenBoundaries, XYZ } from './index'

function* getNeighbors3D([x, y, z]: XYZ): Generator<XYZ> {
    for (const [nx, ny, nz] of permutationWithRepeat([-1, 0, 1], 3)) {
        if (nx === 0 && ny === 0 && nz === 0) {
            continue // skip current
        }
        yield [x + nx, y + ny, z + nz]
    }
}

export class Space3D {
    map = new Map<string, Cube>()

    getKey(xyz: XYZ) {
        return xyz.join(',')
    }

    parseKey(key: string): XYZ {
        let [x, y, z] = key.split(',').map(Number)
        return [x, y, z]
    }

    getCube([x, y, z]: XYZ): Cube {
        const key = this.getKey([x, y, z])
        return this.map.get(key) ?? Cube.INACTIVE
    }

    setCube([x, y, z]: XYZ, cube: Cube) {
        const key = this.getKey([x, y, z])

        if (cube === Cube.ACTIVE) {
            this.map.set(key, cube)
        } else {
            this.map.delete(key)
        }
    }

    active = function* (this: Space3D): Generator<XYZ> {
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
        max[0]++
        max[1]++
        max[2]++

        const newSpace = new Space3D()

        for (const [x, y, z] of walkBetweenBoundaries(min, max)) {
            const cube = this.getCube([x, y, z])

            const neighbors = [...getNeighbors3D([x, y, z])]
                .map((n) => this.getCube(n))
                .reduce((prev, cube) => (cube === Cube.ACTIVE ? prev + 1 : prev), 0)

            if (cube === Cube.ACTIVE && (neighbors === 2 || neighbors === 3)) {
                newSpace.setCube([x, y, z], Cube.ACTIVE)
            }

            if (cube === Cube.INACTIVE && neighbors === 3) {
                newSpace.setCube([x, y, z], Cube.ACTIVE)
            }
        }

        return newSpace
    }
}
