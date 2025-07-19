import { ENDPOINTS } from '@/lib/api/endpoints'
import fetcher from '@/lib/api/fetcher'
import { replaceOptions } from '@/lib/utils/replace-options'

interface TechnicalDocProperties {
  slug: string
}

async function getTechnicalDoc({ slug }: TechnicalDocProperties): Promise<any> {
  const result = await fetcher(
    replaceOptions(ENDPOINTS.TECHNICAL_DOC, {
      slug,
    }),
  )
  return result
}
export { getTechnicalDoc }
