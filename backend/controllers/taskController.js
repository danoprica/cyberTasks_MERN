import asyncHandler from '../middleware/asyncHandler.js'
import Task from '../models/Task.js'


// @desc Get tasks
// @route GET /api/tasks
// @access Private
const getTasks = asyncHandler(async(req, res) => {
  const tasks = await Task.find()

  res.status(200).json(tasks)
})

// @desc Set task
// @route SET /api/task
// @access Private
const createTask = asyncHandler(async (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }
  const task = await Task.create({
    text: req.body.text
  })
  res.status(201).json(task)
})


// @desc Update task
// @route PUT /api/task
// @access Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if(!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true
    })

  res.status(200).json(updatedTask)
})

// @desc Delete task
// @route DELETE /api/task
// @access Private
const deleteTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)
  if(!task) {
    res.status(400)
    throw new Error('Task not found')
  }
  await task.deleteOne()

  res.status(200).json({ id: req.params.id })

})



export { getTasks, createTask, updateTask, deleteTask }