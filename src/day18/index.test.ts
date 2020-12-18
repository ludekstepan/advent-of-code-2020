import { process, example2, stage1, stage2, process2 } from './index'

describe('Day 18', () => {
    test('Example 1', () => {
        expect(process('1 + 2 * 3 + 4 * 5 + 6')).toBe(71)
    })

    test('Example 2', () => {
        expect(process('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
    })

    test('Example 3', () => {
        expect(process('2 * 3 + (4 * 5)')).toBe(26)
    })

    test('Example 4', () => {
        expect(process('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(437)
    })

    test('Example 5', () => {
        expect(process('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(12240)
    })

    test('Example 6', () => {
        expect(process('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(13632)
    })

    test('Example 1-2', () => {
        expect(process2('1 + 2 * 3 + 4 * 5 + 6')).toBe(231)
    })

    test('Example 2-2', () => {
        expect(process2('1 + (2 * 3) + (4 * (5 + 6))')).toBe(51)
    })

    test('Example 3-2', () => {
        expect(process2('2 * 3 + (4 * 5)')).toBe(46)
    })

    test('Example 4-2', () => {
        expect(process2('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toBe(1445)
    })

    test('Example 5-2', () => {
        expect(process2('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toBe(669060)
    })

    test('Example 6-2', () => {
        expect(process2('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toBe(23340)
    })

    test('Stage 1', () => {
        expect(stage1()).toBe(45283905029161)
    })

    test('Stage 2', () => {
        expect(stage2()).toBe(216975281211165)
    })
})
