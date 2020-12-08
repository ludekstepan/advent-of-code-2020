import input from './input.txt'
import exampleInput from './example.txt'

import { notEmptyString } from '../utils'

function parse(file: string) {
    return file.split('\n').filter(notEmptyString)
}

export function example() {
    const r1 = /^(\w+\s\w+) bags contain((?: \d+ \w+\s\w+ bags?,?)+| no other bags)\.$/
    const r2 = /(\d+) (\w+\s\w+)/

    let list = parse(exampleInput).map((line) => {
        const [, outer, allInner] = line.match(r1) ?? []

        return [
            outer,
            allInner
                .split(',')
                .map((inner) => {
                    const [, count, name] = inner.match(r2) ?? []
                    return { count: Number(count), name }
                })
                .filter(({ count }) => count > 0),
        ] as const
    })

    const nodes: Map<string, Set<string>> = new Map()

    list.forEach(([outer, children]) => {
        if (!nodes.has(outer)) {
            nodes.set(outer, new Set())
        }

        let parent = nodes.get(outer)!

        children.forEach(({ name, count }) => {
            if (!nodes.has(name)) {
                nodes.set(name, new Set())
            }

            parent.add(name)
        })
    })

    function getAllParents(name: string) {
        let parents = Array.from(nodes.entries())
            .filter(([parent, children]) => children.has(name))
            .map(([parent]) => parent)

        return [...parents, ...parents.flatMap((parent) => getAllParents(parent))]
    }

    let shiny = getAllParents('shiny gold')

    let uniqueParents = new Set(shiny)

    return uniqueParents.size
}

export function stage1() {
    const r1 = /^(\w+\s\w+) bags contain((?: \d+ \w+\s\w+ bags?,?)+| no other bags)\.$/
    const r2 = /(\d+) (\w+\s\w+)/

    let list = parse(input).map((line) => {
        const [, outer, allInner] = line.match(r1) ?? []

        return [
            outer,
            allInner
                .split(',')
                .map((inner) => {
                    const [, count, name] = inner.match(r2) ?? []
                    return { count: Number(count), name }
                })
                .filter(({ count }) => count > 0),
        ] as const
    })

    const nodes: Map<string, Set<string>> = new Map()

    list.forEach(([outer, children]) => {
        if (!nodes.has(outer)) {
            nodes.set(outer, new Set())
        }

        let parent = nodes.get(outer)!

        children.forEach(({ name, count }) => {
            if (!nodes.has(name)) {
                nodes.set(name, new Set())
            }

            parent.add(name)
        })
    })

    function getAllParents(name: string) {
        let parents = Array.from(nodes.entries())
            .filter(([parent, children]) => children.has(name))
            .map(([parent]) => parent)

        return [...parents, ...parents.flatMap((parent) => getAllParents(parent))]
    }

    let shiny = getAllParents('shiny gold')

    let uniqueParents = new Set(shiny)

    return uniqueParents.size
}

export function stage2() {
    const r1 = /^(\w+\s\w+) bags contain((?: \d+ \w+\s\w+ bags?,?)+| no other bags)\.$/
    const r2 = /(\d+) (\w+\s\w+)/

    let list = parse(input).map((line) => {
        const [, outer, allInner] = line.match(r1) ?? []

        return [
            outer,
            allInner
                .split(',')
                .map((inner) => {
                    const [, count, name] = inner.match(r2) ?? []
                    return { count: Number(count), name }
                })
                .filter(({ count }) => count > 0),
        ] as const
    })

    const nodes: Map<string, Set<{ name: string; count: number }>> = new Map()

    list.forEach(([outer, children]) => {
        if (!nodes.has(outer)) {
            nodes.set(outer, new Set())
        }

        let parent = nodes.get(outer)!

        children.forEach(({ name, count }) => {
            if (!nodes.has(name)) {
                nodes.set(name, new Set())
            }

            parent.add({ name, count })
        })
    })

    function getAllChildren(name: string) {
        let children = nodes.get(name)!

        return (
            1 +
            Array.from(children.values())
                .map(({ count, name }) => count * getAllChildren(name))
                .reduce((a, b) => a + b, 0)
        )
    }

    return getAllChildren('shiny gold') - 1
}
