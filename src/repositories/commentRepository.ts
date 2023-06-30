import { prisma } from '@/config/database'
import {
  CreateCommentParams,
  UpdateCommentParams,
} from '@/interfaces/commentInterface'

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

function findCommentById(id: string) {
  return prisma.comment.findUnique({
    where: { id },
  })
}

function updateComment(data: UpdateCommentParams, id: string) {
  return prisma.comment.update({
    data,
    where: { id },
  })
}

export default {
  create,
  getComments,
  findCommentsByPostId,
  findCommentById,
  updateComment,
}
