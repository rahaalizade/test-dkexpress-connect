import Skeleton from 'react-loading-skeleton'
import { SkeletonLoadingProperties } from './skeleton-loading.types'

function SkeletonLoading(properties: SkeletonLoadingProperties) {
  const { count = 1, containerClassName = '', ...props } = properties
  return (
    <Skeleton
      count={count}
      containerClassName={`flex ${containerClassName} `}
      {...props}
    />
  )
}

export { SkeletonLoading }
