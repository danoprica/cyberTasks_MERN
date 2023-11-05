import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from "cors";
dotenv.config()
const port = process.env.PORT || 5000

connectDB

// cors

const app = express()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('API is running...')
})

//routes
app.use('/api/tasks', taskRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))