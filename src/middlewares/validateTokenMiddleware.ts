import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '@/interfaces/authInterfaces'

export default function validateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return generateUnauthorizedResponse(res, 'User not logged in')
  }

  const token = authorization?.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload

    req.userId = decoded.id

    next()
  } catch (error) {
    generateUnauthorizedResponse(res, 'Invalid token')
  }
}

function generateUnauthorizedResponse(res: Response, message?: string) {
  return res.status(401).send(message)
}
