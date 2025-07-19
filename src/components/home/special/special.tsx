import Player from 'next-video/player'
import { Container } from '@/components/common/container'
import { SpecialProps } from '@/components/home/special/special.types'

function Special({ content }: SpecialProps) {
  return (
    <Container>
      <div className="w-full bg-white min-h-0 flex flex-col relative rounded-[20px]">
        <div className="relative self-stretch flex flex-col flex-1 gap-5">
          <div className="absolute top-0 right-0 w-full flex justify-center">
            <img src="/images/pattern.svg" />
          </div>
          <div className="relative flex flex-col-reverse md:flex-row z-20 gap-5 px-5 pt-10 pb-0 md:pb-10 md:pt-10 md:px-10">
            <div className="flex flex-1 flex-col self-stretch gap-2">
              <span className="text-object-primary text-xl font-medium">
                {content.title}
              </span>
              <p className="text-object-low-emphasis text-justify text-sm">
                {content.description}
              </p>
            </div>
            <div className="flex flex-1 justify-center relative self-stretch">
              <div
                style={{
                  direction: 'ltr',
                }}
                className="aspect-w-16 aspect-h-9 w-full  rounded-xl overflow-hidden"
              >
                <Player
                  style={{ '--media-object-fit': 'cover' }}
                  className="size-full"
                  src={content.video_url ?? ''}
                  poster={content.video_thumbnail_url ?? ''}
                  blurDataURL="data:image/webp;base64,UklGRlA..."
                />
              </div>
            </div>
          </div>
          <div className="md:absolute bottom-0 right-0 w-full flex justify-center">
            <img src="/images/pattern.svg" className="rotate-180" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export { Special }
