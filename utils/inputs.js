const { argv } = require('node:process')
const { writeFileSync, copyFileSync, mkdirSync, existsSync } = require('node:fs')

const { getLastDay } = require('./days')

const type = argv[2]
const lastDay = getLastDay() ?? 0
const day = type === 'next' ? (lastDay + 1) : (lastDay || 1)
const pday = String(day).padStart(2, 0)

const inputFile = `days/${pday}/${pday}.txt`
const scriptFile = `days/${pday}/index.js`
const solveFile = `days/${pday}/solve.js`
const wrapperTemplateFile = `utils/wrapper-template.js`
const solveTemplateFile = `utils/solve-template.js`

const {AOC_SESSION, AOC_YEAR} = process.env
const cookie = `session=${AOC_SESSION}`

  ; (async () => {
    const res = await fetch(`https://adventofcode.com/${AOC_YEAR}/day/${day}/input`, { headers: { cookie } })
    const input = await res.text()
    
    if (existsSync(pday)) {
      console.log(`${pday} folder already exists`);
    } else {
      mkdirSync(`days/${pday}`)
      console.log(`${pday} folder created`);
    }

    if (existsSync(inputFile)) {
      console.log(`${pday}.txt already written`);
    } else {
      writeFileSync(inputFile, input)
      console.log(`${pday}.txt written`);
    }

    if (existsSync(scriptFile)) {
      console.log(`index.js already copied`);
    } else {
      copyFileSync(wrapperTemplateFile, scriptFile)
      console.log(`index.js copied`);
    }

    if (existsSync(solveFile)) {
      console.log(`solve.js already copied`);
    } else {
      copyFileSync(solveTemplateFile, solveFile)
      console.log(`solve.js copied`);
    }

    console.log(solveFile)
  })();
