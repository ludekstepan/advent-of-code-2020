import input from './input.txt'

function parse(file: string) {
    let lines = file.split('\n').filter((line) => line !== '')
    return lines
}

function getCharAt(line: string, idx: number) {
    return line[idx % line.length]
}

function slope(lines: string[], right: number, down: number) {
    let trees = 0

    for (let y = 0, x = 0; y < lines.length; y += down, x += right) {
        if (getCharAt(lines[y], x) === '#') {
            trees++
        }
    }

    return trees
}

export function stage1() {
    let lines = parse(input)

    return slope(lines, 3, 1)
}

export function stage2() {
    let lines = parse(input)

    return [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]
        .map(([x, y]) => slope(lines, x, y))
        .reduce((a, b) => a * b)
}
