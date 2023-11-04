import express from 'express'
const router = express.Router()
import { getTasks} from '../controllers/taskController.js'

router.route('/').get(getTasks)


export default router