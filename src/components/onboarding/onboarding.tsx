import { Container } from '@/components/common/container'
import { Divider } from '@/components/common/divider'
import OnboardingMenu from '@/components/onboarding/onboarding-menu/onboarding-menu'
import { OnboardingProps } from '@/components/onboarding/onboarding.types'
import Player from 'next-video/player'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'
import { InView } from 'react-intersection-observer'

export default function Onboarding({ data }: OnboardingProps) {
  const [startScrollToId, setStartScrollToId] = useState<any>(undefined)
  const [selectedMenuID, setSelectedMenuID] = useState<string>(
    data?.content?.[0]?.id ?? '',
  )
  const [selectedSubMenuID, setSelectedSubMenuID] = useState<string>(
    data?.content?.[0]?.sub_sections?.[0]?.id ?? '',
  )
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [inViews, setInViews] = useState<
    { menuId: string; subId: string; index: number }[]
  >([])

  const titleRef = useRef<HTMLDivElement | null>(null)

  const scrollToSection = (id: string) => {
    setStartScrollToId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (typeof window === undefined) return

    const handleScroll = () => {
      if (titleRef.current) {
        setShowScrollButton(window.scrollY > titleRef.current.offsetTop)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (inViews.length > 0) {
      // trigger when scroll
      if (!startScrollToId) {
        const topMost = [...inViews].sort((a, b) => a.index - b.index)[0]
        setSelectedMenuID(topMost.menuId)
        setSelectedSubMenuID(topMost.subId)
        // trigger when click on sidebar items
      } else {
        const topMost = [...inViews].sort((a, b) => a.index - b.index)[0]
        // if reach end finish blocking
        if (startScrollToId === topMost.subId) {
          setStartScrollToId(undefined)
        }
      }
    }
  }, [inViews])

  return (
    <Container className="mt-2 overflow-visible">
      {showScrollButton && (
        <button
          onClick={() =>
            titleRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
          className="fixed bottom-5 end-5 z-40 text-object-primary flex justify-center items-center bg-white w-[48px] h-[48px] rounded-xl"
        >
          <ChevronUp />
        </button>
      )}

      <Divider title={data?.title} className="px-[1.25rem] sm:px-0" />
      <div
        ref={titleRef}
        className="flex flex-col md:flex-row gap-4 relative md:gap-8 overflow-visible"
      >
        <OnboardingMenu
          selectedMenuID={selectedMenuID}
          setSelectedMenuID={setSelectedMenuID}
          selectedSubMenuID2={selectedSubMenuID}
          setSelectedSubMenuID={setSelectedSubMenuID}
          scrollToSection={scrollToSection}
          data={data}
        />

        <div className="flex flex-col">
          {data?.content?.map((content, contentIndex) => (
            <div key={content.id}>
              {content.sub_sections.map((section, subIndex) => {
                const sectionId = section.id

                return (
                  <InView
                    key={section.id}
                    rootMargin="-70px"
                    onChange={inView => {
                      setInViews(prev => {
                        const withoutCurrent = prev.filter(
                          i => i.subId !== section.id,
                        )
                        return inView
                          ? [
                              ...withoutCurrent,
                              {
                                menuId: content.id,
                                subId: section.id,
                                index: contentIndex * 100 + subIndex,
                              },
                            ]
                          : withoutCurrent
                      })
                    }}
                  >
                    <div
                      id={sectionId}
                      className="flex flex-col mt-2 mb-5 md:mt-5 gap-3 md:gap-5"
                    >
                      <div className="flex gap-3 md:gap-5 items-center">
                        <img
                          src={content?.icon_url}
                          alt={content?.title}
                          className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
                        />
                        <span className="text-xl md:text-2xl text-object-high-emphasis font-bold">
                          {section?.title}
                        </span>
                      </div>

                      <div
                        className=" text-xs md:text-sm text-object-low-emphasis"
                        dangerouslySetInnerHTML={{
                          __html: section?.content.toString() ?? '',
                        }}
                      />

                      <div className="flex flex-nowrap overflow-auto md:overflow-visible gap-3">
                        {section?.buttons?.map((button, bIndex) => {
                          const baseClass =
                            'text-nowrap py-3 px-6 text-sm font-bold rounded-xl'
                          if (button.type === 'filled') {
                            return (
                              <Link
                                key={bIndex}
                                href={button?.link ?? '#'}
                                className={`${baseClass} bg-button-tracking-primary text-white`}
                              >
                                {button?.name}
                              </Link>
                            )
                          }
                          return (
                            <Link
                              key={bIndex}
                              href={button?.link ?? '#'}
                              className={`${baseClass} text-xs md:text-sm text-object-primary bg-button-tracking-primary-tonal`}
                            >
                              {button?.name}
                            </Link>
                          )
                        })}
                      </div>

                      {section?.video_url && (
                        <div className="mt-3 rounded-xl overflow-hidden">
                          <Player
                            style={{ '--media-object-fit': 'cover' }}
                            className="size-full"
                            src={section?.video_url ?? ''}
                            poster={''}
                            blurDataURL="data:image/webp;base64,UklGRlA..."
                          />
                        </div>
                      )}

                      {content?.sub_sections.length > 1 &&
                        content?.sub_sections.length > subIndex && (
                          <div className="flex w-full mt-6 h-[1px] bg-[#D9D9D9]" />
                        )}
                    </div>
                  </InView>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
