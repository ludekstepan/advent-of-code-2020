import { example1, example2, stage1, stage2 } from './index'

describe('Day 10', () => {
    test('Example 1', () => {
        expect(example1()).toEqual([7, 5])
    })

    test('Example 2', () => {
        expect(example2()).toEqual([22, 10])
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(74 * 34)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(296196766695424)
    })
})
