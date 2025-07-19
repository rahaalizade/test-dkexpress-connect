import { Banner } from '@/components/common/banners/b-banner/b-banner.types'

interface PostsProps {
  contents: PostProps[]
  banner?: Banner
  categories?: Category[]
  dividerTitle?: string
  hasSearch?: boolean
  hasMainCard?: boolean
}

interface PostProps {
  id: number
  user_id: number
  team_id: number
  summary: string
  title: string
  body: string
  cover: string
  published: boolean
  tags: string | null
  created_at: string
  updated_at: string
  views: number
  likes: number
  cover_url: string
  secondary_cover_url: string
  team: {
    id: number
    name: string
    cover: string | null
    cover_url: string | null
    manager_image_url: string | null
  }
  related: PostProps[] | null
  author: {
    id: number
    name: string
  }
  categories: any
}

type Category = {
  id: number
  name: string
  name_en: string
  slug: string
  icon: string | null
  description: string | null
  cover: string | null
  visible: boolean
  created_at: string // ISO 8601 datetime string
  updated_at: string // ISO 8601 datetime string
}

export type { PostsProps, PostProps, Category }
