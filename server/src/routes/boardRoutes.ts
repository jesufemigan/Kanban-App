import { Router } from "express";
import { getAllBoard, addNewBoard, editBoard, deleteBoard } from "../controllers/boardController";
import { protect } from "../middlewares/authMiddleware";

const boardRoutes = Router()

boardRoutes.route('/').get(protect, getAllBoard)
boardRoutes.route('/').post(protect, addNewBoard)
boardRoutes.route('/:board_id').delete(protect, deleteBoard).patch(protect, editBoard)

export default boardRoutes