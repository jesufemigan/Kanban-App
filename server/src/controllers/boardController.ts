import { Request, Response, RequestHandler } from 'express'
import expressAsyncHandler from 'express-async-handler'
import Board from '../models/boardModel';


export const getAllBoard: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
  const board = await Board.find()
  res.json(board)
})

export const addNewBoard: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
  const { title, columns } = req.body
  const newBoard = new Board({
    title,
    columns
  })
  await newBoard.save()

  res.json(newBoard)
})

export const editBoard: RequestHandler = expressAsyncHandler(async (req: Request, res:Response) => {
  const { board_id } = req.params
  const { title, columns } = req.body

  const board = await Board.findByIdAndUpdate(board_id, { title, columns }, { new: true })

  res.status(200).json(board)
})

export const deleteBoard: RequestHandler = expressAsyncHandler(async (req:Request, res:Response) => {
  const { id } = req.params

  await Board.findByIdAndDelete(id)

  res.json({ message: "Board delete successfully" })

})
