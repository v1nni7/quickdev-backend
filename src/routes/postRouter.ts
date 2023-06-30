import { Router } from 'express'

import { postController } from '@/controllers'
import { validateSchema, validateToken } from '@/middlewares'
import { createPostSchema } from '@/schemas/postSchemas'

const postRouter = Router()

postRouter
  .all('*', validateToken)
  .get('/', postController.getPosts)
  .post('/create', validateSchema(createPostSchema), postController.createPost)
  .put('/update/:id')

export default postRouter
