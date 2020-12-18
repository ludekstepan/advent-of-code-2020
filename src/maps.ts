import { normalizeZero } from './math'

/**
 * Generate vectors in dimensional space that surround the center point up to a given distance
 *
 * Center point is included!
 *
 * getSurroundingSpace(1, 3) => [[-3], [-2], [-1], [0], [1], [2], [3]]
 *
 * getSurroundingSpace(2) => 3x3 rectangle [[-1, -1], [-1, 0], [-1, 1] ... [1, 1]]
 * getSurroundingSpace(3) => 3x3x3 cube
 * getSurroundingSpace(3, 2) => 5x5x5 cube
 * getSurroundingSpace(3, 3) => 7x7x7 cube
 * getSurroundingSpace(4) => 3x3x3x3 hypercube
 */
export function* getSurroundingSpace(dimensions: number, distance = 1): Generator<number[]> {
    if (dimensions < 1) {
        return
    }

    for (let current = normalizeZero(-distance); current <= distance; current += 1) {
        if (dimensions > 1) {
            for (const subDimension of getSurroundingSpace(dimensions - 1, distance)) {
                yield [current, ...subDimension]
            }
        } else {
            yield [current]
        }
    }
}

export const manhatanDistance = (vector: number[]) => vector.reduce((sum, value) => sum + Math.abs(value), 0)
