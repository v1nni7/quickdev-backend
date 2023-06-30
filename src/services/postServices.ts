import { postRepository } from '@/repositories'
import { CreatePostParams } from '@/interfaces/postInterfaces'

async function createPost(data: CreatePostParams) {
  await postRepository.createPost(data)
}

export default { createPost }
