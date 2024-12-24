export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.response.data.error) {
      const errResponse = error.response.data.error

      return `${error.message}, ${errResponse}`
    }

    return error.message
  }

  return String(error)
}
