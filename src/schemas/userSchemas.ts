import Joi from 'joi'
import { CreateUserParams, SignInParams } from '@/interfaces/userInterfaces'

export const signUpSchema = Joi.object<CreateUserParams>({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(191).email().required(),
  password: Joi.string().required(),
})

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().max(191).email().required(),
  password: Joi.string().required(),
})
