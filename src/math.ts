export const normalizeZero = (value: number) => (Object.is(value, -0) ? +0 : value)

export const add = (a: number, b: number) => a + b

export const subtract = (value: number, delta: number) => value - delta

export const multiply = (a: number, b: number) => a * b
