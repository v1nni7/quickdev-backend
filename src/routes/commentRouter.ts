import commentController from '@/controllers/commentController'
import { validateSchema, validateToken } from '@/middlewares'
import { createCommentSchema } from '@/schemas/commentSchemas'
import { Router } from 'express'

const commentRouter = Router()

commentRouter
  .all('*', validateToken)
  .get('/:postId', commentController.getComments)
  .post(
    '/:postId',
    validateSchema(createCommentSchema),
    commentController.createComment,
  )
  .put(
    '/:commentId',
    validateSchema(createCommentSchema),
    commentController.updateComment,
  )
  .delete('/:commentId', commentController.deleteComment)

export default commentRouter
