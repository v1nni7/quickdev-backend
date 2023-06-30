import userController from '@/controllers/userController'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/sign-up', userController.signUp)

export default userRouter
