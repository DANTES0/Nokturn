export interface UserType {
  id: string
  firstname: string
  lastname: string
  mail: string
  birthday_date: string
  vk_link: string
  tg_link: string
  description: string
  profile_photo: string
  profile_header_photo: string
  special_info: string
  name_visible: boolean
  rating: number
  created_at: string
  arts?: [
    {
      id: number
      photo: string
      name: string
    },
  ]
}
