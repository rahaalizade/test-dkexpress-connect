import Link from 'next/link'
import { BannerProps } from '@/components/common/banners/b-banner/b-banner.types'
import { Container } from '@/components/common/container'

function BBanner({ banner, className }: BannerProps) {
  return (
    <>
      {banner?.image_url && (
        <Container className={className}>
          <Link
            href={banner?.link}
            className={`flex w-full aspect-w-5 aspect-h-2 md:aspect-w-6 md:aspect-h-1 bg-cover bg-no-repeat rounded-[0.75rem]`}
            style={{
              backgroundImage: `url(${banner?.image_url})`,
            }}
          />
        </Container>
      )}
    </>
  )
}

export { BBanner }
