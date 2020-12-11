import { example1, stage1, stage2 } from './index'

describe('Day 11', () => {
    test('Example 1', () => {
        expect(example1()).toEqual(37)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(2126)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(1914)
    })
})
