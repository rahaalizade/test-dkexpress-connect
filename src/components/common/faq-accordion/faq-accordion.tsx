import { useCollapse } from 'react-collapsed'
import { twMerge } from 'tailwind-merge'
import { FaqAccordionProperties } from './faq-accordion.type'
import { ChevronDown, ChevronUp } from 'lucide-react'
import classNames from 'classnames'

function FaqAccordion(properties: FaqAccordionProperties) {
  const {
    children,
    title,
    isOpen = false,
    className = '',
    handleType = 'auto',
  } = properties

  const collapseOptions =
    handleType === 'manual' ? { duration: 400, isExpanded: isOpen } : undefined
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(
    collapseOptions ?? {
      duration: 400,
    },
  )

  return (
    <div
      {...getToggleProps()}
      className={twMerge('border-b border-border-grade-2', className)}
    >
      <div className="flex items-center justify-between gap-2 group">
        <div
          className={classNames(
            'text-object-primary duration-300 group-hover:text-object-primary py-6 text-base font-bold',
            {
              ['text-object-primary']: isExpanded,
            },
          )}
        >
          {title}
        </div>
        {!isExpanded ? (
          <ChevronDown className="text-[24px] text-object-low-emphasis" />
        ) : (
          <ChevronUp className="text-[24px] text-object-low-emphasis" />
        )}
      </div>
      <div {...getCollapseProps()}>
        <div className="pb-6">{children}</div>
      </div>
    </div>
  )
}

export { FaqAccordion }
