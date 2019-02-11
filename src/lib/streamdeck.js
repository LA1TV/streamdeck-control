const streamDeckApi = require('stream-deck-api-mazeppa')
const { setup } = require('./helpers/stream-deck-helpers')

const loadFolder = (folder = 'root') => {
  return require(`../config/streamdeck/${folder}`)
}

const streamDeckInterface = (commandsToExecute) => {
  const streamDeck = streamDeckApi.getStreamDeck()
  setup({})

  loadFolder()

  streamDeck.on('down', setup.keyPress)
  streamDeck.on('up', setup.keyRelease)
  streamDeck.on('error', setup.error)
}

module.exports = streamDeckInterface
