import input from './input.txt'
import exampleInput from './example.txt'

import { notEmptyString } from '../utils'

function parse(file: string) {
    return file.split('\n').filter(notEmptyString).map(Number)
}

function check(preamble: number, data: number[]) {
    function* checkSum(idx: number) {
        for (let i = idx - preamble; i < idx - 1; i++) {
            for (let j = i + 1; j < idx; j++) {
                let sum = data[i] + data[j]
                yield sum
            }
        }
    }

    for (let idx = preamble; idx < data.length; idx++) {
        let current = data[idx]
        let sums = [...checkSum(idx)]

        if (!sums.includes(current)) {
            return current
        }
    }

    throw new Error('All valid!')
}

export function example() {
    let data = parse(exampleInput)
    return check(5, data)
}

export function stage1() {
    let data = parse(input)
    return check(25, data)
}

export function stage2() {
    const expectedSum = 1398413738
    // const expectedSum = 127

    let data = parse(input)

    for (let i = 0; i < data.length - 1; i++) {
        let sum = data[i]
        for (let j = i + 1; j < data.length; j++) {
            sum += data[j]

            if (sum === expectedSum) {
                let series = data.slice(i, j)

                return Math.min(...series) + Math.max(...series)
            } else if (sum > expectedSum) {
                break
            }
        }
    }
}
