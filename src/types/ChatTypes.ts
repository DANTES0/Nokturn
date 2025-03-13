export interface ChatType {
  id: string
  user1Id: string
  user2Id: string
  createdAt: string
  user1: {
    id: string
    firstname: string
    lastname: string
    profile_photo: string
  }
  user2: {
    id: string
    firstname: string
    lastname: string
    profile_photo: string
  }
  messages: []
}
