import input from './input.txt'
import exampleFile from './example.txt'
import { notEmptyString } from '../utils'

function parse(file: string) {
    let lines = file
        .split('\n')
        .filter(notEmptyString)
        .map((line) => {
            const [match, min, max, char, password] = line.match(/([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/) ?? []

            if (!match) {
                throw new Error(`Wrong line: ${line}`)
            }

            return {
                min: Number(min),
                max: Number(max),
                char,
                password,
            }
        })

    return lines
}

export function example() {
    let entries = parse(exampleFile)

    let valid = entries.filter(({ min, max, char, password }) => {
        const regexp = new RegExp(`^([^${char}]*${char}[^${char}]*){${min},${max}}$`)

        return regexp.test(password)
    })

    return valid.length
}

export function stage1() {
    let entries = parse(input)

    let valid = entries.filter(({ min, max, char, password }) => {
        const regexp = new RegExp(`^([^${char}]*${char}[^${char}]*){${min},${max}}$`)

        return regexp.test(password)
    })

    return valid.length
}

export function stage2() {
    let entries = parse(input)

    let valid = entries.filter(({ min, max, char, password }) => {
        const minMatch = password[min - 1] === char
        const maxMatch = password[max - 1] === char

        return minMatch !== maxMatch
    })

    return valid.length
}
