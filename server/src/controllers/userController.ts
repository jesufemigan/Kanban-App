import { RequestHandler, Response, Request } from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/userModel';

export const userSignup: RequestHandler = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  const user = await User.findOne({email})

  if (user) {
    res.status(404)
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

  res.status(200).json({
    name: newUser.name,
    email: newUser.email,
    token: generateToken(newUser.email, newUser.id)
  })
})

export const userSignin: RequestHandler = expressAsyncHandler(async (req:Request, res:Response) => {
  const { email, password } = req.body

  const user = await User.findOne({email})

  if (!user) {
    res.status(404)
    throw new Error("User does not exist")
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password)

  if (isPasswordCorrect) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      token: generateToken(email, user.id)
    })
  }
  else {
    res.status(400)
    throw new Error("Incorrect Password")
  }
})

const generateToken = (email: string, id: string) => {
  return jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}