import { Router } from "express";
import { getAllBoard, addNewBoard, editBoard, deleteBoard } from "../controllers/boardController";

const boardRoutes = Router()

boardRoutes.route('/').get(getAllBoard)
boardRoutes.route('/').post(addNewBoard)
boardRoutes.route('/:board_id').delete(deleteBoard).patch(editBoard)

export default boardRoutes