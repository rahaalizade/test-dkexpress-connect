import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

type PropType = ComponentPropsWithRef<'button'>

export const PrevButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props

  return (
    <button
      className="inline-flex text-button-content-black items-center justify-center w-9 h-9 bg-transparent cursor-pointer disabled:cursor-auto disabled:opacity-25"
      type="button"
      {...restProps}
    >
      <ChevronLeft size={20} />
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props

  return (
    <button
      className="inline-flex text-button-content-black items-center justify-center w-9 h-9 bg-transparent cursor-pointer disabled:cursor-auto disabled:opacity-25"
      type="button"
      {...restProps}
    >
      <ChevronRight size={20} />
      {children}
    </button>
  )
}
