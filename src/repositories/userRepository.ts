import { prisma } from '@/config/database'
import { CreateUserParams } from '@/interfaces/userInterfaces'

function create(data: CreateUserParams) {
  return prisma.user.create({
    data,
  })
}

function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}

function findById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export default {
  create,
  findById,
  findByEmail,
}
