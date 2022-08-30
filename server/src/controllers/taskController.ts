import Board from "../models/boardModel";
import expressAsyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";

export const addTask = expressAsyncHandler(async (req: Request, res:Response) => {
  const { board_id } = req.params
  const { title, description, subtasks, status } = req.body

  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }

  const column = board?.columns.find(column => column.title === status)

  column?.tasks.push({ title, description, subtasks, status })

  const updatedBoard = await board.save()

  res.status(200).json(updatedBoard)
})

export const editTask = expressAsyncHandler(async (req:Request, res:Response) => {
  const { board_id } = req.params
  const { column_id, task_id, title, description, status, subtasks } = req.body

  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }

  const taskToUpdate = board.columns.find(column => column._id.toString() === column_id)!.tasks.find(task => task._id!.toString() === task_id)

  taskToUpdate!.title = title
  taskToUpdate!.description = description
  taskToUpdate!.status = status
  taskToUpdate!.subtasks = subtasks

  const updatedBoard = await board.save()

  res.status(200).json(updatedBoard)
})

export const deleteTask: RequestHandler = expressAsyncHandler(async (req: Request, res:Response) => {
  const { board_id } = req.params
  const { column_id, task_id } = req.body
  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }
  const columnToUpdate = board?.columns.find(column => column._id.toString() === column_id)

  const taskIndex = columnToUpdate!.tasks.findIndex(task => task._id!.toString() === task_id)

  columnToUpdate!.tasks!.splice(taskIndex, 1)

  const updatedBoard = await board.save()

  res.status(200).json(updatedBoard)
})