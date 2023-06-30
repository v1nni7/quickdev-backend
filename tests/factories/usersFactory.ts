import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'

import { prisma } from '@/config/database'

export async function createUser(params: Partial<User> = {}) {
  const hashedPassword = hashSync(
    params.password || faker.internet.password(),
    10,
  )

  return prisma.user.create({
    data: {
      name: params.name || faker.person.firstName(),
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  })
}
