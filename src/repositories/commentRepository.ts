import { prisma } from '@/config/database'
import { CreateCommentParams } from '@/interfaces/commentInterface'

function create(data: CreateCommentParams) {
  return prisma.comment.create({
    data,
  })
}

function getComments() {
  return prisma.comment.findMany()
}

function findCommentsByPostId(postId: string) {
  return prisma.comment.findMany({
    where: {
      postId,
    },
  })
}

export default { create, getComments, findCommentsByPostId }
