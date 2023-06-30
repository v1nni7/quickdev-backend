import { Router } from 'express'

import { postController } from '@/controllers'
import { validateSchema, validateToken } from '@/middlewares'
import { createPostSchema, updatePostSchema } from '@/schemas/postSchemas'

const postRouter = Router()

postRouter
  .all('*', validateToken)
  .get('/', postController.getPosts)
  .post('/', validateSchema(createPostSchema), postController.createPost)
  .put('/:postId', validateSchema(updatePostSchema), postController.updatePost)
  .delete('/:postId', postController.deletePost)

export default postRouter
