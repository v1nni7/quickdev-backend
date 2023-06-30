export function notFoundError(message: string) {
  return {
    message,
    statusCode: 404,
  }
}
