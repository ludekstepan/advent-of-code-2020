import input from './input.txt'
import exampleFile1 from './example1.txt'
import exampleFile2 from './example2.txt'

import { notEmptyString } from '../utils'

function parse(file: string) {
    return file
        .split('\n')
        .filter(notEmptyString)
        .map(Number)
        .sort((a, b) => a - b)
}

export function example1() {
    let data = parse(exampleFile1)

    let diff1 = 0,
        diff3 = 0

    let prev = 0
    for (const adapter of data) {
        let diff = adapter - prev

        switch (diff) {
            case 1:
                diff1++
                break
            case 3:
                diff3++
                break
            default:
                throw new Error(`Unexpected diff ${diff} for adapter ${adapter}`)
        }

        prev = adapter
    }

    return [diff1, diff3 + 1]
}

export function example2() {
    let data = parse(exampleFile2)

    let diff1 = 0,
        diff3 = 0

    let prev = 0
    for (const adapter of data) {
        let diff = adapter - prev

        switch (diff) {
            case 1:
                diff1++
                break
            case 3:
                diff3++
                break
            default:
                throw new Error(`Unexpected diff ${diff} for adapter ${adapter}`)
        }

        prev = adapter
    }

    return [diff1, diff3 + 1]
}

export function stage1() {
    let data = parse(input)

    let diff1 = 0,
        diff3 = 0

    let prev = 0
    for (const adapter of data) {
        let diff = adapter - prev

        switch (diff) {
            case 1:
                diff1++
                break
            case 3:
                diff3++
                break
            default:
                throw new Error(`Unexpected diff ${diff} for adapter ${adapter}`)
        }

        prev = adapter
    }

    return diff1 * (diff3 + 1)
}

export function stage2() {
    let data = parse(input)

    data.unshift(0)
    data.push(data[data.length - 1] + 3)

    let comb = data.map((value, idx) => {
        let combinations = 0

        if (data[idx + 1] <= value + 3) {
            combinations++
        }
        if (data[idx + 2] <= value + 3) {
            combinations++
        }
        if (data[idx + 3] <= value + 3) {
            combinations++
        }

        return combinations
    })

    comb.pop()
    comb.reverse()

    let sum: number[] = []

    comb.forEach((value, idx) => {
        switch (value) {
            case 1:
                sum[idx] = sum[idx - 1] ?? 1
                break
            case 2:
                sum[idx] = sum[idx - 1] + sum[idx - 2]
                break
            case 3:
                sum[idx] = sum[idx - 1] + sum[idx - 2] + sum[idx - 3]
                break
        }
    })

    return sum.pop()
}
