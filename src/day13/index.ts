import { lcm } from 'mathjs'

import input from './input'
import exampleFile1 from './example1.txt'

import { notEmptyString } from '../utils'

export function example1() {
    const timestamp = 939
    const lines = [7, 13, 59, 31, 19]

    const after = lines.map((line) => {
        const multi = Math.ceil(timestamp / line)

        return { line, time: line * multi }
    })

    after.sort((a, b) => a.time - b.time)

    let [{ time, line }] = after

    return (time - timestamp) * line
}

export function stage1() {
    const { timestamp, buses } = input

    const after = buses
        .filter((line) => line !== 'x')
        .map(Number)
        .map((line) => {
            const multi = Math.ceil(timestamp / line)

            return { line, time: line * multi }
        })

    after.sort((a, b) => a.time - b.time)

    let [{ time, line }] = after

    return (time - timestamp) * line
}

export function example2() {
    const buses = '7,13,x,x,59,x,31,19'
        .split(',')
        .map((item, idx) => ({
            line: item === 'x' ? undefined : Number(item),
            offset: idx,
        }))
        .filter(({ line }) => line != undefined)

    for (let i = 0; i < 99999999; i++) {
        if (
            buses.every(({ line, offset }) => {
                if ((i + offset) % line! === 0) {
                    return true
                }
            })
        ) {
            return i
        }
    }

    throw new Error('Not found')
}

function* makePairs<T>(array: T[]) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            yield [array[i], array[j]] as [T, T]
        }
    }
}

const findMaxReducer = <T>(getValue: (item: T) => number) => (prev: T | undefined, current: T) => {
    if (prev == undefined) {
        return current
    }

    if (getValue(prev) > getValue(current)) {
        return prev
    } else {
        return current
    }
}

type Line = {
    line: number
    offset: number
}

export function stage2() {
    let { buses } = input
    // const buses = '7,13,x,x,59,x,31,19'.split(',')

    const lines = buses
        .map((item, idx) => ({
            line: item === 'x' ? undefined : Number(item),
            offset: idx,
        }))
        .filter<Line>((({ line }) => line != undefined) as any)
        .sort((a, b) => b.line - a.line)

    const first = lines.shift()!

    const acc = [first]

    let period = first.line
    let timestamp = period - first.offset

    while (lines.length > 0) {
        const line = lines.shift()!
        acc.push(line)

        /* @ts-expect-error */
        const newPeriod = lcm(...acc.map((l) => l.line))

        // find new timestamp
        for (let t = timestamp; t < newPeriod; t += period) {
            if (
                acc.every(({ line, offset }) => {
                    if ((t + offset) % line! === 0) {
                        return true
                    }
                })
            ) {
                period = newPeriod
                timestamp = t

                break
            }
        }
    }

    return timestamp
}
