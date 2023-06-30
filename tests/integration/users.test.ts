import supertest from 'supertest'
import { faker } from '@faker-js/faker'

import { cleanDatabase } from '../helpers'
import { createUser } from '../factories/usersFactory'

import app from '@/app'

const server = supertest(app)

beforeAll(async () => {
  cleanDatabase()
})

describe('POST /users/sign-up', () => {
  describe('when body is invalid', () => {
    it('should respond with status 400 when body is not given', async () => {
      const response = await server.post('/users/sign-up')

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body is not valid', async () => {
      const invalidBody = {
        [faker.lorem.word()]: faker.lorem.word(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body email is not valid', async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(50),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body email more than 191 characters', async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(192),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body name more than 100 characters', async () => {
      const invalidBody = {
        name: faker.lorem.words(101),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })
  })

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    it('should respond with status 201 when body is valid', async () => {
      const body = generateValidBody()

      const response = await server.post('/users/sign-up').send(body)

      expect(response.status).toBe(201)
    })

    it('should respond with status 409 when email is already taken', async () => {
      const body = generateValidBody()

      await createUser(body)

      const response = await server.post('/users/sign-up').send(body)

      expect(response.status).toBe(409)
    })
  })
})
