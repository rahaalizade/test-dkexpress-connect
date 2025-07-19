import { useRouter } from 'next/router'
import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toQueryString } from '@/lib/utils/to-querystring/to-querystring'
import { replaceOptions } from '@/lib/utils/replace-options'

async function getProcessList(queryData: any): Promise<any> {
  const queryStringValue = toQueryString(queryData ?? {})
  const endPoint = `${ENDPOINTS.OPERATIONS_LIST}?${queryStringValue}`
  const response = await fetcher(endPoint)

  return response
}

async function getProcessGet(operationId: any): Promise<any> {
  const endPoint = replaceOptions(ENDPOINTS.OPERATIONS_GET, {
    operation_id: operationId,
  })
  const response = await fetcher(endPoint)

  return response
}

const useGetProcessList = (initialData: any) => {
  const router = useRouter()

  const [initial, setInitial] = useState<any>(initialData)
  useEffect(() => {
    setInitial(undefined)
  }, [])

  return useQuery({
    queryKey: ['process', router.query],
    queryFn: () => getProcessList(router.query),
    initialData: initial,
  })
}

export { getProcessList, useGetProcessList, getProcessGet }
