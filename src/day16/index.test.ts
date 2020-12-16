import { example1, example2, stage1, stage2 } from './index'

describe('Day 16', () => {
    test('Example 1', () => {
        expect(example1()).toBe(71)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(29851)
    })

    test('Example 2', () => {
        expect(example2()).toEqual({ class: 12, row: 11, seat: 13 })
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(3029180675981)
    })
})
