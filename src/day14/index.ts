import inputFile from './input.txt'
import exampleFile1 from './example1.txt'
import exampleFile2 from './example2.txt'

import { notEmptyString } from '../utils'

function valueMask(input: string) {
    let mask = 0n
    let override = 0n

    for (let char of input) {
        mask <<= 1n
        override <<= 1n

        switch (char) {
            case 'X':
                mask |= 1n
                break
            case '1':
                override |= 1n
                break
        }
    }

    return (value: bigint) => (value & mask) | override
}

function addressMask(input: string) {
    let bit = 1n << 35n

    let mask = 0n
    let override = 0n

    const floating: bigint[] = []

    for (let char of input) {
        mask <<= 1n
        override <<= 1n

        switch (char) {
            case '0':
                mask |= 1n
                break

            case '1':
                override |= 1n
                break

            case 'X':
                floating.push(bit)
                break
        }

        bit >>= 1n
    }

    return { mask, override, floating }
}

function* expand(floating: bigint[]): Generator<bigint, void> {
    if (floating.length < 1) {
        return
    }

    let [current, ...rest] = floating

    if (floating.length === 1) {
        yield 0n
        yield current
    } else {
        for (let n1 of expand(rest)) {
            yield n1
            yield n1 | current
        }
    }
}

export function example1() {
    let mask = (value: bigint) => 0n
    const mem: bigint[] = []

    for (const line of exampleFile1.split('\n').filter(notEmptyString)) {
        let [, rawMask] = line.match(/^mask = ([01X]{36})$/) ?? []

        let [, addr, value] = line.match(/^mem\[([0-9]+)\] = ([0-9]+)$/) ?? []

        if (rawMask) {
            mask = valueMask(rawMask)
        } else if (addr != undefined) {
            mem[Number(addr)] = mask(BigInt(value))
        } else {
            throw new Error(`Unable to parse line ${line}`)
        }
    }

    let sum = 0n

    for (let m of mem) {
        if (m != undefined) {
            sum += m
        }
    }

    return sum
}

export function stage1() {
    let mask = (value: bigint) => 0n
    const mem: bigint[] = []

    for (const line of inputFile.split('\n').filter(notEmptyString)) {
        let [, rawMask] = line.match(/^mask = ([01X]{36})$/) ?? []

        let [, addr, value] = line.match(/^mem\[([0-9]+)\] = ([0-9]+)$/) ?? []

        if (rawMask) {
            mask = valueMask(rawMask)
        } else if (addr != undefined) {
            mem[Number(addr)] = mask(BigInt(value))
        } else {
            throw new Error(`Unable to parse line ${line}`)
        }
    }

    let sum = 0n

    for (let m of mem) {
        if (m != undefined) {
            sum += m
        }
    }

    return sum
}

export function example2() {
    const mem = new Map<bigint, bigint>()

    let mask: ReturnType<typeof addressMask> = { mask: 0n, override: 0n, floating: [] }

    for (const line of exampleFile2.split('\n').filter(notEmptyString)) {
        let [, rawMask] = line.match(/^mask = ([01X]{36})$/) ?? []

        let [, rawAddr, value] = line.match(/^mem\[([0-9]+)] = ([0-9]+)$/) ?? []

        if (rawMask) {
            mask = addressMask(rawMask)
        } else if (rawAddr != undefined) {
            for (let expanded of expand(mask.floating)) {
                const addr = (BigInt(rawAddr) & mask.mask) | mask.override | expanded

                mem.set(addr, BigInt(value))
            }
        } else {
            throw new Error(`Unable to parse line ${line}`)
        }
    }

    let sum = 0n

    mem.forEach((value) => (sum += value))

    return sum
}

export function stage2() {
    const mem = new Map<bigint, bigint>()

    let mask: ReturnType<typeof addressMask> = { mask: 0n, override: 0n, floating: [] }

    for (const line of inputFile.split('\n').filter(notEmptyString)) {
        let [, rawMask] = line.match(/^mask = ([01X]{36})$/) ?? []

        let [, rawAddr, value] = line.match(/^mem\[([0-9]+)] = ([0-9]+)$/) ?? []

        if (rawMask) {
            mask = addressMask(rawMask)
        } else if (rawAddr != undefined) {
            for (let expanded of expand(mask.floating)) {
                const addr = (BigInt(rawAddr) & mask.mask) | mask.override | expanded

                mem.set(addr, BigInt(value))
            }
        } else {
            throw new Error(`Unable to parse line ${line}`)
        }
    }

    let sum = 0n

    mem.forEach((value) => (sum += value))

    return sum
}
