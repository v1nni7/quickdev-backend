import { commentRepository } from '@/repositories'
import {
  CreateCommentParams,
  UpdateCommentParams,
} from '@/interfaces/commentInterface'
import { notFoundError } from '@/errors/notFoundError'
import postServices from './postServices'
import { unauthorizedError } from '@/errors/unauthorizedError'

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

function validateUserIsCommentOwner(commentUserId: string, userId: string) {
  if (commentUserId !== userId) {
    throw unauthorizedError('You are not the owner of this comment')
  }
}

async function validateCommentExistsOrFail(commentId: string) {
  const comment = await commentRepository.findCommentById(commentId)

  if (!comment) {
    throw notFoundError('Comment not found')
  }

  return comment
}

export default { createComment, getComments, updateComment }
