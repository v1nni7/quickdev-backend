import { prisma } from '@/config/database'
import { CreatePostParams, UpdatePostParams } from '@/interfaces/postInterfaces'

function createPost(data: CreatePostParams) {
  return prisma.post.create({
    data,
  })
}

function updatePost(data: UpdatePostParams, id: string) {
  return prisma.post.update({
    data,
    where: { id },
  })
}

function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
  })
}

function findPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
  })
}

function getPosts() {
  return prisma.post.findMany({
    include: {
      Comment: true,
    },
  })
}

export default { createPost, updatePost, deletePost, findPostById, getPosts }
