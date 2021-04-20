const { equal } = require('assert')
const { execSync } = require('child_process')
const cwd = __dirname.replace(/\\+/g, '/')

// custom redact + replacement
{
  const opts = {
    input: 'foo bar baz'
  }
  const res = execSync('node index.js bar lorem', opts).toString()
  equal(
    res,
    'foo lorem baz',
    'should replace custom redact word with replacement'
  )
}

// custom redact
{
  const opts = {
    input: `foo ${cwd} baz`
  }
  const res = execSync(`node index.js ${cwd}`, opts).toString()
  equal(
    res,
    'foo <path> baz',
    'should replace custom redact word with default replacement'
  )
}

// default
{
  const opts = {
    input: `foo ${cwd} baz`
  }
  const res = execSync('node index.js', opts).toString()
  equal(
    res,
    'foo <path>/redact baz',
    'should replace custom redact word with default replacement'
  )
}

// default, multiple lines
{
  const opts = {
    input: `foo ${cwd}
baz
${cwd}
lorem ${cwd} ipsum`
  }
  const res = execSync('node index.js', opts).toString()
  equal(
    res,
    `foo <path>/redact
baz
<path>/redact
lorem <path>/redact ipsum`,
    'should replace multiple occurences of redacted word in many lines'
  )
}

// HOME env and node execPath
{
  const opts = {
    input: `foo ${cwd}
${process.execPath} something
baz
${cwd}
lorem ${cwd} ipsum
HOMEPATH`,
    env: {
      ...process.env,
      HOME: 'HOMEPATH'
    }
  }
  const res = execSync('node index.js', opts).toString()
  equal(
    res,
    `foo <path>/redact
node something
baz
<path>/redact
lorem <path>/redact ipsum
$HOME`,
    'should replace node and HOME env var occurences'
  )
}
