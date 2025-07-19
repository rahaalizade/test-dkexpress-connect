import CBannerCard from '@/components/common/banners/c-banners/c-banner-card/c-banner-card'
import { Divider } from '@/components/common/divider'
import { Container } from '@/components/common/container'
import { CBannersProps } from '@/components/common/banners/c-banners/c-banners.types'

export default function CBanners({
  banners,
  hasDivider,
  dividerTitle,
}: CBannersProps) {
  return (
    <Container className="mt-10">
      {hasDivider && <Divider title={dividerTitle ? dividerTitle : ''} />}
      <div className="flex flex-wrap gap-[0.625rem] lg:flex-nowrap mt-4">
        {banners?.map((card, index) => <CBannerCard key={card.id} {...card} />)}
      </div>
    </Container>
  )
}
