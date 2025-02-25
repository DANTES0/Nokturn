export interface HistoryLotBet {
  id: number
  userId: string
  lotId: number
  time_date: string
  bet: number
  userName?: string
  date?: {
    formattedDate: string
    formattedTime: string
  }
}
