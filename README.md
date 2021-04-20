# redact

[![npm version](https://img.shields.io/npm/v/@ruyadorno/redact.svg)](https://www.npmjs.com/@ruyadorno/redact)
[![License](https://img.shields.io/github/license/ruyadorno/redact)](https://github.com/ruyadorno/redact/blob/master/LICENSE)
[![GitHub Actions](https://github.com/ruyadorno/redact/workflows/node-ci/badge.svg)](https://github.com/ruyadorno/redact/actions?query=workflow%3Anode-ci)

Small cli util that redacts path refs from stdin.

It will also clean up:

- References to **node** executable path will be replaced with `node`
- Any `$HOME` env variable will be replaced with a literal string
- Normalize paths (windows `\\` will be replaced with `/`)

It can also be used with positional arguments to customize what word should be
redact and what should be the replacement text by default.

## Usage

You may install this package in the global system space and pipe any output
into `redact` for cleaned up output:

```sh
$ npm install -g @ruyadorno/redact
$ my_cmd | redact
```

OR alternatively, install+run on demand using `npm exec`:

```sh
$ my_cmd | npm exec @ruyadorno/redact
```

### Customizing

You may also customize what word to be redacted and define a new replacement
by providing additional positional arguments to `redact`, e.g:

```sh
$ my_cmd
Foo bar baz
$ my_cmd | redact bar REDACTED
Foo REDACTED baz
```

> Note: this might or might not be simpler than trying to remember `sed`'s syntax

## Example

Cleaning up your system path from **npm** logs so that you can better share
them with the world:

```sh
$ npm i 2>&1 --loglevel=verbose | redact

npm verb cli [
npm verb cli   'node',
npm verb cli   '<path>/main',
npm verb cli   'i',
npm verb cli   '--loglevel=verbose'
npm verb cli ]
npm info using npm@7.10.0
npm info using node@v16.0.0
...
npm timing command:install Completed in 0ms
npm verb stack TypeError: Cannot read property 'bar' of undefined
npm verb stack     at Install.install (<path>/main/lib/install.js:113:40)
npm verb stack     at Install.exec (<path>/main/lib/install.js:108:10)
npm verb stack     at Object.[_runCmd] (<path>/main/lib/npm.js:116:12)
npm verb stack     at <path>/main/lib/npm.js:28:35
npm verb stack     at Object.<anonymous> (<path>/main/lib/cli.js:61:7)
npm verb cwd <path>/main
npm verb Darwin 19.6.0
npm verb argv "node" "<path>/main" "i" "--loglevel=verbose"
npm verb node v16.0.0
npm verb npm  v7.10.0
npm ERR! Cannot read property 'bar' of undefined
npm verb exit 1
npm timing npm Completed in 198ms
npm verb code 1

npm ERR! A complete log of this run can be found in:
npm ERR!     $HOME/.npm/_logs/2021-04-20T20_06_13_794Z-debug.log
```

## License

MIT
