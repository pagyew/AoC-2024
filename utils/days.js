const { existsSync, mkdirSync, readdirSync } = require('node:fs')

exports.getLastDay = function() {
  if (!existsSync('days')) {
    mkdirSync(`days`)
    console.log(`days folder created`);
  }

  return readdirSync('days', { withFileTypes: true })
    .filter(f => f.isDirectory() && isFinite(f.name))
    .map(f => +f.name)
    .sort((a, b) => b - a)
    [0]
}
