import { Category } from '@/components/common/posts/posts.types'

export interface FilterFormProps {
  categories?: Category[]
  containerClassName?: string
  placeholder?: string
  searchOnchangeWithDebounce: any
  searchOnchange: any
}
