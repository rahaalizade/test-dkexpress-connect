type ContentItem = {
  id: number
  page: string
  section: string
  icon: string | null
  title: string
  link: string
  additional: any | null
  description: string
  color: string | null
  image: string | null
  video: string | null
  priority: number
  extra: any | null
  created_at: string // ISO 8601 date format
  updated_at: string // ISO 8601 date format
  video_thumbnail: string | null
  icon_url: string | null
  image_url: string | null
  video_url: string
  video_thumbnail_url: string
}

type Contents = ContentItem[]

export type { Contents, ContentItem }
