import { commentRepository } from '@/repositories'

import postServices from './postServices'
import { httpResponse } from '@/utils/httpResponse'
import {
  CreateCommentParams,
  UpdateCommentParams,
} from '@/interfaces/commentInterface'

async function createComment(data: CreateCommentParams) {
  await postServices.validatePostExistsOrFail(data.postId)

  await commentRepository.create(data)
}

async function getComments(postId?: string) {
  await postServices.validatePostExistsOrFail(postId)

  return await commentRepository.findCommentsByPostId(postId)
}

async function updateComment(data: UpdateCommentParams, commentId: string) {
  const { userId } = data

  const comment = await validateCommentExistsOrFail(commentId)

  validateUserIsCommentOwner(comment.userId, userId)

  const updatedComment = await commentRepository.updateComment(data, commentId)

  return updatedComment
}

async function deleteComment(commentId: string, userId: string) {
  const comment = await validateCommentExistsOrFail(commentId)

  validateUserIsPostOwnerOrCommentOwner(
    comment.Post.userId,
    comment.userId,
    userId,
  )

  await commentRepository.deleteComment(commentId)
}

function validateUserIsPostOwnerOrCommentOwner(
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

function validateUserIsCommentOwner(commentUserId: string, userId: string) {
  if (commentUserId !== userId) {
    throw httpResponse('forbidden', 'You are not the owner of this comment')
  }
}

async function validateCommentExistsOrFail(commentId: string) {
  const comment = await commentRepository.findCommentById(commentId)

  if (!comment) {
    throw httpResponse('notFound', 'Comment not found')
  }

  return comment
}

export default { createComment, getComments, updateComment, deleteComment }
