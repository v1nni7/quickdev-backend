import { CreatePostParams, UpdatePostParams } from '@/interfaces/postInterfaces'
import Joi from 'joi'

export const createPostSchema = Joi.object<CreatePostParams>({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(191).required(),
})

export const updatePostSchema = Joi.object<UpdatePostParams>({
  title: Joi.string().max(100),
  description: Joi.string().max(191),
})
