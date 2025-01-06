interface CustomError extends Error {
  response?: {
    data?: {
      error?: string
    }
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const customError = error as CustomError

    if (customError.response?.data?.error) {
      const errResponse = customError.response.data.error

      return `${customError.message}, ${errResponse}`
    }

    return customError.message
  }

  return String(error)
}
