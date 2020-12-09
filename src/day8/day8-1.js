'use strict'
const fs = require('fs')

const getFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, function (err, data) {
      if (err) {
        reject(err.stack)
      }
      resolve(data.toString().split('\n').filter(n => n))
    })
  })
}

class Computer {
  constructor () {
    this.acc = 0
    this.executedLines = []
  }

  execute (instruction, number) {
    if (this.executedLines.includes(number)) {
      console.log('Loop detected!')
      return -1
    }
    const [operation, argument] = instruction.split(' ')
    this.executedLines.push(number)
    switch (operation) {
      case 'nop':
        return number + 1
      case 'acc':
        this.modifyAcc(parseInt(argument))
        return number + 1
      case 'jmp':
        return number + parseInt(argument)
      default:
        console.log(`[${number}] Unknown instruction`)
        return -1
    }
  }

  modifyAcc (amount) {
    this.acc += amount
  }

  getAcc () {
    return this.acc
  }
}

async function runProgram () {
  try {
    const handheld = new Computer()
    const program = await getFile('input.txt')
    let nextLine = 0
    while (nextLine >= 0 & nextLine < program.length) {
      nextLine = handheld.execute(program[nextLine], nextLine)
    }
    console.log(handheld.getAcc())
  } catch (err) {
    console.log(err)
  }
}

runProgram()
