import { ContentItem } from '@/lib/utils/get-section-data/get-section-data.types'
import Image from 'next/image'

export default function ServiceItem({ image_url, title }: ContentItem) {
  return (
    <div className="flex items-center flex-col sm:mx-auto text-object-white gap-[0.75rem]">
      <span className="flex bg-object-primary  w-[64px] h-[64px] md:w-[72px] md:h-[72px] justify-center items-center rounded-[1rem]">
        {image_url && (
          <Image
            src={image_url}
            alt={title}
            className="w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
            width={0}
            height={0}
            sizes={'100vw'}
          />
        )}
      </span>
      <p className="font-[700] text-object-primary text-center text-xs">
        {title}
      </p>
    </div>
  )
}
