import jwt from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt'

import { httpResponse } from '@/utils'
import { userRepository } from '@/repositories'
import { SignInParams, CreateUserParams, UpdateUserParams } from '@/interfaces'

async function createUser({ email, name, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email)

  const hashedPassword = hashSync(password, 10)

  await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  })
}

async function updateUser(data: UpdateUserParams, userId: string) {
  const { email, password } = data

  await validateUserExistsOrFail(userId)

  await validateUniqueEmailOrFail(email)

  let hashedPassword: any

  if (password) {
    hashedPassword = hashSync(password, 10)
  }

  const updatedUser = await userRepository.updateUser(
    {
      ...data,
      password: hashedPassword,
    },
    userId,
  )

  return updatedUser
}

async function deleteUser(userId: string) {
  await validateUserExistsOrFail(userId)

  await userRepository.deleteUser(userId)
}

async function getUser(id: string) {
  await validateUserExistsOrFail(id)

  const user = await userRepository.findById(id)

  return user
}

async function validateSignIn({ email, password }: SignInParams) {
  const user = await getUserByEmailOrFail(email)

  await validatePasswordOrFail(password, user.password)

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '14 days',
  })

  return token
}

async function validatePasswordOrFail(
  password: string,
  hashedPassword: string,
) {
  const passwordMatch = compareSync(password, hashedPassword)

  if (!passwordMatch) {
    throw httpResponse('unauthorized', 'Invalid email or password')
  }
}

async function getUserByEmailOrFail(email: string) {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw httpResponse('unauthorized', 'Invalid email or password')
  }

  return user
}

async function validateUserExistsOrFail(id: string) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw httpResponse('notFound', 'User not found')
  }

  return user
}

async function validateUniqueEmailOrFail(email: string) {
  if (!email) return

  const userWithSameEmail = await userRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw httpResponse('conflict', 'Email already in use')
  }
}

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  validateSignIn,
}
