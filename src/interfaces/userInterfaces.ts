import { User } from '@prisma/client'

export type CreateUserParams = Pick<User, 'name' | 'email' | 'password'>

export type SignInParams = Pick<User, 'email' | 'password'>
