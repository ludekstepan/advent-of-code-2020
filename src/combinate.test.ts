import { combinate, permutationWithoutRepeat, permutationWithRepeat } from './combinate'

const draw = <T>(generator: Generator<T, void, undefined>) => [...generator]

describe('combinate', () => {
    it('yields empty list for empty', () => {
        expect(draw(combinate([], 0))).toEqual([])
    })

    it('yields empty list for k=0', () => {
        expect(draw(combinate(['a', 'b', 'c'], 0))).toEqual([])
    })

    it('yields same for k=n', () => {
        expect(draw(combinate(['a', 'b', 'c'], 3))).toEqual([['a', 'b', 'c']])
    })

    it('yields singles for k=1', () => {
        expect(draw(combinate(['a', 'b', 'c', 'd'], 1))).toEqual([['a'], ['b'], ['c'], ['d']])
    })

    it('yields doubles for k=2', () => {
        expect(draw(combinate(['a', 'b', 'c', 'd'], 2))).toEqual([
            ['a', 'b'],
            ['a', 'c'],
            ['a', 'd'],
            ['b', 'c'],
            ['b', 'd'],
            ['c', 'd'],
        ])
    })

    it('yields triples for k=3', () => {
        expect(draw(combinate(['a', 'b', 'c', 'd'], 3))).toEqual([
            ['a', 'b', 'c'],
            ['a', 'b', 'd'],
            ['a', 'c', 'd'],
            ['b', 'c', 'd'],
        ])
    })
})
