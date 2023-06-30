import { Post } from '@prisma/client'

export type CreatePostParams = Pick<Post, 'title' | 'description'>
