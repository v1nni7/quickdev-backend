import { User } from '@prisma/client'

export type CreateUserParams = Pick<User, 'name' | 'email' | 'password'>

export type UpdateUserParams = Partial<CreateUserParams>

export type SignInParams = Pick<User, 'email' | 'password'>
