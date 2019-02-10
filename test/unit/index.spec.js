const index = require('../../src/index')

console.info = jest.fn()

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

describe('index', () => {
  beforeEach(() => {
    console.info.mockClear()
  })

  it('should output a starting command to the console', () => {
    index()
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith('Launching streamdeck...')
  })

  it('should launch the eventloop', async () => {
    index()
    await delay(2000)
    expect(console.info).toHaveBeenCalledTimes(3)
    expect(console.info).toHaveBeenCalledWith('event')
  })
})
