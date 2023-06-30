import { postRepository } from '@/repositories'
import { CreatePostParams } from '@/interfaces/postInterfaces'

async function createPost(data: CreatePostParams) {
  await postRepository.createPost(data)
}

async function getPosts() {
  return await postRepository.getPosts()
}

export default { createPost, getPosts }
