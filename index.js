#!/usr/bin/env node

const path = require('path')

const reg = (str) =>
  new RegExp(str.replace(/\\+/g, '/'), 'mg')

const redact = async () => {
  for await (const i of process.stdin) {
    const [
      word = path.dirname(process.cwd()),
      replacement = '<path>'
    ] = process.argv.slice(2)
    const redactRegex = reg(word)
    const nodeRegex = reg(process.execPath)
    const homeRegex = process.env.HOME && reg(process.env.HOME)

    // note that order of replacement matter
    process.stdout.write(
      String(i)
        .replace(/\\+/g, '/')
        .replace(nodeRegex, 'node')
        .replace(redactRegex, replacement)
        .replace(homeRegex, process.env.HOME && '$HOME')
    )
  }
}

redact()
