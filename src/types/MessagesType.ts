export interface MessageType {
  id?: string
  chatId?: string
  senderId?: string
  text?: string
  createdAt?: string
  isRead?: boolean
  sender?: {
    id?: string
    firstname?: string
    lastname?: string
    profile_photo?: string
  }
}
