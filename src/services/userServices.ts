import { hashSync } from 'bcrypt'

import { userRepository } from '@/repositories'
import { conflictError } from '@/errors/conflictError'
import { CreateUserParams } from '@/interfaces/userInterfaces'

async function createUser({ email, name, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email)

  const hashedPassword = hashSync(password, 10)

  userRepository.create({
    name,
    email,
    password: hashedPassword,
  })
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw conflictError('Email already in use')
  }
}

export default {
  createUser,
}
