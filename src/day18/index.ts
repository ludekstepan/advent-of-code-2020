import inputFile from './input.txt'
import { notEmptyString } from '../utils'
import { add } from '../math'

enum TokenType {
    NUMBER = 'NUMBER',
    PARENS_OPEN = '(',
    PARENS_CLOSE = ')',
    PLUS = '+',
    MULTI = '*',
    WHITESPACE = ' ',
}

interface Token {
    type: TokenType
    value?: number
}

function parse(line: string) {
    const tokenized = [...line].map(parseChar).filter(({ type }) => type !== TokenType.WHITESPACE)

    let outputQueue: Token[] = []
    let operatorStack: Token[] = []

    tokenized.forEach((token) => {
        switch (token.type) {
            case TokenType.NUMBER:
                outputQueue.push(token)
                break
            case TokenType.PARENS_OPEN:
                operatorStack.push(token)
                break
            case TokenType.PARENS_CLOSE:
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1].type !== TokenType.PARENS_OPEN
                ) {
                    outputQueue.push(operatorStack.pop()!)
                }

                if (operatorStack[operatorStack.length - 1].type !== TokenType.PARENS_OPEN) {
                    throw new Error('There are mismatched parentheses')
                }

                if (operatorStack[operatorStack.length - 1].type === TokenType.PARENS_OPEN) {
                    operatorStack.pop()
                }
                break
            case TokenType.PLUS:
            case TokenType.MULTI:
                while (
                    operatorStack.length > 0 &&
                    [TokenType.MULTI, TokenType.PLUS].includes(operatorStack[operatorStack.length - 1].type)
                ) {
                    outputQueue.push(operatorStack.pop()!)
                }
                operatorStack.push(token)
                break
            case TokenType.WHITESPACE:
                break
            default:
                throw new Error(`unexpected token ${token.type}`)
        }
    })

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop()!)
    }

    return outputQueue
}

function parse2(line: string) {
    const tokenized = [...line].map(parseChar).filter(({ type }) => type !== TokenType.WHITESPACE)

    let outputQueue: Token[] = []
    let operatorStack: Token[] = []

    tokenized.forEach((token) => {
        switch (token.type) {
            case TokenType.NUMBER:
                outputQueue.push(token)
                break
            case TokenType.PARENS_OPEN:
                operatorStack.push(token)
                break
            case TokenType.PARENS_CLOSE:
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1].type !== TokenType.PARENS_OPEN
                ) {
                    outputQueue.push(operatorStack.pop()!)
                }

                if (operatorStack[operatorStack.length - 1].type !== TokenType.PARENS_OPEN) {
                    throw new Error('There are mismatched parentheses')
                }

                if (operatorStack[operatorStack.length - 1].type === TokenType.PARENS_OPEN) {
                    operatorStack.pop()
                }
                break
            case TokenType.PLUS:
            case TokenType.MULTI:
                while (
                    operatorStack.length > 0 &&
                    [TokenType.PLUS].includes(operatorStack[operatorStack.length - 1].type)
                ) {
                    outputQueue.push(operatorStack.pop()!)
                }
                operatorStack.push(token)
                break
            case TokenType.WHITESPACE:
                break
            default:
                throw new Error(`unexpected token ${token.type}`)
        }
    })

    while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop()!)
    }

    return outputQueue
}

function parseChar(char: string): Token {
    switch (true) {
        case char === TokenType.WHITESPACE:
            return { type: TokenType.WHITESPACE }
        case char === TokenType.PLUS:
            return { type: TokenType.PLUS }
        case char === TokenType.MULTI:
            return { type: TokenType.MULTI }
        case char === TokenType.PARENS_OPEN:
            return { type: TokenType.PARENS_OPEN }
        case char === TokenType.PARENS_CLOSE:
            return { type: TokenType.PARENS_CLOSE }
        case /[0-9]/.test(char):
            return { type: TokenType.NUMBER, value: Number(char) }
        default:
            throw new Error(`Can't parse char "${char}"`)
    }
}

function evaluate(queue: Token[]) {
    const stack: Token[] = []

    let value: number, t1: Token, t2: Token

    for (let token of queue) {
        switch (token.type) {
            case TokenType.NUMBER:
                stack.push(token)
                break
            case TokenType.PLUS:
                t1 = stack.pop()!
                t2 = stack.pop()!

                if (typeof t1?.value! !== 'number') {
                    throw new Error('t1 not number')
                }
                if (typeof t2?.value! !== 'number') {
                    throw new Error('t2 not number')
                }

                value = t1!.value + t2!.value
                stack.push({ type: TokenType.NUMBER, value })

                break

            case TokenType.MULTI:
                t1 = stack.pop()!
                t2 = stack.pop()!

                if (typeof t1?.value! !== 'number') {
                    throw new Error('t1 not number')
                }
                if (typeof t2?.value! !== 'number') {
                    throw new Error('t2 not number')
                }

                value = t1!.value * t2!.value
                stack.push({ type: TokenType.NUMBER, value })

                break
        }
    }

    let [result] = stack

    return result.value ?? NaN
}

export function process(input: string) {
    return evaluate(parse(input))
}

export function process2(input: string) {
    return evaluate(parse2(input))
}

export function example1() {
    const exampleInput = '1 + 2 * 3 + 4 * 5 + 6'

    let parsed = parse(exampleInput)

    return evaluate(parsed)
}

export function stage1() {
    let input = inputFile.split('\n').filter(notEmptyString).map(process)

    return input.reduce(add, 0)
}

export function example2() {}

export function stage2() {
    let input = inputFile.split('\n').filter(notEmptyString).map(process2)

    return input.reduce(add, 0)
}
