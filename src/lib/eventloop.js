const clone = require('lodash').clone

const eventloop = (commandsToExecute) => {
  const newCommands = clone(commandsToExecute)

  newCommands.forEach(commandObject => {
    const controlModule = require(`./interfaces/${commandObject.type}`)
    controlModule.runCommand(commandObject.command)
  })
  console.info('event')
}
module.exports = eventloop
