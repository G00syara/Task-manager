const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
// app.get('/', (req, res) => {
//   res.send('Task manager app')
// })

app.use('/api/v1/tasks', tasks)

app.use(notFound) //Проверка на нахождение страницы с таким URL
app.use(errorHandlerMiddleware) //Проверка на ошибки
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
