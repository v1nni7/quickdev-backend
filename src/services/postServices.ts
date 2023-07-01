import { postRepository } from '@/repositories'
import { notFoundError } from '@/errors/notFoundError'
import { forbiddenError } from '@/errors/forbiddenError'
import { CreatePostParams, UpdatePostParams } from '@/interfaces/postInterfaces'

async function createPost(data: CreatePostParams) {
  await postRepository.createPost(data)
}

async function getPosts() {
  return await postRepository.getPosts()
}

async function updatePost(data: UpdatePostParams, postId: string) {
  const { userId } = data

  const post = await validatePostExistsOrFail(postId)

  validateUserIsPostOwner(post.userId, userId)

  const updatedPost = await postRepository.updatePost(data, postId)

  return updatedPost
}

async function deletePost(postId: string, userId: string) {
  const post = await validatePostExistsOrFail(postId)

  validateUserIsPostOwner(post.userId, userId)

  await postRepository.deletePost(postId)
}

function validateUserIsPostOwner(postUserId: string, userId: string) {
  if (postUserId !== userId) {
    throw forbiddenError('You are not the owner of this post')
  }
}

async function validatePostExistsOrFail(postId: string) {
  const post = await postRepository.findPostById(postId)

  if (!post) {
    throw notFoundError('Post not found')
  }

  return post
}

export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  validatePostExistsOrFail,
}
