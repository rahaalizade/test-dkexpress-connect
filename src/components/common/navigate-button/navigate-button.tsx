import { NavigateTabProps } from './navigate-button.types'
import Link, { LinkProps } from 'next/link'
import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'

export default function NavigateButton({
  href,
  title,
  className,
  iconUrl,
  showAll,
}: NavigateTabProps & LinkProps) {
  return (
    <Link
      href={href}
      className={classNames(
        'flex  p-3 border border-border-grade-2 w-[100%] text-object-high-emphasis justify-between items-center bg-background-Surface-00 rounded-xl duration-300 group hover:bg-opacity-40',
        {
          'justify-normal gap-[0.25rem] hover:gap-[0.5rem] text-object-secondary hover:text-object-secondary':
            showAll,
        },
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {!showAll && (
          <span className="flex bg-[#F2F5FF] w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex-shrink-0 justify-center items-center rounded-full">
            <img
              src={iconUrl ?? '/images/waypoints.svg'}
              alt={title}
              className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
            />
          </span>
        )}

        <div className="text-sm md:text-[1rem] font-medium  w-full">
          {title}
        </div>
      </div>
      <ChevronLeft
        className={classNames(
          'text-object-low-emphasis flex-shrink-0 size-[18px] md:size-[24px]',
          {
            'text-object-secondary': showAll,
          },
        )}
      />
    </Link>
  )
}
