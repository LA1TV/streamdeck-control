const eventloop = require('./lib/eventloop')

const LOOP_TIMER = 1000 // Every second
const commandsToExecute = []

const launchStreamdeck = () => {
  console.info('Launching streamdeck...')
  setInterval(() => eventloop(commandsToExecute), LOOP_TIMER)
}

module.exports = launchStreamdeck
