import dotenv from 'dotenv'
dotenv.config()
import express, { Response, Request } from 'express'
import { connectDB } from './config/db';
import boardRoutes  from './routes/boardRoutes'
import taskRoutes  from './routes/taskRoutes'
import userRoutes from './routes/userRoutes'
import { errorHandler } from './middlewares/errorMiddleware';
import cors from 'cors'
import path from 'path';

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/boards/task', taskRoutes)

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')))

  app.get('*', (req:Request, res:Response) => res.sendFile(path.resolve(__dirname, '../../', 'client', 'build', 'index.html')))
}
else {
  app.get('/', (req:Request, res:Response) => res.send('Please set to production'))
}

app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`App running on PORT ${PORT}`))
