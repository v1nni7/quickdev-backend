import { Response } from 'express'

import { commentServices } from '@/services'
import { AuthRequest } from '@/interfaces/authInterfaces'

async function createComment(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { postId } = req.params
    const { description } = req.body

    await commentServices.createComment({ description, userId, postId })

    res.sendStatus(201)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function getComments(req: AuthRequest, res: Response) {
  try {
    const { postId } = req.params

    const comments = await commentServices.getComments(postId)

    res.status(200).send(comments)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function updateComment(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { commentId } = req.params
    const { description } = req.body

    const updatedComment = await commentServices.updateComment(
      { description, userId },
      commentId,
    )

    res.status(200).send(updatedComment)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

async function deleteComment(req: AuthRequest, res: Response) {
  try {
    const { userId } = req
    const { commentId } = req.params

    await commentServices.deleteComment(commentId, userId)

    res.sendStatus(204)
  } catch (error) {
    if (error.message) {
      return res.status(error.statusCode).send(error.message)
    }

    res.sendStatus(500)
  }
}

export default { createComment, getComments, updateComment, deleteComment }
