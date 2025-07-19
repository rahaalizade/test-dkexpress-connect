import { SkeletonLoading } from '../skeleton-loading'

const PostsLoading = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-1 md:lg:grid-cols-2 lg:grid-cols-3 gap-[1.25rem]">
        {[...Array(9).keys()].map(key => {
          return (
            <div key={key} className="aspect-w-2 aspect-h-1 relative">
              <SkeletonLoading />
            </div>
          )
        })}
      </div>
    </>
  )
}

export { PostsLoading }
