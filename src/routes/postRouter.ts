import { Router } from 'express'

import { postController } from '@/controllers'

const postRouter = Router()

postRouter.post('/create', postController.createPost)

export default postRouter
