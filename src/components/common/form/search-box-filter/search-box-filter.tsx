import SearchInput from '@/components/common/form/search-input/search-input'
import { SearchBoxFilterProps } from '@/components/common/form/search-box-filter/search-box-filter.types'

function SearchBoxFilter({
  searchValue,
  placeholder,
  onChangeFn,
}: SearchBoxFilterProps) {
  return (
    <div className="relative">
      <SearchInput
        autoComplete={'off'}
        value={searchValue}
        onChange={onChangeFn}
        name={'career-search'}
        containerClassName="w-full"
        placeholder={placeholder}
      />
    </div>
  )
}

export { SearchBoxFilter }
