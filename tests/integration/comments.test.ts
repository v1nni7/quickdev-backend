import { faker } from '@faker-js/faker'

import { createPost } from '../factories/postsFactory'
import { createUser, generateValidToken } from '../factories/usersFactory'
import { server } from '../helpers'
import { createComment } from '../factories/commentsFactory'

describe('POST /comments/:postId', () => {
  describe('when body is invalid', () => {
    it('should respond with status 400 when body is not given', async () => {
      const user = await createUser()
      const post = await createPost(user)
      const token = await generateValidToken(undefined, user)
      const response = await server.post(`/comments/${post.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(400)
    })

    it('should respond with status 400 when body description is invalid', async () => {
      const user = await createUser()
      const post = await createPost(user)
      const token = await generateValidToken(undefined, user)

      const invalidBody = {
        [faker.lorem.word()]: faker.lorem.word(),
      }

      const response = await server
        .post(`/comments/${post.id}`)
        .send(invalidBody)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(400)
    })
  })

  describe('when body is valid', () => {
    it('should respond with status 201 when body is valid', async () => {
      const user = await createUser()
      const post = await createPost(user)
      const token = await generateValidToken(undefined, user)

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .post(`/comments/${post.id}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(201)
    })

    it("should respond with status 404 when post doesn't exist", async () => {
      const postId = faker.string.uuid()
      const token = await generateValidToken()

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .post(`/comments/${postId}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(404)
    })

    it("should respond with status 400 when url param postId doesn't exist", async () => {
      const token = await generateValidToken()

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .post(`/comments/`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(404)
    })
  })
})

describe('GET /comments/:postId', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and return comments on post', async () => {
      const user = await createUser()
      const post = await createPost(user)
      const token = await generateValidToken(undefined, user)

      const response = await server.get(`/comments/${post.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })

    it("should respond with status 404 when post doesn't exist", async () => {
      const postId = faker.string.uuid()
      const token = await generateValidToken()

      const response = await server.get(`/comments/${postId}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(404)
    })

    it("should respond with status 404 when url param postId doesn't exist", async () => {
      const token = await generateValidToken()

      const response = await server.get(`/comments/`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(404)
    })
  })
})

describe('PUT /comments/:commentId', () => {
  describe('when token is valid', () => {
    it('should respond with status 200 and return updated comment', async () => {
      const user = await createUser()
      const comment = await createComment(user, undefined)
      const token = await generateValidToken(undefined, user)

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .put(`/comments/${comment.id}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      const expectedComment = {
        ...comment,
        ...body,
      }

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(expectedComment)
    })

    it("should respond with status 404 when comment doesn't exist", async () => {
      const commentId = faker.string.uuid()
      const token = await generateValidToken()

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .put(`/comments/${commentId}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(404)
    })

    it("should respond with status 404 when url param commentId doesn't exist", async () => {
      const token = await generateValidToken()

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .put(`/comments/`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(404)
    })

    it('should respond with status 403 when user is not the owner of the comment', async () => {
      const user = await createUser()
      const ownerUser = await createUser()
      const comment = await createComment(ownerUser, undefined)

      const token = await generateValidToken(undefined, user)

      const body = {
        description: faker.lorem.words(10),
      }

      const response = await server
        .put(`/comments/${comment.id}`)
        .send(body)
        .set({
          Authorization: `Bearer ${token}`,
        })

      expect(response.status).toBe(403)
    })
  })
})

describe('DELETE /comments/:commentId', () => {
  describe('when token is valid', () => {
    it('should respond with status 204 and delete comment', async () => {
      const user = await createUser()
      const comment = await createComment(user, undefined)
      const token = await generateValidToken(undefined, user)

      const response = await server.delete(`/comments/${comment.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(204)
    })

    it("should respond with status 404 when comment doesn't exist", async () => {
      const commentId = faker.string.uuid()
      const token = await generateValidToken()

      const response = await server.delete(`/comments/${commentId}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(404)
    })

    it("should respond with status 404 when url param commentId doesn't exist", async () => {
      const token = await generateValidToken()

      const response = await server.delete(`/comments/`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(404)
    })

    it('should respond with status 403 when user is not the owner of the comment', async () => {
      const user = await createUser()
      const ownerUser = await createUser()
      const comment = await createComment(ownerUser, undefined)

      const token = await generateValidToken(undefined, user)

      const response = await server.delete(`/comments/${comment.id}`).set({
        Authorization: `Bearer ${token}`,
      })

      expect(response.status).toBe(403)
    })
  })
})
