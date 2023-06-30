import { Router } from 'express'

import { postController } from '@/controllers'
import { validateToken } from '@/middlewares'

const postRouter = Router()

postRouter.post('/create', validateToken, postController.createPost)

export default postRouter
