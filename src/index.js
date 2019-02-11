const eventloop = require('./lib/eventloop')
const streamdeck = require('./lib/streamdeck')

const LOOP_TIMER = 1000 // Every second
const commandsToExecute = []

const launchStreamdeck = () => {
  console.info('Launching streamdeck...')
  streamdeck(commandsToExecute)
  // setInterval(() => eventloop(commandsToExecute), LOOP_TIMER)
}

module.exports = launchStreamdeck
