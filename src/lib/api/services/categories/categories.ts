import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'

async function getCategoriesList(): Promise<any> {
  const endPoint = ENDPOINTS.CATEGORIES_LIST
  const response = await fetcher(endPoint)

  return response
}

export { getCategoriesList }
