import Image from 'next/image'
import { Container } from '@/components/common/container'
import { Calendar, Heart, User } from 'lucide-react'
import { PostProps } from '@/components/common/posts/posts.types'

function Post({
  id,
  cover_url,
  categories,
  title,
  team,
  created_at,
  body,
}: PostProps) {
  return (
    <Container className="flex flex-col gap-3 mt-10 ">
      {cover_url && (
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 md:aspect-none md:w-full md:h-[350px] relative">
            <Image
              className="flex w-full object-cover rounded-xl"
              fill
              src={cover_url}
              alt={team?.name}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col py-[1.25rem] gap-[1.25rem]">
        <div className="flex flex-col gap-[0.5rem]">
          <h3 className="font-[500] text-object-primary text-[1.5rem] sm:text-[2rem]">
            {title}
          </h3>
          <div className="flex gap-[1.25rem] text-[0.75rem] items-center">
            <span className="text-object-white bg-button-tracking-primary rounded-[0.5rem] px-2 py-1">
              {categories?.[0]?.name}
            </span>
            <span className="flex text-object-primary-low items-center gap-1">
              <Calendar width={14} />
              {new Date(created_at).toLocaleString('fa', {
                dateStyle: 'short',
              })}
            </span>
          </div>
        </div>

        <div className="my-[0.25rem] w-full h-[0.0625rem] bg-border-outline-2" />

        <div
          className="text-object-low-emphasis"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </Container>
  )
}

export { Post }
