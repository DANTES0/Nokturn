export interface CommentType {
  id: number
  userId: string
  lotId: number
  commentsText: string
  parentId?: number
  timeDateCreated: string
  isDeleted: boolean
  user?: {
    id: string
    firstname: string
    lastname: string
    profile_photo: string
  }
  replies?: CommentType[]
}
