import { Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from 'express'

export const errorHandler: ErrorRequestHandler = (err: any, 
                                req: Request, 
                                res: Response, 
                                next: NextFunction) => {
  
                                                                
  res.statusCode ? res.statusCode : 500

  res.json({
    message: err.message,
    stack: err.stack
  })
}