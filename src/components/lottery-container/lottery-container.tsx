import { twMerge } from 'tailwind-merge'
import styles from './lottery-container.module.scss'
import { Container } from '../common/container'
import Image from 'next/image'
import SearchInput from '../common/form/search-input/search-input'
import { Minus, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { LotteryContainerModal } from './lottery-container-modal/lottery-container-modal'
import { useWindowSize } from 'react-use'
import dynamic from 'next/dynamic'
import {
  useLotteryWithQuery,
  useLotteryWithRandom,
} from '@/lib/api/services/lottery/lottery'
import toast from 'react-hot-toast'
import { convertToPersianWord } from '@/lib/utils/convert-number-to-persian-word'
import { numberConvert } from '@/lib/utils/number-convert'

const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false,
})

const LotteryContainer = () => {
  const [counter, setCounter] = useState(1)
  const [open, setOpen] = useState(false)
  const { width, height } = useWindowSize()
  const [showConfetti, setShowConfetti] = useState(false)
  const [recycleConfetti, setRecycleConfetti] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [search, setSearch] = useState('')

  const [winnerList, setWinnerList] = useState<any>([])

  const searchLotteryWithQuery = useLotteryWithQuery()
  const randomSearch = useLotteryWithRandom()

  const showCelebrate = () => {
    setShowConfetti(true)
    setRecycleConfetti(true)

    timeoutRef.current = setTimeout(() => {
      setRecycleConfetti(false)
    }, 10000)
  }
  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setShowConfetti(false)
    setRecycleConfetti(false)
    setOpen(false)
  }

  return (
    <div
      className={twMerge(
        'min-h-screen flex justify-between flex-col w-full overflow-visible',
        styles.linear,
      )}
    >
      <LotteryContainerModal
        open={open}
        closeModal={closeModal}
        winnerList={winnerList}
        singleLoading={searchLotteryWithQuery.isPending}
        randomSearchLoading={randomSearch.isPending}
        Confetti={
          <Confetti
            className="!z-[1600]"
            width={width}
            height={height}
            recycle={recycleConfetti}
            run={showConfetti}
          />
        }
      />

      <Container className="flex-1 self-stretch overflow-visible relative">
        <div className="h-screen absolute top-0 left-0 w-[180px] z-10">
          <div className={twMerge(styles.pattern, 'size-full ')} />
        </div>
        <div className="h-screen absolute top-0 right-0 w-[180px] z-10">
          <div className={twMerge(styles.pattern, 'size-full')} />
        </div>

        <div className="w-[380px] relative z-20 mx-auto">
          <Image
            className="w-[10.109rem] mb-[80px] mt-6 sm:w-[11.1375rem] h-[2.5rem] select-none"
            src={'/icons/logo.svg'}
            width={0}
            height={0}
            alt={'career_logo'}
          />

          <div className="text-primary text-4xl mb-10">قرعه‌کشی</div>

          <div className="flex gap-3 mb-8">
            <SearchInput
              name=""
              value={search}
              onChange={event => {
                setSearch(event.target.value)
              }}
              placeholder="جستجو ..."
            />
            <button
              onClick={() => {
                if (!search) {
                  toast.error('کد قرعه کشی را وارد کنید')
                  return
                }
                setWinnerList([])
                openModal()

                searchLotteryWithQuery.mutate(
                  numberConvert(search, {
                    locale: 'en',
                  }),
                  {
                    onSuccess: response => {
                      showCelebrate()
                      const winnerList = response?.data
                      setWinnerList([{ ...winnerList }])
                    },
                    onError: () => {
                      toast.error('جستجو ناموفق دوباره تلاش کنید')
                      closeModal()
                    },
                  },
                )
              }}
              className="p-3 flex gap-3 items-center justify-center hover:bg-opacity-80 duration-300 min-w-[150px] flex-shrink-0 rounded-xl bg-button-tracking-primary"
            >
              جستجو
            </button>
          </div>
          <div className="flex gap-3 mb-8">
            <div className="border justify-between overflow-hidden gap-2 items-center flex  border-[#0000004D] flex-1 rounded-xl bg-white">
              <div
                onClick={() => {
                  setCounter(prev => {
                    return prev + 1
                  })
                }}
                className="w-[50px] flex items-center justify-center cursor-pointer h-full hover:bg-background-primary duration-300"
              >
                <Plus className="size-[24px] text-object-primary" />
              </div>
              <div className="flex-1 select-none text-object-primary text-center text-base">
                {counter} نفر
              </div>
              <div
                onClick={() => {
                  if (counter === 1) return

                  setCounter(prev => {
                    return prev - 1
                  })
                }}
                className="w-[50px] flex items-center justify-center cursor-pointer h-full hover:bg-background-primary duration-300"
              >
                <Minus
                  className="size-[24px] text-object-primary"
                  fontWeight={300}
                />
              </div>
            </div>
            <button
              onClick={() => {
                setWinnerList([])
                openModal()

                randomSearch.mutate(counter, {
                  onSuccess: response => {
                    showCelebrate()
                    const winnerList = response?.data
                    setWinnerList([...winnerList])
                  },
                  onError: () => {
                    toast.error('جستجو ناموفق دوباره تلاش کنید')
                    closeModal()
                  },
                })
              }}
              className="p-3 flex gap-3 items-center justify-center hover:bg-opacity-80 duration-300 min-w-[150px] flex-shrink-0 rounded-xl bg-button-tracking-primary"
            >
              یا بخت و یا اقبال
            </button>
          </div>
        </div>
      </Container>
      <div className="flex relative z-30 w-full aspect-w-16 aspect-h-3">
        <Image
          className="flex select-none object-cover"
          src="/images/footer.png"
          alt="A world that digiexpress can help you to reach"
          fill
        />
      </div>
    </div>
  )
}

export { LotteryContainer }
