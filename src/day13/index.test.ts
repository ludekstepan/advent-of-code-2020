import { example1, example2, stage1, stage2 } from './index'

describe('Day 13', () => {
    test('Example 1', () => {
        expect(example1()).toEqual(295)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(3789)
    })

    test('Example 2', () => {
        expect(example2()).toEqual(1068781)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(667437230788118)
    })
})
