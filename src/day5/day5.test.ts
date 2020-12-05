import { getId, stage1, stage2 } from './index'

describe('Day 5', () => {
    test('Example', () => {
        expect(getId('BFFFBBFRRR')).toBe(567)
        expect(getId('FFFBBBFRRR')).toBe(119)
        expect(getId('BBFFBBFRLL')).toBe(820)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(930)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(515)
    })
})
