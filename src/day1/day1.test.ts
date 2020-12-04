import { stage1, stage2 } from './index'

describe('Day 1', () => {
    test('Stage 1', () => {
        expect(stage1()).toBe(1014624)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(80072256)
    })
})
