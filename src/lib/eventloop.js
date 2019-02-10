const clone = require('lodash').clone

const eventloop = (commandsToExecute) => {
  const newCommands = clone(commandsToExecute)

  newCommands.forEach(({ controlModule, command }) => {
    const controller = require(`./controlModules/${controlModule}`)
    controller.runCommand(command)
  })
  console.info('event')
}
module.exports = eventloop
