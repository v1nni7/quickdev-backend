import { prisma } from '@/config/database'

export async function cleanDatabase() {
  await prisma.user.deleteMany()
  await prisma.post.deleteMany()
  await prisma.comment.deleteMany()
}
