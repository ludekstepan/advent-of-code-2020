import input from './input.txt'

function parse(file: string) {
    let lines = file.split('\n\n').map((passport) =>
        passport
            .split('\n')
            .filter((line) => line !== '')
            .flatMap((line) => line.split(' ').map((entry) => entry.split(':')))
    )
    return lines
}

function inRange(value: any, min: number, max: number) {
    let numeric = Number(value)
    return numeric >= min && numeric <= max
}

const validate: {
    [field: string]: (value: string) => boolean
} = {
    byr: (value) => {
        return /^[1-2][0-9]{3}$/.test(value) && inRange(value, 1920, 2002)
    },
    iyr: (value) => {
        return /^[2][0-9]{3}$/.test(value) && inRange(value, 2010, 2020)
    },
    eyr: (value) => {
        return /^[2][0-9]{3}$/.test(value) && inRange(value, 2020, 2030)
    },
    hgt: (value) => {
        const [, digits, unit] = value.match(/^([1-9][0-9]{1,2})(in|cm)$/) ?? []

        return (unit === 'cm' && inRange(digits, 150, 193)) || (unit === 'in' && inRange(digits, 59, 76))
    },
    hcl: (value) => {
        return /^#[0-9a-f]{6}$/.test(value)
    },
    ecl: (value) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
    },
    pid: (value) => {
        return /^[0-9a-f]{9}$/.test(value)
    },
}

export function stage1() {
    const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    let lines = parse(input).filter((entries) =>
        required.every((search) => entries.some(([field, value]) => field === search))
    )

    return lines.length
}

export function stage2() {
    const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

    let lines = parse(input).filter((entries) =>
        required.every((search) =>
            entries.some(([field, value]) => {
                if (field !== search) {
                    return false
                }

                return validate[field](value)
            })
        )
    )

    return lines.length
}
