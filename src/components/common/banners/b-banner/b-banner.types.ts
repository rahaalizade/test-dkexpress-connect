interface BannerProps {
  banner?: Banner
  className?: string
}

interface Banner {
  id: number
  type: string
  image: string
  image_mobile: string
  link: string
  active: boolean
  page: string
  section: string
  created_at: string
  updated_at: string
  image_url: string
  image_mobile_url: string
}

export type { BannerProps, Banner }
