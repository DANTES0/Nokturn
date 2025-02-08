export default async function getCurrentUser(token: string) {
  try {
    const response = await fetch('http://localhost:3000/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Пользователь не авторизован')
    }
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
