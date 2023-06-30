export function unauthorizedError(message: string) {
  return {
    message,
    statusCode: 401,
  }
}
