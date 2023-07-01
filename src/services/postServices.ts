import { httpResponse } from '@/utils'
import { postRepository } from '@/repositories'
import { CreatePostParams, UpdatePostParams } from '@/interfaces'

async function createPost(data: CreatePostParams) {
  await postRepository.createPost(data)
}

async function updatePost(data: UpdatePostParams, postId: string) {
  const { userId } = data

  const post = await validatePostExistsOrFail(postId)

  validateUserPermissionOrFail(post.userId, userId)

  const updatedPost = await postRepository.updatePost(data, postId)

  return updatedPost
}

async function deletePost(postId: string, userId: string) {
  const post = await validatePostExistsOrFail(postId)

  validateUserPermissionOrFail(post.userId, userId)

  await postRepository.deletePost(postId)
}

async function getPosts() {
  return await postRepository.getPosts()
}

function validateUserPermissionOrFail(postUserId: string, userId: string) {
  if (postUserId !== userId) {
    throw httpResponse('forbidden', 'You are not the owner of this post')
  }
}

async function validatePostExistsOrFail(postId: string) {
  const post = await postRepository.findPostById(postId)

  if (!post) {
    throw httpResponse('notFound', 'Post not found')
  }

  return post
}

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  validatePostExistsOrFail,
}
