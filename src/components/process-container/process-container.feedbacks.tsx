import { SkeletonLoading } from '../common/skeleton-loading'

const ProcessContainerLoading = () => {
  return (
    <div className="grid grid-cols-1 mt-8 gap-5 sm:grid-cols-2 ">
      <SkeletonLoading containerClassName="!h-[80px]" />
      <SkeletonLoading containerClassName="!h-[80px]" />
      <SkeletonLoading containerClassName="!h-[80px]" />
      <SkeletonLoading containerClassName="!h-[80px]" />
      <SkeletonLoading containerClassName="!h-[80px]" />

      {[1, 2, 3].map(item => {
        return (
          <SkeletonLoading
            key={item}
            className=" hidden md:block"
            containerClassName="!h-[80px]"
          />
        )
      })}
    </div>
  )
}

export { ProcessContainerLoading }
