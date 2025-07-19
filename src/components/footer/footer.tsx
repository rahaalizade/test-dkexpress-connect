import Image from 'next/image'
import { Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { FooterProps } from '@/components/footer/footer.types'
import { useEffect, useRef, useState } from 'react'
import styles from './footer.module.scss'
import { twMerge } from 'tailwind-merge'
import { Container } from '../common/container'
export default function Footer({ contents, socialLinks }: FooterProps) {
  const textRef = useRef(null)
  const [lineCount, setLineCount] = useState(0)
  const footerText = contents?.filter(c => c.section === 'FOOTER_TEXT')[0]
    ?.description
  const aLinks = contents?.filter(c => c.section === 'FOOTER_A_LINKS')
  const bLinks = contents?.filter(c => c.section === 'FOOTER_B_LINKS')

  const transformedLinks = socialLinks.reduce(
    (acc: Record<string, string>, item: any) => {
      if (item.section && item.link) {
        acc[item.section] = item.link
      }
      return acc
    },
    {} as Record<string, string>,
  )

  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    if (textRef.current) {
      const element: any = textRef.current

      // Get the computed style to determine the line height
      const computedStyle = window.getComputedStyle(element as any)
      const lineHeight = parseFloat(computedStyle.lineHeight) // Convert line height to a number

      // Calculate the number of lines by dividing the scrollHeight by the lineHeight
      const lines = Math.round(element.scrollHeight / lineHeight)

      setLineCount(lines)
    }
  }, [footerText])

  return (
    <footer
      className={twMerge(
        'flex relative flex-col justify-between overflow-hidden w-full mt-10',
        styles.linear,
      )}
    >
      <Container>
        <div className="h-[1px] bg-[#B7BFE4] w-full mb-10" />
        <Image
          className="w-[10.109rem] sm:w-[11.1375rem] h-[2.5rem] select-none mb-6"
          src={'/icons/logo.svg'}
          width={0}
          height={0}
          alt={'career_logo'}
        />
        <div className="flex flex-col lg:flex-row gap-[40px] md:gap-[80px] mb-3">
          <div className="lg:min-w-[20rem] max-w-[32rem]">
            <div className="text-object-high-emphasis mb-8">
              <p
                ref={textRef}
                className={`${
                  isExpanded ? '' : 'line-clamp-4'
                } overflow-hidden text-sm text-ellipsis`}
              >
                {footerText}
              </p>
              {lineCount > 4 ? (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
                </button>
              ) : undefined}
            </div>
            <div className="flex gap-[0.5rem] ">
              {transformedLinks['APARAT_LINK'] && (
                <Link
                  href={transformedLinks['APARAT_LINK'] ?? '#'}
                  className="p-[0.5rem] rounded-[0.75rem] bg-[#c2c5d8] text-object-primary hover:text-button-content-black animate-pulse"
                >
                  <Image
                    src={'/icons/aparat.svg'}
                    alt={'aparat'}
                    width={16}
                    height={16}
                  />
                </Link>
              )}

              {transformedLinks['INSTAGRAM_LINK'] && (
                <Link
                  href={transformedLinks['INSTAGRAM_LINK'] ?? '#'}
                  className="p-[0.5rem] rounded-[0.75rem] bg-[#c2c5d8] text-object-primary hover:text-button-content-black animate-pulse"
                >
                  <Instagram width={16} height={16} />
                </Link>
              )}

              {transformedLinks['LINKEDIN_LINK'] && (
                <Link
                  href={transformedLinks['LINKEDIN_LINK'] ?? '#'}
                  className="p-[0.5rem] rounded-[0.75rem] bg-[#c2c5d8] text-object-primary hover:text-button-content-black animate-pulse"
                >
                  <Linkedin width={16} height={16} />
                </Link>
              )}
            </div>
          </div>

          <div className="w-full sm:w-auto text-object-high-emphasis flex gap-[2.5rem] lg:gap-[10rem]">
            {aLinks?.length ? (
              <div className="flex flex-col gap-[1rem]">
                <div className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[400]">
                  {aLinks?.map(link => (
                    <Link
                      key={link.id}
                      className="duration-300 hover:text-button-tracking-hover-black"
                      href={link?.link ? link.link : '#'}
                    >
                      {link?.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : undefined}

            {bLinks?.length ? (
              <div className="flex flex-col gap-[1rem]">
                <div className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[400]">
                  {bLinks?.map(link => (
                    <Link
                      key={link.id}
                      className="duration-300 hover:text-button-tracking-hover-black"
                      href={link?.link ? link.link : '#'}
                    >
                      {link?.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : undefined}
          </div>
        </div>
      </Container>

      <div className="md:flex hidden w-full aspect-w-16 aspect-h-3">
        <Image
          className="flex select-none object-cover"
          src="/images/footer.png"
          alt="A world that digiexpress can help you to reach"
          fill
        />
      </div>

      <div
        style={{
          direction: 'ltr',
        }}
        className="md:hidden"
      >
        <div className="mt-2">
          <div className={`${styles.container} h-[300px] md:size-full `}></div>

          <div
            className={`${styles.shadow} w-full block md:hidden absolute bottom-0`}
          />
        </div>
      </div>
    </footer>
  )
}
