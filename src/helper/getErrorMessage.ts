export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    console.log('nyri res err', error.response)

    if (error.response.data.error) {
      const errResponse = error.response.data.error

      return `${error.message}, ${errResponse}`
    }

    return error.message
  }

  return String(error)
}
