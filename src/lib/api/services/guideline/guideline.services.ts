import { ENDPOINTS } from '@/lib/api/endpoints'
import fetcher from '@/lib/api/fetcher'
import { replaceOptions } from '@/lib/utils/replace-options'

interface GetGuidelineProperties {
  slug: string
}

async function getGuideline({ slug }: GetGuidelineProperties): Promise<any> {
  const result = await fetcher(
    replaceOptions(ENDPOINTS.GUIDELINE, {
      slug,
    }),
  )
  return result
}
export { getGuideline }
