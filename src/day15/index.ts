const example = [0, 3, 6]
const input = [0, 13, 1, 16, 6, 17]

type Mem = [before: number | undefined, last: number]

export function run(file: number[], limit: number) {
    let mem = new Map<number, Mem>()
    let spoken: number = 0

    let turn = 1

    function say(num: number) {
        let result: number = 0

        let entry = mem.get(num)

        if (!entry) {
            // first time
            mem.set(num, [undefined, turn])
        } else {
            const [before, last] = entry

            if (before != undefined) {
                result = last - before
            }
        }

        let memResult = mem.get(result)

        if (!memResult) {
            mem.set(result, [undefined, turn])
        } else {
            const [, before] = memResult
            mem.set(result, [before, turn])
        }

        return result
    }

    for (; turn <= file.length; turn++) {
        mem.set(file[turn - 1], [undefined, turn])
    }

    for (; turn <= limit; turn++) {
        spoken = say(spoken)
    }

    return spoken
}

export function example1() {
    return run(example, 2020)
}

export function stage1() {
    return run(input, 2020)
}

export function example2() {
    return run(example, 30000000)
}

export function stage2() {
    return run(input, 30000000)
}
