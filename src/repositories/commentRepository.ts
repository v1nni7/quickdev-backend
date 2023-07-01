import { prisma } from '@/config/database'
import { CreateCommentParams, UpdateCommentParams } from '@/interfaces'

function createComment(data: CreateCommentParams) {
  return prisma.comment.create({
    data,
  })
}

function updateComment(data: UpdateCommentParams, id: string) {
  return prisma.comment.update({
    data,
    where: { id },
  })
}

function deleteComment(id: string) {
  return prisma.comment.delete({
    where: { id },
  })
}

function findById(id: string) {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      Post: true,
    },
  })
}

function findByPostId(postId: string) {
  return prisma.comment.findMany({
    where: {
      postId,
    },
  })
}

function getComments() {
  return prisma.comment.findMany()
}

export default {
  createComment,
  updateComment,
  deleteComment,
  findById,
  findByPostId,
  getComments,
}
