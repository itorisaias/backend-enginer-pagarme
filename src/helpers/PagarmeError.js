class PagarmeError extends Error {
  constructor ({ message, status, type, error } = {}) {
    super()
    this.name = 'PagarmeError'
    this.message = message
    this.status = status
    this.type = type
    this.error = error
  }
}

module.exports = PagarmeError
