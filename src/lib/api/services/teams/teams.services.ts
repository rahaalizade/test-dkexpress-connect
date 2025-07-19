import { replaceOptions } from '@/lib/utils/replace-options'
import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'

async function getTeamsList(): Promise<any> {
  const endPoint = ENDPOINTS.TEAM_LIST
  const response = await fetcher(endPoint)

  return response
}

async function getTeamById({ team_id }: { team_id: any }): Promise<any> {
  const endPoint = replaceOptions(ENDPOINTS.TEAM_BY_ID, {
    team_id,
  })
  const response = await fetcher(endPoint)

  return response
}

export { getTeamsList, getTeamById }
