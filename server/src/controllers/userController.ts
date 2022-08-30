import { RequestHandler, Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import User from '../models/userModel';

export const userSignup: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const user = await User.findOne({email})

  if (user) {
    throw new Error("User already exists")
  }

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  })

  await newUser.save()

  res.status(200).json(newUser)
})

export const userSignin: RequestHandler = expressAsyncHandler(async (req:Request, res:Response) => {
  const { email, password } = req.body

  const user = await User.findOne({email})

  if (!user) {
    throw new Error("User does not exist")
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  if (isPasswordCorrect) {
    res.status(200).json(user)
  }
  else {
    res.statusCode = 400
    throw new Error("Incorrect Password")
  }
})