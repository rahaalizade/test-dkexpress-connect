import { ChangeEvent, useMemo, useState } from 'react'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'

const useSearchBoxFilterHook = (fetchApi: any, setItems: any) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchItems = async (value: string) => {
    setError(null)
    setIsLoading(true)
    try {
      const updateQueries = { q: value }
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, ...updateQueries },
        },
        undefined,
        { shallow: true },
      )
      const response = await fetchApi({
        ...router.query,
        q: value,
      })
      setItems(response?.data?.data)
      return setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const debounceFn = useMemo(() => debounce(fetchItems, 1000), [])
  const onChangeFn = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputValue = e.target.value

    setSearchValue(inputValue)
    debounceFn(inputValue)
  }

  return {
    isLoading,
    error,
    searchValue,
    onChangeFn,
  }
}
export { useSearchBoxFilterHook }
