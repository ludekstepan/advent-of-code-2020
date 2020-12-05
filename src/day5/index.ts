import input from './input.txt'

import { notEmptyString } from '../utils'

function parse(file: string) {
    let lines = file.split('\n').filter(notEmptyString)
    return lines
}

export function getId(pass: string) {
    let row = 0,
        column = 0

    for (const char of pass) {
        switch (char) {
            case 'F':
                row <<= 1
                break
            case 'B':
                row <<= 1
                row |= 1
                break
            case 'L':
                column <<= 1
                break
            case 'R':
                column <<= 1
                column |= 1
                break
        }
    }

    return row * 8 + column
}

export function stage1() {
    return parse(input)
        .map(getId)
        .reduce((a, b) => Math.max(a, b))
}

export function stage2() {
    let seats = parse(input)
        .map(getId)
        .sort((a, b) => a - b)

    for (let id = seats[0]; id < seats[0] + seats.length; id++) {
        if (seats.includes(id) && !seats.includes(id + 1) && seats.includes(id + 2)) {
            return id + 1
        }
    }
}
