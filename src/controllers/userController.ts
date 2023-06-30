import { userServices } from '@/services'
import { Request, Response } from 'express'

async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    await userServices.createUser({ name, email, password })

    res.sendStatus(201)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const token = await userServices.validateSignIn({ email, password })

    res.send(token)
  } catch (error) {
    if (error.message) {
      res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

export default {
  signUp,
  signIn,
}
