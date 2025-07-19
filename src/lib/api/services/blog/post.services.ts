import fetcher from '@/lib/api/fetcher'
import { replaceOptions } from '@/lib/utils/replace-options'
import { ENDPOINTS } from '@/lib/api/endpoints'

interface GetPostProperties {
  post_id: string
}

const getPost = async ({ post_id }: GetPostProperties): Promise<any> => {
  const result = await fetcher(
    replaceOptions(ENDPOINTS.POST_INFO, {
      post_id,
    }),
  )

  return result
}

export { getPost }
