import { example, stage1, stage2 } from './index'

describe('Day 8', () => {
    test('Example 1', () => {
        expect(example()).toBe(5)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(2080)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(2477)
    })
})
