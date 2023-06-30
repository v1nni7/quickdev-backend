import { Post } from '@prisma/client'

export type CreatePostParams = Pick<Post, 'title' | 'description' | 'userId'>

export type UpdatePostParams = Partial<CreatePostParams>
