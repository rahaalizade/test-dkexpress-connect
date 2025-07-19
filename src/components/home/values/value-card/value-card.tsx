import { ContentItem } from '@/lib/utils/get-section-data/get-section-data.types'
import Image from 'next/image'

export default function ValueCard({
  image_url,
  title,
  description,
}: ContentItem) {
  return (
    <div className="flex flex-col ml-5 sm:ml-0 gap-[0.75rem] min-w-[12.5rem] sm:min-w-0  sm:w-full bg-background-Surface-00 p-[1.25rem] rounded-[0.75rem]">
      {image_url && (
        <Image
          className="mx-auto w-[5rem] h-[5rem]"
          src={image_url}
          alt={title + " " + description}
          width={0}
          height={0}
          sizes={'100vw'}
        />
      )}
      <span className="font-bold text-object-primary text-center">{title}</span>
      <p className="text-blue-low-550 text-[0.625rem] text-justify">
        {description}
      </p>
    </div>
  )
}
