import { example1, example2, stage1, stage2 } from './index'

describe('Day 14', () => {
    test('Example 1', () => {
        expect(example1()).toEqual(165n)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(9967721333886n)
    })

    test('Example 2', () => {
        expect(example2()).toEqual(208n)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(4355897790573n)
    })
})
