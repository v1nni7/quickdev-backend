import { Response } from 'express'
import { postServices } from '@/services'
import { AuthRequest } from '@/interfaces/authInterfaces'

async function createPost(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { title, description } = req.body

    await postServices.createPost({ title, description, userId })

    res.sendStatus(201)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function getPosts(req: AuthRequest, res: Response) {
  try {
    const posts = await postServices.getPosts()

    res.status(200).send(posts)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function updatePost(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { postId } = req.params
    const { title, description } = req.body

    const updatedPost = await postServices.updatePost(
      { title, description, userId },
      postId,
    )

    res.status(200).send(updatedPost)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

export default { createPost, getPosts, updatePost }
