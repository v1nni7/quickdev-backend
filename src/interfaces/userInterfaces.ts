import { Prisma } from '@prisma/client'

export type CreateUserParams = Pick<
  Prisma.UserCreateInput,
  'name' | 'email' | 'password'
>
