import jwt, { JwtPayload } from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'

import { Request, Response, NextFunction } from 'express'


export const protect = expressAsyncHandler(async (req:Request, res: Response, next:NextFunction) => {
  try {

    const token = req.headers.authorization?.split(' ')[1] as string
  
    if (!token) {
      res.status(401)
      throw new Error("Not authorized, no token sent")
    }
  
    const isCustomAuth = token.length < 500
  
    let decodedData;
  
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
      req.userId = decodedData?.id
    }
    else {
      decodedData = jwt.decode(token) as JwtPayload
      req.userId = decodedData?.sub
    }
    next()
  } catch {
    res.status(401)
    throw new Error("Not Authorized")
  }
})