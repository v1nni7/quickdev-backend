import userController from '@/controllers/userController'
import { Router } from 'express'

const userRouter = Router()

userRouter
  .post('/sign-up', userController.signUp)
  .post('/sign-in', userController.signIn)

export default userRouter
