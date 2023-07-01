import { faker } from '@faker-js/faker'

import { prisma } from '@/config/database'
import { Post, User } from '@prisma/client'
import { createUser } from './usersFactory'
import { createPost } from './postsFactory'

export async function createComment(user?: User, post?: Post) {
  const incomingUser = user || (await createUser())
  const incomingPost = post || (await createPost(incomingUser))

  return prisma.comment.create({
    data: {
      userId: incomingUser.id,
      postId: incomingPost.id,
      description: faker.lorem.words(15),
    },
  })
}
