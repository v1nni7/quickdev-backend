import { Router } from 'express'

import userRouter from './userRouter'
import postRouter from './postRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)

export default router
