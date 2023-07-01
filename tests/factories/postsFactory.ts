import { prisma } from '@/config/database'
import { faker } from '@faker-js/faker'

export async function createPost(userId: string) {
  return prisma.post.create({
    data: {
      userId,
      title: faker.lorem.words(6),
      description: faker.lorem.words(12),
    },
  })
}
