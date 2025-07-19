import { Container } from '@/components/common/container'
import { PostsSectionProperties } from './posts-section.types'
import MainPostCard from '@/components/common/posts/main-post-card/main-post-card'
import PostCard from '@/components/common/posts/post-card/post-card'
import { Divider } from '@/components/common/divider'

const PostsSection = (properties: PostsSectionProperties) => {
  const { postList } = properties

  return (
    <Container>
      <Divider title={'مجله داخلی'} className="mb-5" />

      {postList?.length >= 1 && (
        <div className="mb-5">
          <MainPostCard {...postList?.[0]} />
        </div>
      )}

      <div className="grid-cols-1 md:grid-cols-2 grid gap-5 lg:grid-cols-3">
        {postList?.map((card, index) => {
          if (index === 0) return
          return <PostCard {...card} />
        })}
      </div>
    </Container>
  )
}
export { PostsSection }
