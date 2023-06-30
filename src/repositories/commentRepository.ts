import { prisma } from '@/config/database'
import { CreateCommentParams } from '@/interfaces/commentInterface'

function create(data: CreateCommentParams) {
  return prisma.comment.create({
    data,
  })
}

export default { create }
