import { Container } from '@/components/common/container'
import { LadderProps } from '@/components/ladder/ladder.types'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronUp } from 'lucide-react'

const getSections = (
  data: any,
  selectedContent: string,
  selectedTopic: string,
) => {
  return data?.content
    ?.find((c: any) => c.id === selectedContent)
    ?.sub_topics?.find((t: any) => t.id === selectedTopic)?.sections
}

function Ladder({ data }: LadderProps) {
  const [selectedContent, setSelectedContent] = useState(
    data?.content?.[0]?.id ?? '',
  )
  const [selectedTopic, setSelectedTopic] = useState(
    data?.content?.[0]?.sub_topics?.[0]?.id ?? '',
  )
  const [showScrollButton, setShowScrollButton] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === undefined) return

    const handleScroll = () => {
      if (wrapperRef.current) {
        setShowScrollButton(window.scrollY > wrapperRef.current.offsetTop + 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={wrapperRef} className="flex flex-col relative">
      {showScrollButton && (
        <button
          onClick={() =>
            wrapperRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
          className="fixed bottom-5 end-5 z-40 text-object-primary flex justify-center items-center bg-white w-[48px] h-[48px] rounded-xl"
        >
          <ChevronUp />
        </button>
      )}
      <Container className="z-40 start-0">
        <div className="flex py-3 gap-5 md:gap-7 bg-[#F2F5FF]">
          <img
            src="/icons/ladder_icon.png"
            alt="ladder"
            className="w-[30px] h-[32px] md:w-[40.75px] md:h-[44.24px]"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-object-primary font-bold text-[16px] md:text-xl">
              {data?.title}
            </h1>
            <p className="text-object-primary-low text-[10px] md:text-xs">
              {data?.description}
            </p>
          </div>
        </div>
      </Container>

      <Container className="sticky top-[60px] bg-[#F2F5FF] overflow-visible">
        <div className="flex gap-3 my-3">
          {data?.content.map((content, index) => (
            <button
              key={content.id}
              onClick={() => {
                setSelectedContent(content.id)
                setSelectedTopic(content?.sub_topics[0]?.id)
              }}
              className={classNames(
                'text-object-low-emphasis text-xs md:text-sm font-bold border border-border-outline-2 rounded-xl py-2 px-4',
                {
                  'border-object-primary text-object-primary bg-background-primary':
                    content.id === selectedContent,
                },
              )}
            >
              {content?.title}
            </button>
          ))}
        </div>
        <div className=" border-b-[1px] border-[#D9D9D9] mt-2.5">
          <Container className="flex overflow-auto">
            {data?.content
              ?.find(c => c.id === selectedContent)
              ?.sub_topics?.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={classNames(
                    'flex transition ease-out duration-100 relative text-object-low-emphasis text-[0.875rem] min-w-[6.375rem] gap-[0.5rem] py-[0.75rem] cursor-pointer',
                  )}
                >
                  <div className="flex justify-center items-center">
                    {selectedTopic === topic.id && (
                      <div className="flex absolute left-auto bottom-0 rounded-t-full h-[4px] w-[32px] bg-object-secondary " />
                    )}
                    <div className="flex items-center gap-2">
                      <div className="size-[32px] bg-background-primary rounded-md overflow-hidden p-1">
                        <img
                          src={topic?.icon_url ?? '/icons/Rectangle_icon.png'}
                          className="size-full"
                          alt={topic?.title}
                        />
                      </div>
                      <span
                        className={classNames(
                          'text-xs md:text-sm font-[600] text-nowrap',
                          {
                            'text-object-primary': selectedTopic === topic.id,
                          },
                        )}
                      >
                        {topic?.title}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </Container>
        </div>
      </Container>

      <Container className="gap-5 mt-5">
        <div
          className="text-sm text-object-high-emphasis"
          dangerouslySetInnerHTML={{
            __html:
              data?.content
                ?.find(c => c.id === selectedContent)
                ?.sub_topics?.find(t => t.id === selectedTopic)?.content ?? '',
          }}
        />

        <div className="flex w-full my-6 h-[1px] bg-[#D9D9D9]" />

        <div>
          {data?.content
            ?.find(c => c.id === selectedContent)
            ?.sub_topics?.find(t => t.id === selectedTopic)
            ?.sections?.map((section, index) => (
              <div key={index} className="my-5">
                <div className="flex flex-col gap-2">
                  <span className="text-object-primary text-[16px] md:text-xl font-bold">
                    {section?.title}
                  </span>
                  <div
                    className="text-object-high-emphasis text-xs"
                    dangerouslySetInnerHTML={{ __html: section?.content ?? '' }}
                  />
                </div>
                {getSections(data, selectedContent, selectedTopic).length > 1 &&
                  getSections(data, selectedContent, selectedTopic).length -
                    1 !==
                    index && (
                    <div className="flex w-full mt-6 h-[1px] bg-[#D9D9D9]" />
                  )}
              </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export { Ladder }
