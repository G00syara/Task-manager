const express = require('express') //Библиотека, для загрузки файлов и модулей
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public')) //Соединяет Бэк с Фронтом
app.use(express.json()) //use промежуточное ПО

//routes
// app.get('/', (req, res) => {
//   res.send('Task manager app')
// })

app.use('/api/v1/tasks', tasks)

app.use(notFound) //Выводит ошибку если искать страницы после :3000, т.е. :3000/dasd
app.use(errorHandlerMiddleware) //Проверка на ошибки
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening port ${port}...`)) //Привязки и прослушки на указанном соеденений или порту
  } catch (error) {
    console.log(error)
  }
}

start()
