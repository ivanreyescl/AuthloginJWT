import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRoutes from './routes/user.routes.js'
import logger from './middlewares/logger.js'


const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger);

app.use(userRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} up`)
})
