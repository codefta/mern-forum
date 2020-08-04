const validationErrorMessage = (message) => {
  throw {
    name: 'ValidationError',
    message,
  }
}

module.exports = { validationErrorMessage }
