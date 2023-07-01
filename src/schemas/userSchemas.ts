import Joi from 'joi'
import {
  SignInParams,
  CreateUserParams,
  UpdateUserParams,
} from '@/interfaces/userInterfaces'

export const signUpSchema = Joi.object<CreateUserParams>({
  name: Joi.string().max(100).required(),
  email: Joi.string().max(191).email().required(),
  password: Joi.string().required(),
})

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().max(191).email().required(),
  password: Joi.string().required(),
})

export const updateUserSchema = Joi.object<UpdateUserParams>({
  name: Joi.string().max(100),
  email: Joi.string().max(191).email(),
  password: Joi.string(),
})
