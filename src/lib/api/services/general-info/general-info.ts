import { replaceOptions } from '@/lib/utils/replace-options'
import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'

type pageType = 'Text' | 'General' | 'Home' | 'Blog' | 'On_Boarding' | 'Ladder'

interface GetGeneralInfoProperties {
  page: pageType
}

const getGeneralInfo = async (page: GetGeneralInfoProperties): Promise<any> => {
  const result = await fetcher(
    replaceOptions(ENDPOINTS.GENERAL_INFO, {
      page: page.page,
    }),
  )
  return result
}

export { getGeneralInfo }
