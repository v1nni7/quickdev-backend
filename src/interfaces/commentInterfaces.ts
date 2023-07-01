import { Comment } from '@prisma/client'

export type CreateCommentParams = Omit<Comment, 'id'>

export type UpdateCommentParams = Partial<CreateCommentParams>
