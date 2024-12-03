const { argv } = require('node:process')
const { execSync, spawnSync } = require('node:child_process')

const type = argv[2]
const commands = ['next', 'last']

if (!commands.includes(type)) {
  console.error(`Invalid command: ${type}`)
  process.exit(1)
}

const command = spawnSync('node', ['--env-file=.env', './utils/inputs.js', type])
const result = command.stdout.toString().trim().split('\n')
const solveFile = result.pop()

console.log(result.join('\n'));

execSync(`code ${solveFile}`)

console.log(`${solveFile} opened`);
