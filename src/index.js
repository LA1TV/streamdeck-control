const eventloop = require('./lib/eventloop')

const LOOP_TIMER = 1000 // Every second

const launchStreamdeck = () => {
    console.info('Launching streamdeck...')
    setInterval(() => eventloop(), LOOP_TIMER)
}

module.exports = launchStreamdeck