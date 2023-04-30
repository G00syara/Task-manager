const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask) //Удобные массив маршрутов, которые используются
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
//.put(editTask)

module.exports = router
