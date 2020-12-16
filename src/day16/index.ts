import rulesFile from './rules.txt'
import ticketFile from './ticket.txt'
import nearbyFile from './nearby.txt'

import { notEmptyString } from '../utils'

type Ranges = [[min: number, max: number], [min: number, max: number]]

function isFieldValid(field: number, ranges: Ranges) {
    const [[min1, max1], [min2, max2]] = ranges

    return (field >= min1 && field <= max1) || (field >= min2 && field <= max2)
}

function parseRules(rules: string) {
    return rules
        .split('\n')
        .filter(notEmptyString)
        .map((line) => {
            const [, name, r1min, r1max, r2min, r2max] =
                line.match(/^([a-z\s]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/) ?? []

            if (name) {
                return {
                    name,
                    ranges: [
                        [Number(r1min), Number(r1max)],
                        [Number(r2min), Number(r2max)],
                    ] as Ranges,
                }
            } else {
                throw new Error(`Cant parse rule line ${line}`)
            }
        })
}

function parseTickets(tickets: string) {
    return tickets
        .split('\n')
        .filter(notEmptyString)
        .map((line) => line.split(',').map(Number))
}

export function example1() {
    const rules = parseRules(`
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50
`)

    const tickets = parseTickets(`
7,3,47
40,4,50
55,2,20
38,6,12
`)

    return tickets
        .map((ticket) => {
            const fieldErrors = ticket.reduce((prev, field) => {
                if (!rules.some(({ ranges }) => isFieldValid(field, ranges))) {
                    return prev + field
                }

                return prev
            }, 0)

            return fieldErrors
        })
        .reduce((a, b) => a + b, 0)
}

export function stage1() {
    const rules = parseRules(rulesFile)

    const tickets = parseTickets(nearbyFile)

    return tickets
        .map((ticket) => {
            const fieldErrors = ticket.reduce((prev, field) => {
                if (!rules.some(({ ranges }) => isFieldValid(field, ranges))) {
                    return prev + field
                }

                return prev
            }, 0)

            return fieldErrors
        })
        .reduce((a, b) => a + b, 0)
}

export function example2() {
    const rules = parseRules(`
class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19
`)

    const nearby = parseTickets(`
3,9,18
15,1,5
5,14,9
`)

    const ticket = [11, 12, 13]

    const validTickets = nearby.filter((fields) => {
        return fields.every((field) => rules.some(({ ranges }) => isFieldValid(field, ranges)))
    })

    const columns = [new Set(rules), new Set(rules), new Set(rules)]

    validTickets.forEach((fields) => {
        fields.forEach((field, idx) => {
            rules.forEach((rule) => {
                if (!isFieldValid(field, rule.ranges)) {
                    columns[idx].delete(rule)
                }
            })
        })
    })

    while (columns.some((set) => set.size > 1)) {
        columns.forEach((column) => {
            if (column.size === 1) {
                // remove the only rule in this set from all other sets

                const [single] = column.values()

                columns.forEach((column2) => {
                    if (column2 !== column) {
                        column2.delete(single)
                    }
                })
            }
        })
    }

    const fullTicket = Object.fromEntries(
        ticket.map((value, index) => {
            const [{ name }] = columns[index].values()

            return [name, value]
        })
    )

    return fullTicket
}

export function stage2() {
    const rules = parseRules(rulesFile)
    const nearby = parseTickets(nearbyFile)
    const [ticket] = parseTickets(ticketFile)

    const validTickets = nearby.filter((fields) => {
        return fields.every((field) => rules.some(({ ranges }) => isFieldValid(field, ranges)))
    })

    const columns = ticket.map(() => new Set(rules))

    validTickets.forEach((fields) => {
        fields.forEach((field, idx) => {
            rules.forEach((rule) => {
                if (!isFieldValid(field, rule.ranges)) {
                    columns[idx].delete(rule)
                }
            })
        })
    })

    while (columns.some((set) => set.size > 1)) {
        columns.forEach((column) => {
            if (column.size === 1) {
                // remove the only rule in this set from all other sets

                const [single] = column.values()

                columns.forEach((column2) => {
                    if (column2 !== column) {
                        column2.delete(single)
                    }
                })
            }
        })
    }

    return ticket
        .map((value, index) => {
            const [{ name }] = columns[index].values()

            return [name, value] as const
        })
        .filter(([name]) => name.startsWith('departure'))
        .map(([name, value]) => value)
        .reduce((a, b) => a * b, 1)
}
