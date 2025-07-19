import { useQuery } from '@tanstack/react-query'
import { ENDPOINTS } from '../../endpoints'
import fetcher from '../../fetcher'
import { replaceOptions } from '@/lib/utils/replace-options'
import { toQueryString } from '@/lib/utils/to-querystring/to-querystring'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface GetDocumentsListProperties {
  flat?: string
}

async function getDocumentsList({
  flat,
}: GetDocumentsListProperties): Promise<any> {
  const endPoint = ENDPOINTS.PAPERS_LIST
  const response = await fetcher(replaceOptions(endPoint, { flat }))

  return response
}

async function getDocumentsListGroup(queryData: any): Promise<any> {
  const queryStringValue = toQueryString(queryData ?? {})
  const endPoint = `${ENDPOINTS.PAPERS_LIST2}?${queryStringValue}`
  const response = await fetcher(endPoint)

  return response
}

const useGetDocumentsList = (initialData: any) => {
  const router = useRouter()

  const [initial, setInitial] = useState<any>(initialData)
  useEffect(() => {
    setInitial(undefined)
  }, [])

  return useQuery({
    queryKey: ['documents', router.query],
    queryFn: () => getDocumentsListGroup(router.query),
    initialData: initial,
  })
}

export { getDocumentsList, useGetDocumentsList, getDocumentsListGroup }
