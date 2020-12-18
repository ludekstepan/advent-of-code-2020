export function addVectors<T extends number[]>(a: T, b: T) {
    if (a.length !== b.length) {
        throw new RangeError(`Vector a: ${a} has different dimension than vector b: ${b}`)
    }

    return a.map((aValue, idx) => aValue + b[idx])
}
