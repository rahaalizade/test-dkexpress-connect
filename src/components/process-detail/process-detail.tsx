import Link from 'next/link'
import { Container } from '../common/container'
import { Divider } from '../common/divider'
import { FaqAccordion } from '../common/faq-accordion'
import { ProcessDetailProperties } from './process-detail.types'
import NavigateButton from '../common/navigate-button/navigate-button'
import Player from 'next-video/player'

const ProcessDetail = (properties: ProcessDetailProperties) => {
  const { processInfo } = properties

  return (
    <Container>
      <div className="text-object-primary font-medium text-[28px] my-5">
        {processInfo?.operation?.title}
      </div>

      {processInfo?.operation?.buttons?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {processInfo?.operation?.buttons?.map((item: any) => {
            return (
              <Link href={item?.link}>
                <div className="bg-button-tracking-primary-tonal flex-shrink-0 text-sm px-6 py-3 duration-500 text-button-content-primary font-bold cursor-pointer hover:text-white hover:bg-button-tracking-primary rounded-xl">
                  {item?.name}
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="h-[1px] bg-[#0000001F] my-6 w-full" />

      <div
        className="text-object-low-emphasis text-xs mb-8"
        dangerouslySetInnerHTML={{
          __html: processInfo?.operation?.description ?? '',
        }}
      />

      {processInfo?.operation?.video_url && (
        <div className=" max-w-[800px] mx-auto">
          <div
            style={{
              direction: 'ltr',
            }}
            className="aspect-w-16 aspect-h-9 w-full mb-8 rounded-xl overflow-hidden"
          >
            <Player
              style={{ '--media-object-fit': 'cover' }}
              className="size-full"
              src={processInfo?.operation?.video_url ?? ''}
              blurDataURL="data:image/webp;base64,UklGRlA..."
            />
          </div>
        </div>
      )}

      <Divider title="پرسش‌های پرتکرار" />

      {processInfo?.operation?.extra?.length > 0 && (
        <>
          {processInfo?.operation?.extra.map((fqa: any, index: number) => {
            return (
              <FaqAccordion key={index} title={fqa?.title}>
                <div
                  className="text-object-low-emphasis"
                  dangerouslySetInnerHTML={{
                    __html: fqa?.description,
                  }}
                />
              </FaqAccordion>
            )
          })}
        </>
      )}

      {processInfo?.similar_operations?.length > 0 && (
        <>
          <Divider title="فرایندهای مرتبط" className="mt-12 mb-5" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {processInfo?.similar_operations?.map(
              (process: any, index: number) => {
                return (
                  <NavigateButton
                    key={index}
                    title={process?.title}
                    href={`/process/${process.id}/${process.slug}`}
                  />
                )
              },
            )}
          </div>
        </>
      )}
    </Container>
  )
}

export { ProcessDetail }
