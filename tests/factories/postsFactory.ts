import { faker } from '@faker-js/faker'

import { prisma } from '@/config/database'
import { User } from '@prisma/client'
import { createUser } from './usersFactory'

export async function createPost(user?: User) {
  const incomingUser = user || (await createUser())

  return prisma.post.create({
    data: {
      userId: incomingUser.id,
      title: faker.lorem.words(6),
      description: faker.lorem.words(12),
    },
  })
}
