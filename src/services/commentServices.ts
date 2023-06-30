import { commentRepository } from '@/repositories'
import { CreateCommentParams } from '@/interfaces/commentInterface'
import postServices from './postServices'

async function createComment(data: CreateCommentParams) {
  await postServices.validatePostExistsOrFail(data.postId)

  await commentRepository.create(data)
}

export default { createComment }
