import { Divider } from '@/components/common/divider'
import { Container } from '@/components/common/container'
import EmblaCarousel from '@/components/common/carousel/caroucel'
import { SliderProps } from '@/components/common/slider/slider.types'
import classNames from 'classnames'

function Slider({ banners, title, containerClassname }: SliderProps) {
  return (
    <Container className={classNames('mt-3', containerClassname)}>
      {title && (
        <div className="flex flex-col sm:flex-row w-full gap-[1.25rem] sm:gap-[0.625rem] items-center">
          <Divider
            className="w-full sm:w-auto sm:flex-grow"
            title={title ?? ''}
          />
        </div>
      )}
      <div className="w-full relative aspect-w-1 aspect-h-1 md:aspect-w-6 md:aspect-h-2">
        <div className="bg-background-primary flex rounded-2xl size-full overflow-hidden">
          <EmblaCarousel slides={banners} />
        </div>
      </div>
    </Container>
  )
}

export { Slider }
