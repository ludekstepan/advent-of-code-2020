import input from './input.txt'
import { notEmptyString } from '../utils'

export function stage1() {
    let entries = input.split('\n').filter(notEmptyString).map(Number)

    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            const sum = entries[i] + entries[j]

            if (sum === 2020) {
                return entries[i] * entries[j]
            }
        }
    }
}

export function stage2() {
    let entries = input
        .split('\n')
        .filter((line) => line !== '')
        .map(Number)

    for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
            for (let k = 0; k < entries.length; k++) {
                if (k === i || k === j) {
                    continue
                }

                const sum = entries[i] + entries[j] + entries[k]

                if (sum === 2020) {
                    return entries[i] * entries[j] * entries[k]
                }
            }
        }
    }
}
