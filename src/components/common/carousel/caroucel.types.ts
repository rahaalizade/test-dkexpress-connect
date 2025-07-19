import { EmblaOptionsType } from 'embla-carousel'

interface CaroucelProps {
  slides: Slide[]
  className?: string
  options?: EmblaOptionsType
}

interface Slide {
  id: number
  image_url: string
  alt: string
  image_mobile_url: string
}

export type { CaroucelProps }
