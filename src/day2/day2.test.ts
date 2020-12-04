import { example, stage1, stage2 } from './index'

describe('Day 2', () => {
    test('Example', () => {
        expect(example()).toEqual(2)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(477)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(686)
    })
})
