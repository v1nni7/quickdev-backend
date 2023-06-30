import { prisma } from '@/config/database'
import { CreatePostParams } from '@/interfaces/postInterfaces'

function getPosts() {
  return prisma.post.findMany()
}

function createPost(data: CreatePostParams) {
  return prisma.post.create({
    data,
  })
}

export default { getPosts, createPost }
