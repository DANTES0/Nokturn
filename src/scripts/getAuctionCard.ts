import type { lotType } from '@/types/lotType'
import { config } from './config'
import getUserById from './getUser'

export default async function getAuctionCards(filters: {
  [key: string]: string | number | undefined
}) {
  try {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, String(value))
      }
    })

    const response = await fetch(`${config.url}/api/lot/filters/?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      },
    })

    if (!response.ok) {
      throw new Error('Ошибка загрузки аукционных карточек')
    }

    const lots = await response.json()

    const lotsWithUsers = await Promise.all(
      lots.map(async (lot: lotType) => {
        if (!lot.userId) return lot
        try {
          const userData = await getUserById(lot.userId)
          return { ...lot, firstname: userData.firstname, lastname: userData.lastname }
        } catch (error) {
          console.error(`Ошибка при загрузке имени пользователя для userId: ${lot.userId}`, error)
          return { ...lot, firstname: 'Неизвестный' }
        }
      }),
    )

    return lotsWithUsers
  } catch (error) {
    throw console.error(error)
  }
}
