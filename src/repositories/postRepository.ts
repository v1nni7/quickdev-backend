import { prisma } from '@/config/database'
import { CreatePostParams, UpdatePostParams } from '@/interfaces/postInterfaces'

function getPosts() {
  return prisma.post.findMany({
    include: {
      Comment: true,
    },
  })
}

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

function findPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
  })
}

function deletePost(id: string) {
  return prisma.post.delete({
    where: { id },
  })
}

export default { getPosts, createPost, updatePost, findPostById, deletePost }