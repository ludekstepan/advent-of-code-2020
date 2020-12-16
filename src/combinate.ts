/**
 * Generate k-combinations of items set
 *
 * https://en.wikipedia.org/wiki/Combination
 */
export function* combinate<T>(items: T[], k: number): Generator<T[], void> {
    const n = items.length

    if (!(k <= n)) {
        throw new RangeError('The "k" must be less or equal to "n"')
    }

    if (!(k >= 1)) {
        return
    }

    if (k === n) {
        yield items
        return
    }

    for (let i = 0; i <= n - k; i++) {
        const [current, ...rest] = items.slice(i)

        if (k <= 1) {
            yield [current]
        } else {
            for (const subCombination of combinate(rest, k - 1)) {
                yield [current, ...subCombination]
            }
        }
    }
}

export function* permutationWithRepeat<T>(items: T[], k: number): Generator<T[], void> {
    const n = items.length

    for (const current of items) {
        if (k <= 1) {
            yield [current]
        } else {
            for (const subCombination of permutationWithRepeat(items, k - 1)) {
                yield [current, ...subCombination]
            }
        }
    }
}

export function* permutationWithoutRepeat<T>(items: T[], k: number): Generator<T[], void> {
    const n = items.length

    for (let i = 0; i <= n - k; i++) {
        const [current, ...rest] = items.slice(i)

        if (k <= 1) {
            yield [current]
        } else {
            for (const subCombination of permutationWithoutRepeat(rest, k - 1)) {
                yield [current, ...subCombination]
            }
        }
    }
}
