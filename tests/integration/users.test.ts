import supertest from 'supertest'
import { faker } from '@faker-js/faker'

import app from '@/app'

const server = supertest(app)

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

    it("should respond with status 400 when body's email is not valid", async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(50),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it("should respond with status 400 when body's email more than 191 characters", async () => {
      const invalidBody = {
        name: faker.person.firstName(),
        email: faker.lorem.words(192),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })

    it("should respond with status 400 when body's name more than 100 characters", async () => {
      const invalidBody = {
        name: faker.lorem.words(101),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }

      const response = await server.post('/users/sign-up').send(invalidBody)

      expect(response.status).toBe(400)
    })
  })
})
