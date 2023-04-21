const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
  //return res.status(500).json({ msg: err }) //Чтобы не выводить большой массив текста с ошибкой
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'something went wrong, please try again' })
  //return res.status(err.status).json({ msg: err.message }) Не нужна в связи с folder errors
}

module.exports = errorHandlerMiddleware
