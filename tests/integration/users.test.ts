import { faker } from '@faker-js/faker'

import {
  cleanDatabase,
  server,
  generateValidUserBody,
  validateToken,
} from '../helpers'
import { createUser } from '../factories/usersFactory'

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
    it('should respond with status 201 when body is valid', async () => {
      const body = generateValidUserBody()

      const response = await server.post('/users/sign-up').send(body)

      expect(response.status).toBe(201)
    })

    it('should respond with status 409 when email is already taken', async () => {
      const body = generateValidUserBody()

      await createUser(body)

      const response = await server.post('/users/sign-up').send(body)

      expect(response.status).toBe(409)
    })
  })
})

describe('POST /users/sign-in', () => {
  describe('when body is invalid', () => {
    it('should respond with status 400 when body is not given', async () => {
      const response = await server.post('/users/sign-in')

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body is not valid', async () => {
      const invalidBody = {
        [faker.lorem.word()]: faker.lorem.word(),
      }

      const response = await server.post('/users/sign-in').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body email is not valid', async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(50),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-in').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body email more than 191 characters', async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(192),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-in').send(invalidBody)

      expect(response.status).toBe(400)
    })
  })

  describe('when body is valid', () => {
    it('should respond with status 200 and return a valid token', async () => {
      const body = generateValidUserBody()
      await createUser(body)

      const { email, password } = body

      const response = await server
        .post('/users/sign-in')
        .send({ email, password })

      expect(response.status).toBe(200)

      const isValidToken = validateToken(response.text)

      expect(isValidToken).toBe(true)
    })

    it("should respond with status 401 when email doesn't exist", async () => {
      const body = generateValidUserBody()
      await createUser(body)

      const { password } = body
      const incorrectEmail = faker.internet.email()

      const response = await server
        .post('/users/sign-in')
        .send({ email: incorrectEmail, password })

      expect(response.status).toBe(401)
    })

    it('should respond with status 401 when password is wrong', async () => {
      const body = generateValidUserBody()
      await createUser(body)

      const { email } = body
      const incorrectPassword = faker.internet.password()

      const response = await server
        .post('/users/sign-in')
        .send({ email, password: incorrectPassword })

      expect(response.status).toBe(401)
    })
  })
})
