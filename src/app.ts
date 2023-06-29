import express from 'express'
import cors from 'cors'

import { loadEnv } from '@/config/envs'

loadEnv()

const app = express()
app.use(cors())

export default app
