import asyncHandler from '../middleware/asyncHandler.js'
import Task from '../models/Task.js'

//@desc    Fetch all tasks
//@router  GET /api/tasks
//@access  Public
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({})
  res.json(tasks)
})


//@desc    Create a task
//@router  POST /api/tasks/:id
//@access  Public
const createTask = asyncHandler(async (req, res) => {
  const task = new Task ({
    text: req.body.text
  })
  const createdTask = await task.save()
  res.status(201).json(createdTask)
})

//@desc    Create a task
//@router  DELETE /api/tasks/:id
//@access  Public
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await Task.deleteOne({ _id: task._id })
    res.json({ message: 'Task removed'})
  } else {
    res.status(404)
    throw new Error('Task not found')
  }

})


export { getTasks, createTask }