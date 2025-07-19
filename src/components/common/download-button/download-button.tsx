import { NavigateTabProps } from './download-button.types'
import classNames from 'classnames'
import { Download, FileText } from 'lucide-react'
import { Loading } from '../loading/loading'
import { useDownloadButton } from './download-button.hooks'

export default function DownloadButton(properties: NavigateTabProps) {
  const { title, subTitle, className, navId, fileUrl } = properties
  const { handleDownload, isLoading } = useDownloadButton(properties)

  return (
    <div
      onClick={() =>
        handleDownload({
          fileUrl: fileUrl,
          id: navId,
        })
      }
      className={classNames(
        'flex p-3 border cursor-pointer border-border-grade-2 w-[100%]  text-object-high-emphasis justify-between items-center bg-background-Surface-00 rounded-xl duration-300 group hover:bg-opacity-40 hover:text-button-content-black',
        className,
      )}
    >
      <div className="flex gap-3 items-center">
        <span className="flex bg-[#F2F5FF] w-[38px] h-[38px] md:w-[48px] md:h-[48px] justify-center items-center rounded-full">
          <FileText className="size-[18px] md:size-[24px]" />
        </span>
        <div className="flex flex-col">
          <span className="text-sm md:text-[1rem] text-object-high-emphasis font-medium">
            {title}
          </span>
          <span className="text-[0.6875rem] text-object-low-emphasis font-[400] mt-1">
            {subTitle}
          </span>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Download className="text-object-low-emphasis size-[18px] md:size-[24px]" />
      )}
    </div>
  )
}
