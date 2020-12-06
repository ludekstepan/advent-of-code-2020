import input from './input.txt'

import { notEmptyString } from '../utils'

function parse(file: string) {
    let groups = file.split('\n\n').filter(notEmptyString)
    return groups
}

export function stage1() {
    return parse(input)
        .map((group) => group.replace(/\n/g, ''))
        .map((group) => {
            // console.log(group)
            let unique = new Set()
            for (const char of group) {
                unique.add(char)
            }
            return unique.size
        })
        .reduce((a, b) => a + b)
}

export function stage2() {
    let groups = parse(input).map((group) => {
        let groupAnswers = new Set()
        let people = group
            .split('\n')
            .filter(notEmptyString)
            .map((person) => {
                let unique = new Set()
                for (const char of person) {
                    unique.add(char)
                    groupAnswers.add(char)
                }
                return unique
            })

        return Array.from(groupAnswers).filter((yes) => people.every((person) => person.has(yes)))
    })

    return groups.reduce((prev, b) => prev + b.length, 0)
}
