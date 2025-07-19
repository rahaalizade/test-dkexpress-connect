import { ChangeEvent } from 'react'

interface SearchBoxFilterProps {
  searchValue: string
  placeholder: string
  onChangeFn: (e: ChangeEvent<HTMLInputElement>) => void
}

export type { SearchBoxFilterProps }
