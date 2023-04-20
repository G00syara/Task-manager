const mongoose = require('mongoose')

//const ConnectionString =
// 'mongodb+srv://Goose:TJeCZyOkUGY7JvGJ@nodeexpressprojects.qmtc8ze.mongodb.net/TaskManager'

const connectDB = (url) => {
  return mongoose.set('strictQuery', false).connect(url, {})
}

module.exports = connectDB

// mongoose
//   .set("strictQuery", false);
//   .connect(ConnectionString)
//   .then(() => console.log('Connected to the DB...'))
//   .catch((err) => console.log(err))
