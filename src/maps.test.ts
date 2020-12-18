import { getSurroundingSpace } from './maps'

describe('maps', () => {
    describe('getSurroundingSpace()', () => {
        test('Returns empty list for getSurroundingSpace(0)', () => {
            expect([...getSurroundingSpace(0)]).toEqual([])
        })

        test('Returns [0] for getSurroundingSpace(1,0)', () => {
            expect([...getSurroundingSpace(1, 0)]).toEqual([[0]])
        })

        test('Returns [0,0] for getSurroundingSpace(2,0)', () => {
            expect([...getSurroundingSpace(2, 0)]).toEqual([[0, 0]])
        })

        test('Returns [0,0,0] for getSurroundingSpace(3,0)', () => {
            expect([...getSurroundingSpace(3, 0)]).toEqual([[0, 0, 0]])
        })

        test('Returns [-1], [0], [1] for getSurroundingSpace(1)', () => {
            expect([...getSurroundingSpace(1)]).toEqual([[-1], [0], [1]])
        })

        test('Returns [-2], [-1], [0], [1], [2] grid for getSurroundingSpace(1,2)', () => {
            expect([...getSurroundingSpace(1, 2)]).toEqual([[-2], [-1], [0], [1], [2]])
        })

        test('Returns 3x3 grid for getSurroundingSpace(2)', () => {
            expect([...getSurroundingSpace(2)]).toEqual([
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [0, -1],
                [0, 0],
                [0, 1],
                [1, -1],
                [1, 0],
                [1, 1],
            ])
        })

        test('Returns 5x5 grid for getSurroundingSpace(2,2)', () => {
            expect([...getSurroundingSpace(2, 2)]).toEqual([
                [-2, -2],
                [-2, -1],
                [-2, 0],
                [-2, 1],
                [-2, 2],
                [-1, -2],
                [-1, -1],
                [-1, 0],
                [-1, 1],
                [-1, 2],
                [0, -2],
                [0, -1],
                [0, 0],
                [0, 1],
                [0, 2],
                [1, -2],
                [1, -1],
                [1, 0],
                [1, 1],
                [1, 2],
                [2, -2],
                [2, -1],
                [2, 0],
                [2, 1],
                [2, 2],
            ])
        })

        test('Returns 3x3x3 grid for getSurroundingSpace(3)', () => {
            expect([...getSurroundingSpace(3)]).toEqual([
                [-1, -1, -1],
                [-1, -1, 0],
                [-1, -1, 1],
                [-1, 0, -1],
                [-1, 0, 0],
                [-1, 0, 1],
                [-1, 1, -1],
                [-1, 1, 0],
                [-1, 1, 1],

                [0, -1, -1],
                [0, -1, 0],
                [0, -1, 1],
                [0, 0, -1],
                [0, 0, 0],
                [0, 0, 1],
                [0, 1, -1],
                [0, 1, 0],
                [0, 1, 1],

                [1, -1, -1],
                [1, -1, 0],
                [1, -1, 1],
                [1, 0, -1],
                [1, 0, 0],
                [1, 0, 1],
                [1, 1, -1],
                [1, 1, 0],
                [1, 1, 1],
            ])
        })
    })
})
