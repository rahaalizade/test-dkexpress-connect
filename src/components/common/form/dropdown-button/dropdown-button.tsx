import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDown } from 'lucide-react'
import { DropdownButtonProps } from '@/components/common/form/dropdown-button/dropdown-button.types'

function DropdownButton({ categories, handleMenuClick }: DropdownButtonProps) {
  return (
    <Menu
      as="div"
      className="relative flex border-[1px] border-border-outline-2 rounded-xl text-right text-object-low-emphasis"
    >
      <MenuButton className="flex justify-center items-center gap-2 px-4">
        دسته‌بندی <ChevronDown />
      </MenuButton>
      <MenuItems
        transition
        className="absolute overflow-hidden left-0 z-20 mt-1 w-[9rem] origin-top-right rounded-md bg-background-Surface-00 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        anchor="bottom"
      >
        {categories?.map(item => (
          <MenuItem
            key={item.id}
            as="div"
            onClick={() => handleMenuClick(item.id)}
            className="flex items-center gap-[0.625rem] px-4 py-2 text-[1rem] text-object-primary font-[700] data-[focus]:bg-gray-100 data-[focus]:outline-none cursor-pointer"
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

export { DropdownButton }
