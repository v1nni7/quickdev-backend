import { Prisma } from '@prisma/client'

export type CreateUserParams = Pick<
  Prisma.UserCreateInput,
  'name' | 'email' | 'password'
>

export type SignInParams = Pick<Prisma.UserCreateInput, 'email' | 'password'>
