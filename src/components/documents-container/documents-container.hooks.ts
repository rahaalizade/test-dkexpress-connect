import { useGetDocumentsList } from '@/lib/api/services/documents/document'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { DocumentsContainerProperties } from './documents-container.types'

const useDocumentsContainer = (properties: DocumentsContainerProperties) => {
  const { documentsListGroup } = properties

  const router = useRouter()

  const [search, setSearch] = useState(router.query.q)
  const [selected, setSelected] = useState<any>(
    router.query.category_id || undefined,
  )

  const documentsList = useGetDocumentsList({ data: documentsListGroup })

  const documentGroupData = documentsList?.data?.data

  const updateRouter = useCallback(
    debounce(updatedQuery => {
      router.push(
        {
          pathname: router.pathname,
          query: updatedQuery,
        },
        undefined,
        { shallow: true, scroll: false },
      )
    }, 700),
    [],
  )

  const searchInputOnChange = (event: any) => {
    const inputValue = event.target.value
    setSearch(inputValue)
    const updatedQuery: any = {
      ...router.query,
      q: inputValue,
    }
    updateRouter(updatedQuery)
  }

  const comboSelect = (selectedValue: any) => {
    const updatedQuery: any = {
      ...router.query,
      category_id: selectedValue,
    }
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true, scroll: false },
    )
    setSelected(selectedValue)
  }

  return {
    searchInputOnChange,
    comboSelect,
    selected,
    search,
    documentsList,
    documentGroupData,
  }
}

export { useDocumentsContainer }
