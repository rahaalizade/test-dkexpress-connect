import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/common/container'
import { ContactUsButton } from './contact-us-button/contact-us-button'
import { HamburgerMenu } from '@/components/header/hamburger-menu/hamburger-menu'
import classNames from 'classnames'
import { HeaderProps } from './header.types'
import { usePathname } from 'next/navigation'
import { useHeaderHook } from '@/components/header/header.hooks'

export default function Header({
  links,
  containerClassName,
  navBarItems,
  forHome,
}: HeaderProps) {
  const pathname = usePathname()
  const { fixed } = useHeaderHook()

  return (
    <div className={classNames('fixed top-0 left-auto  z-50 w-full ')}>
      <Container
        className={classNames(
          'overflow-visible flex py-[1rem] h-[4rem] bg-[#F2F5FF] lg:bg-transparent',
          {
            ['left-auto min-w-full']: fixed,
          },
          containerClassName,
        )}
        style={{
          background: fixed ? '#F2F5FF' : undefined,
          position: fixed ? 'fixed' : 'static',
        }}
      >
        <div className="flex w-full max-w-[77.5rem] mx-auto justify-between items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex lg:hidden">
              <HamburgerMenu Menus={navBarItems} />
            </div>

            <div className="flex items-center">
              <Link href="/">
                <Image
                  className="w-[124px] sm:w-[178px] sm:h-[40px] h-[28px] select-none"
                  src={'/icons/logo.svg'}
                  width={0}
                  height={0}
                  alt={'career_logo'}
                />
              </Link>
              <div className="hidden lg:flex gap-[1.25rem] lg:gap-4 mr-5 sm:mr-10 items-center">
                {navBarItems?.map(menu => (
                  <Link
                    key={menu.link}
                    className={classNames(
                      'relative text-object-primary text-[1rem] font-[400] px-3 py-[0.5rem] rounded-[0.75rem] duration-300 hover:bg-background-primary',
                      {
                        ['font-[700]']: pathname === menu.link,
                      },
                    )}
                    href={menu.link}
                  >
                    {menu.title}

                    {pathname === menu.link && (
                      <span className="absolute bottom-0 left-[calc(50%-0.5rem)] w-[1rem] h-[0.1875rem] bg-object-secondary" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className={fixed ? ' h-[4rem]' : ''}></div>
    </div>
  )
}
