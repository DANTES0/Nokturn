export interface lotType {
  id: number
  userId: string
  image: string
  name: string
  category: string
  size: string
  starting_bet: number
  current_bet: number
  reserve_price: string
  description: string
  lot_status: string
  begin_time_date: string
  end_time_date: string
  buyer_id: string
  another_images: []
  updated_at: string
  firstname?: string
  lastname?: string
}
