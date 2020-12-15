import { example1, example2, stage1, stage2 } from './index'

describe('Day 15', () => {
    test('Example 1', () => {
        expect(example1()).toEqual(436)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(234)
    })

    test('Example 2', () => {
        expect(example2()).toEqual(175594)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(8984)
    })
})
