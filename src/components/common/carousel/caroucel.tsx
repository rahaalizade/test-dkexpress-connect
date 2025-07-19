import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons'
import { CaroucelProps } from '@/components/common/carousel/caroucel.types'
import classNames from 'classnames'
import Image from 'next/image'

const EmblaCarousel: React.FC<CaroucelProps> = props => {
  const { slides } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { direction: 'rtl', loop: false, duration: 30 },
    [Fade()],
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi)

  return (
    <div
      className={classNames('relative rounded-2xl size-full', props.className)}
    >
      <div className="overflow-hidden size-full" ref={emblaRef}>
        <div className="flex size-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="transform translate-x-0 flex-shrink-0 size-full"
            >
              {slide?.image_url && (
                <>
                  <div className="hidden md:block w-full h-full">
                    <Image
                      src={slide.image_url}
                      alt={slide?.alt}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="block md:hidden w-full h-full">
                    <Image
                      src={slide.image_mobile_url}
                      alt={slide?.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      {slides?.length > 1 && (
        <div
          dir={'ltr'}
          className="absolute right-[1.25rem] bottom-[1.25rem] rounded-[0.75rem] py-[0.25rem] px-[0.5rem] z-40 bg-background-primary flex justify-between items-center"
        >
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <div className="w-[0.0625rem] h-[1.25rem] bg-background-scrim" />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      )}
    </div>
  )
}

export default EmblaCarousel
