import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import Link from 'next/link'
import { HamburgerMenuProps } from './hamburger-menu.types'

function HamburgerMenu({ Menus }: HamburgerMenuProps) {
  return (
    <Popover className="ml-4 lg:ml-0">
      {({ open }) => {
        if (typeof window !== typeof undefined) {
          document.body.style.overflow = open ? 'hidden' : 'visible'
        }
        return (
          <>
            <PopoverButton
              style={{ zIndex: 51, position: 'relative' }}
              className="flex flex-col justify-center items-center focus:outline-none text-object-primary py-4"
            >
              <span
                className={`bg-object-primary block transition-all duration-300 ease-out 
                    h-0.5 w-[1.5rem] rounded-sm ${
                      open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`}
              />
              <span
                className={`bg-object-primary block transition-all duration-300 ease-out 
                    h-0.5 w-[1.5rem] rounded-sm my-0.5 ${
                      open ? 'opacity-0' : 'opacity-100'
                    }`}
              />
              <span
                className={`bg-object-primary block transition-all duration-300 ease-out h-0.5 w-[1.5rem] rounded-sm ${
                  open ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                }`}
              />
            </PopoverButton>

            <PopoverPanel
              anchor="bottom"
              className="flex flex-col z-50 bg-[#F2F5FF] w-full h-full p-[1.25rem] gap-[0.5rem]"
            >
              {Menus.map(menu => (
                <Link
                  key={menu.link}
                  href={menu.link}
                  className="text-[1rem] text-object-primary font-[400] py-[0.5rem] px-[1rem] hover:bg-background-primary focus:bg-background-primary rounded-[0.75rem]"
                >
                  {menu.title}
                </Link>
              ))}
            </PopoverPanel>
          </>
        )
      }}
    </Popover>
  )
}

export { HamburgerMenu }
