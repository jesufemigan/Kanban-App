import { Router } from 'express'
import { addTask, deleteTask, editTask } from '../controllers/taskController'
import { protect } from '../middlewares/authMiddleware'
const taskRoutes = Router()

taskRoutes.route('/:board_id').post(protect,addTask).patch(protect,editTask).delete(protect,deleteTask)


export default taskRoutes