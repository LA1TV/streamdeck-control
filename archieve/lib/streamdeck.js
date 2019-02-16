const streamDeckApi = require('stream-deck-api-mazeppa')
// const { setup } = require('./helpers/stream-deck-helpers')

let layout = {}

const padEmptyButtons = config => {
  const newButtons = config.buttons
  while (newButtons.length < 15) {
    newButtons.push({ name: '' })
  }
  if (config.name !== 'root') {
    newButtons[14] = {
      name: 'Root',
      'controlModule': 'folder',
      'command': 'root'
    }
  }
  return newButtons
}

const loadFolder = (folder = 'atem') => {
  const config = require(`../config/streamdeck/${folder}`)

  return padEmptyButtons(config)
}

const streamDeckInterface = (commandsToExecute) => {
  const streamDeck = streamDeckApi.getStreamDeck()
  //   setup({})

  layout = loadFolder()
  console.log(layout)

  //   streamDeck.on('down', setup.keyPress)
  //   streamDeck.on('up', setup.keyRelease)
  streamDeck.on('error', console.log)
}

module.exports = streamDeckInterface
