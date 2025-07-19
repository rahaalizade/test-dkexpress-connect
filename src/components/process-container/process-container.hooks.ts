import { useGetProcessList } from '@/lib/api/services/process/process'
import { debounce, groupBy } from 'lodash'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { ProcessContainerProperties } from './process-container.types'

const useProcessContainerHooks = (properties: ProcessContainerProperties) => {
  const { processList, categoriesList, generalProcessInformation } = properties

  const router = useRouter()

  const [search, setSearch] = useState(router.query.q)
  const [selected, setSelected] = useState<any>(
    router.query.category_id || undefined,
  )
  const documentsList = useGetProcessList({ data: processList })

  const processListData = documentsList?.data?.data

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

  const searchInput = (event: any) => {
    const inputValue = event.target.value
    setSearch(inputValue)
    const updatedQuery: any = {
      ...router.query,
      q: inputValue,
    }
    updateRouter(updatedQuery)
  }

  const comboBoxOnChange = (selectedValue: any) => {
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
    searchInput,
    comboBoxOnChange,
    search,
    selected,
    documentsList,
    groupProcess: processListData,
  }
}

export { useProcessContainerHooks }
