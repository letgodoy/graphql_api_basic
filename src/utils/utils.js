import dotenv from 'dotenv';
dotenv.config();

//ve se a porta digitada é int
export const normalizePort = (val) => {
  return typeof val === 'string' ? parseInt(val) : val
}

//tratamento de erro, console.log se dev, se nao retorna mensagem de erro digitada
export const handleError = (error, message) => {
  if (process.env.NODE_ENV === 'development') console.log(error)
  throw new Error(message)
}

// eslint-disable-next-line no-undef
export const JWT_SECRET = process.env.JWT_SECRET
