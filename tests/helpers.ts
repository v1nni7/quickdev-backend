import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

import app from '@/app'
import { prisma } from '@/config/database'

export async function cleanDatabase() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()
  await prisma.comment.deleteMany()
}

export function generateValidUserBody() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}

export function validateToken(responseToken: string) {
  const token = jwt.verify(responseToken, process.env.JWT_SECRET)

  if (!token) {
    return false
  }

  return true
}

export const server = supertest(app)
