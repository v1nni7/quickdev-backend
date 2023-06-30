import { Router } from 'express'

import userRouter from './userRouter'
import postRouter from './postRouter'
import commentRouter from './commentRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)

export default router
