class CustomAPIError extends Error {
  //Кастомная ошибка
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

//new CustomAPIError() Можно создать новые экземпляры
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode)
}

module.exports = { createCustomError, CustomAPIError }
