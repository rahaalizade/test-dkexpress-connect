import { replaceOptions } from '@/lib/utils/replace-options'
import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'
import { useMutation } from '@tanstack/react-query'

async function lotteryWithQuery(query: any): Promise<any> {
  const endPoint = replaceOptions(ENDPOINTS.LOTTERY_QUERY, {
    query,
  })
  const response = await fetcher(endPoint)

  return response
}

const useLotteryWithQuery = () => {
  return useMutation({
    mutationFn: lotteryWithQuery,
  })
}

async function lotteryWithRandom(count: any): Promise<any> {
  const endPoint = replaceOptions(ENDPOINTS.LOTTERY_RANDOM, {
    count,
  })
  const response = await fetcher(endPoint)

  return response
}

const useLotteryWithRandom = () => {
  return useMutation({
    mutationFn: lotteryWithRandom,
  })
}

export { lotteryWithQuery, useLotteryWithQuery, useLotteryWithRandom }
