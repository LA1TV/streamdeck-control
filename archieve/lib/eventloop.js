const clone = require('lodash').clone
const controlModules = require('./controlModules')

const eventloop = (commandsToExecute) => {
  const newCommands = clone(commandsToExecute)

  newCommands.forEach(({ controlModule, command }) => {
    controlModules[controlModule].runCommand(command)
  })
  console.info('event')
}
module.exports = eventloop
