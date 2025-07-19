import React, { useMemo, useState } from 'react'
import { debounce } from 'lodash'

const useFilterFormHook = (setCardsInfo: any, fetchApi: any) => {
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchItems = async (searchValue: any) => {
    setError(null)
    setFormLoading(true)

    const result = await fetchApi({
      ...searchValue,
    })
    setCardsInfo(result?.data?.data)

    return setFormLoading(false)
  }

  const searchOnchange = (searchValue: any) => {
    fetchItems(searchValue)
  }

  const searchOnchangeWithDebounce = useMemo(
    () => debounce(searchOnchange, 1000),
    [],
  )

  return {
    formLoading,
    error,
    searchOnchangeWithDebounce,
    searchOnchange,
  }
}
export { useFilterFormHook }
