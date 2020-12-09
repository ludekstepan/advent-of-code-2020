import { example, stage1, stage2 } from './index'

describe('Day 9', () => {
    test('Example 1', () => {
        expect(example()).toBe(127)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(1398413738)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(169521051)
    })
})
