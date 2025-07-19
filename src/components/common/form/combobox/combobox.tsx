import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { toNumber } from 'lodash'
import { Check, CheckIcon, ChevronDownIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { ComboBoxProperties } from './combobox.types'

const ComboBox = (properties: ComboBoxProperties) => {
  const { setSelected, selected = 'nothing', options } = properties

  const selectedOption = options.find(
    (item: any) => item.id === toNumber(selected),
  )

  return (
    <Listbox
      value={selected}
      onChange={val => {
        setSelected(val === 'nothing' ? undefined : val)
      }}
    >
      <ListboxButton
        className={twMerge(
          'relative block truncate  w-full border border-[#0000001F] rounded-xl py-1.5 pl-8 pr-3 text-right text-xs/6 md:text-sm/6 text-object-low-emphasis h-[48px] items-center',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
        )}
      >
        <ChevronDownIcon
          className="group pointer-events-none absolute top-1/2 -translate-y-1/2 left-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
        {selectedOption?.name ?? 'دسته‌بندی'}
      </ListboxButton>
      <ListboxOptions
        anchor="bottom end"
        transition
        className={twMerge(
          'max-w-[300px] min-w-[150px] rounded-xl bg-white  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
        )}
      >
        {options.map((option: any) => {
          return (
            <ListboxOption
              key={option.id}
              value={option.id}
              className="group mb-1 cursor-pointer data-[selected]:bg-background-primary-light flex items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-background-primary-light"
            >
              <Check className="invisible size-[12px] md:size-[14px] text-object-primary group-data-[selected]:visible" />
              <div className="text-xs/6 md:text-sm/6 text-object-low-emphasis">
                {option.name}
              </div>
            </ListboxOption>
          )
        })}
      </ListboxOptions>
    </Listbox>
  )
}

export { ComboBox }
