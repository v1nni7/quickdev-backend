import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export type AuthRequest = Request & JwtPayload
