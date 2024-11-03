import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rawJson = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').trim()
const json = JSON.parse(rawJson)

const bonanza = (data) => {
  if (typeof data === 'number') {
    return data
  }

  if (Array.isArray(data)) {
    return data.reduce((acc, value) => {
      return acc + bonanza(value)
    }, 0)
  }

  if (typeof data !== 'object' || Object.values(data).includes('red')) {
    return 0
  }

  return bonanza(values)
}

console.log(bonanza(json))