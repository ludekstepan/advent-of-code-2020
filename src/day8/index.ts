import input from './input.txt'
import exampleInput from './example.txt'

import { notEmptyString } from '../utils'

type Prg = ReturnType<typeof parse>

function parse(file: string) {
    return file
        .split('\n')
        .filter(notEmptyString)
        .map((line) => {
            const [opcode, arg] = line.split(' ')
            return { opcode, arg: Number(arg), hasRun: false }
        })
}

function run(prg: Prg) {
    let acc = 0
    let pc = 0

    while (pc < prg.length) {
        let instruction = prg[pc]

        if (instruction.hasRun) {
            throw acc
        }

        pc += 1
        instruction.hasRun = true

        switch (instruction.opcode) {
            case 'jmp':
                pc += instruction.arg - 1
                break
            case 'acc':
                acc += instruction.arg
                break
            case 'nop':
                break
        }
    }

    return acc
}

export function example() {
    try {
        run(parse(exampleInput))
    } catch (acc) {
        return acc
    }
}

export function stage1() {
    try {
        run(parse(input))
    } catch (acc) {
        return acc
    }
}

export function stage2() {
    let fix = -1

    let prg = parse(input)

    while (fix < prg.length) {
        try {
            return run(prg)
        } catch (e) {
            prg = parse(input)

            const next = prg.findIndex(({ opcode }, index) => index > fix && ['nop', 'jmp'].includes(opcode))
            if (next === -1) {
                throw new Error(`cant detect any ohter nop/jmp: fix: ${fix}`)
            }

            if (prg[next].opcode === 'nop') {
                prg[next].opcode = 'jmp'
            } else if (prg[next].opcode === 'jmp') {
                prg[next].opcode = 'nop'
            } else {
                throw new Error('what?')
            }

            fix = next
        }
    }
}
