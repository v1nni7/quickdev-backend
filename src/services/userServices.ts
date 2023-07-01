import jwt from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt'

import { userRepository } from '@/repositories'
import { conflictError } from '@/errors/conflictError'
import { notFoundError } from '@/errors/notFoundError'
import { unauthorizedError } from '@/errors/unauthorizedError'
import { CreateUserParams, SignInParams } from '@/interfaces/userInterfaces'

async function getUser(id: string) {
  await validateUserExistsOrFail(id)

  const user = await userRepository.findById(id)

  return user
}

async function createUser({ email, name, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email)

  const hashedPassword = hashSync(password, 10)

  await userRepository.create({
    name,
    email,
    password: hashedPassword,
  })
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
    throw unauthorizedError('Invalid email or password')
  }
}

async function getUserByEmailOrFail(email: string) {
  const user = await userRepository.findByEmail(email)

  if (!user) {
    throw unauthorizedError('Invalid email or password')
  }

  return user
}

async function validateUserExistsOrFail(id: string) {
  const user = await userRepository.findById(id)

  if (!user) {
    throw notFoundError('User not found')
  }
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email)

  if (userWithSameEmail) {
    throw conflictError('Email already in use')
  }
}

export default {
  getUser,
  createUser,
  validateSignIn,
}
