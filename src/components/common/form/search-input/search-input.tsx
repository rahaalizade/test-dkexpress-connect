import { InputProps } from './search-input.types'
import classNames from 'classnames'
import { InputHTMLAttributes } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'

export default function SearchInput({
  name,
  inputClassName,
  containerClassName,
  searchIconClassName,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={classNames(
        'flex items-center bg-background-Surface-00 cursor-text gap-2 md:gap-2.5 py-[0.625rem] px-5 border border-[#0000004D] rounded-[0.75rem] w-full',
        containerClassName,
      )}
      htmlFor={name}
    >
      <Search
        className={classNames(
          'text-blue-low-400 size-[18] md:size-[24px]',
          searchIconClassName,
        )}
      />
      <input
        id={name}
        name={name}
        {...props}
        className={classNames(
          'bg-transparent text-xs md:text-sm outline-none auto-fill-none focus:outline-none text-object-high-emphasis placeholder:text-blue-low-400 block w-full',
          inputClassName,
        )}
      />
    </label>
  )
}
