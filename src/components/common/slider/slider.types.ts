interface SliderProps {
  banners: Banner[]
  containerClassname?: string
  title?: string
  hasSearch?: boolean
}

interface Banner {
  id: number
  image: string
  alt: string
  link: string
  page: string
  section: string
  created_at: string
  updated_at: string
  image_url: string
  image_mobile_url: string
}

export type { SliderProps }
