const formatError = (err) => {
  const error =
    typeof err === 'object' && err.hasOwnProperty('message')
      ? err
      : { message: 'Oops, something went wrong!' }

  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }

  return error
}
export default formatError
