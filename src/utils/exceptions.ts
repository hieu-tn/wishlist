export function parseError(error: any) {
  if (error instanceof Error) return error.message
  return String(error)
}
