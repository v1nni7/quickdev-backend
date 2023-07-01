import { prisma } from '@/config/database'
import { CreateUserParams, UpdateUserParams } from '@/interfaces/userInterfaces'

function create(data: CreateUserParams) {
  return prisma.user.create({
    data,
  })
}

function updateUser(data: UpdateUserParams, id: string) {
  return prisma.user.update({
    data: { ...data },
    where: {
      id,
    },
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
  updateUser,
  findById,
  findByEmail,
}
