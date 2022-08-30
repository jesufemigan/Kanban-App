import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, 
                                req: Request, 
                                res: Response, 
                                next: NextFunction) => {
  
                                                                
  res.statusCode ? res.statusCode : 500

  res.json({
    message: err.message,
    stack: err.stack
  })
}