import { faker } from '@faker-js/faker'

import { server } from '../helpers'
import { createPost } from '../factories/postsFactory'
import { createUser, generateValidToken } from '../factories/usersFactory'

describe('POST /posts', () => {
  describe('when body is invalid', () => {
    it('should respond with status 400 when body is not given', async () => {
      const token = await generateValidToken()

      const response = await server.post('/posts').set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body is not valid', async () => {
      const token = await generateValidToken()

      const invalidBody = {
        [faker.lorem.word()]: faker.lorem.word(),
      }

      const response = await server
        .post('/posts')
        .send(invalidBody)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body title more than 100 characters', async () => {
      const token = await generateValidToken()

      const invalidBody = {
        title: faker.lorem.words(101),
        description: faker.lorem.words(10),
      }

      const response = await server
        .post('/posts')
        .send(invalidBody)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body description more than 191 characters', async () => {
      const token = await generateValidToken()

      const invalidBody = {
        title: faker.lorem.words(10),
        description: faker.lorem.words(192),
      }

      const response = await server
        .post('/posts')
        .send(invalidBody)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(400)
    })
  })

  describe('when body is valid', () => {
    it('should respond with status 201 and create post', async () => {
      const token = await generateValidToken()

      const body = {
        title: faker.lorem.words(5).toString(),
        description: faker.lorem.words(15).toString(),
      }

      const response = await server
        .post('/posts')
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(201)
    })
  })

  describe('when token is invalid', () => {
    it('should respond with status 401 when token is invalid', async () => {
      const token = faker.lorem.words(20)

      const body = {
        title: faker.lorem.words(20),
        description: faker.lorem.words(45),
      }

      const response = await server
        .post('/posts')
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(401)
    })

    it("should respond with status 401 when token doesn't exist", async () => {
      const body = {
        title: faker.lorem.words(20),
        description: faker.lorem.words(45),
      }

      const response = await server.post('/posts').send(body)

      expect(response.status).toBe(401)
    })
  })
})

describe('GET /posts', () => {
  describe('when token is invalid', () => {
    it("should respond with status 401 when token doesn't exist", async () => {
      const response = await server.get('/posts')

      expect(response.status).toBe(401)
    })

    it('should respond with status 401 when token is invalid', async () => {
      const token = faker.lorem.words(10)

      const response = await server.get('/posts').set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(401)
    })

    it('should respond with status 401 when token is expired', async () => {
      const token = await generateValidToken('-1d')

      const response = await server.get('/posts').set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(401)
    })
  })

  describe('when token is valid', () => {
    it('should respond with status 200 and return posts', async () => {
      const token = await generateValidToken()

      const response = await server.get('/posts').set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })
  })
})

describe('PUT /posts/:id', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and return updated post', async () => {
      const userOwner = await createUser()
      const post = await createPost(userOwner.id)

      const token = await generateValidToken(undefined, userOwner.id)

      const body = {
        title: "I'm not the owner",
        description: "I'm not the owner",
      }

      const response = await server
        .put(`/posts/${post.id}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      const expectedPost = {
        id: post.id,
        userId: post.userId,
        ...body,
      }

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expectedPost)
    })

    it("should respond with status 403 when user doesn't own the post", async () => {
      const postOwner = await createUser()
      const post = await createPost(postOwner.id)

      const user = await createUser()
      const token = await generateValidToken(undefined, user.id)

      const body = {
        title: "I'm not the owner",
        description: "I'm not the owner",
      }

      const response = await server
        .put(`/posts/${post.id}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(403)
    })

    it("should respond with status 404 when post doesn't exist", async () => {
      const postId = faker.string.uuid()
      const token = await generateValidToken()

      const body = {
        title: "Post doesn't exist",
        description: "Post doesn't exist",
      }

      const response = await server
        .put(`/posts/${postId}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(404)
    })
  })
})

describe('DELETE /posts/:id', () => {
  describe('when token is valid', () => {
    it('should respond with status 204 and delete post', async () => {
      const userOwner = await createUser()
      const post = await createPost(userOwner.id)

      const token = await generateValidToken(undefined, userOwner.id)

      const response = await server.delete(`/posts/${post.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(204)
    })

    it("should respond with status 403 when user doesn't own the post", async () => {
      const postOwner = await createUser()
      const post = await createPost(postOwner.id)

      const user = await createUser()
      const token = await generateValidToken(undefined, user.id)

      const response = await server.delete(`/posts/${post.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(403)
    })

    it("should respond with status 404 when post doesn't exist", async () => {
      const postId = faker.string.uuid()
      const token = await generateValidToken()

      const response = await server.delete(`/posts/${postId}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(404)
    })
  })
})
