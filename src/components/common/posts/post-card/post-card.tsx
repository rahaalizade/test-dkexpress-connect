import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { PostProps } from '@/components/common/posts/posts.types'
import Link from 'next/link'
import { forwardRef, LegacyRef } from 'react'

export default forwardRef(function PostCard(
  { id, cover_url, categories, title, team, created_at, summary }: PostProps,
  ref: LegacyRef<HTMLAnchorElement> | undefined,
) {
  return (
    <Link
      href={'/magazine/[post]'}
      as={`/magazine/${id.toString()}`}
      className="flex flex-col group w-full rounded-[0.75rem] overflow-hidden duration-300 group hover:bg-background-primary"
      ref={ref}
    >
      {cover_url && (
        <div className="flex relative group-hover:scale-105 rounded-[0.75rem] aspect-w-16 aspect-h-9 w-full  pointer-events-none select-none duration-300 group-hover:opacity-90">
          <Image src={cover_url} alt={title} fill />
        </div>
      )}

      <div className="flex flex-col p-3">
        <h3 className="font-[700] mb-2 text-object-primary group-hover:text-button-content-black text-[1.25rem] px-[0.5rem]">
          {title}
        </h3>
        <div className="flex gap-[1.25rem] text-[0.75rem] items-center mb-2">
          <span className="text-object-white font-[400] bg-button-tracking-primary rounded-[0.5rem] px-2 py-1">
            {categories?.[0]?.name}
          </span>
          <span className="flex font-[700] text-object-primary-low items-center gap-1">
            <Calendar width={14} />
            {new Date(created_at).toLocaleString('fa', {
              dateStyle: 'short',
            })}
          </span>
        </div>
        <div
          className="font-[400] text-object-low-emphasis text-justify text-sm"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    </Link>
  )
})
