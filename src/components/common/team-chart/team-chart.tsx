import { Network, X } from 'lucide-react'
import { useState } from 'react'
import { HeadLessModal } from '../modal/modal'

interface TeamChartProperties {
  chartSrc: string
}
const TeamChart = (properties: TeamChartProperties) => {
  const { chartSrc } = properties
  const [open, setOpen] = useState(false)

  return (
    <>
      <HeadLessModal
        setOpen={setOpen}
        open={open}
        panelClassName="sm:rounded-[20px] overflow-hidden flex items-center bg-white w-full h-full sm:w-[700px] sm:h-[500px]"
      >
        <div
          onClick={() => {
            setOpen(false)
          }}
          className="bg-background-Surface-03 z-40 flex items-center justify-center hover:opacity-70 duration-300 cursor-pointer size-[48px] rounded-xl absolute top-5 left-5"
        >
          <X className="size-[20px] text-object-high-emphasis" />
        </div>
        <div className="relative z-10 w-full h-screen md:h-auto flex items-center ">
          <div className="w-full relative">
            <img
              src={chartSrc}
              alt=""
              className="w-full bg-background-primary "
            />
          </div>
        </div>
      </HeadLessModal>
      <div
        onClick={() => {
          setOpen(true)
        }}
        className="bg-button-tracking-neutral text-[#030D1F] cursor-pointer hover:opacity-70 duration-300 w-full md:w-auto justify-center md:justify-end flex gap-[10px] rounded-xl py-3 px-6 text-xs md:text-sm font-semibold"
      >
        <Network className="size-[20px]" />
        چارت سازمانی شرکت
      </div>
    </>
  )
}

export { TeamChart }
