import { Router } from 'express'

import { userController } from '@/controllers'
import { validateSchema, validateToken } from '@/middlewares'
import {
  signUpSchema,
  signInSchema,
  updateUserSchema,
} from '@/schemas/userSchemas'

const userRouter = Router()

userRouter
  .get('/:userId', validateToken, userController.getUser)
  .put(
    '/',
    validateToken,
    validateSchema(updateUserSchema),
    userController.updateUser,
  )
  .delete('/', validateToken, userController.deleteUser)
  .post('/sign-up', validateSchema(signUpSchema), userController.signUp)
  .post('/sign-in', validateSchema(signInSchema), userController.signIn)

export default userRouter
