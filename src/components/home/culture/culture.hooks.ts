import { useEffect, useRef, useState } from 'react'

const useCultureHook = ({ slidesNumber }: any) => {
  const [carouselInView, setCarouselInView] = useState<number[]>([
    ...Array(slidesNumber).keys(),
  ])
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const next = () => {
    setCarouselInView(prevView => {
      const updatedView = [...prevView]
      updatedView.unshift(updatedView.pop() as number)
      return updatedView
    })
  }

  const prev = () => {
    setCarouselInView(prevView => {
      const updatedView = [...prevView]
      updatedView.push(updatedView[0])
      updatedView.shift()
      return updatedView
    })
  }

  const startPlayInterval = () => {
    playIntervalRef.current = setInterval(next, 3500)
  }
  const stopPlayInterval = () => {
    clearInterval(playIntervalRef.current as any)
  }

  useEffect(() => {
    startPlayInterval()
    return () => {
      if (playIntervalRef.current) {
        stopPlayInterval()
      }
    }
  }, [])

  return {
    startPlayInterval,
    stopPlayInterval,
    next,
    prev,
    carouselInView,
  }
}
export { useCultureHook }
