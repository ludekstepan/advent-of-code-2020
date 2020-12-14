import { example1, example2, stage1, stage2 } from './index'

describe('Day 12', () => {
    test('Example 1', () => {
        expect(example1()).toEqual(25)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(1106)
    })

    test('Example 2', () => {
        expect(example2()).toEqual(286)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(107281)
    })
})
