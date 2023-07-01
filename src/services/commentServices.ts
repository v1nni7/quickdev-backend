import { httpResponse } from '@/utils'
import { commentRepository } from '@/repositories'
import { CreateCommentParams, UpdateCommentParams } from '@/interfaces'

import postServices from './postServices'

async function createComment(data: CreateCommentParams) {
  await postServices.validatePostExistsOrFail(data.postId)

  await commentRepository.createComment(data)
}

async function getComments(postId?: string) {
  await postServices.validatePostExistsOrFail(postId)

  return await commentRepository.findByPostId(postId)
}

async function updateComment(data: UpdateCommentParams, commentId: string) {
  const { userId } = data

  const comment = await validateCommentExistsOrFail(commentId)

  validateUserToUpdate(comment.userId, userId)

  const updatedComment = await commentRepository.updateComment(data, commentId)

  return updatedComment
}

async function deleteComment(commentId: string, userId: string) {
  const comment = await validateCommentExistsOrFail(commentId)

  validateUserPermissionToDelete(comment.Post.userId, comment.userId, userId)

  await commentRepository.deleteComment(commentId)
}

function validateUserPermissionToDelete(
  postOwnerId: string,
  commentOwnerId: string,
  userId: string,
) {
  if (postOwnerId !== userId && commentOwnerId !== userId) {
    throw httpResponse(
      'forbidden',
      'You are not the owner of this post or comment',
    )
  }
}

function validateUserToUpdate(commentUserId: string, userId: string) {
  if (commentUserId !== userId) {
    throw httpResponse('forbidden', 'You are not the owner of this comment')
  }
}

async function validateCommentExistsOrFail(commentId: string) {
  const comment = await commentRepository.findById(commentId)

  if (!comment) {
    throw httpResponse('notFound', 'Comment not found')
  }

  return comment
}

export default { createComment, updateComment, deleteComment, getComments }
