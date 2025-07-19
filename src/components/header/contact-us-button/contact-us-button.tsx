import { Instagram, Linkedin } from 'lucide-react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import { ContactUsProps } from '@/components/header/contact-us-button/contact-us.types'

function ContactUsButton({ links }: ContactUsProps) {
  const transformedLinks = links.reduce((acc: Record<string, string>, item) => {
    if (item.section && item.link) {
      acc[item.section] = item.link
    }
    return acc
  }, {} as Record<string, string>)

  return (
    <Menu as="div" className="relative inline-block mr-auto">
      <MenuButton className="text-button-content-primary font-[700] max-w-[20rem] text-[0.75rem] rounded-[0.75rem] py-[9px] px-[14px] cursor-pointer bg-button-tracking-primary-tonal">
        شبکه‌های اجتماعی ما
      </MenuButton>

      <MenuItems
        transition
        className="absolute overflow-hidden left-0 z-20 mt-2 w-[11.25rem] origin-top-right rounded-[1.25rem] bg-background-Surface-00 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {transformedLinks['LINKEDIN_LINK'] && (
            <MenuItem>
              <Link
                href={transformedLinks['LINKEDIN_LINK'] ?? '#'}
                className="flex items-center gap-[0.625rem] px-4 py-2 text-[1rem] text-object-primary font-[700] data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                <Linkedin width={24} height={24} />
                لینکدین
              </Link>
            </MenuItem>
          )}

          {transformedLinks['INSTAGRAM_LINK'] && (
            <MenuItem>
              <Link
                href={transformedLinks['INSTAGRAM_LINK'] ?? '#'}
                className="flex items-center gap-[0.625rem] px-4 py-2 text-[1rem] text-object-primary font-[700] data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                <Instagram width={24} height={24} />
                اینستاگرام
              </Link>
            </MenuItem>
          )}

          {transformedLinks['APARAT_LINK'] && (
            <MenuItem>
              <Link
                href={transformedLinks['APARAT_LINK'] ?? '#'}
                className="flex items-center gap-[0.625rem] px-4 py-2 text-[1rem] text-object-primary font-[700] data-[focus]:bg-gray-100 data-[focus]:outline-none"
              >
                <Image
                  src={'/icons/aparat.svg'}
                  alt={'aparat'}
                  width={24}
                  height={24}
                />
                آپارات
              </Link>
            </MenuItem>
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}

export { ContactUsButton }
