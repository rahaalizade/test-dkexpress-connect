'use client'

import React, { useState, useEffect, MouseEvent, TouchEvent } from 'react'
import { Divider } from '@/components/common/divider'
import { Container } from '@/components/common/container'
import { useCultureHook } from '@/components/home/culture/culture.hooks'
import { CultureProps } from '@/components/home/culture/culture.types'
import Image from 'next/image'
import classNames from 'classnames'
import {
  NextButton,
  PrevButton,
} from '@/components/common/carousel/EmblaCarouselArrowButtons'

function Carousel({ cardsInfo }: CultureProps) {
  const [domLoaded, setDomLoaded] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [dragging, setDragging] = useState<boolean>(false)

  const { carouselInView, stopPlayInterval, startPlayInterval, next, prev } =
    useCultureHook({
      slidesNumber: cardsInfo?.length ? cardsInfo.length : 0,
    })

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragStart(e.clientX)
    setDragging(true)
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging || dragStart === null) return

    const dragDistance = e.clientX - dragStart
    setDragging(false)

    if (dragDistance > 0) {
      next()
    } else if (dragDistance < 0) {
      prev()
    }

    setDragStart(null)
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setDragStart(e.touches[0].clientX)
    setDragging(true)
  }

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!dragging || dragStart === null) return

    const dragDistance = e.changedTouches[0].clientX - dragStart
    setDragging(false)

    if (dragDistance > 0) {
      next()
    } else if (dragDistance < 0) {
      prev()
    }

    setDragStart(null)
  }

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  return (
    <>
      <Container className="mt-10 ">
        <Divider title={'فرهنگ کاری ما'} />
      </Container>
      <Container className="px-0 ">
        {domLoaded && (
          <div
            onMouseEnter={stopPlayInterval}
            onMouseLeave={startPlayInterval}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="carousel-container flex items-center justify-center mx-auto relative w-full mt-6 min-h-[19rem] sm:min-h-[17rem] cursor-grab gap-1 active:cursor-grabbing select-none group"
          >
            <PrevButton
              onClick={prev}
              className="opacity-0 absolute top-auto end-4 rounded-full p-2 z-40 bg-background-primary text-object-high-emphasis duration-300 group-hover:opacity-100"
            />
            <NextButton
              onClick={next}
              className="opacity-0 absolute top-auto start-4 rounded-full p-2 z-40 bg-background-primary text-object-high-emphasis duration-300 group-hover:opacity-100"
            />
            {cardsInfo?.map(({ id, image_url, title, description }, index) => (
              <div
                key={id}
                className={classNames(
                  'flex flex-col  overflow-hidden bg-background-Surface-00 gap-[0.75rem] absolute w-[65%] sm:w-[30%] px-[1.25rem] justify-center items-center border-[0.25rem] border-background-primary rounded-[0.75rem] transform -translate-x-1/2 transition-all duration-300 ease-in-out',
                  {
                    ['hidden lg:flex left-[15%] flex-1 scale-90 py-5']:
                      carouselInView[index].toString() === '5',
                  },
                  {
                    ['left-[30%] z-10 h-full scale-95 py-5']:
                      carouselInView[index].toString() === '4',
                  },
                  {
                    ['left-[50%] z-20 h-full py-5']:
                      carouselInView[index].toString() === '3',
                  },
                  {
                    ['left-[70%] z-10 h-full scale-95 py-5']:
                      carouselInView[index].toString() === '2',
                  },
                  {
                    ['hidden lg:flex left-[85%] h-full py-5 scale-90']:
                      carouselInView[index].toString() === '1',
                  },
                  {
                    ['hidden']: Number(carouselInView[index]) > 5,
                  },
                  {
                    ['hidden']: Number(carouselInView[index]) < 1,
                  },
                )}
              >
                <div className="text-object-secondary mx-auto pointer-events-none">
                  {image_url && (
                    <Image
                      className="mx-auto w-[5rem] h-[5rem]"
                      src={image_url}
                      alt={title + ' ' + description}
                      width={0}
                      height={0}
                      sizes={'100vw'}
                    />
                  )}
                </div>
                <span className="font-bold text-object-primary text-center">
                  {title}
                </span>
                <p className="text-object-primary-low  text-[0.625rem] leading-5 text-right font-[400]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Carousel
