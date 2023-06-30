import { Request, Response } from 'express'
import { postServices } from '@/services'

async function createPost(req: Request, res: Response) {
  try {
    const { title, description } = req.body

    await postServices.createPost({ title, description })

    res.sendStatus(201)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

export default { createPost }
