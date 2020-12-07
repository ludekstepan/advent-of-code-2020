import { example, stage1, stage2 } from './index'

describe('Day 6', () => {
    test('Example 1', () => {
        expect(example()).toBe(4)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(300)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(8030)
    })
})
