import { Router } from 'express'

import userController from '@/controllers/userController'
import validateSchema from '@/middlewares/validateSchemaMiddleware'
import { signUpSchema, signInSchema } from '@/schemas/userSchemas'

const userRouter = Router()

userRouter
  .post('/sign-up', validateSchema(signUpSchema), userController.signUp)
  .post('/sign-in', validateSchema(signInSchema), userController.signIn)

export default userRouter
