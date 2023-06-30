import express, { json } from 'express'
import cors from 'cors'

import { loadEnv } from '@/config/envs'
import router from './routes'

loadEnv()

const app = express()
app.use(cors())
app.use(json())

app.use(router)

export default app
