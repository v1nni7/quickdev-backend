export function conflictError(message: string) {
  return {
    message,
    statusCode: 409,
  }
}
