const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async') // Обёртка функции, чтобы постоянно не писать try,catch

const getAllTasks = asyncWrapper(async (req, res) => {
  //try { Закомментированны, т.к. будет реализовывать try catch, через middleware
  const tasks = await Task.find({})
  res.status(200).json({ tasks }) // Вывести всю коллекцию с task
  //res.status(200).json({ tasks, amount: tasks.length }) // Вывести всю коллекцию с task и кол-во tasks
  //res.status(200).json({ status: 'success', data: { tasks, nbHits: tasks.length } }) //Вывести флаг, что прошло успешно + коллекцию с task + кол-во tasks
  //} catch (error) {res.status(500).json({ msg: error })}
})

const createTask = asyncWrapper(async (req, res) => {
  // try { Закомментированны, т.к. будет реализовывать try catch, через middleware
  //const task = await Task.create({ name: 'first task' })
  const task = await Task.create(req.body)
  //res.json(req.body)
  res.status(201).json({ task })
  // } catch (error) {
  //   res.status(500).json({ msg: error })
  // }
})
const getTask = asyncWrapper(async (req, res) => {
  // try { Закомментированны, т.к. будет реализовывать try catch, через middleware
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }

  res.status(200).json({ task })
  // } catch (error) {
  //   res.status(500).json({ msg: error })
  // }
})

const deleteTask = asyncWrapper(async (req, res) => {
  // try { Закомментированны, т.к. будет реализовывать try catch, через middleware
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }
  res.status(200).json({ task })
  //res.status(200).send()
  //res.status(200).json({task:null, status: 'success'})
  // } catch (error) {
  //   res.status(500).json({ msg: error })
  // }
})

const updateTask = asyncWrapper(async (req, res) => {
  // try { Закомментированны, т.к. будет реализовывать try catch, через middleware
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: `No task with id: ${taskID}` })
  }

  res.status(200).json({ task })
  //res.status(200).json({ id: taskID, data: req.body }) Проверка обновляет ли вообще
  // } catch (error) {
  //   res.status(500).json({ msg: error })
  // }
})

const editTask = async (req, res) => {
  //Вторая версия редактирования task, через put, имхо более удобно
  try {
    const { id: taskID } = req.params

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      //overwrite: true, убирает все элементы не описанные в теле
    })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` })
    }

    res.status(200).json({ task })
    //res.status(200).json({ id: taskID, data: req.body }) Проверка обновляет ли вообще
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  //  editTask,
}
