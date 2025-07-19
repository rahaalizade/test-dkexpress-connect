import fetcher from '@/lib/api/fetcher'
import { replaceOptions } from '@/lib/utils/replace-options'
import { ENDPOINTS } from '@/lib/api/endpoints'

interface GetBlogListProperties {
  q?: string
  sort?: string
  page?: string
  category_id?: string
}

const getBlogList = async ({
  q,
  sort,
  page,
  category_id,
}: GetBlogListProperties): Promise<any> => {
  const result = await fetcher(
    replaceOptions(ENDPOINTS.BLOG_LIST, {
      q,
      sort,
      page,
      category_id,
    }),
  )
  return result
}

export { getBlogList }
