const index = require('../../src/index')
const delay = require('../helpers/delay')

console.info = jest.fn()

describe('index', () => {
  beforeEach(() => {
    console.info.mockClear()
  })

  it.skip('should output a starting command to the console', () => {
    index()
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith('Launching streamdeck...')
  })

  it.skip('should launch the eventloop', async () => {
    index()
    await delay(1000)
    expect(console.info).toHaveBeenCalledWith('event')
  })
})
