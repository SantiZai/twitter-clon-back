import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import uRoutes from './routes/users.routes'
import pRoutes from './routes/posts.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/users', uRoutes)
app.use('/api/posts', pRoutes)

app.use((req, res, next) => {
	res.status(404).json({ message: 'Endpoint not found' })
})

export default app