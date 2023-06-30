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

export default {
  create,
  findByEmail,
}
