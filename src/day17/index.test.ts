import { example1, example2, stage1, stage2 } from './index'

describe('Day 17', () => {
    test('Example 1', () => {
        expect(example1()).toBe(112)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(317)
    })

    test('Example 2', () => {
        expect(example2()).toBe(848)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(1692)
    })
})
