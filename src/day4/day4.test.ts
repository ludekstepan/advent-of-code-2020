import { stage1, stage2 } from './index'

describe('Day 3', () => {
    test('Stage 1', () => {
        expect(stage1()).toBe(170)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(103)
    })
})
