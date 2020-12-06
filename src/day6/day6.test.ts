import { stage1, stage2 } from './index'

describe('Day 6', () => {
    test('Stage 1', () => {
        expect(stage1()).toBe(6911)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(3473)
    })
})
