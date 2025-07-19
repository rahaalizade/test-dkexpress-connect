import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
  open: boolean
  setOpen: any
  children?: ReactNode
  panelClassName?: string
  backDropClassName?: string
  transitionContainer?: string
  hasCloseButton?: boolean
  closeButtonDir?: 'left' | 'right'
  Confetti?: any
}

interface IPropsBody {
  children?: React.ReactNode
  className?: string
}

function HeadLessModal({
  open,
  setOpen,
  children,
  panelClassName = '',
  backDropClassName = '',
  transitionContainer = '',
  Confetti,
}: IProps) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1500]"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={twMerge(
              'fixed inset-0 bg-black/[50%] z-50 transition-opacity',
              backDropClassName,
            )}
          />
        </Transition.Child>

        <div className="scroll-bar fixed inset-0 z-[1500] h-dvh">
          {Confetti}
          <div
            className={twMerge(
              'flex min-h-full items-center justify-center',
              transitionContainer,
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
              enterTo="opacity-100 translate-y-0 lg:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 lg:scale-100"
              leaveTo="opacity-0 translate-y-4 lg:translate-y-0 lg:scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  'relative transform transition-all z-[500000]',
                  panelClassName,
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export { HeadLessModal }
