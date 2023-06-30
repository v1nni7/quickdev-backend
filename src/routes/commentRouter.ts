import commentController from '@/controllers/commentController'
import { validateSchema, validateToken } from '@/middlewares'
import { createCommentSchema } from '@/schemas/commentSchemas'
import { Router } from 'express'

const commentRouter = Router()

commentRouter
  .all('*', validateToken)
  .get('/:postId', commentController.getComments)
  .post(
    '/create/:postId',
    validateSchema(createCommentSchema),
    commentController.createComment,
  )

export default commentRouter
