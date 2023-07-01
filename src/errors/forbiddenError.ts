export function forbiddenError(message: string) {
  return {
    message,
    statusCode: 403,
  }
}
