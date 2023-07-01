import { Request, Response } from 'express'
import { userServices } from '@/services'
import { AuthRequest } from '@/interfaces/authInterfaces'

async function getUser(req: AuthRequest, res: Response) {
  try {
    const { userId } = req.params

    const user = await userServices.getUser(userId)

    res.status(200).send(user)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function updateUser(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { name, email, password } = req.body

    const updatedUser = await userServices.updateUser(
      { name, email, password },
      userId,
    )

    res.status(200).send(updatedUser)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function deleteUser(req: AuthRequest, res: Response) {
  try {
    const { userId } = req

    await userServices.deleteUser(userId)

    res.sendStatus(204)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body

    await userServices.createUser({ name, email, password })

    res.sendStatus(201)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
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
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

export default {
  getUser,
  updateUser,
  deleteUser,
  signUp,
  signIn,
}
