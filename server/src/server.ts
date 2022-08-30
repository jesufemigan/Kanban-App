import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { connectDB } from './config/db';
import boardRoutes  from './routes/boardRoutes'
import taskRoutes  from './routes/taskRoutes'
import userRoutes from './routes/userRoutes'
import { errorHandler } from './middlewares/errorMiddleware';


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/boards', boardRoutes)
app.use('/api/boards/task', taskRoutes)
app.use('/api/user', userRoutes)

app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`App running on PORT ${PORT}`))
