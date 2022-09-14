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
  // board.save()
  await board.save()
  const allBoard = await Board.find({userId: req.userId})
  res.status(200).json(allBoard)
})

export const editTask = expressAsyncHandler(async (req:Request, res:Response) => {
  const { board_id } = req.params
  const { task_id, title, description, status, subtasks } = req.body

  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }

  const taskToUpdate = board.columns.find(column => column.title === status)!.tasks.find(task => task._id!.toString() === task_id)

  taskToUpdate!.title = title
  taskToUpdate!.description = description
  taskToUpdate!.status = status
  taskToUpdate!.subtasks = subtasks

  await board.save()
  const allBoard = await Board.find({ userId: req.userId })

  res.status(200).json(allBoard)
})

export const updateSubTask: RequestHandler = expressAsyncHandler(async (req:Request, res:Response) => {
  const { board_id } = req.params
  const { status, taskId, subId } = req.body
  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }
  
  const subTaskToUpdate = board.columns.find(column => column.title === status)?.tasks.find(task => task._id?.toString() === taskId)?.subtasks.find(sub => sub._id.toString() === subId)
  
  subTaskToUpdate!.isCompleted = !subTaskToUpdate?.isCompleted

  await board.save()

  const allBoard = await Board.find({userId: req.userId})

  res.status(200).json(allBoard)
})

export const deleteTask: RequestHandler = expressAsyncHandler(async (req: Request, res:Response) => {
  const { board_id } = req.params
  const { status, task_id } = req.body
  const board = await Board.findById(board_id)

  if (!board) {
    throw new Error("Board does not exist")
  }
  const columnToUpdate = board.columns.find(column => column.title === status)

  const taskIndex = columnToUpdate!.tasks.findIndex(task => task._id!.toString() === task_id)

  columnToUpdate!.tasks!.splice(taskIndex, 1)

  await board.save()
  const allBoard = await Board.find({userId:req.userId})

  res.status(200).json(allBoard)
})