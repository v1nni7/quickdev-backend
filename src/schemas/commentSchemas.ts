import Joi from 'joi'
import { CreateCommentParams } from '@/interfaces'

export const createCommentSchema = Joi.object<CreateCommentParams>({
  description: Joi.string().required(),
})
