module.exports = {
  get: jest.fn(() => Promise.resolve({ data: ['mock1', 'mock2', 'mock3'] }))
}
