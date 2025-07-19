import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { PostProps } from '@/components/common/posts/posts.types'
import Link from 'next/link'

export default function MainPostCard({
  id,
  cover_url,
  categories,
  title,
  team,
  created_at,
  summary,
}: PostProps) {
  return (
    <Link
      href={'/magazine/[post]'}
      as={`/magazine/${id.toString()}`}
      className="flex flex-col group lg:p-3 lg:flex-row gap-0 lg:gap-[1.75rem] w-full rounded-2xl overflow-hidden duration-300 group hover:bg-background-primary"
    >
      {cover_url && (
        <div className="relative w-full lg:w-[31.25rem] flex-shrink-0">
          <div className=" flex-shrink-0 relative flex overflow-hidden rounded-[0.75rem] aspect-w-16 aspect-h-9 w-full pointer-events-none select-none duration-300 group-hover:opacity-90">
            <Image
              src={cover_url}
              alt={team?.name}
              fill
              className="group-hover:scale-105 duration-300"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:h-[16.9375rem] py-3 pl-3 pr-3 lg:pr-0">
        <h3 className="font-[700] mb-2 text-object-primary group-hover:text-button-content-black text-xl lg:text-3xl px-[0.5rem]">
          {title}
        </h3>
        <div className="flex gap-[1.25rem] text-[0.75rem] items-center mb-2">
          <span className="text-object-white font-[400] bg-button-tracking-primary rounded-[0.5rem] px-2 py-1">
            {categories?.[0]?.name}
          </span>
          <span className="flex text-object-primary-low  font-[700] items-center gap-1">
            <Calendar width={14} />
            {new Date(created_at).toLocaleString('fa', {
              dateStyle: 'short',
            })}
          </span>
        </div>
        <div
          className="font-[400] text-object-low-emphasis overflow-hidden text-justify text-sm flex-1 h-full"
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      </div>
    </Link>
  )
}
