import { config } from './config'

export default async function getUserById(userId: string) {
  try {
    const response = await fetch(`${config.url}/api/users/${userId}`, {
      method: 'GET',
    })
    return await response.json()
  } catch (error) {
    throw console.error(error)
  }
}
