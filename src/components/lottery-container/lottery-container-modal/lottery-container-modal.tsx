import { HeadLessModal } from '@/components/common/modal/modal'
import { LotteryContainerModalProperties } from './lottery-container-modal.types'
import { X } from 'lucide-react'
import patter from '../../../assets/lottery-modal.svg'

const LotteryContainerModal = (properties: LotteryContainerModalProperties) => {
  const {
    open,
    closeModal,
    winnerList,
    singleLoading,
    randomSearchLoading,
    Confetti,
  } = properties

  return (
    <>
      <HeadLessModal
        Confetti={Confetti}
        open={open}
        setOpen={() => {
          closeModal()
        }}
      >
        <div className="w-[600px] overflow-hidden  relative bg-[#F2F5FF] rounded-[20px]">
          <img src={patter.src} className="absolute left-0 top-0 h-full" />
          <img
            src={patter.src}
            className="absolute right-0 top-0 h-full rotate-180"
          />
          <div
            onClick={() => {
              closeModal()
            }}
            className="bg-white  z-40 flex items-center justify-center hover:opacity-70 duration-300 cursor-pointer size-[48px] rounded-xl absolute top-5 left-5"
          >
            <X className="size-[20px] text-object-high-emphasis" />
          </div>
          <div className="p-5 relative z-30">
            <div className="flex mb-7 justify-center">
              <img src="/images/lottery.png" className="size-[90px]" />
            </div>
            <div className="text-3xl text-object-primary text-center mb-5">
              برندگان قرعه‌کشی
            </div>

            <div className="flex flex-col gap-2">
              {winnerList?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="px-5 py-3 flex items-center gap-2 rounded-xl bg-white"
                  >
                    <div className="text-object-low-emphasis">{index + 1}</div>
                    <div className="flex justify-around gap-2 flex-1">
                      <div className="text-object-primary text-lg font-bold">
                        {item?.full_name}
                      </div>
                      <div className="text-object-low-emphasis text-base">
                        {item?.department}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {singleLoading && (
              <div className="bg-background-primary-light flex p-3 px-5 gap-3">
                <span className="loader"></span>
                <div className="text-base text-object-low-emphasis">
                  در حال پیدا کردن برنده ...
                </div>
              </div>
            )}

            {randomSearchLoading && (
              <div className="bg-background-primary-light flex p-3 px-5 gap-3">
                <span className="loader"></span>
                <div className="text-base text-object-low-emphasis">
                  در حال پیدا کردن برندگان ...
                </div>
              </div>
            )}
          </div>
        </div>
      </HeadLessModal>
    </>
  )
}

export { LotteryContainerModal }
