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

export default { createPost }
