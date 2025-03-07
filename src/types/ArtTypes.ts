export interface ArtType {
  id: number
  userId: string
  image: string
  name: string
  load_time: string
  user?: {
    id: string
    firstname: string
    lastname: string
    profile_photo: string
  }
}
