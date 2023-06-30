import { prisma } from '@/config/database'
import { CreatePostParams } from '@/interfaces/postInterfaces'

function createPost(data: CreatePostParams) {
  return prisma.post.create({
    data,
  })
}

export default { createPost }
