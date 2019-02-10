const eventloop = require('../../../src/lib/eventloop')

console.info = jest.fn()

describe('index', () => {
  beforeEach(() => {
    console.info.mockClear()
  })

  it('should output a starting command to the console', () => {
    eventloop()
    expect(console.info).toHaveBeenCalledTimes(1)
    expect(console.info).toHaveBeenCalledWith('event')
  })
})
