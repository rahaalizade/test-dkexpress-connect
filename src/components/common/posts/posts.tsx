import { Divider } from '@/components/common/divider'
import MainPostCard from '@/components/common/posts/main-post-card/main-post-card'
import PostCard from '@/components/common/posts/post-card/post-card'
import { Container } from '@/components/common/container'
import { PostProps, PostsProps } from '@/components/common/posts/posts.types'
import { useInfiniteLoaderHook } from '@/lib/hooks/infinite-loader.hooks'
import { getBlogList } from '@/lib/api/services/blog/blog-list.services'
import { useState } from 'react'
import { PostsLoading } from '@/components/common/posts/posts.feedbacks'
import { BBanner } from '@/components/common/banners/b-banner/b-banner'
import FilterForm from '@/components/common/form/filter-form/filter-form'
import { useFilterFormHook } from '@/components/common/form/filter-form/filter-form.hooks'

export default function Posts({
  contents,
  dividerTitle,
  hasSearch,
  categories,
  banner,
}: PostsProps) {
  const [filteredCards, setFilteredCards] = useState<PostProps[]>(contents)
  const { isLoading, lastPostElementRef } = useInfiniteLoaderHook(
    setFilteredCards,
    getBlogList,
  )
  const { formLoading, searchOnchangeWithDebounce, searchOnchange } =
    useFilterFormHook(setFilteredCards, getBlogList)

  return (
    <Container className="mt-5">
      {dividerTitle && (
        <div className="flex flex-col sm:flex-row w-full gap-[1.25rem] sm:gap-[0.625rem] items-center mb-5">
          <Divider
            className="w-full sm:w-auto sm:flex-grow"
            title={dividerTitle}
          />
          {hasSearch && (
            <FilterForm
              searchOnchange={searchOnchange}
              placeholder="جستجو"
              searchOnchangeWithDebounce={searchOnchangeWithDebounce}
              categories={categories}
            />
          )}
        </div>
      )}
      {formLoading ? (
        <PostsLoading />
      ) : (
        <>
          {filteredCards?.[0] && (
            <div className="mb-4">
              <MainPostCard {...filteredCards?.[0]} />
            </div>
          )}
          {banner && <BBanner className="!px-0" banner={banner} />}
          <div className="grid gap-[1.25rem] mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCards?.map((card, index) => {
              if (index === 0) return

              return (
                <>
                  <PostCard
                    {...card}
                    ref={
                      filteredCards.length === index + 1 && index >= 19
                        ? lastPostElementRef
                        : null
                    }
                  />
                </>
              )
            })}
          </div>
          {isLoading && <PostsLoading />}
        </>
      )}
    </Container>
  )
}
