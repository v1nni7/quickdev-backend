import jwt from 'jsonwebtoken'
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

export async function generateValidToken(
  expiresIn = '14 days',
  userId?: string,
) {
  const user = await createUser()

  const token = jwt.sign(
    { id: userId || user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn,
    },
  )

  return token
}
