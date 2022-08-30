import { Router } from 'express'
import { addTask, deleteTask, editTask } from '../controllers/taskController'

const taskRoutes = Router()

taskRoutes.route('/:board_id').post(addTask).patch(editTask).delete(deleteTask)


export default taskRoutes