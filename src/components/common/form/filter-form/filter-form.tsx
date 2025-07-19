import SearchInput from '@/components/common/form/search-input/search-input'
import classNames from 'classnames'
import { FilterFormProps } from '@/components/common/form/filter-form/filter-form.types'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { DropdownButton } from '@/components/common/form/dropdown-button/dropdown-button'
import { ComboBox } from '../combobox'
import { toNumber } from 'lodash'

export default function FilterForm(properties: FilterFormProps) {
  const {
    categories,
    containerClassName,
    searchOnchangeWithDebounce,
    placeholder,
    searchOnchange,
  } = properties

  const router = useRouter()

  const selected = toNumber(router.query.category_id) || undefined

  return (
    <div className={classNames('flex gap-3', containerClassName)}>
      <SearchInput
        autoComplete={'off'}
        value={router.query.q}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value

          const updatedQuery: any = {
            ...router.query,
            q: inputValue,
            page: '1',
          }
          router.push(
            {
              pathname: router.pathname,
              query: updatedQuery,
            },
            undefined,
            { shallow: true, scroll: false },
          )

          searchOnchangeWithDebounce(updatedQuery)
        }}
        name={'career-search'}
        containerClassName="w-full"
        placeholder={placeholder}
      />
      <div className="w-[150px] flex-shrink-0">
        <ComboBox
          options={[
            { id: 'nothing', name: ' دسته‌بندی‌ها' },
            ...(categories ?? []),
          ]}
          selected={selected}
          setSelected={(category_id: number) => {
            const updatedQuery: any = {
              ...router.query,
              category_id: category_id,
              page: '1',
            }
            router.push(
              {
                pathname: router.pathname,
                query: updatedQuery,
              },
              undefined,
              { shallow: true, scroll: false },
            )

            searchOnchange(updatedQuery)
          }}
        />
      </div>
    </div>
  )
}
