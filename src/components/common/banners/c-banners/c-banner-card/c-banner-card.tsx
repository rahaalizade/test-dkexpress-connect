import Link from 'next/link'
import { Banner } from '@/components/common/banners/c-banners/c-banners.types'

export default function CBannerCard({
  image_url,
  image_mobile_url,
  link,
}: Banner) {
  return (
    <>
      <Link
        href={link}
        className={`hidden sm:flex w-full min-w-[20rem] min-h-[10rem] sm:h-[18.47rem] max-h-[18.47rem] bg-cover bg-no-repeat rounded-[0.75rem]`}
        style={{ backgroundImage: `url(${image_url ? image_url : ''})` }}
      />
      <Link
        href={link}
        className={`flex sm:hidden w-full min-w-[20rem] min-h-[10rem] sm:h-[18.47rem] max-h-[18.47rem] bg-cover bg-no-repeat rounded-[0.75rem]`}
        style={{
          backgroundImage: `url(${image_mobile_url ? image_mobile_url : ''})`,
        }}
      />
    </>
  )
}
