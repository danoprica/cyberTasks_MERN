import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import taskRoutes from './routes/taskRoutes.js'
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
dotenv.config()

const port = process.env.PORT || 5000

connectDB

// cors

const app = express()

app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(express.urlencoded({extended: false}))



//routes
app.use('/api/tasks', taskRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`))