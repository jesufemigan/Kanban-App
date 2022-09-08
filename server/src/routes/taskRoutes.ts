import { Router } from 'express'
import { addTask, deleteTask, editTask, updateSubTask } from '../controllers/taskController'
import { protect } from '../middlewares/authMiddleware'
const taskRoutes = Router()

taskRoutes.route('/:board_id').post(protect,addTask).patch(protect,editTask)
taskRoutes.route('/:board_id/deleteTask').patch(protect, deleteTask)
taskRoutes.route('/:board_id/subtask').patch(protect, updateSubTask)


export default taskRoutes