export const toString = (value: any) => {
  return Object(value).toString();
}

export const errorFormatter = (error: any) => {
  const formattedError = {
    name: error.name,
    meta: error.meta,
    message: error.message,
    stack: error.stack,
    clientVersion: error.clientVersion,
  }
  return formattedError;
}